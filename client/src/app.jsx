import ReviewList from './reviewList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: []
    }

  }

  urlProductId() {
    var questMarkLocation = (window.location.href).indexOf('?');
    return (window.location.href).slice(questMarkLocation + 1)
  }

  getReviewsByProductId(id) {
    console.log(id);
    $.get('/api-reviews', { product_id: id }, (data) =>
      {
      this.setState({
        reviewsArray: data
      }, () => {console.log(this.state.reviewsArray)})}, 'json'
    )
  }

  componentDidMount() {
    this.getReviewsByProductId(this.urlProductId())
  }

  render() {
    return(
      <div>
        Reviews
        <div className="reviewSnapShot">
          Review Snapshot Goes Here
        </div>
        <div className="reviewAverage">
          Review Average Ratings Go Here
        </div>
        <div className="reviewList">
          <ReviewList reviews={this.state.reviewsArray}/></div>

      </div>
    )
  }
}

export default App