import React, { useEffect, useState } from 'react'
import Quote from '../../interfaces/quote'
import fetchAllQuotes from '../../server-protocol/feed'
import QuoteItem from './quote-item/QuoteItem'

const Feed = () => {
  const [feed, setFeed] = useState<Quote[]>([])
  useEffect(
    () => {
      setFeed(fetchAllQuotes())
    },
    []
  )
  return (
    <div>
      {feed.map(
        (quote) => <QuoteItem key={quote.uuid} quote={quote}/>
      )}
    </div>
  )
}

export default Feed
