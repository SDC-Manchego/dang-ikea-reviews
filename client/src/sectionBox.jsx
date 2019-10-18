import styled, { keyframes } from 'styled-components';

const rotateLeft = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-45deg);
  }
`;
const rotateRight = keyframes`
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const rotateNot = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(0deg);
  }
`;


const Rotate = styled.div`
  display: inline-block;
  animation: ${props => props.isStarted ? (props.isOpen ? rotateRight : rotateLeft) : rotateNot } 1s;
  font-size: 1.2rem;
  animation-fill-mode: forwards;
  animation-direction: alternate;
`;

export default Rotate