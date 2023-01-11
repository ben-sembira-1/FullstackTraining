import React from 'react'
import Quote from '../../../interfaces/quote'
import UserThumbnail from '../../../user-thumbnail/UserThumbnail'

import './QuoteItem.css'

type QuoteItemProps = {
  quote: Quote
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote }) => {
  return (
    <div className='quote_item'>
      <div className='quote_item-metadata'>
        <UserThumbnail user={quote.quoted}/>
      </div>
      <div className='quote_item-quote'>
        {quote.quote}
      </div>
      <div className='quote_item-reporter'>
        Reporter: {quote.reporter.firstName}
        <br/>
        {quote.date.toDateString()}
      </div>
      <div className='quote_item-comments'>
        Comments
      </div>
    </div>
  )
}

export default QuoteItem
