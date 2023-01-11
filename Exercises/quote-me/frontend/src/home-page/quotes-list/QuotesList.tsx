import React, { useEffect, useState } from 'react'
import Quote from '../../interfaces/quote'
import fetchAllQuotes from '../../server-protocol/feed'
import QuoteItem from './quote-item/QuoteItem'

import './QuotesList.css'

const QuotesList = () => {
  const [feed, setFeed] = useState<Quote[]>([])
  useEffect(
    () => {
      setFeed(fetchAllQuotes())
    },
    []
  )
  return (
    <div className='quotes_list'>
      {feed.map(
        (quote) => <QuoteItem key={quote.uuid} quote={quote}/>
      )}
    </div>
  )
}

export default QuotesList
