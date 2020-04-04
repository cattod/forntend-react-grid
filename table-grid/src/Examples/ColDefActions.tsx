


import React from 'react';
import {Grid} from "../Grid/Grid"
import {RateStar} from "../RateComponent"
import {ICatodActions,ICatodcolumnDefs} from "../Grid/Model"
import "../Grid/grid.scss"


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
  actions: ICatodActions<IRowData>[] 
  page:number
}


class ColDefActions extends React.Component <IProps,IState>{
  constructor(props:IProps) {
    super(props)
    this.state = {
       columnDefs: [
        {title:"Make",
          icon:"",
          key:"Make",
        //  onSort:(sortType:"ascending"|"descending"|"none")=>{return[] },
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
       actions: [
        {title:"Delete" , key : "Delete" , icon: "trash-alt", actionFn:(data:IRowData)=>{ this.removeRow(data)}},
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        
        ],
        
          page:0
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



removeRow = (data:IRowData) =>{
  

}
 addRow = (data:IRowData)=>{
  console.log(data)

}



  render() {
    return (
    
//             <Grid
//  columnDef = {this.state.columnDefs}
//   actions = {this.state.actions}
//   />
<div></div>
      
      
    );
  }

}

export {ColDefActions};