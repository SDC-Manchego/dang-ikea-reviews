import React from 'react';
import $ from 'jquery';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionData: {},
    };
  }

  componentDidMount() {
    this.getDescriptionByProductId(this.urlProductId());
  }

  getDescriptionByProductId(id) {
    // console.log(id);
    $.get('/api-product-data', { id }, (data) => {
      this.setState({
        descriptionData: data[0],
      });
    }, 'json');
  }

  descriptionStructure() {
    const { descriptionData } = this.state;

    return (
      <table>
        <tbody>
          <tr>
            <td style={{ width: '12px' }} />
            <td>
              <span
                className="descriptionHeading"
                style={{
                  background: 'black', color: 'white', fontSize: '16px', fontWeight: '700', padding: '2px',
                }}
              >
                {' '}
                924.342.
                {(descriptionData.id < 10) ? (`0${descriptionData.id}`) : descriptionData.id}
              </span>
              <p style={{ fontSize: '14px' }}>{descriptionData.description}</p>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>Designer</div>
              <div style={{ fontSize: '14px' }}>{descriptionData.designer}</div>
              <p />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  urlProductId() {
    const questMarkLocation = (window.location.href).indexOf('?');
    if (questMarkLocation === -1) {
      return '0';
    }
    return (window.location.href).slice(questMarkLocation + 1);
  }

  render() {
    const { descriptionData } = this.state;
    return (
      <div>
        {!descriptionData ? (
          <p>
            Sorry, we don&apos;t have any product information for this product.
          </p>
        ) : this.descriptionStructure()}
      </div>
    );
  }
}


export default Description;
