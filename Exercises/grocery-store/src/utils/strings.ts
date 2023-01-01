export const capitalizeFirstLetter = (s: string): string => s.length > 0 ? s[0].toUpperCase() + s.substring(1) : s
export const capitalizeAllFirstLetters = (s: string, seperator: string = ' '): string => s.split(seperator).map(capitalizeFirstLetter).join(seperator)
export const snakeCaseToCapitlizedHeader = (s: string): string => capitalizeAllFirstLetters(s.toLowerCase().replace('_', ' '))
export const toUpperSnakeCase = (s: string): string => s.toUpperCase().replace(' ', '_')
