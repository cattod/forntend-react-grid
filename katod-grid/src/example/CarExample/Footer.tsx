import React , {Component} from "react"

interface IProps {
    handleNext(page:number):void
    handlePrev(page:number):void
}
interface IState {
    page:number
}

export class Footer extends Component<IProps,IState>{
    constructor(props:IProps){
        super(props)
        this.state = {
            page:0
        }
    }
    handleNext=()=>{
     
        let newPage = this.state.page
        this.props.handleNext(newPage+1)
        this.setState({page:newPage+1})
       }
       handlePrev=()=>{
        let newPage = this.state.page
        this.props.handlePrev(newPage-1)
        this.setState({page:newPage-1})
       }


    render() {
      
 
        return(
            <div>
        <button onClick={this.handleNext}>next</button>
        <button onClick={this.handlePrev}>prev</button>
        </div>
        )
    }

}