class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: []
    }
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
        <div>Full Review Listings Go Here</div>

      </div>
    )
  }
}

module.exports = App;