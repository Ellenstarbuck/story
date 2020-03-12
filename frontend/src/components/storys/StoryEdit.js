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

  //getting the user's story by looking at their previous information to prepopulate the form so they can easily edit it

  async componentDidMount() {
    const storyId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/storys/${storyId}`)
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
      //editing the story with a PUT request
      const { data } = await axios.put(`/api/storys/${storyId}/`, 
        this.state.data, {
          //we include our users token in the request header to autheticate them
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        //taking them back to their story page
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