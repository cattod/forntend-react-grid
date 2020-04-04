import React from 'react';
import {Grid} from "../Grid/Grid"
import {ICatodcolumnDefs} from "../Grid/Model"
import {RateStar} from "../RateComponent"

interface IRowData{
    make ?:string,
    model ?: string,
    price ?: number,
    date?: string,
    rate?: number
    }

interface IProps{
}

interface IState {
    columnDef:Array<ICatodcolumnDefs<{}>>
}


class ColExample extends React.Component <IProps,IState>{
    constructor(props:IProps){
        super(props)
        this.state ={
            columnDef :[
                {title:"Make",                
                  key:"Make",            
                  displayValue: () =>{return""}
                  },
                  {title:"Model",
                  icon:"",
                  key:"Model",
                  displayValue:()=>{return "chiman"},
               
                  },
                  {title:"Price",
                  icon:"",
                  key:"price",      
                  valueGetter:(rowData)=>{return "hello"},
                  displayValue:()=>{return RateStar},
                  },
                  {title:"Date",
                  icon:"",
                  key:"date",
                  displayValue:(rowData)=>{return rowData},
             //     onSort:(sortType:"ascending"|"descending"|"none")=>{return [] }
                  },
                  {title:"Rate",
                  icon:"",
                  key:"rate",
                  displayValue: () =>{return ""},
           //       onSort:(sortType:"ascending"|"descending"|"none")=>{return [] }      
              
                  }
              ],

        }
    }
  render() {
    return (
    
        
            // <Grid
            // columnDef={this.state.columnDef}
            // />
      <div></div>
     
    );
  }

}
export {ColExample}