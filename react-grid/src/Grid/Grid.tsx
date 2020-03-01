import React, { Component } from "react"
import { ICatodActions, ICatodcolumnDefs ,ISort} from "./Model"
import { Actions } from "./Actions"
import "./grid.scss"

interface IProps<T> {
    columnDef?: Array<ICatodcolumnDefs<T>>
    dataRow?: T[]
    actions?: ICatodActions<T>[]
    message?: string
}

interface IState<T> {
    dataRow?: T[]
    loading: boolean,
    headerDef: Array<ICatodcolumnDefs<T>> | undefined
    message: string,
    textAlign: boolean,
    sortType: ISort
}


export class Grid<T> extends Component<IProps<T>, IState<T>> {
    _textAlign :boolean = true
    constructor(props: IProps<T>) {
        super(props)
        this.state = { loading: false,
             headerDef: undefined,
              message: "There is not any data for show in grid",
              textAlign:true,
              sortType:{sortType:"none"},
              dataRow:[]
             }


    }

    componentDidUpdate(prevProps: IProps<T>) {
    
    
        if (this.props.dataRow !== prevProps.dataRow) {
        
            this.setState({  dataRow:this.props.dataRow})
    
        }
      }

    componentDidMount() {
        const element: Element | null = document.querySelector('.grid-body')
        const style: CSSStyleDeclaration | "" = element ? getComputedStyle(element) : ""
        let _TA = this.state.textAlign
        if (style !== "") {
         
          if (style.direction === "rtl") {
            _TA = false
          }
        }
        let newHeader: Array<ICatodcolumnDefs<T>> | undefined = undefined
        let newDataRow:T[] = []
        if (this.props.dataRow) {
            newDataRow = this.props.dataRow
        }
        if (this.props.dataRow && !this.props.columnDef) {
            newHeader = this.createHeader(this.props.dataRow)
            
        } else if (this.props.columnDef) {
            newHeader = this.props.columnDef
          
        }

        if (this.props.actions) {
            newHeader?.push({ title: "", key: "action", icon: "" ,displayValue:()=>{return""}, valueGetter:()=>{return ""}})
        }
        this.setState({ headerDef: newHeader, textAlign:_TA , dataRow:newDataRow})
    }

    createHeader = (newData: T[]): Array<ICatodcolumnDefs<T>> => {
        let newCol = Object.keys(newData[0]).map((item) => {
            return {
                title: item[0].toUpperCase() + item.slice(1),
                key: item,
                icon: "",
                displayValue:()=>{return""},
                valueGetter:()=>{return""}
            }

        })

        return newCol



    }

    tableRow(rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[]) {


        if (key === "action" && actions) {
            return <Actions rowData={rowData} colDef={colDef} actionsCatod={actions} />
        } else {
            return colDef.displayValue(rowData)
        }
    }
    sortHandle = (sortType:ISort, onSort:((sortType:"ascending"|"descending"|"none")=>T[])|undefined)=>{
      if (onSort) 
        this.setState({sortType:sortType, dataRow:onSort(sortType.sortType)})
    }

    selectSortType = (data:ICatodcolumnDefs<T>)=>{
        if (data.onSort){
            switch(this.state.sortType.sortType){
                case "ascending":                 
            return   <div >{ data.title}{this.upSvg(data)}</div>
                case "descending": 
                    return <div >{ data.title}{this.downSvg(data)}</div>            
                case "none":
                    return <div >{ data.title}{this.sortSvg(data)}</div>                
                default: return
            }
          
        }
    
return data.title
    }


    sortSvg = (data:ICatodcolumnDefs<T>)=>{
        return <svg height="15" width="20" name="sort" onClick={()=>this.sortHandle({sortType:"ascending"},data.onSort)}>
        <polyline points="8,5 11,0 14,5 11,0 11,15"
         className="sort-svg" 
        />
          <polyline points="5,0 5,15 2,10 5,15 8,10" className="sort-svg" />
          Sorry, your browser does not support inline SVG.
        </svg>
    }

    upSvg = (data:ICatodcolumnDefs<T>)=>{
        return  <svg height="15" width="10" name="up" onClick={()=>this.sortHandle({sortType:"descending"},data.onSort)}>
        <polyline points="2,5 5,0 8,5 5,0 5,15" className="sort-svg" />
        Sorry, your browser does not support inline SVG.
      </svg>
    }

    downSvg = (data:ICatodcolumnDefs<T>)=>{
        return  <svg height="15" width="10" name="up" onClick={()=>this.sortHandle({sortType:"none"},data.onSort)}>
        <polyline points="5,0 5,15 2,10 5,15 8,10 " className="sort-svg" />
        Sorry, your browser does not support inline SVG.
      </svg>
    }




    render() {

        return (

            <div className={this.state.textAlign?"grid-body":"grid-body-right"} >
                {this.state.loading ? <div>loading...</div> :
                    <table className="table table-bordered table-sm table-hover">
                        <thead className="back-header">
                            <tr>
                                {this.state.headerDef?.map((item:ICatodcolumnDefs<T>) => {
                                    return (
                                        <th scope="col" key={item.key}>{this.selectSortType(item)}</th>
                                    )
                                })}

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataRow?.map((item: T, index:number) => {

                                return (
                                    <tr key={index}>
                                        {this.state.headerDef?.map((element: ICatodcolumnDefs<T>, id:number) => {
                                            return (
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

                {!this.props.columnDef && !this.props.dataRow ? <p className="empty-grid">{this.props.message ? this.props.message : this.state.message}</p> : null}
            </div>

        )
    }

}