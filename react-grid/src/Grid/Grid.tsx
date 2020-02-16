import React, { Component } from "react"
import { ICatodActions, ICatodcolumnDefs } from "./Model"
import { Actions } from "./Actions"
import "./grid.scss"

interface IProps<T> {
    columnDef?: Array<ICatodcolumnDefs<T>>
    dataRow?: T[]
    actions?: ICatodActions<T>[]
    message?: string
}

interface IState<T> {
    loading: boolean,
    headerDef: Array<ICatodcolumnDefs<T>> | undefined
    message: string,
    textAlign: boolean
}

export class Grid<T> extends Component<IProps<T>, IState<T>> {
    _textAlign :boolean = true
    constructor(props: IProps<T>) {
        super(props)
        this.state = { loading: false,
             headerDef: undefined,
              message: "There is not any data for show in grid",
              textAlign:true
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
        if (this.props.dataRow && !this.props.columnDef) {
            newHeader = this.createHeader(this.props.dataRow)
           
        } else if (this.props.columnDef) {
            newHeader = this.props.columnDef
            // this.setState({headerDef:this.props.columnDef})
        }

        if (this.props.actions) {
            newHeader?.push({ title: "", key: "action", icon: "" })
        }
        this.setState({ headerDef: newHeader, textAlign:_TA })
    }

    createHeader = (newData: T[]): Array<ICatodcolumnDefs<T>> => {
        //    let newData =  this.props.dataRow 

        // let newCol = Object.keys(newData[0])  
        let newCol = Object.keys(newData[0]).map((item) => {
            return {
                title: item[0].toUpperCase() + item.slice(1),
                key: item,
                icon: ""
            }

        })

        return newCol



    }

    tableRow<T, K extends keyof T>(rowData: T, colDef: ICatodcolumnDefs<T>, key: K, actions?: ICatodActions<T>[]) {


        if (key === "action" && actions) {
            return <Actions rowData={rowData} colDef={colDef} actionsCatod={actions} />
        } else {
            if (colDef.displayValue && colDef.valueGetter) {


                return rowData[key]
            } else if (colDef.displayValue) {

                return colDef.displayValue(rowData)
            }

            else if (colDef.valueGetter) {
                return colDef.valueGetter(rowData)
            } else return rowData[key]
        }
    }


    render() {

        return (

            <div className={this.state.textAlign?"grid-body":"grid-body-right"} >
                {this.state.loading ? <div>loading...</div> :
                    <table className="table table-bordered table-sm table-hover">
                        <thead className="back-header">
                            <tr>
                                {this.state.headerDef?.map((item) => {
                                    return (
                                        <th scope="col" key={item.key}>{item.title}</th>
                                    )
                                })}

                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dataRow?.map((item: any, index) => {

                                return (
                                    <tr key={index}>
                                        {this.state.headerDef?.map((element: any, id) => {
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