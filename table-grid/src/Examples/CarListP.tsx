


import React from 'react';
import {Grid} from "../Grid/Grid"
import {RateStar} from "../RateComponent"
import {ICatodActions,ICatodcolumnDefs, ISort} from "../Grid/Model"
import {Footer} from "../changePage"
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
  actions: ICatodActions<IRowData>[] 
  rowData : Array<any>
  page:number
}

class CarListP extends React.Component <IProps,IState>{
  constructor(props:IProps) {
    super(props)
    this.state = {
       columnDefs: [
        {title:"",
          icon:"",
          key:"Id",
         // onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"make") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.id}
          },
          {title:"Name",
          icon:"",
          key:"name",
         // onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"name") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.name}
          },
          {title:"user name",
          icon:"",
          key:"userName",
         // onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"username") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.username}
          },
          {title:"Email",
          icon:"",
          key:"email",
          sortable:true,
        //  onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"email") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.email}
          },
          {title:"phone",
          icon:"",
          key:"phone",
          sortable:true,
        //  onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"phone") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.phone}
          },
          {title:"website",
          icon:"",
          key:"website",
          sortable:true,
        //  onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"website") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.website}
          },
          {title:"company name",
          icon:"",
          key:"companyName",

        //  onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"companyName") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.company.name}
          },
          {title:"company Bs",
          icon:"",
          key:"companyBs",
         // onSort:(sortType:"ascending"|"descending"|"none")=>{return this.sortHandle(sortType,"companyBs") },
          valueGetter:(rowData)=>{return this.valueGetter1(rowData)},
          displayValue: (rowData:any) =>{return rowData.company.bs}
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
         rowData :  [
        //   { make: "پراید", model: "صبا", price: 62000, date:"2020/01/01", rate:4},
        //   { make: "پیکان", model: "گنجشک", price: 32000 , date:"2018/01/01", rate:5},
        //   { make: "سمند", model: "ال اکس", price: 72000, date:"20190/01/01", rate:3 }
        ],
          page:0
    }

   

  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     
      this.setState({rowData:data})
    });
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
 for (let i = 0 ; i<200; i++) {
  newRowData.push({ make: `PorschePorsche Porsche Porsche Porsche PorschePorsche${i+page}`, model: `Boxter${i+page}`, price: 72000+i+page,  date:"20190/01/01", rate:Math.floor(Math.random() * 6) })
  }
  this.setState({rowData:newRowData, page:page+1})
}
handlePrev=(page:number) =>{
  let newRowData = []
 for (let i = 0 ; i<200; i++) {
  newRowData.push({ make: `Porsche${page+i}`, model: `Boxter${page+i}`, price: 72000+page+i , date:"20190/01/01", rate:Math.floor(Math.random() * 6) })
  }
  this.setState({rowData:newRowData,  page:page-1})

}


handleSort = (columnKey?:string, sortType?:string)=>{
  if (columnKey)
  switch(sortType){
    case "ascending":  return this.setState({rowData:_.sortBy( this.state.rowData, columnKey )}) 
    case "descending":  return this.setState({rowData:_.sortBy( this.state.rowData, columnKey ).reverse()}) 
    case "none":  return 
    default: return
  
  }

}



messageError = ()=>{
  return<div>hello</div>
}

  render() {

  //  const message= "there is not any data"
    return (
      <div >
          {/* <Footer handleNext={this.handleNext} handlePrev={this.handlePrev}/> */}
            <Grid
 columnDef = {this.state.columnDefs}
 dataRow = {this.state.rowData}
  actions = {this.state.actions}
  message = {<FM/>}
  onSort={this.handleSort}
  direction="right"
  />
      
      </div>
    );
  }

}

export {CarListP};

const FM= function(){
  return <h2 style={{backgroundColor:"red", width:"50%",margin:"auto"}}>chiman</h2>
} 