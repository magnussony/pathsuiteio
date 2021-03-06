import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setSuccessMessage } from '../../redux/actions/successMessage'
import Container from '../buildingBlocks/Container'
import PathForm from '../buildingBlocks/path/PathForm'
import { createPathFormState } from '../buildingBlocks/path/data/createPathFormState' // has a clean obj that holds all data to be send to api endpoint

const CreatePath = (props) => {
  const [state, setState] = useState({ obj: {}, loading: true })

  const onSubmit = async (stateobj) => {
    try {
      const res = await axios.post('/api/create-path', {
        ...stateobj,
      })
      if (res) {
        props.history.goBack()
        props.setSuccessMessage('Path was succesfully created!')
      }
    } catch (e) {
      console.log(e.response)
    }
  }

  // FIX - subtasks doesn't get reset after first time, so this is current solutions
  useEffect(() => {
    setState({
      obj: {
        ...createPathFormState,
        form: {
          ...createPathFormState.form,
          subtasks: [{ subtaskTitle: '', subtaskLink: '', subtaskNote: '', subtaskType: '' }],
        },
      },
      loading: false,
    })
  }, [])

  return (
    <Container>
      <h1>New path</h1>
      <button
        className="mt-8 font-semibold mb-5 hover-underline"
        onClick={() => props.history.goBack()}
      >
        <i className="fas fa-trash-alt mr-1"></i> Discard path
      </button>
      {!state.loading && <PathForm edit={false} onSubmit={onSubmit} state={state.obj} />}
    </Container>
  )
}

export default connect(null, { setSuccessMessage })(CreatePath)
