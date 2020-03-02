import React from 'react'
import { Link } from 'react-router-dom'



const StoryCard = ({ title, age_rating, image, lineStart, id }) => (

  <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/storys/${id}`}>
      <div className="card">
        <div className="card-content">
          <h4 className="card-header-title title is-5">{title}</h4>
          <div className="card-image">
            <figure className="image"><img
              src={image} alt={title}/></figure>
          </div>
          <div className="indexHide">
            <hr />
            <h5 className="title is-6">Age-Rating: {age_rating}</h5>
            <h5 className="title is-6">First Line: {lineStart}</h5>
            <h5 className="title is-6">Click on me if you want to add a line!</h5>  
          </div>
        </div>
      </div>
    </Link>
  </div>



)

export default StoryCard