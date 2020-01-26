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

interface IActions<T> {
  title:string,
  key?: string,
  icon ?:string,
  actionFa ?(data?: T):void
}

const App: React.FC = () => {
let  columnDefs:Array<columnDefs<IRowData>>=[
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


const actions: IActions<IRowData>[] = [
{title:"Add" , key : "add" , icon: "add", actionFa:(data:IRowData)=>{addRow(data)}},
{title:"Edit" , key : "edit" , icon: "edit", actionFa:(data:IRowData)=>{addRow(data)}}
]

const addRow = (data:IRowData)=>{
console.log(data)
}


let rowData : Array<IRowData> =  [
  { make: "Toyota"},
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 }]
  return (
    <div>
      <CatodGrid<IRowData>
       rowData = {rowData}
     // columnDefs={columnDefs}
      frameworkComponents={ { Example: Example}}
      actions = {actions}
      />
    </div>
  );
}

export default App;
