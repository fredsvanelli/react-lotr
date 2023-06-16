export const plural = (s: string, p: string, c = 0): string => (c === 1 ? s : p)

export const getMovieCover = (id: string): string => `/movie-covers/${id}.jpg`

export const formatMoney = (value: number): string => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)} billion`

  return `$${value} million`
}
