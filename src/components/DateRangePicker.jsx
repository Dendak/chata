import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react'

const DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
const MONTHS = [
  'Leden','Únor','Březen','Duben','Květen','Červen',
  'Červenec','Srpen','Září','Říjen','Listopad','Prosinec'
]

function fmt(date) {
  if (!date) return ''
  return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })
}

function sameDay(a, b) {
  return a && b && a.toDateString() === b.toDateString()
}

function inRange(date, start, end) {
  if (!start || !end) return false
  const d = date.getTime()
  return d > start.getTime() && d < end.getTime()
}

function startOfMonth(year, month) {
  return new Date(year, month, 1)
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// Monday = 0 offset
function firstDayOffset(year, month) {
  const day = new Date(year, month, 1).getDay()
  return (day + 6) % 7 // convert Sun=0 to Mon=0
}

export default function DateRangePicker({ value, onChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear]   = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [start, setStart] = useState(value?.start || null)
  const [end,   setEnd]   = useState(value?.end   || null)
  const [hover, setHover] = useState(null)
  const ref = useRef(null)

  // close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const handleDay = (date) => {
    if (date < today) return
    if (!start || (start && end)) {
      setStart(date); setEnd(null)
    } else {
      if (date <= start) { setStart(date); setEnd(null) }
      else {
        setEnd(date)
        onChange?.({ start, end: date })
        setOpen(false)
      }
    }
  }

  const clear = (e) => {
    e.stopPropagation()
    setStart(null); setEnd(null)
    onChange?.({ start: null, end: null })
  }

  // build grid
  const offset = firstDayOffset(viewYear, viewMonth)
  const total  = daysInMonth(viewYear, viewMonth)
  const cells  = Array.from({ length: offset + total }, (_, i) =>
    i < offset ? null : new Date(viewYear, viewMonth, i - offset + 1)
  )
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  const displayStart = start ? fmt(start) : ''
  const displayEnd   = end   ? fmt(end)   : ''
  const placeholder  = !start ? 'Vyberte termín pobytu' : !end ? `${displayStart} → vyberte odjezd` : `${displayStart} – ${displayEnd}`

  const rangeEnd = end || (start && hover && hover > start ? hover : null)

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 bg-white border rounded-xl px-4 py-3 text-sm transition-all text-left ${
          open ? 'border-accent ring-2 ring-accent/10' : 'border-stone-200 hover:border-stone-300'
        }`}
      >
        <Calendar size={15} className="text-stone-400 flex-shrink-0" />
        <span className={start ? 'text-stone-900 flex-1' : 'text-stone-400 flex-1'}>
          {placeholder}
        </span>
        {start && (
          <span onClick={clear} className="p-0.5 rounded hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors">
            <X size={13} />
          </span>
        )}
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute z-50 mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl shadow-stone-200 border border-stone-100 p-4 select-none">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth}
              className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-stone-800">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth}
              className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[0.65rem] font-semibold text-stone-400 uppercase tracking-wide py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />

              const isPast    = date < today
              const isToday   = sameDay(date, today)
              const isStart   = sameDay(date, start)
              const isEnd     = sameDay(date, end)
              const isInRange = inRange(date, start, rangeEnd)
              const isHoverEnd = sameDay(date, rangeEnd) && !end

              // edge rounding
              const isRangeStart = isStart && (end || rangeEnd)
              const isRangeEnd   = isEnd || isHoverEnd

              return (
                <div
                  key={i}
                  onClick={() => !isPast && handleDay(date)}
                  onMouseEnter={() => start && !end && setHover(date)}
                  onMouseLeave={() => setHover(null)}
                  className={`
                    relative h-9 flex items-center justify-center text-sm cursor-pointer transition-colors
                    ${isPast ? 'opacity-30 cursor-default' : ''}
                    ${isInRange ? 'bg-accent/10' : ''}
                    ${isRangeStart ? 'rounded-l-full' : ''}
                    ${isRangeEnd   ? 'rounded-r-full' : ''}
                    ${!isInRange && !isStart && !isEnd ? 'rounded-full' : ''}
                  `}
                >
                  <span className={`
                    w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all
                    ${isStart || isEnd
                      ? 'bg-accent text-white shadow-md shadow-accent/30'
                      : isToday
                        ? 'ring-1 ring-accent text-accent font-semibold'
                        : isInRange
                          ? 'text-stone-700 hover:bg-accent/20'
                          : isPast
                            ? 'text-stone-300'
                            : 'text-stone-700 hover:bg-stone-100'
                    }
                  `}>
                    {date.getDate()}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Footer hint */}
          <div className="mt-3 pt-3 border-t border-stone-100 text-center text-xs text-stone-400">
            {!start
              ? 'Klikněte na datum příjezdu'
              : !end
                ? 'Nyní vyberte datum odjezdu'
                : `${Math.round((end - start) / 86400000)} nocí · ${displayStart} – ${displayEnd}`
            }
          </div>
        </div>
      )}
    </div>
  )
}
