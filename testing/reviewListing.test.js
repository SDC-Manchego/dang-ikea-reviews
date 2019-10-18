import React from 'react';
import SingleReview from '../client/src/singleReview.jsx';
import Averages from '../client/src/average.jsx';

describe('Testing reviewListing renders expected data', () => {
    test('showDate function returns expected values', ()=> {
      let testDate = new Date(2019,1,1);
      expect(SingleReview.prototype.showDate(testDate.toString())).toBe('9 months ago')
      expect(SingleReview.prototype.showDate(new Date().toString())).toBe('today')
    })

    test('showRecommendation handles all inputs appropriately', ()=> {
      expect(SingleReview.prototype.showRecommendation(1)).toBe('Yes, I recommend this product')
      expect(SingleReview.prototype.showRecommendation(0)).toBe('No, I do not recommend this product')
      expect(SingleReview.prototype.showRecommendation(null)).toBe('')
    })

    test('showStars handles all inputs appropriately', () => {
      expect(SingleReview.prototype.showStars(1)).toBe('&#9733&#9734&#9734&#9734&#9734')
      expect(SingleReview.prototype.showStars(3)).toBe('&#9733&#9733&#9733&#9734&#9734')
      expect(SingleReview.prototype.showStars(5)).toBe('&#9733&#9733&#9733&#9733&#9733')
    })
  })

  describe('Testing average.jsx renders expected data', () => {
    let reviews = [
      {
        overall_rating: '5',
        value_rating: '4',
         quality_rating: '3',
         appearance_rating: '2',
         ease_of_assembly_rating: '5',
         works_as_expected_rating: '1'
      },
      {
        overall_rating: '4',
        value_rating: '2',
         quality_rating: '5',
         appearance_rating: '4',
         ease_of_assembly_rating: '2',
         works_as_expected_rating: '3'
      }
    ]
    test('getAverages returns correct averages', () => {
      expect(Averages.prototype.getAverages.overall_rating.avg()).toBe(4.5)
      });
  })

  // describe('Testing snapShot.jsx renders expected data', () => {
  //   test('starCount returns correct counts', function(done) {

  //     }

  //   );
  //   test('starPercent returns correct percentages', function(done) {

  //   }

  // );
  // })