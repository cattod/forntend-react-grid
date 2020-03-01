


import React from 'react';
import {CatodGrid} from "../../src/index"
import './App.css';
import {RateStar} from "./RateStar"
import {Catodcolumn,CatodActions} from "../../src/index"
import {ChangePage} from "./changePage"
import "@catod/react-grid/build/index.css"


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
  columnDefs: Array<Catodcolumn<IRowData>>
  actions: CatodActions<IRowData>[] 
  rowData : Array<IRowData>
  page:number
}

class App extends React.Component <IProps,IState>{
  constructor(props:IProps) {
    super(props)
    this.state = {
       columnDefs: [
        {title:"Make",
          icon:"",
          key:"Make",
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
         
          },
          {title:"Model",
          icon:"",
          key:"Model",
          valueGetter:(rowData)=>{return this.valueGetterFn1(rowData)}
          //  valueGetter?(data:T):void,
          //   displayValue? ():void
          },
          {title:"Price",
          icon:"",
          key:"price",
      
          },
          {title:"Date",
          icon:"",
          key:"date",
      
          },
          {title:"Rate",
          icon:"",
          key:"rate",
          displayValue: (rowData:IRowData) =>{return <RateStar data ={rowData}/>}
      
          }
      ],
       actions: [
        {title:"Delete" , key : "Delete" , icon: "trash-alt", actionFn:(data:IRowData)=>{ this.removeRow(data)}},
        {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IRowData)=>{this.addRow(data)}},
        
        ],
         rowData :  [
          { make: "Toyota", model: "Camery", price: 62000, date:"2020/01/01", rate:4},
          { make: "Ford", model: "Mondeo", price: 32000 , date:"2018/01/01", rate:5},
          { make: "Porsche", model: "Boxter", price: 72000, date:"20190/01/01", rate:3 }],
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
 for (let i = 0 ; i<200; i++) {
  newRowData.push({ make: `PorschePorsche Porsche Porsche Porsche PorschePorsche${i+page}`, model: `Boxter${i+page}`, price: 72000+i+page,  date:"20190/01/01", rate:Math.floor(Math.random() * 6) })
  }
  this.setState({rowData:newRowData})
}
handlePrev=(page:number) =>{
  let newRowData = []
 for (let i = 0 ; i<200; i++) {
  newRowData.push({ make: `Porsche${page+i}`, model: `Boxter${page+i}`, price: 72000+page+i , date:"20190/01/01", rate:Math.floor(Math.random() * 6) })
  }
  this.setState({rowData:newRowData})

}




  render() {
    const message= "there is not any data"
    return (
      <div className="App">
          <ChangePage handleNext={this.handleNext} handlePrev={this.handlePrev}/>
            <CatodGrid
 columnDef = {this.state.columnDefs}
 dataRow = {this.state.rowData}
  actions = {this.state.actions}
  message = {message}
  />
      
      </div>
    );
  }

}

export default App;