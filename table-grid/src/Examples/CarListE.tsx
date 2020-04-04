


import React from 'react';
import {Grid} from "../Grid/Grid"
import {RateStar} from "../RateComponent"
import {ICatodActions,ICatodcolumnDefs} from "../Grid/Model"
import {Footer} from "../changePage"
import "../Grid/grid.scss"
import _ from "lodash"


interface IRowData{
make ?:string,
model ?: string,
price ?: number,
date?: string,
rate?: number,
country?:string
color?:string
nmae?:string
family?:string
}


interface IProps{
 // dir: 'ltr'
}

interface IState {
  columnDefs: Array<ICatodcolumnDefs<IRowData>>
  actions: ICatodActions<IRowData>[] 
  rowData : Array<IRowData>
  page:number
}

class CarListE extends React.Component <IProps,IState>{
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
          {title:"Name",
          icon:"",
          key:"name",
          displayValue:(rowData)=>{return rowData.nmae},
          valueGetter:(rowData)=>{return rowData.nmae}
 
          },
          {title:"Family",
          icon:"",
          key:"family",
          displayValue:(rowData)=>{return rowData.family},
          valueGetter:(rowData)=>{return rowData.family}
 
          },
          {title:"Country",
          icon:"",
          key:"country",
          displayValue:(rowData)=>{return rowData.country},
          valueGetter:(rowData)=>{return rowData.country}
 
          },
          {title:"Color",
          icon:"",
          key:"color",
          displayValue:(rowData)=>{return rowData.color},
          valueGetter:(rowData)=>{return rowData.color}
 
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
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        
        
        ],
         rowData :  [
          { make: "Toyota", model: "Camery", price: 62000, date:"2020/01/01", rate:4, country:"Germany",nmae:"Mikle", family:"Lee",color:"Red"},
          { make: "Ford", model: "Mondeo", price: 32000 , date:"2018/01/01", rate:5, country:"France",nmae:"John", family:"Enistine",color:"Black"},
          { make: "Porsche", model: "Boxter", price: 72000, date:"20190/01/01", rate:3, country:"USA",nmae:"Maria", family:"Lincholn",color:"Black" }],
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

handleNext=(page:number) =>{

  let newRowData = []
 for (let i = 0 ; i<100; i++) {
  newRowData.push({ make: `PorschePorsche Porsche Porsche Porsche PorschePorsche${i+page}`
  , model: `Boxter${i+page}`, price: 72000+i+page,  date:"20190/01/01", rate:Math.floor(Math.random() * 6) 
  , country:"USA",nmae:"Maria", family:"Lincholn",color:"Black"})
  }
  this.setState({rowData:newRowData, page:page+1})
}
handlePrev=(page:number) =>{
  let newRowData = []
 for (let i = 0 ; i<100; i++) {
  newRowData.push({ make: `Porsche${page+i}`, model: `Boxter${page+i}`, price: 72000+page+i 
  , country:"USA",nmae:"Maria", family:"Lincholn",color:"Black", date:"20190/01/01", rate:Math.floor(Math.random() * 6) })
  }
  this.setState({rowData:newRowData,  page:page-1})

}




  render() {

    const message= "there is not any data"
    return (
      <div className="App">
          <Footer handleNext={this.handleNext} handlePrev={this.handlePrev}/>
            <Grid
 columnDef = {this.state.columnDefs}
 dataRow = {this.state.rowData}
  actions = {this.state.actions}
  message = {message}
  />
      
      </div>
    );
  }

}

export {CarListE};