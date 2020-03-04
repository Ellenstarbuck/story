import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import StoryForm from './StoryForm'

class StoryEdit extends React.Component{

  state = {
    data: {
      title: '',
      age_rating: '',
      image: '',
      lineStart: '',
      genre: '',
    } 

  }

  async componentDidMount() {
    const storyId = this.props.match.params.id
    try {
      const res = await axios.get(`http://localhost:8000/storys/${storyId}`)
      this.setState({ data: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const storyId = this.props.match.params.id
    try {
      const { data } = await axios.put(`http://localhost:8000/storys/${storyId}/`, 
        this.state.data, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
      this.props.history.push(`/storys/${data.id}`)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  



  render() {
    return (
      <section className="section">
        <div className="container">
          <StoryForm data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
    
  }
}


export default StoryEdit