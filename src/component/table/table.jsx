import React from 'react'
import style from './css/table.module.css'
import Button from '../button/button'
// import { ButtonData } from '../buttondata/button_data'


function Table({ list, index, deleteBtn, editBtn }) {


    return (
        <tr className={style.body} >
            <td>{list.fullname}</td>
            <td>{list.age}</td>
            <td>{list.position}</td>
            <td>{list.phone}</td>
            <td>

                <Button text={'Edit'} onClick={editBtn} />

            </td>
            <td>
                <Button text={'X'} onClick={deleteBtn} />
            </td>

        </tr>


    )
}

export default Table
