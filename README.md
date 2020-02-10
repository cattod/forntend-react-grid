# catodgrid
A react typescript module that returns the plural form of any noun
## Installation 
```sh
npm install @catod/react-grid --save
yarn add @catod/react-grid

```
## Usage
### React TypeScript
```typescript
import React , {Component} from "react"
import { CatodGrid ,Catodcolumn,CatodActions} from '@catod/react-grid';
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
          icon:"",
          key:"Make",
          valueGetter:(rowData)=>{return this.valueGetterMake(rowData)}         
          },
          {title:"Model",
          icon:"",
          key:"Model",
          valueGetter:(rowData)=>{return this.valueGetterModel(rowData)}
          },
          {title:"Price",
          icon:"",
          key:"price"      
          },
          {title:"Rate",
          icon:"",
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

  
 valueGetterMake = (data:IRowData):any=>{
  
 
  return `${data.make } ${data.model}`

}
 valueGetterModel = (data:IRowData):any=>{

  return data.model

}

 addRow = (data:IRowData)=>{
  console.log(data)

}
 removeRow = (data:IRowData)=>{
  console.log(data)

}

    render(){
         const message= {loading:"", emptyData:""}
        return(
          <CatodGrid<IRowData>
          message = {message}
         //   height={"400px"}
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
