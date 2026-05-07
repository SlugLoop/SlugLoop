export function cx(...values) {
  return values
    .flatMap((value) => {
      if (!value) return []
      if (Array.isArray(value)) return value
      if (typeof value === 'object') {
        return Object.entries(value)
          .filter(([, active]) => Boolean(active))
          .map(([key]) => key)
      }
      return [value]
    })
    .filter(Boolean)
    .join(' ')
}
