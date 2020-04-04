import React, { Component } from "react"
import { ICatodActions, ICatodcolumnDefs, ISort, ICattodGridProps } from "./Model"
import { Actions } from "./Actions"
import { EnumConsts } from "./Consts"

// interface type for props of GridCattod
interface IProps<T> extends ICattodGridProps<T> { }

// extends ICatodcolumnDefs interface type and add sortType for manageing 
// ascending or descending or none type sort easier for every column
interface IHeaderDef<T> extends ICatodcolumnDefs<T> {
    sortType?: ISort
}

//state interface type
interface IState<T> {
    headerDef: Array<IHeaderDef<T>> | undefined
    message: string,
    textAlign: boolean,
    sortType: { type: string, key: string }
}

//CatodGrid component
export class Grid<T> extends Component<IProps<T>, IState<T>> {

    constructor(props: IProps<T>) {
        super(props)
        this.state = {
            headerDef: undefined,
            message: EnumConsts.ThereIsNotAnyDataToShowInGrid,
            textAlign: true,
            sortType: { type: "", key: "" }
            // sortType:{sortType:EnumConsts.None}     
        }
    }

    //prepare data for rendering
    componentDidMount() {
        const element: Element | null = document.querySelector('.grid-body')
        const style: CSSStyleDeclaration | "" = element ? getComputedStyle(element) : ""
        let _TA:boolean = this.state.textAlign
        let newHeader: Array<ICatodcolumnDefs<T>> = this.props.columnDef

        //check for direction in props and parent project direction
        if (this.props.direction) {
            _TA = this.props.direction === "right" ? false : true
        } else {
            if (style !== "") {

                if (style.direction === EnumConsts.RTL) {
                    _TA = false
                }
            }
        }



        //check for action in grid props and add column to grid
        if (this.props.actions) {
            newHeader?.push({
                title: "",
                key: EnumConsts.Action,
                icon: "",
                displayValue: () => { return "" },
                valueGetter: () => { return "" }
            })
        }
        //update state for new changes
        this.setState({ headerDef: newHeader, textAlign: _TA })
    }

    //this function describe cell value to display

    rowCell(rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[]) {
        // there is a discrete for action data, which need our component definition
        if (key === EnumConsts.Action && actions) {
            return <Actions
                rowData={rowData}
                colDef={colDef}
                actionsCatod={actions}
            />
        } else {
            return colDef.displayValue(rowData)
        }
    }

    //it is the function when sort icon clicked
    //run onSort function in props and update sort type for column
    sortHandle = (sortType: ISort, key: string): void => {

        if (this.state.headerDef) {
            if (this.props.onSort) {
                this.props.onSort(key, sortType.sortType)

            }
            this.setState({ sortType: { type: sortType.sortType, key: key } })
        }

    }



    //add sort icon to header of table for sortable column and set header title
    selectSortType = (data: IHeaderDef<T>) => {
        if (data.sortable) {
            if (data.key === this.state.sortType.key) {
                switch (this.state.sortType.type) {
                    case EnumConsts.Ascending:
                        return <div >{data.title}{this.upSvg(data)}</div>
                    case EnumConsts.Descending:
                        return <div >{data.title}{this.downSvg(data)}</div>
                    case EnumConsts.None:
                        return <div >{data.title}{this.unsortSVG(data)}</div>
                    default: return <div >{data.title}{this.unsortSVG(data)}</div>
                }
            } else return <div >{data.title}{this.unsortSVG(data)}</div>

        }


        return data.title
    }

    //create svg for unsort icon
    unsortSVG = (data: ICatodcolumnDefs<T>) => {
        return <svg height="15" width="20" name="sort"
            onClick={() => this.sortHandle({ sortType: EnumConsts.Ascending }, data.key)}
        >
            <polyline points="8,5 11,0 14,5 11,0 11,15"
                className="sort-svg"
            />
            <polyline points="5,0 5,15 2,10 5,15 8,10" className="sort-svg" />
     Sorry, your browser does not support inline SVG.
   </svg>
    }

    //create svg for descending sort icon
    upSvg = (data: ICatodcolumnDefs<T>) => {
        return <svg height="15" width="10" name="up"
            onClick={() => this.sortHandle({ sortType: EnumConsts.Descending }, data.key)}
        >
            <polyline points="2,5 5,0 8,5 5,0 5,15" className="sort-svg" />
        Sorry, your browser does not support inline SVG.
      </svg>
    }

    //create svg for ascending sort icon
    downSvg = (data: ICatodcolumnDefs<T>) => {
        return <svg height="15" width="10" name="up"
            onClick={() => this.sortHandle({ sortType: EnumConsts.None }, data.key)}
        >
            <polyline points="5,0 5,15 2,10 5,15 8,10 " className="sort-svg" />
        Sorry, your browser does not support inline SVG.
      </svg>
    }

    //condition for when there is not any data for display
    displayGrid = () => {

        if (this.props.dataRow.length < 1 && this.props.columnDef.length < 1) {
            return <p className="empty-grid">
                {this.props.message ?
                    this.props.message :
                    this.state.message}
            </p>

        }
        else if (this.props.dataRow.length < 1 && this.props.columnDef.length > 0) {
            return (
                <div>
                    {this.tableGrid()}
                    <p className="empty-grid">{this.props.message ? this.props.message : this.state.message}</p>
                </div>
            )

        }
        return this.tableGrid()

    }

    //this function create data table grid
    tableGrid = () => {
        //
        return (
            <table className="table table-bordered table-sm table-hover row-hover-catod">
                <thead className="back-header">
                    <tr>
                        {this.state.headerDef?.map((item: IHeaderDef<T>, index) => {
                            return (
                                <th scope="col" key={item.key} id={item.key}>{this.selectSortType(item)}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody>
                    {this.props.dataRow.map((item: T, index: number) => {

                        return (
                            <tr key={index} >
                                {this.state.headerDef?.map((element: IHeaderDef<T>, id: number) => {
                                    return (
                                        <td key={id} >
                                            {this.rowCell(item, element, element.key, this.props.actions)}

                                        </td>

                                    )
                                })}
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    }

    render() {

        return (

            <div className={this.state.textAlign ? "grid-body" : "grid-body-right"}
            >
                {this.displayGrid()}

            </div>

        )
    }

}