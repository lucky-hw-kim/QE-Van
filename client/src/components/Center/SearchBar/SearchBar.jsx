import React from 'react'
import styles from './SearchBar.module.css'
import reset from '../../../assets/resetIcon.png'

const SearchBar = ({search, setSearch}) => {
  return (
    <div className={styles.SearchBarContainer}>
      <form>
        <input type="search" name="search" onChange={e => {
         setSearch(e.target.value)
        }}/>
        <button type='submit' className={styles.searchButton }>
          <img src={reset}alt="reset" width="24px"/>
        </button>
      </form>    
    </div>
  )
}

export default SearchBar