import Quote from '../interfaces/quote'
import User from '../interfaces/user'

const fetchAllQuotes = (): Quote[] => {
  const ben: User = { firstName: 'Ben', lastName: 'Sembira', username: 'bense', photoUrl: 'https://toriavey.com/images/2011/03/IMG_7369.jpg', uuid: 'user-1' }
  const ori: User = { firstName: 'Ori', lastName: 'Ashur', username: 'oriash', photoUrl: 'http://svchronicle.com/wp-content/uploads/2014/12/nerd.jpg', uuid: 'user-1' }
  return [
    { quote: 'Pil yam ze lo pil ragil', quoted: ori, date: new Date(), reporter: ben, uuid: 'quote-1' },
    { quote: 'Ma ze, tavi li od shauarma!', quoted: ori, date: new Date(), reporter: ben, uuid: 'quote-2' },
    { quote: 'Ani lo yodea kod', quoted: ben, date: new Date(), reporter: ori, uuid: 'quote-3' },
    { quote: 'Pil yam ze lo pil ragil', quoted: ori, date: new Date(), reporter: ben, uuid: 'quote-4' },
    { quote: 'Ma ze, tavi li od shauarma!', quoted: ori, date: new Date(), reporter: ben, uuid: 'quote-5' },
    { quote: 'Ani lo yodea kod', quoted: ben, date: new Date(), reporter: ori, uuid: 'quote-6' }
  ]
}

export default fetchAllQuotes
