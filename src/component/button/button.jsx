import React from 'react'
import style from './css/deletebtn.module.css'

function Button({ text, onClick }) {


  return (

    <button type='submit' onClick={onClick} className={style.button}>{text}</button>


  )
}

export default Button
