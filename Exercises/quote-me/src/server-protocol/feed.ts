import Quote from '../interfaces/quote'
import User from '../interfaces/user'

const fetchAllQuotes = (): Quote[] => {
  const ben: User = { firstName: 'Ben', lastName: 'Sembira', photoUrl: '', uuid: 'user-1' }
  const ori: User = { firstName: 'Ori', lastName: 'Ashur', photoUrl: '', uuid: 'user-1' }
  return [
    { quote: 'Pil yam ze lo pil ragil', quoted: ori, date: new Date(), reporter: ben, uuid: 'quote-1' },
    { quote: 'Ma ze, tavi li od shauarma!', quoted: ori, date: new Date(), reporter: ben, uuid: 'quote-2' },
    { quote: 'Ani lo yodea kod', quoted: ben, date: new Date(), reporter: ori, uuid: 'quote-3' }
  ]
}

export default fetchAllQuotes
