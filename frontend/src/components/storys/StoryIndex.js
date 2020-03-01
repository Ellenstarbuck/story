import React from 'react'
import axios from 'axios'
import StoryCard from './StoryCard'

class StoryIndex extends React.Component {
  state = {
    storys: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:8000/storys')
      this.setState({ storys: res.data }) 
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.storys.map(story => <StoryCard key={story.id} {...story}/>)}
          </div>
        </div>
      </section>
    )

    
  }
}



export default StoryIndex
