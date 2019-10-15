class SingleReview extends React.Component {
  constructor(props) {
    super(props);

  }

  showDate(unixTime) {
    var days = (new Date(unixTime)) / 8640000000;
    if (days < 2) {
      return 'today';
    } else if (days < 14 ) {
      return Math.floor(days).toString() + ' days ago';
    } else if (days <= 60) {
      return Math.floor(days/7).toString() + ' weeks ago';
    } else if (days < 365) {
      return Math.floor(days/30).toString() + ' months ago';
    } else if (days < 730) {
      return 'one year ago';
    } else {
      return Math.ceil(days / 365).toString() + ' years ago';
    }
  }

  showRecommendation(recommend) {
    if (recommend === 1) {
      return 'Yes, I recommend this product';
    } else if (recommend === 0) {
      return 'No, I do not recommend this product';
    } else {
      return '';
    }
  }

  showStars(count) {
    var result = '';
    for (var i = 1; i <=5; i++) {
      if (i <= count) {
        result += '&#9733';
      } else {
        result += '&#9734';
      }
    }
    return result;
  }

  render(
  ) {
    return(
      <div>
        <table>
          <tbody>
            <tr>
             <td>
              <div>
                <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.overall_rating)}}/>
                <span> {this.props.review.author} </span>
                <span>{this.showDate(this.props.review.date)}</span>
              </div>
              <div>{this.props.review.title}</div>
              <p>{this.props.review.text}</p>
              <div>{this.showRecommendation(this.props.review.recommended)}</div>
              </td>
              <td>
                <div>
                  <div>Value for money</div>
                  <span className="reviewStars" dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.value_rating)}}/>
                  <div>Product quality</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.quality_rating)}}/>
                  <div>Appearance</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.appearance_rating)}}/>
                  <div>Ease of assembly</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.ease_of_assembly_rating)}}/>
                  <div>Works as expected</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.works_as_expected_rating)}}/>
                </div>
              </td>
            </tr>
          </tbody>
      </table>
      </div>
    )
  }

}

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

  }

  render(
    reviewList = this.props.reviews.map(
      review => <div key={review.id}><SingleReview review={review}/></div>
    )
  ) {
    return(
      <div>
      {reviewList}
      </div>
    )
  }
}

export default ReviewList