import React from 'react'
import { ForumData } from '../../../Data/ForumData'
import Forum from './Forum'
import './ForumList.css'

const ForumList = () => {
  return (
    <div className="ForumListContainer">
      <header className="ForumList_header">
        I Spotted You
      </header>
      <div className="hrline"></div>
      <body className='ForumList_body'>
        {ForumData.map((post, id)=>{
          return <Forum post={post} key={id}/>
        })}
      </body>
      <button>>></button>
    </div>
  )
}

export default ForumList