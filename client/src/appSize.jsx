import Rotate from './sectionBox.jsx'
import styled, {keyframes} from 'styled-components'
import Size from './size.jsx'

class AppSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenS: false,
      isStartedS: false
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({
      isStartedS: true,
      isOpenS: !this.state.isOpenS
    })
  }

  render() {
    const SizeParentDiv = styled.div`
      display: block;
      width: 100%;
      border-top: 1px solid grey;

      :hover {
        background-color: ${props => this.state.isOpen ? "white" : "rgb(230, 240, 255)"};
      }`;
      const fadeIn = keyframes`
      from {
        transform: translate(0px,-20px);
        opacity: 0;
      }

      to {
        transform: translate(0px, 0px);
        opacity: 1;
      }
    `;

      const FadeInDiv = styled.div`
      animation: ${props => this.state.isStartedS ? (this.state.isOpenS ? fadeIn : "") : "" } .75s;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    `;


    return(
      <div>
        <SizeParentDiv>
        <h5><Rotate isOpen={this.state.isOpenS} isStarted={this.state.isStartedS} onClick={this.toggleOpen}>+</Rotate> Size</h5>
        <FadeInDiv>
        {this.state.isStartedS ? (this.state.isOpenS ? <Size /> : "") : "" }
    </FadeInDiv></SizeParentDiv>
      </div>
    )
  }
}

export default AppSize