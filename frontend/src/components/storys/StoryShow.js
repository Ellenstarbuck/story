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
      const res = await axios.get(`/api/storys/${storyId}`)
      this.setState({ story: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const lines = { ...this.state.lines, [name]: value }
    this.setState({ lines })
  }

  handleDelete = async() => {
    const storyId = this.props.match.params.id 
    try {
      await axios.delete(`/api/storys/${storyId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/storys')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleSubmit = async e => {
    // e.preventDefault()
    const storyId = this.props.match.params.id 
    try {
      console.log()
      const res = await axios.post(`/api/storys/${storyId}/lines/`,
        this.state.lines, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        }) 
      this.props.history.push(`/storys/${res.data.id}`)
    } catch (err) {
      this.props.history.push('/notfound')
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
    console.log(this.state.story.owner.id)
    console.log(Auth.getPayLoad().sub )
    return Auth.getPayLoad().sub === this.state.story.owner.id
  }

  render() {
    const { story } = this.state
    if (!story) return null
    return (
      
        
          <section className="hero is-primary"> 
          <section className="section" id="paddingStoryShow" >
          <div className="cardTitle">
          <h2 className="title">{story.title}</h2>
          </div> 
          </section>
         
          <div className="storyShow">
            <br />
            
            <div className="colums">
            <div className="displayNice">
            
            <div className="column is-one-third">
                <figure className="image is-5by4" id="imageShow">
                  <img src={story.image} alt={story.title} />
                </figure>
                <div className='box'>
                <h4 className="title-is-4"><strong>Writer: </strong> {story.owner.username}</h4>
                <h4 className="title-is-4"><strong>Age-rating: </strong>{story.age_rating}</h4>
                <h4 className="title-is-4"><strong>Type of story:</strong> {story.genre}</h4>
                </div>
                </div>
                <div className="column is-one-third">
                <h4 className="title-is-4"><strong>The Story Begins...</strong></h4>
                <br />
                <p><strong>{story.lineStart}
                {story.lines.map(line => {
                  return <>&nbsp;{line.line}</> 
                })}</strong></p>
                 <br />
                <div className="field">
                {this.canEdit() && !this.isOwner() &&
                <>
                  <form onSubmit={this.handleSubmit}>
                <div className="control">
                  <input 
                    className="input"
                    name="line"
                    required
                    placeholder="What happens next?"
                    onChange={this.handleChange}
                    value={story.line}
                  />
                </div>
                <br />
                <button type='submit' className="button is-danger">Add a line</button>
                </form>
                </>
                }
                {!this.canEdit() && 
                <>
                 <br />
                 <article className="message is-danger">
                <div className="message-header">
                  <p>Good job {this.state.story.lines[0].owner.username}!</p>
                  <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                  <strong>Let's wait for the other user to add a line! Why don't you check out some <a href="/api/storys">more stories</a></strong> 
                </div>
                </article>
                </>
                }
                </div>
                {this.canEdit() && this.isOwner() &&
                <>
                 <br />
                 <article className="message is-danger">
                <div className="message-header">
                  <p>Good job {this.state.story.owner.username}!</p>
                  <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                  <strong>Let's wait for the other user to add a line! Why don't you check out some <a href="/api/storys">more stories</a></strong> 
                </div>
                </article>
                </>
                }
                
                {this.isOwner() && 
                <>
                  <Link to={`/storys/${story.id}/edit`} className="button is-warning">Edit Story</Link>
                  <button onClick={this.handleDelete} className="button is-danger">Delete Story</button>
                </>
                }
    
              </div>
            
          <div/>
        </div>
      </div>
      </div>
      </section>
    
    )
  }
}

export default StoryShow