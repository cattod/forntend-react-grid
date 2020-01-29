import React from 'react';
import './App.css';
import {CatodGrid} from "./Grid/Grid.Component"
import {ICatodcolumnDefs} from "./Grid/model"
import {Example} from "./TestShowComponent"
import '@fortawesome/fontawesome-svg-core/styles.css'

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
// let  columnDefs:Array<columnDefs<IRowData>>=[
//     { headerName: "Make", field: "make" ,  sortable: false,
//     headerComponentParams: { menuIcon: "fa-external-link-alt" }//,  width: 180
//    },
//     { headerName: "Model666", field: "model" , headerComponentParams: { menuIcon: "fa-cog" }//,  width: 180
//   },
//     { headerName: "Price", field: "price" , suppressMenu:true //,  width: 180
//   },
//     {
//       headerName: "Child/Parent",
//       field: "price",
//       //cellRenderer: "Example",
//       headerComponentParams: { menuIcon: "fa-external-link-alt" },
//     }]

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
   // valueGetter:(rowData)=>{valueGetterFnp(rowData)}
    //  valueGetter?(data:T):void,
    //   displayValue? ():void
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
{title:"Add" , key : "add" , icon: "add", actionFn:(data:IRowData)=>{addRow(data)}},
{title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{addRow(data)}}
]

const addRow = (data:IRowData)=>{
}


let rowData : Array<IRowData> =  [
  { make: "Toyota"},
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 }]
  for (let i = 0 ; i<200; i++) {
    rowData.push({ make: "Porsche", model: "Boxter", price: 72000 })
  }
  return (
    <div>
      <CatodGrid<IRowData>
       dataRow = {rowData}
       columnDef={columnDefs}
    //  frameworkComponents={ { Example: Example, agColumnHeader: Example}}
      actions = {actions}
    //  costumHeader = {Example}
    footer = ""
    rowNumber = {30}
      />
    </div>
  );
}

export default App;
