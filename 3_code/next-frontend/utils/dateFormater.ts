// Date Time Formater for multi usage purposes
import { format } from 'date-fns'
import { id as Indonesia } from 'date-fns/locale'

const config = {
  locale: Indonesia
}

export const MyFormater = (date: string | Date | any = new Date(), dateFormat: string) => {
  return format(new Date(date) ?? new Date(), dateFormat, config)
}