import React from 'react'
import axios from 'axios'
import StoryCard from '../storys/StoryCard'


class Spooky extends React.Component {

  state = { 
    storys: []
  }

//filtering the storys via their genre field, and only returning the users specific genre request
  async componentDidMount() {
    try {
      const res = await axios.get('/api/storys') 
      console.log(res.data)
      const filteredRes = res.data.filter(story => {
        if (story.genre === 'Spooky') {
          return story
        }
      })
      this.setState({ storys: filteredRes }) 
    } catch (err) {
      console.log(err)
    } 
  }
  

  render() {
    return (
      <>
      <div className="box" id="storyShowBox">
       

      </div>
      <div className="storyIndex">
      <div className="genrebackground">
      <section className="section">
        <div className="container is-primary">
          <div className="columns is-mobile is-multiline">
            {this.state.storys.map(story => <StoryCard key={story.id} {...story}/>)}
          </div>
        </div>
      </section>
      </div>
      </div>
      </>
    )
    
  }


}

export default Spooky