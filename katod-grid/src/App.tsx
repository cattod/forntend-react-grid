import React from 'react';
import './App.css';
import {CatodGrid} from "./Grid/Grid.Component"
import {columnDefs} from "./Grid/model"
import {Example} from "./TestShowComponent"

interface IRowData{
make ?:string,
model ?: string,
price ?: number
}

const App: React.FC = () => {
let  columnDefs:Array<columnDefs>=[
    { headerName: "Make", field: "make"//,  width: 180
   },
    { headerName: "Model", field: "model" //,  width: 180
  },
    { headerName: "Price", field: "price" //,  width: 180
  },
    {
      headerName: "Child/Parent",
      field: "price",
      cellRenderer: "Example",
     // width: 180
    }]


let rowData : Array<IRowData> =  [
  { make: "Toyota"},
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 }]
  return (
    <div>
      <CatodGrid<IRowData,React.FunctionComponent|React.ReactNode>
       rowData = {rowData}
      columnDefs={columnDefs}
      frameworkComponents={ { Example: Example}}
      />
    </div>
  );
}

export default App;
