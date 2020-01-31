import React from 'react';
import './App.css';
import {CatodGrid} from "../src/Grid/Grid.Component"
import {ICatodcolumnDefs} from "../src/Grid/model"
import {Example} from "./SampleCellComponent"

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
const CarList: React.FC = () => {
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
    rowData.push({ make: `Porsche${i}`, model: `Boxter${i}`, price: 72000+i })
  }
  return (
    <div className="app">
     
      <CatodGrid<IRowData>
        height={"400px"}
       dataRow = {rowData}
       columnDef={columnDefs}
      actions = {actions}
      />
    </div>
  );
}

export default CarList;