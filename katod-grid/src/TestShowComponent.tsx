import React , {Component} from "react"

export class Example extends Component{

    render() {
        return(
            <button onClick={()=>console.log("hello")}>add</button>
        )
    }

}