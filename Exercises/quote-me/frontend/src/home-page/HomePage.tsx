import React from 'react'
import QuotesList from './quotes-list/QuotesList'
import './HomePage.css'
import TopRow from './top-row/TopRow'

const HallOfFame = () => <h1>The Most Iconic...</h1>

const HomePage = () => {
  return (
    <div className='home_page'>
      <div className='top_row_container'>
        <TopRow/>
      </div>
      <div className='hall_of_fame_container'>
        <HallOfFame/>
      </div>
      <div className='feed_container'>
        <QuotesList/>
      </div>
    </div>
  )
}

export default HomePage
