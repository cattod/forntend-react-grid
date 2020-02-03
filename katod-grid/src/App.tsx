import React from 'react';
import './App.css';
import { CatodGrid } from "./Grid/Grid.Component"
import CarList from "./example/CarExample/CarList"
import CarListP from "./example/PersianExample/CarListP"


const App: React.FC = () => {
  return (
    <div className="app">
      <div style={{ margin: "10px" }}>
        <CarList />
      </div>
    </div>
  );
}

export default App;
