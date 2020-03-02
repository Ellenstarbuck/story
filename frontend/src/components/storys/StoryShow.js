import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class StoryShow extends React.Component{
  
  state = {
    story: null, 
    lines: {}
  }

  async componentDidMount() {
    const storyId = this.props.match.params.id
    try {
      const res = await axios.get(`http://localhost:8000/storys/${storyId}`)
      this.setState({ story: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const lines = { ...this.state.lines, [name]: value }
    this.setState({ lines })
  }

  handleDelete = async() => {
    const storyId = this.props.match.params.id 
    try {
      await axios.delete(`http://localhost:8000/storys/${storyId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/story')
    } catch (err) {
      console.log(err.response)
    }
  }

  handleSubmit = async e => {
    // e.preventDefault()
    const storyId = this.props.match.params.id 
    try {
      console.log()
      const res = await axios.post(`http://localhost:8000/storys/${storyId}/lines/`,
        this.state.lines, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        }) 
      this.props.history.push(`/storys/${res.data.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  canEdit = () => {
    const checkLines = this.state.story.lines
    try {
      return Auth.getPayLoad().sub !== checkLines[checkLines.length-1].owner.id
    } catch(err) {
      return true
    }

  }

  
  isOwner = () => {
    return Auth.getPayLoad().sub === this.state.story.owner.id
  }

  render() {
    const { story } = this.state
    if (!story) return null
    return (
      
      <section className="section" >
        <div className="container">
          <div className="colums">
            <div className="displayNice">
              <div className="column is-half is-offset-one-quarter">
                <figure className="image">
                  <img src={story.image} alt={story.title} />
                </figure>
              </div>
              <div className="column is-half is-offset-one-quarter">
                <h2 className="title">{story.title}</h2>
                <h4 className="title-is-4">Writer</h4>
                {story.owner.username}
                <br />
                <h4 className="title-is-4">Age-rating</h4>
                <p>{story.age_rating}</p>
                <br />
                <h4 className="title-is-4">Genre</h4>
                {story.genre}
                <br />
                <h4 className="title-is-4">First Line</h4>
                <p>{story.lineStart}{story.lines.map(line => line.line)}</p>
                <div className="field">
                {this.canEdit() && 
                <>
                  <form onSubmit={this.handleSubmit}>
                <label className="label">Line</label>
                <div className="control">
                  <input 
                    className="input"
                    name="line"
                    required
                    placeholder="Line"
                    onChange={this.handleChange}
                    value={story.line}
                  />
                </div>
                <button type='submit' className="button is-danger">Add a line</button>
                </form>
                
                </>
                }
                {!this.canEdit() && 
                <>
                <h1>Good job {this.state.story.owner.username}!, wait for the other user to add a line!</h1>
                </>
                }
                <br />
                </div>
                {this.isOwner() && 
                <>
                  <Link to={`/storys/${story.id}/edit`} className="button is-warning">Edit Story</Link>
                  <hr />
                  <button onClick={this.handleDelete} className="button is-danger">Delete Story</button>
                </>
                }
    
              </div>
            </div>
          <div/>
        </div>
      </div>
    </section>
    )
  }
}

export default StoryShow