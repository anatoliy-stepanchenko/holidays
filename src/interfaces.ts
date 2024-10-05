export interface Country {
  countryCode: string
  name: string
  nextHoliday?: string | null
}

export interface Holiday {
  date: string
  localName: string
  name: string
}
