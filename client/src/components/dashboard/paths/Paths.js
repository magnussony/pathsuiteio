import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../buildingBlocks/Container'
import PathCard from './PathCard'
import axios from 'axios'

class Paths extends React.Component {
  isLoaded = false
  state = {
    paths: [],
    loading: true,
  }

  componentDidMount() {
    this.isLoaded = true
    axios
      .get('/api/get-paths')
      .then((res) => {
        if (this.isLoaded) {
          this.setState({ paths: [...res.data], loading: false })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  renderPaths = () => {
    return this.state.paths.map((path, index) => {
      return (
        <div key={index}>
          <PathCard path={path} />
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '50px',
            alignItems: 'center',
          }}
        >
          <h1 style={{ marginBottom: '0px', marginTop: '0px' }}>Paths</h1>
          <Link to="/create-path">
            <i className="fas fa-plus" style={{ fontSize: '20px' }}></i>
          </Link>
        </div>
        {this.state.loading ? (
          <p>Loading</p>
        ) : (
          (this.state.paths.length > 0 && this.renderPaths()) || <p>You have no paths yet</p>
        )}
      </Container>
    )
  }
}

export default Paths
