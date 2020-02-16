import React, {Component} from "react"
import {ICatodActions,IMessage,ICatodcolumnDefs} from "./Model"
import {Actions} from "./Actions"

interface IProps<T> {
    columnDef?: Array<ICatodcolumnDefs<T>>
    dataRow?: T[]
    actions?: ICatodActions<T>[]
    rowNumber?: number
    height?: string
    message?: string
}

interface IState<T> {
loading: boolean,
headerDef:Array<ICatodcolumnDefs<T>>|undefined
message: string
}

export class Grid<T> extends Component<IProps<T>,IState<T>> {
    constructor(props:IProps<T>) {
        super(props) 
        this.state = {loading:false,headerDef:undefined, message:"There is not any data for show in grid"}
        

    }

    componentDidMount() {
        let newHeader:Array<ICatodcolumnDefs<T>>|undefined = undefined
        if (this.props.dataRow&& !this.props.columnDef){
            newHeader = this.createHeader(this.props.dataRow)
           // this.setState({headerDef:this.createHeader(this.props.dataRow)})
        } else if (this.props.columnDef) {
            newHeader = this.props.columnDef
           // this.setState({headerDef:this.props.columnDef})
        }

        if (this.props.actions) {
              newHeader?.push({title:"", key:"action",icon:""})
        }
        this.setState({headerDef:newHeader})
    }

    createHeader= (newData:T[]):Array<ICatodcolumnDefs<T>>=>{
    //    let newData =  this.props.dataRow 
      
      // let newCol = Object.keys(newData[0])  
     let newCol = Object.keys(newData[0]).map((item)=>{
           return {title: item[0].toUpperCase() + item.slice(1),
            key:item,
            icon:""}
          
       })
        // console.log(newCol)
        //  this.setState({loading:false})
      return newCol
      
       // this.setState
      
    }

    tableRow<T, K extends keyof T>(rowData: T, colDef:ICatodcolumnDefs<T>,key: K, actions?:ICatodActions<T>[]) {
      //  return rowData[key];
        
        if (key === "action" && actions) {
            return <Actions rowData={rowData} colDef ={colDef} actionsCatod={actions}/>
        }else {
            if (colDef.displayValue &&colDef.valueGetter) {
                
              
                return  rowData[key]
            } else if (colDef.displayValue) {
               
                return colDef.displayValue(rowData)
            }
            
             else if (colDef.valueGetter){
                return colDef.valueGetter(rowData)
            } else return  rowData[key]
        }
      }

    // tableRow = (rowData:T, ColDef:ICatodcolumnDefs<T>) :any=>{
    //     const newKey :string= ColDef.key
    //     if (newKey === "action") {
    //         return <Actions rowData={rowData} colDef = {ColDef}/>
    //     }else {
    //         if (ColDef.displayValue &&ColDef.valueGetter) {
                
              
    //             return  rowData[ColDef.key]
    //         } else if (ColDef.displayValue) {
               
    //             return ColDef.displayValue(rowData)
    //         }
            
    //          else if (ColDef.valueGetter){
    //             return ColDef.valueGetter(rowData)
    //         } else return  rowData[newKey]
    //     }

        
    // }

     prop<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
      }

     pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
        return propertyNames.map(n => o[n]);
      }
    render() {
       
        return(
           
            <div className="grid-body">
              {this.state.loading?<div>loading...</div>:
               <table className="table table-bordered table-sm table-hover">
               <thead className="back-header">
                 <tr>
                     {this.state.headerDef?.map((item,index)=>{
                         return (
                         <th scope="col" key={item.key}>{item.title}</th>
                         )
                     })}
               
                 </tr>
               </thead>
               <tbody>
                   {this.props.dataRow?.map((item:any,index)=>{
                      
                       return(
                           <tr key={index}>
                  {this.state.headerDef?.map((element:any,id)=>{
                      const newKey = element.key
                     
                      return(
                      <td key={id}>
                          {this.tableRow(item, element, element.key, this.props.actions)}
                       
                          </td>
   
                      )
                  })}
                 </tr> 
                       )
                   })}
                
               </tbody>
             </table>}
           
                {!this.props.columnDef&& !this.props.dataRow?<p className="empty-grid">{this.props.message?this.props.message:this.state.message}</p>:null}
          </div>
         
        )
    }

}