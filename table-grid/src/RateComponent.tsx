import React , {Component} from "react"
import "./example.css"

export class Example extends Component<any,any>{

    rateStar = ():any =>{
        let newStar = []
    for (let i = 0 ; i<6 ; i++) {
        newStar.push(i)
    }
 return   newStar = newStar.map((item:number)=>{
        let colorStart = ""
        if (item<= this.props.data?.rate) {
            colorStart = "goldenStar"
        }
        return (  <span key={item}  className={`fas fa-star ${colorStart}`}></span>)
    })

    }
    render() {
        return(
       <div> 
          {this.rateStar()} 
    
       </div>
        )
    }

}