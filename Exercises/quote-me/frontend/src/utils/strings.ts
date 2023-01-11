export const capitalizeFirstLetter = (s: string) => s.length > 0 ? s[0].toUpperCase() + s.substring(1) : s
export const capitalizeAllFirstLetters = (s: string, separator: string = ' ') => s.split(separator).map(capitalizeFirstLetter).join(separator)
export const snakeCaseToCapitlizedHeader = (s: string) => capitalizeAllFirstLetters(s.toLowerCase().replace('_', ' '))
export const toUpperSnakeCase = (s: string) => s.toUpperCase().replace(' ', '_')
