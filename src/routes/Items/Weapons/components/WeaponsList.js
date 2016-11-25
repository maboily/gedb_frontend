import React from 'react'
import Weapon from './Weapon.js';

export const WeaponsList = (props) => (
  <div>
    <h2>Weapons</h2>

    {props.weapons.items.map((weapon) => <Weapon key={weapon.classid} item={weapon} />)}
  </div>
)

WeaponsList.propTypes = {
  weapons: React.PropTypes.object.isRequired
}

export default WeaponsList
