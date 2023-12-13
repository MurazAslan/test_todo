import { ErrorMessage, Field, Form, Formik } from 'formik'
import style from './css/add.module.css'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Button from '../button/button'
import Table from '../table/table'

function reducer(state, action) {


  switch (action.type) {

    case 'add':
      return [...state, action.payload]
    case 'delete':
      return state.filter((x, id) => id !== action.index)
    case 'edit':
      return state.filter((x, id) => action.index !== id)
    default:
      return state
  }
}

function Todo() {

  const [state, dispatch] = useReducer(reducer, [])
  const [inpValues, setInpValues] = useState([])
  const deleteBtn = (index) => {
    dispatch({
      type: "delete", index
    })

  }

  const editBtn = (index) => {
    const payload = {
      ...state[index],
      control: true
    };


    setInpValues(payload)
    dispatch({
      type: 'edit', index,
      payload
    })



  }



  const validate = (values) => {

    const errors = {
      fullname: '',
      age: 0,
      position: '',
      phone: 0
    }



    if (!values.fullname || !isNaN(Number(values.fullname.trim(typeof 'number')))) errors.fullname = 'fullname  can"t be empty'
    if (!values.age || isNaN(Number(values.age))) errors.age = 'age must be only number'
    if (!values.position) errors.position = 'position can"t be empty'
    if (!values.phone || isNaN(Number(values.phone))) errors.phone = 'phone must be only number'
    else { return };
    return errors

  }
  return (
    <div className={style.add}>
      <div className={style.header}>
        <h1>
          Todo App
        </h1>
        <Formik
          enableReinitialize={true}
          onSubmit={(values) => {
            dispatch({
              type: 'add',
              payload: {
                id: state.length,
                fullname: values.fullname,
                age: values.age,
                position: values.position,
                phone: values.phone,
                control: false
              }
            })
            values.fullname = '';
            values.age = '';
            values.position = '';
            values.phone = '';
            values.control = false;

          }}
          validate={validate}

          initialValues={{
            fullname: inpValues.fullname || '',
            age: inpValues.age || '',
            position: inpValues.position || '',
            phone: inpValues.phone || '',
            control: inpValues.control || ''
          }}


        >
          {(({ errors, initialValues }) => {
            return (
              <Form >
                <div>
                  <Field
                    placeholder='Fullname'
                    name='fullname'
                    className={errors.fullname ? style.errBorder : ''}
                  />
                  {errors.fullname ? <div className={style.err}> <ErrorMessage name='fullname' /></div> : ''}
                </div>
                <div>
                  <Field
                    placeholder='0'
                    name='age'
                    className={errors.age ? style.errBorder : ''}
                  />
                  {errors.age && typeof errors.age !== 'nubmer' ? <div className={style.err}> <ErrorMessage name='age' /></div> : ''}
                </div>
                <div>
                  <Field
                    placeholder='Position'
                    name='position'
                    className={errors.position ? style.errBorder : ''}
                  />
                  {errors.position ? <div className={style.err}> <ErrorMessage name='position' /></div> : ''}
                </div>
                <div>
                  <Field
                    placeholder='0500505050'
                    name='phone'
                    className={errors.phone ? style.errBorder : ''}
                  />
                  {errors.phone && typeof errors.phone !== 'nubmer' ? <div className={style.err}> <ErrorMessage name='phone' /></div> : ''}
                </div>
                <div>
                  <Button text={'+'} />
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
          {state.map((el, index) => (


            <Table list={el} key={index} deleteBtn={() => deleteBtn(index)} editBtn={() => editBtn(index)} />
          ))}
        </tbody>


      </table>


    </div>
  )
}

export default Todo
