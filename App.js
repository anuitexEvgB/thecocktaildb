import React from 'react';
import {CocktailState} from './src/context/cocktailState';
import {MainLayout} from './src/MainLayout';

const App: () => props = () => {
  return (
    <CocktailState>
      <MainLayout />
    </CocktailState>
  );
};

export default App;
