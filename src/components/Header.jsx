import React from 'react';

const Header = (props) => {
  
  return (
    <header className='header'>
      <h2>To Do List</h2>
      <button className={props.showAdd? 'btn-red': 'btn-black'}   onClick={props.onAdd}>{props.showAdd ? 'Close' : 'Add'}</button>
    </header>
  )
}

export default Header