import React from 'react';
import AppDescription from './description/appDescription.jsx';
import AppSize from './size/appSize.jsx';
import AppMaterials from './materials/appMaterials.jsx';
import AppReview from './reviews/appReview.jsx';
import css from './reviewStyle.css';

function App() {
  return (
    <div>
      <AppDescription />
      <AppSize />
      <AppMaterials />
      <AppReview />
    </div>
  );
}

export default App;
