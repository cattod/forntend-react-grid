import React , {Component} from "react"
import {IActions,ICatodcolumnDefs} from "./model"

interface IProps<T>{
  //  id ?:Array <columnDefs>  
  colDef : ICatodcolumnDefs<T>
  data: T
}

interface IState<T>{
    actions: IActions<T>[]
}

export class Actions<T> extends Component<IProps<T>,IState<T>>{
    constructor(props:IProps<T>){
        super(props)
        this.state = {actions:[]}
    }

    componentDidMount() {
        // if (this.props.colDef.cellEditorFramework) {
        //     this.setState({actions:this.props.colDef.cellEditorFramework})
        // }
    }

    render() {
       
        return(
            <React.Fragment>
                {this.state.actions? this.state.actions.map((item: IActions<T>,index:number)=>{
                return <button key={index} onClick={()=>{
                    if (item.actionFa)
                    item.actionFa(this.props.data)
                   
                }}>{item.title}</button>
                }):null}
               
            </React.Fragment>
        )
    }

}