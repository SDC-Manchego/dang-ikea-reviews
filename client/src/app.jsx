import ReviewList from './reviewList.jsx'
import SnapShot from './snapShot.jsx'
import Averages from './average.jsx'
import Rotate from './sectionBox.jsx'
import styled, {keyframes} from 'styled-components'

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: [],
      helpfulClicks:[],
      currentPage: 1,
      selectedStars: [],
      isOpen: true,
      isStarted: false
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.reviewAction = this.reviewAction.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({
      isStarted: true,
      isOpen: !this.state.isOpen
    })
  }
  //change filtering of review list based on selected star overall rating in review Summary
  changeFilter(classname) {
    var value = classname.slice(0,1);
    var change = classname.slice(1);
    if (change === 'reviewAddFilter') {
      this.setState({
        selectedStars: [value],
        reviewsArray: []
      },function() { this.getReviewsByProductId(this.urlProductId());
      console.log(this.state.selectedStars);})
    }
    if (change === 'reviewClearFilter') {
      this.setState({
        selectedStars: [],
        reviewsArray: []
      },function() { this.getReviewsByProductId(this.urlProductId());
      console.log(this.state.selectedStars);})
    }
  }

  reviewAction(id, action){
    if (action !== "reported_count") {
      var list = this.state.helpfulClicks;
      list.push(id);
    } else {
      var list = this.state.helpfulClicks;
    }
    $.ajax({
      type: "POST",
      datatype: 'json',
      contentType: 'application/json',
      url: `/api-increment`,
      data: JSON.stringify({ column: action, id: id }),
      success: this.setState({
        helpfulClicks: list
      },
      this.getReviewsByProductId(this.urlProductId()))
    })
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
    const ReviewParentDiv = styled.div`
      display: block;
      width: 100%;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      :hover {
        background-color: ${props => this.state.isOpen ? "white" : "rgb(230, 240, 255)"};
      }`;
      const fadeIn = keyframes`
      from {
        transform: translate(0px,-50px);
        opacity: 0;
      }

      to {
        transform: translate(0px, 0px);
        opacity: 1;
      }
    `;

      const FadeInDiv = styled.div`
      animation: ${props => this.state.isStarted ? (this.state.isOpen ? "" : fadeIn) : "" } 1s;
      width: 90%
      animation-fill-mode: forwards;
      animation-direction: alternate;
    `;


    return(
      <div>
        <ReviewParentDiv>
        <h5><Rotate isOpen={this.state.isOpen} isStarted={this.state.isStarted} onClick={this.toggleOpen}>+</Rotate> Reviews</h5>
        <FadeInDiv>
        <table width="100%">
          <thead ><tr><td>Reviews</td></tr></thead>
          <tbody>
            <tr>
              <td className="reviewSnapShot" width="50%">
                <SnapShot reviews={this.state.reviewsArray} filter={this.state.selectedStars} changeFilter={this.changeFilter} />
              </td>
              <td className="reviewAverageSummary" width="50%">
              <Averages reviews={this.state.reviewsArray} />
              </td>
            </tr>
          </tbody>
        </table>
        <table width="100%">
          <tbody>
            <tr>
              <td className="reviewList" width="100%">
                <ReviewList reviews={this.state.reviewsArray} page={this.state.currentPage} helpfulClicks={this.state.helpfulClicks} filter={this.state.selectedStars} reviewAction={this.reviewAction}/>
              </td>
            </tr>
          </tbody>
        </table>
        </FadeInDiv></ReviewParentDiv>
      </div>
    )
  }
}

export default App