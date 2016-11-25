import React from 'react'
import './Weapon.scss'

export const Weapon = (props) => (
  <div className='weapon'>
    <span className='weapon-title'>{props.item.itemname}</span>

    <p className='weapon-desc'>{props.item.desc}</p>
  </div>
)

Weapon.propTypes = {
  item: React.PropTypes.object.isRequired
}

export default Weapon
