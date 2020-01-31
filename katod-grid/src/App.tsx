import React from 'react';
import './App.css';
import {CatodGrid} from "./Grid/Grid.Component"
import {ICatodcolumnDefs} from "./Grid/model"
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
  actionFn ?(data?: T):void
}
const App: React.FC = () => {
let columnDefs: Array<ICatodcolumnDefs<IRowData>> = [
  {title:"a",
    icon:"",
    key:"a",
    valueGetter:(rowData)=>{return valueGetter1(rowData)},
    displayValue: () =>{return Example}
    },
    {title:"b",
    icon:"",
    key:"b",
    valueGetter:(rowData)=>{return valueGetterFn1(rowData)}
    //  valueGetter?(data:T):void,
    //   displayValue? ():void
    },
    {title:"c",
    icon:"",
    key:"c",

    },
    {title:"c",
    icon:"",
    key:"c",

    },
    {title:"c",
    icon:"",
    key:"c",

    }
]
const valueGetter1 = (data:IRowData):any=>{
  
 
  return `${data.make } ${data.model}`

}
const valueGetterFn1 = (data:IRowData):any=>{

  return data.model

}
const valueGetterFnp = (data:IRowData)=>{
  return data.price

}
const actions: IActions<IRowData>[] = [
{title:"Add" , key : "add" , icon: "trash-alt", actionFn:(data:IRowData)=>{ addRow(data)}},
{title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{addRow(data)}},
{title:"Add" , key : "add" , icon: "trash-alt", actionFn:(data:IRowData)=>{ addRow(data)}},
{title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{addRow(data)}},

]

const addRow = (data:IRowData)=>{
  
  console.log(data)
}


let rowData : Array<IRowData> =  [
  { make: "Toyota"},
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 }]
  for (let i = 0 ; i<200; i++) {
    rowData.push({ make: "Porsche", model: "Boxter", price: 72000 })
  }

  let rowData1 : Array<IRowData> =  [
    { make: "Toyota"},
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }]
    for (let i = 0 ; i<200; i++) {
      rowData1.push({ make: "e", model: "e", price: 45 })
    }
  return (
    <div className="app">
     
      <CatodGrid<IRowData>
        height={"400px"}
       dataRow = {rowData}
       columnDef={columnDefs}
      actions = {actions}
    rowNumber = {30}
      />
    </div>
  );
}

export default App;
