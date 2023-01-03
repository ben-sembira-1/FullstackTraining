import React from 'react'
import './HomePage.css'

const TopRow = () => <h1>Top Row Here</h1>
const HallOfFame = () => <h1>The Most Iconic Here</h1>
const Feed = () => <h1>Feed Here</h1>

const HomePage = () => {
  return (
    <div className='home_page'>
      <div className='top_row'>
        <TopRow/>
      </div>
      <div className='hall_of_fame'>
        <HallOfFame/>
      </div>
      <div className='feed'>
        <Feed/>
      </div>
    </div>
  )
}

export default HomePage
