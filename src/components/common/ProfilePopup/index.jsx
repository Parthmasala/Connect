import React from 'react'
import './index.scss'
import { onLogout } from '../../../API/AuthAPI'

export default function ProfilePopup() {
  return (
    <div className='popup-card'>
        <ul className='popup-list'>
            <li className='popup-option' onClick={onLogout}>
                Log Out
            </li>
        </ul>
    </div>
  )
}
