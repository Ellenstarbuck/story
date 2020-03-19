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
    console.log(storyId)
    try {
      console.log('hi I am here')
      const res = await axios.get(`/api/storys/${storyId}/`)
      console.log(this.setState({story: res.data}))
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
      await axios.delete(`/api/storys/${storyId}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/storys')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

//handler to submit a new line to the story
  handleSubmit = async e => {
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

  //Function to see if the person is allowed to add a line to the story or not
  //check if the person who wrote the story is different to the person who is logged in
  canEdit = () => {
    const checkLines = this.state.story.lines
    try {
      //check the auth token, if it's not the same as the owner of the last line then they are allowed to edit
      return Auth.getPayLoad().sub !== checkLines[checkLines.length-1].owner.id
    } catch(err) {
      return true
    }

  }

  //checks if the person who wrote the story is the same as the person who is logged in
  isOwner = () => {
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
                  {/* The box which lets them add a line will ONLY appear if they are not the owner of the story and are logged in */}
                {this.canEdit() && !this.isOwner() && Auth.isAuthenticated() &&
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
                {/* stopping the user adding a line if they have just added one */}
                {!this.canEdit() && 
                <>
                 <br />
                 <article className="message is-danger">
                <div className="message-header">
                  <p>Good job!</p>
                  <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                  <strong>Let's wait for the other user to add a line! Why don't you check out some <a href="/storys">more stories</a></strong> 
                </div>
                </article>
                </>
                }
                </div>
                {/* stopping the user adding a line if they have just added one or wrote the story */}
                {this.canEdit() && this.isOwner() &&
                <>
                 <br />
                 <article className="message is-danger">
                <div className="message-header">
                  <p>Good job {this.state.story.owner.username}!</p>
                  <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                  <strong>Let's wait for the other user to add a line! Why don't you check out some <a href="/storys">more stories</a></strong> 
                </div>
                </article>
                </>
                }
                {/* this prompt will appear if they are not logged in */}
                {!Auth.isAuthenticated() && 
                  <div className="message-header">
                  <p>Please log in to add a line to the story</p>
                </div>}
                
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