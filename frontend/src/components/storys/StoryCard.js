import React from 'react'
import { Link } from 'react-router-dom'



const StoryCard = ({ title, age_rating, image, lineStart, id }) => (

  <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/storys/${id}`}>
      <div className="card" id="storyCard">
        <div className="card-content">
          <div className="card-header-title" id="titleFont">{title}</div>
          <div className="card-image">
            <figure className="image is-5by4" id="storycardImage"><img
              src={image} alt={title}/></figure>
          </div>
          <div>&nbsp;</div> 
            <h5 className="title is-6" className="inspirationFont">For ages <strong>{age_rating} and above</strong></h5>
            <div className="indexHide">
            <h5 className="title is-6">First Line: <strong>{lineStart}</strong></h5> 
          </div>
        </div>
      </div>
    </Link>
  </div>



)

export default StoryCard