


import React from 'react';
import {EmptyGrid} from "./Examples/EmptyGrid"
import {ColExample} from "./Examples/ColExample"
import {DataRowExample} from "./Examples/DataRowExample"
import {EmptyAction} from "./Examples/EmptyAction"
import {Message} from "./Examples/Message"
import {ColDefDataRow} from "./Examples/ColDefDataRow"
import {ColDefActions} from "./Examples/ColDefActions"
import{DataRowAction} from "./Examples/DataRowAction"
import {ActionMessage} from "./Examples/ActionMessage"
import {CarListE} from "./Examples/CarListE"
import {CarListP} from "./Examples/CarListP"
import './App.css';
import "./Grid/grid.scss"

class App extends React.Component{

  render() {
    const examplesList = [{ component:<EmptyGrid/>,title:"A Cattod Grid without any data",description:""},
    // { component:<ColExample/>,title:"",description:""},
    // { component:<DataRowExample/>,title:"",description:""},
    // { component:<EmptyAction/>,title:"",description:""},
    // { component:<Message/>,title:"A Cattod Grid with special message",description:""},
    // { component:<ColDefDataRow/>,title:"A Cattod Grid with cell component",description:""},
    // { component:<ColDefActions/>,title:"",description:""},
    // { component:<DataRowAction/>,title:"",description:""},
    // { component:<ActionMessage/>,title:"",description:""},
     { component:<CarListE/>,title:"A Cattod Grid with cell component and action",description:""},
    { component:<CarListP/>,title:"A Cattod Grid with display component and action",description:""},
]
    return (
      <div className="App container">
<h3>Cattod Grid Examples</h3>
     {examplesList.map((item:any,index:number)=>{
       return(<div className="exampleSection" key={index}>
         <h5>{item.title}</h5>
       <p>{item.description}</p>
         {item.component}</div>)
     })}
       
       
      </div>
    );
  }

}

export default App;