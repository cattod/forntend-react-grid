import React, { Component } from "react"
import { ICatodActions, ICatodcolumnDefs, ISort, ICattodGridProps,IDefaultSort } from "./Model"
import { Actions } from "./Actions"
import { EnumConsts } from "./Consts"

// interface type for props of GridCattod
interface IProps<T> extends ICattodGridProps<T> { }

//state interface type
interface IState<T> {
    headerDef: Array<ICatodcolumnDefs<T>> | undefined
    message: string,
    textAlign: boolean,
    sortType:IDefaultSort[]
    lastSortType:IDefaultSort[]
}

//CatodGrid component
 class GridClass<T> extends Component<IProps<T>, IState<T>> {

    constructor(props: IProps<T>) {
        super(props)
        this.state = {
            lastSortType:[],
            headerDef: undefined,
            message: EnumConsts.ThereIsNotAnyDataToShowInGrid,
            textAlign: true,
            sortType: []
            // sortType:{sortType:EnumConsts.None}     
        }
    }

    //prepare data for rendering
     /**
   * prepare component after mounting componet.
   * fix direction of the component for stylesheet
   * prepare actions column if there is actions in props
   *
   * @remarks
   * This method is part of the {@link core-library#React | React subsystem}.
   *
   *
   * @beta
   */

    componentDidMount() {
        const element: Element | null = document.querySelector('.grid-body')
        const style: CSSStyleDeclaration | "" = element ? getComputedStyle(element) : ""
        let _TA:boolean = this.state.textAlign
        let newHeader: Array<ICatodcolumnDefs<T>> = this.props.columnDef
        let newSortType: IDefaultSort[] = []

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
                
                displayValue: () => { return "" },
               
            })
        }
        if(newHeader.length){
            for (let item of newHeader){
               if (item.sortable){
                  
                newSortType.push({columnKey:item.key, sortType:"none"})
                
               } 
            }
          
        }
        
        if (this.props.defaultSort?.length){
            for (let j in this.props.defaultSort) {
                for (let i in newSortType){
                    if (this.props.defaultSort[j].columnKey === newSortType[i].columnKey){
                       
                       newSortType.splice(Number(i), 1)                       
                        newSortType.unshift(this.props.defaultSort[j])
                    }
             
                 }
            }
          
        }
        //update state for new changes
        this.setState({ headerDef: newHeader, textAlign: _TA , sortType:newSortType,lastSortType:newSortType})
    }

    /**
   * Returns cell value to display
.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @param rowData - The first input <T>
   * @param colDef - The second input ICatodcolumnDefs<T>
   * @param key - The third input string
   * @param actions - The forth input ICatodActions<T>[]
   * @returns - The displayable value
   *
   * @beta
   */

    rowCell=(rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[]):
    React.FunctionComponent | React.ReactNode|string|number|boolean=> {
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

     /**
   * Run onSort function in props and update sort type for column.
   *
   * @remarks
   * This method is called when sort icon clicked.
   *
   * @param sortType - The first input ISort
   * @param key - The second input string
   *
   * @beta
   */

   async sortHandle (sortType: ISort, key: string) {
        let newSortType = this.state.sortType
        
        if (!this.props.multiSort){
            for (let j in this.state.sortType) {  
                newSortType[j].sortType ="none"         
                if (this.state.sortType[j].columnKey ===key){
                   
                   newSortType.splice(Number(j), 1)                       
                    newSortType.unshift({sortType:sortType.sortType, columnKey:key})
                }
         
            
        }
        } else {
            for (let j in this.state.sortType) {           
                if (this.state.sortType[j].columnKey ===key){
                   
                   newSortType.splice(Number(j), 1)                       
                    newSortType.unshift({sortType:sortType.sortType, columnKey:key})
                }
         
            
        }
        }
          
        if (this.state.headerDef) {
            console.log(this.state.headerDef)

            if (this.props.onSort) {
              await  this.props.onSort(newSortType)               
                this.setState({ sortType: newSortType })
               
            }
           
        }
    }



     /**
   * Returns header value to display.
   * Add sort icon to header of table for sortable column and set header title
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @param data - The first input  ICatodcolumnDefs<T>
   * @returns - The displayable value in the header of every column
   *
   * @beta
   */
    selectSortType = (data: ICatodcolumnDefs<T>) => {
        
        if (data.sortable) {
            for (let i in this.state.sortType) {
                if (data.key === this.state.sortType[i]?.columnKey) {
                    switch (this.state.sortType[i].sortType) {
                        case EnumConsts.Ascending:
                            return <div >{data.title}{this.upSvg(data)}</div>
                        case EnumConsts.Descending:
                            return <div >{data.title}{this.downSvg(data)}</div>
                        case EnumConsts.None:
                            return <div >{data.title}{this.unsortSVG(data)}</div>
                        default: return <div >{data.title}{this.unsortSVG(data)}</div>
                    }
                } else {
                    if (!this.props.multiSort) {
                        return <div >{data.title}{this.unsortSVG(data)}</div>
                    }

                }
               
            }
           

       }


        return data.title
    }

         /**
   * Returns svg for unsort icon.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @param data - The first input  ICatodcolumnDefs<T>
   * @returns - The svg for unsort icon.
   *
   * @beta
   */
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

            /**
   * Returns svg for descending sort icon.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @param data - The first input  ICatodcolumnDefs<T>
   * @returns - The svg for descending sort icon.
   *
   * @beta
   */
    upSvg = (data: ICatodcolumnDefs<T>) => {
        return <svg height="15" width="10" name="up"
            onClick={() => this.sortHandle({ sortType: EnumConsts.Descending }, data.key)}
        >
            <polyline points="2,5 5,0 8,5 5,0 5,15" className="sort-svg" />
        Sorry, your browser does not support inline SVG.
      </svg>
    }
    
            /**
   * Returns svg for ascending sort icon.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @param data - The first input  ICatodcolumnDefs<T>
   * @returns - The svg for ascending sort icon.
   *
   * @beta
   */
    downSvg = (data: ICatodcolumnDefs<T>) => {
        return <svg height="15" width="10" name="up"
            onClick={() => this.sortHandle({ sortType: EnumConsts.None }, data.key)}
        >
            <polyline points="5,0 5,15 2,10 5,15 8,10 " className="sort-svg" />
        Sorry, your browser does not support inline SVG.
      </svg>
    }

                /**
   * Returns the displayable xhtml for different condition.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @returns - The displayable xhtml for different condition.
   *
   * @beta
   */
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
                    /**
   * Returns the displayable data table.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @returns - The displayable data table.
   *
   * @beta
   */
    
    tableGrid = () => {
        //
        return (
            <table 
            className={`${this.props.className} table row-hover-catod  table-hover`}>
           
                <thead className="back-header">
                    <tr>
                        {this.state.headerDef?.map((item: ICatodcolumnDefs<T>) => {
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
                                {this.state.headerDef?.map((element: ICatodcolumnDefs<T>, id: number) => {
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

export const Grid = React.memo(GridClass);

