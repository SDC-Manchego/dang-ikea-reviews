import Rotate from './sectionBox.jsx'
import styled, {keyframes} from 'styled-components'
import ReviewParent from './reviewParent.jsx'

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isStarted: false
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({
      isStarted: true,
      isOpen: !this.state.isOpen
    })
    console.log(this.state.Open)
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
      animation: ${props => this.state.isStarted ? (this.state.isOpen ? fadeIn : "") : "" } .75s;
      width: 90%
      animation-fill-mode: forwards;
      animation-direction: alternate;
    `;


    return(
      <div>
        <ReviewParentDiv>
        <h5><Rotate isOpen={this.state.isOpen} isStarted={this.state.isStarted} onClick={this.toggleOpen}>+</Rotate> Reviews</h5>
        <FadeInDiv>
        {this.state.isStarted ? (this.state.isOpen ? <ReviewParent /> : "") : "" }
    </FadeInDiv></ReviewParentDiv>
      </div>
    )
  }
}

export default App