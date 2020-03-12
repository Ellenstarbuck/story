import React from 'react'
import Popup from 'reactjs-popup'

//About us component

class About extends React.Component {


  state = {
    data: {
      beginning: '',
      subject: '',
      middle: '',
      end: '',
    } 
  }

//When the user presses click each function will generate a random part of the sentence for the 'story generator'
  handleClick = (e) => {
    e.preventDefault()
    this.beginningFunction()
    this.subjectFunction()
    this.middleFunction()
    this.endFunction()
  }

  


//beginning of sentence
  beginningArray = [ 'A Busy', 'A Lazy', 'A Careless', 'A Clumsy', 'A Nimble', 'A Brave', 'A Mighty', 'A Meek', 'A Clever', 'A Dull','A Afraid', 'A Scared', 'A Cowardly', 'A Bashful', 'A Proud', 'A Fair', 'A Greedy', 'A Wise','A Foolish','A Tricky','A Truthful','A Loyal', 'A Happy', 'A Cheerful', 'A Joyful', 'A Carefree','A Friendly','A Moody', 'A Crabby', 'A Cranky','A Awful', 'A Gloomy', 'A Angry', 'A Worried','A Excited', 'A Bored','A Silly', 'A Sleepy',]


  beginningFunction() {
    const beginning = this.beginningArray[Math.floor(Math.random() * this.beginningArray.length)]
    return this.setState({ beginning }) 
  }

  //subject of story
  subjectArray = ['cat','dog', 'dragon', 'minion', 'apple', 'car', 'kitten', 'spider', 'pig', 'horse', 'mouse', 'pizza','monster', 'mum', 'dad', 'grandad', 'grandma', 'teacher', 'lady', 'man', 'boy', 'girl', 'dancer', 'doctor', 'scientist', 'king', 'queen', 'Godzilla', 'ostrich', 'bear', 'puppy', 'prime-minister', 'pizza']
  
  subjectFunction() {
    const subject = this.subjectArray[Math.floor(Math.random() * this.subjectArray.length)]
    return this.setState({ subject }) 
    
  }

//what the subject will do
  middleArray = ['went to the zoo', 'went to the cinema', 'ate lots of cakes', 'danced in the rain', 'found a secret door', 'went to America', 'had a big pie', 'had a bath in jelly', 'had a bath in beans', 'went to Disney land', 'fell asleep', 'did a little fart', 'did a big fart', 'read a great book', 'told a funny joke']

 middleFunction() {
    const middle = this.middleArray[Math.floor(Math.random() * this.middleArray.length)]
    return this.setState({ middle }) 
    
  }

  //conclusion of story
  endArray = ['and was arrested.', 'and threw up.', 'and everyone laughed.', 'and took over the world.', 'and lived happily ever after.', 'and went home and had a nap.', 'and wrote a book about it.', 'and sang a song about it.', 'and won an award.', 'and felt hungry.', 'and threw a party.', 'and didn\'t tell anyone.', 'and told everyone.']

  endFunction() {
    const end = this.endArray[Math.floor(Math.random() * this.endArray.length)]
    return this.setState({ end }) 
    
  }


  render() {
    return(
      <div className="hero is-fullheight-with-navbar is-primary">
        <div className="aboutus">
      <section className="AboutPage">
        <div className="columns">
        <div className="column is-half is-offset-one-third">
        <br />
          <div className='card' id="aboutBox">
            <br />
              <h1><strong>Story telling is fun!</strong></h1>
              <br />
              <h2>We like making up stories. And this site is really easy to use.
                <ul>
                <li>1. Register and pick an awesome username</li>
                <li>2. Login to use the site.</li>
                <li>3. Have a snack</li>
                <li>4. Look at a story someone else has made, and add a line. Or make up your own story! </li>
                </ul> </h2> 
                <br />
                <h1>Need some inspiration? Why not try out our random story generator. Click the button below and a story will appear.</h1>
              <br />
            <button onClick={this.handleClick} id="storybox" className="button is-warning">Story Button</button>
            <br />
          </div>
          <div className="card" id="generatorBox"><h4><strong>{this.state.beginning} {this.state.subject} {this.state.middle} {this.state.end}</strong></h4></div>
        </div>
        </div>
      </section>
      </div> 
      </div>
    )
  }
}

export default About
