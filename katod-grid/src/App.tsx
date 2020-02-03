import React from 'react';
import './App.css';
import {CatodGrid} from "./Grid/Grid.Component"
import CarList from "./example/CarList"


const App: React.FC = () => {
  return (     
    <div className="app">
<CarList/>
    </div>
     
  );
}

export default App;
