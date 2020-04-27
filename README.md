# catodgrid
A react typescript module that returns the plural form of any noun
## Installation 
```sh
npm install@cattod/react-grid --save
yarn add @cattod/react-grid

```
## Usage

### React TypeScript
```typescript
import React , {Component} from "react"
import { CatodGrid ,Catodcolumn,CatodActions} from '@cattod/react-grid';
import "@cattod/react-grid/build/index.css"
interface IRowData {
    make ?:string,
model ?: string,
price ?: number,
date?: string,
rate?: number
}

interface IState {
  columnDefs: Array<Catodcolumn<IRowData>>
  actions: CatodActions<IRowData>[] 
  rowData : Array<IRowData>
}
export class Example extends Component<{}, IState> {
      constructor(props:{}) {
    super(props)
    this.state = {
       columnDefs: [
        {title:"Make",
         
          key:"Make",
          displayValue:(rowData)=>{return this.displayValueMake(rowData)}         
          },
          {title:"Model",
        
          key:"Model",
          displayValue:(rowData)=>{return this.displayValueModel(rowData)}
          },
          {title:"Price",
          
          key:"price"      
          },
          {title:"Rate",
         
          key:"rate",
          displayValue: () =>{return StarRate}
      
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
    }

  }

  
 displayValueMake = (data:IRowData):any=>{
  
 
  return `${data.make } ${data.model}`

}
 displayValueModel = (data:IRowData):any=>{

  return data.model

}

 addRow = (data:IRowData)=>{
  console.log(data)

}
 removeRow = (data:IRowData)=>{
  console.log(data)

}

    render(){
         const message= "empty data"
        return(
          <CatodGrid<IRowData>
          message = {message}
         dataRow = {this.state.rowData}
         columnDef={this.state.columnDefs}
        actions = {this.state.actions}
        /> 
        )
    }
}


function StarRate(props) { 

        return(
       <div> 
          {props.value.map((item:number)=>{
        return (  <span key={item}  className={`fas fa-star`}></span>)
    })}

       </div>
        )
  

}


```
```sh
```
