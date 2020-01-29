import React , {Component} from "react"

export class Example extends Component<any,any>{
    constructor(props:any){
        super(props)
    }

    render() {
        console.log(this.props)
   
        return(
        <button onClick={()=>console.log("hello")}>{this.props.value}</button>
        )
    }

}