import React from 'react'
import './style.css'

function Itemlist({title, description}) {
  return (
    <div className='item-list'>
        <strong>{title}</strong>
        <p>{description}</p>
        <hr/>
    </div>
  )
}

export default Itemlist