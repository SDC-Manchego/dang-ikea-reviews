import React from 'react';
jest.unmock('../client/src/reviewList.jsx')
import * as SingleReview from '../client/src/reviewList.jsx';
import * as Averages from '../client/src/average.jsx';


describe('Testing reviewListing renders expected data', () => {
    test('showDate function returns expected values', ()=> {
      let testDate = new Date(2019,1,1);
      expect(SingleReview.showDate(testDate)).toBe('9 months ago')
      expect(SingleReview.showDate(new Date())).toBe('today')
    })

    test('showRecommendation handles all inputs appropriately', ()=> {
      expect(showRecommendation(1)).toBe('Yes, I recommend this product')
      expect(showRecommendation(0)).toBe('No, I do not recomment this product')
      expect(showRecommendation(null)).toBe('')
    })

    // test('showStars handles all inputs appropriately', () => {
    //   expect(showStars(1)).toBe('&#9733&#9734&#9734&#9734&#9734')
    //   expect(showStars(3)).toBe('&#9733&#9733&#9733&#9734&#9734')
    //   expect(showStars(5)).toBe('&#9733&#9733&#9733&#9733&#9733')
    // })
  })

  // describe('Testing average.jsx renders expected data', () => {
  //   let reviews = [
  //     {
  //       overall_rating: '5',
  //       value_rating: '4',
  //        quality_rating: '3',
  //        appearance_rating: '2',
  //        ease_of_assembly_rating: '5',
  //        works_as_expected_rating: '1'
  //     },
  //     {
  //       overall_rating: '4',
  //       value_rating: '2',
  //        quality_rating: '5',
  //        appearance_rating: '4',
  //        ease_of_assembly_rating: '2',
  //        works_as_expected_rating: '3'
  //     }
  //   ]
  //   test('getAverages returns correct averages', () => {
  //     expect(getAverages.overall_rating.avg()).toBe(4.5)
  //     });
  // })

  // describe('Testing snapShot.jsx renders expected data', () => {
  //   test('starCount returns correct counts', function(done) {

  //     }

  //   );
  //   test('starPercent returns correct percentages', function(done) {

  //   }

  // );
  // })