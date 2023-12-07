import { ErrorMessage, Field, Form, Formik } from 'formik'
import style from './css/add.module.css'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
// import Table from '../table/table'
import Button from '../button/button'
import Table from '../table/table'
import { type } from '@testing-library/user-event/dist/type'


function reducer(state, action) {
  if (action.fullname?.trim() || action.position?.trim() || action.phone?.trim() || action.age?.trim()) {
    
    state = [...state, action]
    // console.log(state, 'state inside')
    return state
  } 
  // switch(action.type)
  // {
  // case 'delete':
  // }
  return state


}
function Add() {

  const [data, dispatch] = useReducer(reducer, [])
  console.log(data, 'state outside')

  const deleteBtn = (index) => {
    const newState = data.filter((x, y) => y !== index)
    dispatch(newState)

  }





  return (
    <div className={style.add}>
      <div className={style.header}>
        <h1>
          Todo App
        </h1>
        <Formik
          onSubmit={(values) => {
            // console.log(values)
            const err = {}
            if (!values.fullname) err.fullname = "fullname bos ola bilmez"
            else if (!values.age && typeof values.age !== 'number') err.age = "age bos ola bilmez"
            else if (!values.position) err.position = "position bos ola bilmez"
            else if (!values.fullname && typeof values.phone !== 'number') {
              err.phone = "phone dolu ve reqemden ibaret olmalidir"
              return err
            }


            dispatch({
              id: data.length,
              fullname: values.fullname,
              age: values.age,
              position: values.position,
              phone: values.phone
            })
          }}
          validate={(values) => {
            // console.log(values)



          }}

          initialValues={() => ( {
              fullname: 'fullname',
              age: 'age',
              position: 'position',
              phone: 'phone'
            
          } )}


        >
          {((error, touched) => {
            // console.log(error.errors, 'error')
            // console.log(touched, 'touched')
            return (
              <Form>
                <div>
                  <Field
                    placeholder='Fullname'
                    name='fullname'
                  />
                  {/* {error.fullname ? <div> <ErrorMessage name='fullname' /></div> : ''} */}
                </div>
                <div>
                  <Field
                    placeholder='0'
                    name='age'
                  />
                  {/* {errors.errors.age ? <div> <ErrorMessage name='age' /></div> : ''} */}
                </div>
                <div>
                  <Field
                    placeholder='Position'
                    name='position'
                  />
                  {/* {errors.errors.position ? <div> <ErrorMessage name='position' /></div> : ''} */}
                </div>
                <div>
                  <Field
                    placeholder='0500505050'
                    name='phone'
                  />
                  {/* {errors.errors.phone ? <div> <ErrorMessage name='phone' /></div> : ''} */}
                </div>
                <div>
                  <Button text={'Add'} />
                </div>
              </Form>
            )
          })}

        </Formik>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              Fullname
            </th>
            <th>
              Age
            </th>
            <th>
              Position
            </th>
            <th>
              Phone
            </th>
            <th>
              Edit
            </th>
            <th>
              Delete
            </th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {data.map((el, index) => <Table list={el} key={index} deleteBtn={() => deleteBtn(index)} />


          )}
        </tbody>


      </table>


    </div>
  )
}

export default Add
