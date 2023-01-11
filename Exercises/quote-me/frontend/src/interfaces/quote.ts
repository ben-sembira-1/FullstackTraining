import User from './user'

type Quote = {
  quote: string
  quoted: User
  date: Date
  reporter: User
  uuid: string
}

export default Quote
