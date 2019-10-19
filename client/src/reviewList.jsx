
import React from 'react'
import SingleReview from './singleReview.jsx'

class ReviewList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

recordSelection() {
  if (this.props.page === 1) {
    return [0,7];
  } else {
    var start = (this.props.page - 2) * 30 + 8;
    var end = (this.props.page - 1) * 30 + 7
    return [start, end];
  }
}

  render(
    reviewList = this.props.reviews
      .slice(...this.recordSelection())
      .filter(review => this.props.filter.length > 0 ? this.props.filter[0] == review.overall_rating : -1 )

      .map(review => <div key={review.id}><SingleReview review={review} helpfulClicks={this.props.helpfulClicks} reviewAction={this.props.reviewAction}/>

      </div>
    )
  ) {
    return(
      <div>
      {reviewList}
      <div style={{align: "right"}}><button className="reviewsLastPage">&#9664;</button><button className="reviewsNextPage">&#9658;</button></div>
      </div>
    )
  }
}

export default ReviewList