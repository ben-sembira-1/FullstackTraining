import React from 'react'
import Quote from '../../../interfaces/quote'

type QuoteItemProps = {
  quote: Quote
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote }) => {
  return (
    <div>
      {quote.quote}
    </div>
  )
}

export default QuoteItem
