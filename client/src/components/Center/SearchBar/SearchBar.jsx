import React from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <div className={styles.SearchBarContainer}>
      <form>
        <input type="search" name="search" />
        <button type='submit' className={styles.searchButton }></button>
      </form>    
    </div>
  )
}

export default SearchBar