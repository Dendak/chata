/** Returns the correct public image path for both dev and production (GitHub Pages). */
export const img = (filename) => `${import.meta.env.BASE_URL}images/${filename}`
