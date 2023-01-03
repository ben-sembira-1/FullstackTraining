import React from 'react'
import Quote from '../../../interfaces/quote'

import './QuoteItem.css'

type QuoteItemProps = {
  quote: Quote
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote }) => {
  return (
    <div className='quote_item'>
      <div className='quote_item-metadata'>
        metadata
      </div>
      <div className='quote_item-quote'>
        quote
      </div>
      <div className='quote_item-reporter'>
        Reporter
      </div>
      <div className='quote_item-comments'>
        Comments
      </div>
    </div>
  )
}

export default QuoteItem
