import React from 'react'
import styled from 'styled-components'


class Averages extends React.PureComponent {
  constructor(props) {
    super(props);

  }


  AverageNode() {
    this._scores = [];
    this.avg = function() {
      if (this._scores.length === 0) {
        return 0;
      }
      return (this._scores.reduce((x,y) => y += x))/this._scores.length;
    };
  }

  getAverages(reviews) {
    var result ={};
    var attributes = ['overall_rating', 'value_rating', 'quality_rating', 'appearance_rating', 'ease_of_assembly_rating', 'works_as_expected_rating' ]
    for (var i = 0; i < attributes.length; i++) {
      result[attributes[i]] = new this.AverageNode();
    }
    for (var i = 0; i < reviews.length; i++) {
      for (var j = 0; j < attributes.length; j++) {
        if (reviews[i][attributes[j]]) {
          result[attributes[j]]._scores.push(reviews[i][attributes[j]]);
        }
      }
    }
    return result;
  }

  render (
  )
  { var Averages = this.getAverages(this.props.reviews);
    const AverageTD = styled.td`
      height: 4px;
      width: 29;
      border-collapse:
      collapse;
      border: 0.5px solid rgb(175, 175, 175);
      opacity:0;
    `
    const AverageTable = styled.table.attrs(props => ({
      bgcolor: "linear-gradient(90deg, #fc0 " + Averages.value_rating.avg()*20 + "%, white" + 100 - Averages.overall_rating.avg()*20 + "%)"
      }))`
        margin-top: 2px;
        margin-bottom: 2px;
        height: 4px;
        width: 145px;
        border-collapse:
        collapse;
        border: 0.5px solid rgb(175, 175, 175)
        background-image: linear-gradient(90deg, #fc0 33%, white 33%);
    `
    return (
      <div key={this.props.reviews}>
        <AverageTable><tbody><tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr></tbody></AverageTable>
        <p>Average Customer Ratings</p>
        <div className="reviewAverageOverall">
          <span>Overall</span><span> -= {Averages.overall_rating.avg().toFixed(1)} =- </span><span> {Averages.overall_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageValue">
          <span>Value for money</span><span> -= {Averages.value_rating.avg().toFixed(1)} =- </span><span> {Averages.value_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageQuality">
          <span>Product quality </span><span> -= {Averages.quality_rating.avg().toFixed(1)} =- </span><span> {Averages.quality_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageAppearance">
          <span>Appearance </span><span> -= {Averages.appearance_rating.avg().toFixed(1)} =- </span><span> {Averages.appearance_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageWorks"><
          span>Works as expected</span><span> -= {Averages.works_as_expected_rating.avg().toFixed(1)} =- </span><span> {Averages.works_as_expected_rating.avg().toFixed(1)} </span></div>

      </div>
    )
  }

}

export default Averages