import React from 'react'

class SingleReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      reported: "Report"
    }
  }

  clickHandler(e) {
    console.log(e.target.className);
    if (e.target.className.indexOf('reviewHelpfulYes') > -1) {
      var reviewId = e.target.className.slice(16);
      var action = 'helpful_count';
      if (this.props.helpfulClicks.indexOf(reviewId) == -1) {
        this.props.reviewAction(reviewId, action)
      }
    } else if (e.target.className.indexOf('reviewHelpfulNo') > -1) {
      var reviewId = e.target.className.slice(15);
      var action = 'not_helpful_count';
      if (this.props.helpfulClicks.indexOf(reviewId) == -1) {
        this.props.reviewAction(reviewId, action)
      }
    } else if (e.target.className.indexOf('reviewReport') > -1) {
      var reviewId = e.target.className.slice(12);
      var action = 'reported_count';
      if (this.state.reported == "Report") {
        this.props.reviewAction(reviewId, action);
        this.setState({
          reported: "Reported"
        })

      }
    }
  }

  showDate(mysqlTime) {
    var year = Number(mysqlTime.substring(0,4));
    var month = Number(mysqlTime.substring(5,7)) - 1;
    var day = Number(mysqlTime.substring(8,10));
    var days = (new Date() - new Date(year, month, day)) / 86400000;
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
      return Math.floor(days / 365).toString() + ' years ago';
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
              <p>{this.showRecommendation(this.props.review.recommended)}</p>
              <div>Helpful?
                <button key={this.props.review.id + "y"} className={"reviewHelpfulYes" + this.props.review.id} onClick={this.clickHandler}>Yes - {this.props.review.helpful_count}</button>
                <button key={this.props.review.id + "n"} className={"reviewHelpfulNo" + this.props.review.id} onClick={this.clickHandler}>No - {this.props.review.not_helpful_count}</button>
                <button key={this.props.review.id + "r"} className={"reviewReport" + this.props.review.id} onClick={this.clickHandler}>{this.state.reported}</button></div>
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
export default SingleReview