


import React from 'react';
import {Grid} from "../Grid/Grid"
import {RateStar} from "../RateComponent"
import {ICatodcolumnDefs} from "../Grid/Model"
import "../Grid/grid.scss"

import _ from "lodash"



interface IRowData{
make ?:string,
model ?: string,
price ?: number,
date?: string,
rate?: number
}


interface IProps{
 // dir: 'ltr'
}

interface IState {
  columnDefs: Array<ICatodcolumnDefs<IRowData>>
  rowData : Array<IRowData>

}


class ColDefDataRow extends React.Component <IProps,IState>{
  constructor(props:IProps) {
    super(props)
    this.state = {
       columnDefs: [
        {title:"Make",
          icon:"",
          key:"Make",
        //  onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"make") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:IRowData) =>{return this.valueGetter1(rowData)}
          },
          {title:"Model",
          icon:"",
          key:"Model",
          displayValue:(rowData)=>{return this.valueGetterFn1(rowData)},
          valueGetter:(rowData)=>{return this.valueGetterFn1(rowData)}
          //  valueGetter?(data:T):void,
          //   displayValue? ():void
          },
          {title:"Price",
          icon:"",
          key:"price",
          valueGetter:(rowData)=>{return this.valueGetterFn1(rowData)},
 
          displayValue:(rowData)=>{return rowData.price},
          },
          {title:"Date",
          icon:"",
          key:"date",
          displayValue:(rowData)=>{return rowData.date},
          valueGetter:(rowData)=>{return this.valueGetterFn1(rowData)}
 
          },
          {title:"Rate",
          icon:"",
          key:"rate",
         // valueGetter:(rowData)=>{return rowData.rate},
          displayValue: (rowData:IRowData) =>{return <RateStar data ={rowData}/>},
          valueGetter:(rowData)=>{return this.valueGetterFn1(rowData)}
 
      
          }
      ],
     
         rowData :  [
          { make: "Toyota", model: "Camery", price: 62000, date:"2020/01/01", rate:4},
          { make: "Ford", model: "Mondeo", price: 32000 , date:"2018/01/01", rate:5},
          { make: "Porsche", model: "Boxter", price: 72000, date:"20190/01/01", rate:3 }],
       
    }

   

  }

 valueGetter1 = (data:IRowData):any=>{
 
  return `${data.make } ${data.model}`

}
 valueGetterFn1 = (data:IRowData):any=>{

  return data.model

}
valueGetterFnp = (data:IRowData)=>{
  return data.price

}

sortHandle = (sortType:"ascending"|"descending"|"none",col:string) =>{
switch(sortType){
  case "ascending":  return _.sortBy( this.state.rowData, col )
  case "descending":  return _.sortBy( this.state.rowData, col ).reverse()
  case "none":  return  this.state.rowData
  default: return this.state.rowData

}

}

removeRow = (data:IRowData) =>{
  let newData = this.state.rowData
  let index = newData.findIndex((k:IRowData) => k.date===data.date&&
  k.make === data.make && k.model ===data.model && k.price ===data.price
&& k.rate===data.rate
)
newData = [
  ...newData.slice(0,index),
 ...newData.slice(index+1)
] 
 this.setState({rowData: newData})

}
 addRow = (data:IRowData)=>{
  console.log(data)

}







  render() {
    return (

            <Grid
 columnDef = {this.state.columnDefs}
 dataRow = {this.state.rowData}
  />
      

    );
  }

}

export  {ColDefDataRow};