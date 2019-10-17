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
    for (var i = 0; i < count; i++) {
        result += '&#9733';
    }
    return result;
  }
  showNoStars(count) {
    var result = '';
    for (var i = 0; i < 5 - count; i++) {
        result += '&#9733';
    }
    return result;
  }

  isGoldBar(number, rating) {
    if (number <= Number(rating)) {
      return "reviewBarGold";
    }
    return "reviewNoGold"
  }

  render(
  ) {
    const review = this.props.review;
    return(
      <div>
        <table>
          <tbody>
            <tr>
             <td className="reviewSingleMain">
              <div>
                <span className="reviewGoldStars" dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.overall_rating)}}/><span className="reviewGreyStars" dangerouslySetInnerHTML={{__html: this.showNoStars(this.props.review.overall_rating)}}/>
                <span> {this.props.review.author} </span><span> · </span>
                <span className="reviewDate">{this.showDate(this.props.review.date)}</span>
              </div>
              <div className="reviewTitle">{this.props.review.title}</div>
              <p>{this.props.review.text}</p>
              <p>{this.showRecommendation(this.props.review.recommended)}</p>
              <div>Helpful?
                <button key={this.props.review.id + "y"} className={"reviewHelpfulYes" + this.props.review.id} onClick={this.clickHandler}>Yes - {this.props.review.helpful_count}</button>
                <button key={this.props.review.id + "n"} className={"reviewHelpfulNo" + this.props.review.id} onClick={this.clickHandler}>No - {this.props.review.not_helpful_count}</button>
                <button key={this.props.review.id + "r"} className={"reviewReport" + this.props.review.id} onClick={this.clickHandler}>{this.state.reported}</button></div>
              </td>
              <td className="reviewSingleRatings">
                <div>
                  <div>Value for money</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.value_rating)}></td>
                    <td className={this.isGoldBar(2, review.value_rating)}></td>
                    <td className={this.isGoldBar(3, review.value_rating)}></td>
                    <td className={this.isGoldBar(4, review.value_rating)}></td>
                    <td className={this.isGoldBar(5, review.value_rating)}></td></tr></tbody></table>
                  <div>Product quality</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.quality_rating)}></td>
                    <td className={this.isGoldBar(2, review.quality_rating)}></td>
                    <td className={this.isGoldBar(3, review.quality_rating)}></td>
                    <td className={this.isGoldBar(4, review.quality_rating)}></td>
                    <td className={this.isGoldBar(5, review.quality_rating)}></td></tr></tbody></table>
                  <div>Appearance</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(2, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(3, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(4, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(5, review.appearance_rating)}></td></tr></tbody></table>
                  <div>Works as expected</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(2, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(3, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(4, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(5, review.works_as_expected_rating)}></td></tr></tbody></table>
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