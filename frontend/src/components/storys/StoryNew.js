import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import StoryForm from './StoryForm'
// import { headers } from '../../lib/headers'



class StoryNew extends React.Component{

  state = {
    data: {
      title: '',
      age_rating: '',
      image: null,
      lineStart: '',
      genre: '',
      owner: ''
    } ,
    choices: ''

  }

  

  choiceArray = ['a spooky boot', 'an alien making dinner', 'your favourite food', 'a giant mouse', 'your favourite singer', 'your favourite film', 'a forgetful otter', 'a unexpected telephone call', 'a scary dream', 'a secret door', 'your best friend', 'a secret loft', 'squirrels taking over the world', 'being a pop star', 'dancing in the rain', 'a secret', 'a funny memory', 'the best cheese', 'a noisy thunderstorm', 'monsters under the bed']

  handleClick = e => {
    
    e.preventDefault()
    const choices = this.choiceArray[Math.floor(Math.random() * this.choiceArray.length)]
    this.setState({ choices }) 

    
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      console.log(this.state.data)
      const res = await axios.post('/api/storys/',
        this.state.data, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        }) 
        
      this.props.history.push(`/storys/${res.data.id}`)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'rksde5wr')
    const res = await axios.post(' https://api.cloudinary.com/v1_1/dbpx50jcj/image/upload', data)
    console.log(res)
    this.setState({ image: res.data.url }, () => {
      this.handleChange({ target: { name: 'image', value: res.data.url } })
    })
  }



  render() {
    console.log(this.state.choices)
    return (
      <div className="hero is-fullheight-with-navbar is-primary">
      <section className="section">
        <div className="newstorybg"> 
        <div className="container">
          <StoryForm data={this.state.data}
            choices={this.state.choices}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleUpload={this.handleUpload}
            handleClick={this.handleClick}
          />
        </div>
        </div>
      </section>
      </div>
    )
    
  }

}
export default StoryNew
