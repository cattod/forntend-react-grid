import React , {Component} from "react"

export class Example extends Component<any,any>{
    constructor(props:any){
        super(props)
    }

    render() {
      
   
        return(
        <button onClick={()=>console.log("hello")}>{this.props.value}</button>
        )
    }

}