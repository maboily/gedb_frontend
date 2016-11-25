import React from 'react'
import { Link } from 'react-router'

export const Items = (props) => props.children ? props.children : (
  <div>
    <h2>Items</h2>

    <Link to='/items/weapons/'>Weapons</Link>
  </div>
)

Items.propTypes = {
}

export default Items
