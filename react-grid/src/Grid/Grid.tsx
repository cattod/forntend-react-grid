import React, { Component } from "react"
import { ICatodActions, ICatodcolumnDefs, ISort, ICattodGridProps } from "./Model"
import { Actions } from "./Actions"
import { EnumConsts } from "./Consts"

// interface type for props of GridCattod
interface IProps<T> extends ICattodGridProps<T> { }

//state interface type
interface IState<T> {
    headerDef: Array<ICatodcolumnDefs<T>> | undefined
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
                valueGetter: () => { return "" }
            })
        }
        //update state for new changes
        this.setState({ headerDef: newHeader, textAlign: _TA })
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

    sortHandle = (sortType: ISort, key: string): void => {

        if (this.state.headerDef) {
            if (this.props.onSort) {
                this.props.onSort(key, sortType.sortType)

            }
            this.setState({ sortType: { type: sortType.sortType, key: key } })
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
            <table className="table table-bordered table-sm table-hover row-hover-catod">
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



// import React, { Component } from "react"
// import { ICatodActions, ICatodcolumnDefs, ISort, ICattodGridProps } from "./Model"
// import { Actions } from "./Actions"
// import { EnumConsts } from "./Consts"

// // interface type for props of GridCattod
// interface IProps<T> extends ICattodGridProps<T> { }

// //state interface type
// interface IState<T> {
//     headerDef: Array<ICatodcolumnDefs<T>> | undefined
//     message: string,
//     textAlign: boolean,
//     sortType: { type: string, key: string }
// }

// //CatodGrid component
// export class Grid<T> extends Component<IProps<T>, IState<T>> {

//     constructor(props: IProps<T>) {
//         super(props)
//         this.state = {
//             headerDef: undefined,
//             message: EnumConsts.ThereIsNotAnyDataToShowInGrid,
//             textAlign: true,
//             sortType: { type: "", key: "" }
//             // sortType:{sortType:EnumConsts.None}     
//         }
//     }

//     //prepare data for rendering
//     componentDidMount() {
//         const element: Element | null = document.querySelector('.grid-body')
//         const style: CSSStyleDeclaration | "" = element ? getComputedStyle(element) : ""
//         let _TA:boolean = this.state.textAlign
//         let newHeader: Array<ICatodcolumnDefs<T>> = this.props.columnDef

//         //check for direction in props and parent project direction
//         if (this.props.direction) {
//             _TA = this.props.direction === "right" ? false : true
//         } else {
//             if (style !== "") {

//                 if (style.direction === EnumConsts.RTL) {
//                     _TA = false
//                 }
//             }
//         }



//         //check for action in grid props and add column to grid
//         if (this.props.actions) {
//             newHeader?.push({
//                 title: "",
//                 key: EnumConsts.Action,
            
//                 displayValue: () => { return "" },
//                 valueGetter: () => { return "" }
//             })
//         }
//         //update state for new changes
//         this.setState({ headerDef: newHeader, textAlign: _TA })
//     }

//     //this function describe cell value to display

//     rowCell(rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[]) {
//         // there is a discrete for action data, which need our component definition
//         if (key === EnumConsts.Action && actions) {
//             return <Actions
//                 rowData={rowData}
//                 colDef={colDef}
//                 actionsCatod={actions}
//             />
//         } else {
//             return colDef.displayValue(rowData)
//         }
//     }

//     //it is the function when sort icon clicked
//     //run onSort function in props and update sort type for column
//     sortHandle = (sortType: ISort, key: string): void => {

//         if (this.state.headerDef) {
//             if (this.props.onSort) {
//                 this.props.onSort(key, sortType.sortType)

//             }
//             this.setState({ sortType: { type: sortType.sortType, key: key } })
//         }

//     }



//     //add sort icon to header of table for sortable column and set header title
//     selectSortType = (data: ICatodcolumnDefs<T>) => {
//         if (data.sortable) {
//             if (data.key === this.state.sortType.key) {
//                 switch (this.state.sortType.type) {
//                     case EnumConsts.Ascending:
//                         return <div >{data.title}{this.upSvg(data)}</div>
//                     case EnumConsts.Descending:
//                         return <div >{data.title}{this.downSvg(data)}</div>
//                     case EnumConsts.None:
//                         return <div >{data.title}{this.unsortSVG(data)}</div>
//                     default: return <div >{data.title}{this.unsortSVG(data)}</div>
//                 }
//             } else return <div >{data.title}{this.unsortSVG(data)}</div>

//         }


//         return data.title
//     }

//     //create svg for unsort icon
//     unsortSVG = (data: ICatodcolumnDefs<T>) => {
//         return <svg height="15" width="20" name="sort"
//             onClick={() => this.sortHandle({ sortType: EnumConsts.Ascending }, data.key)}
//         >
//             <polyline points="8,5 11,0 14,5 11,0 11,15"
//                 className="sort-svg"
//             />
//             <polyline points="5,0 5,15 2,10 5,15 8,10" className="sort-svg" />
//      Sorry, your browser does not support inline SVG.
//    </svg>
//     }

//     //create svg for descending sort icon
//     upSvg = (data: ICatodcolumnDefs<T>) => {
//         return <svg height="15" width="10" name="up"
//             onClick={() => this.sortHandle({ sortType: EnumConsts.Descending }, data.key)}
//         >
//             <polyline points="2,5 5,0 8,5 5,0 5,15" className="sort-svg" />
//         Sorry, your browser does not support inline SVG.
//       </svg>
//     }

//     //create svg for ascending sort icon
//     downSvg = (data: ICatodcolumnDefs<T>) => {
//         return <svg height="15" width="10" name="up"
//             onClick={() => this.sortHandle({ sortType: EnumConsts.None }, data.key)}
//         >
//             <polyline points="5,0 5,15 2,10 5,15 8,10 " className="sort-svg" />
//         Sorry, your browser does not support inline SVG.
//       </svg>
//     }

//     //condition for when there is not any data for display
//     displayGrid = () => {

//         if (this.props.dataRow.length < 1 && this.props.columnDef.length < 1) {
//             return <p className="empty-grid">
//                 {this.props.message ?
//                     this.props.message :
//                     this.state.message}
//             </p>

//         }
//         else if (this.props.dataRow.length < 1 && this.props.columnDef.length > 0) {
//             return (
//                 <div>
//                     {this.tableGrid()}
//                     <p className="empty-grid">{this.props.message ? this.props.message : this.state.message}</p>
//                 </div>
//             )

//         }
//         return this.tableGrid()

//     }

//     //this function create data table grid
//     tableGrid = () => {
//         //
//         return (
//             <table className="table table-bordered table-sm table-hover row-hover-catod">
//                 <thead className="back-header">
//                     <tr>
//                         {this.state.headerDef?.map((item: ICatodcolumnDefs<T>) => {
//                             return (
//                                 <th scope="col" key={item.key} id={item.key}>{this.selectSortType(item)}</th>
//                             )
//                         })}

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {this.props.dataRow.map((item: T, index: number) => {

//                         return (
//                             <tr key={index} >
//                                 {this.state.headerDef?.map((element: ICatodcolumnDefs<T>, id: number) => {
//                                     return (
//                                         <td key={id} >
//                                             {this.rowCell(item, element, element.key, this.props.actions)}

//                                         </td>

//                                     )
//                                 })}
//                             </tr>
//                         )
//                     })}

//                 </tbody>
//             </table>
//         )
//     }

//     render() {

//         return (

//             <div className={this.state.textAlign ? "grid-body" : "grid-body-right"}
//             >
//                 {this.displayGrid()}

//             </div>

//         )
//     }

// }



// // import React, { Component } from "react"
// // import { ICatodActions, ICatodcolumnDefs ,ISort} from "./Model"
// // import { Actions } from "./Actions"

// // interface IProps<T> {
// //     columnDef?: Array<ICatodcolumnDefs<T>>
// //     dataRow?: T[]
// //     actions?: ICatodActions<T>[]
// //     message?: string
// // }

// // interface IHeaderDef<T> extends ICatodcolumnDefs<T>{
// // sortType?: ISort
// // }

// // interface IState<T> {
// //     dataRow?: T[]
// //     headerDef: Array<IHeaderDef<T>> | undefined
// //     message: string,
// //     textAlign: boolean,
// //     // sortType: ISort
// // }


// // export class Grid<T> extends Component<IProps<T>, IState<T>> {
// //     constructor(props: IProps<T>) {
// //         super(props)
// //         this.state = {
// //              headerDef: undefined,
// //               message: "There is not any data to show in grid",
// //               textAlign:true,
// //             //   sortType:{sortType:"none"},
// //               dataRow:[]
// //              }


// //     }

// //     componentDidUpdate(prevProps: IProps<T>) {
    
    
// //         if (this.props.dataRow !== prevProps.dataRow) {
        
// //             this.setState({  dataRow:this.props.dataRow})
    
// //         }
// //       }

// //     componentDidMount() {
// //         const element: Element | null = document.querySelector('.grid-body')
// //         const style: CSSStyleDeclaration | "" = element ? getComputedStyle(element) : ""
// //         let _TA = this.state.textAlign
// //         if (style !== "") {
         
// //           if (style.direction === "rtl") {
// //             _TA = false
// //           }
// //         }
// //         let newHeader: Array<ICatodcolumnDefs<T>> | undefined = undefined
// //         let newDataRow:T[] = []
// //         if (this.props.dataRow) {
// //             newDataRow = this.props.dataRow
// //         }
      
// //         if (this.props.columnDef) {
// //             newHeader = this.props.columnDef
          
// //         }

// //         if (this.props.actions) {
// //             newHeader?.push({ title: "", key: "action", icon: "" ,displayValue:()=>{return""}, valueGetter:()=>{return ""}})
// //         }
// //         this.setState({ headerDef: newHeader, textAlign:_TA , dataRow:newDataRow})
// //     }



// //     tableRow(rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[]) {

// //         if (key === "action" && actions) {
// //             return <Actions rowData={rowData} colDef={colDef} actionsCatod={actions} />
// //         } else {
// //             return colDef.displayValue(rowData)
// //         }
// //     }
// //     sortHandle = (sortType:ISort, onSort:((sortType:"ascending"|"descending"|"none")=>T[])|undefined,data:IHeaderDef<T>)=>{
// //         if ( this.state.headerDef) {

// //           if (onSort){
// //             let newData =  this.state.headerDef
// //             let indexN =  this.state.headerDef.indexOf(data)
// //             newData[indexN] = {...data,sortType:sortType} 
// //               this.setState({ dataRow:onSort(sortType.sortType), headerDef:newData})
// //           }
         
// //         }
      
  
// //     }

// //     selectSortType = (data:IHeaderDef<T>)=>{
// //         if (data.onSort){
// //             switch(data.sortType?.sortType){
// //                 case "ascending":                 
// //             return   <div >{ data.title}{this.upSvg(data)}</div>
// //                 case "descending": 
// //                     return <div >{ data.title}{this.downSvg(data)}</div>            
// //                 case "none":
// //                     return <div >{ data.title}{this.sortSvg(data)}</div>                
// //                 default: return <div >{ data.title}{this.sortSvg(data)}</div> 
// //             }
          
// //         }
    
// // return data.title
// //     }


// //     sortSvg = (data:ICatodcolumnDefs<T>)=>{
// //         return <svg height="15" width="20" name="sort" onClick={()=>this.sortHandle({sortType:"ascending"},data.onSort,data)}>
// //         <polyline points="8,5 11,0 14,5 11,0 11,15"
// //          className="sort-svg" 
// //         />
// //           <polyline points="5,0 5,15 2,10 5,15 8,10" className="sort-svg" />
// //           Sorry, your browser does not support inline SVG.
// //         </svg>
// //     }

// //     upSvg = (data:ICatodcolumnDefs<T>)=>{
// //         return  <svg height="15" width="10" name="up" onClick={()=>this.sortHandle({sortType:"descending"},data.onSort,data)}>
// //         <polyline points="2,5 5,0 8,5 5,0 5,15" className="sort-svg" />
// //         Sorry, your browser does not support inline SVG.
// //       </svg>
// //     }

// //     downSvg = (data:ICatodcolumnDefs<T>)=>{
// //         return  <svg height="15" width="10" name="up" onClick={()=>this.sortHandle({sortType:"none"},data.onSort,data)}>
// //         <polyline points="5,0 5,15 2,10 5,15 8,10 " className="sort-svg" />
// //         Sorry, your browser does not support inline SVG.
// //       </svg>
// //     }

// // displayGrid = ()=>{
   
// //     if (this.props.columnDef && this.props.dataRow){
// //         if (this.props.dataRow[0]&&this.props.columnDef[0]){
// //             return this.tableGrid() 
// //         }
// //     }
// //     return <p className="empty-grid">{this.props.message ? this.props.message : this.state.message}</p>
 
// // }
// // tableGrid = ()=>{
// //     return (
// //         <table className="table table-bordered table-sm table-hover">
// //         <thead className="back-header">
// //             <tr>
// //                 {this.state.headerDef?.map((item:IHeaderDef<T>) => {
// //                     return (
// //                         <th scope="col" key={item.key}>{this.selectSortType(item)}</th>
// //                     )
// //                 })}

// //             </tr>
// //         </thead>
// //         <tbody>
// //             {this.state.dataRow?.map((item: T, index:number) => {

// //                 return (
// //                     <tr key={index}>
// //                         {this.state.headerDef?.map((element: IHeaderDef<T>, id:number) => {
// //                             return (
// //                                 <td key={id}>
// //                                     {this.tableRow(item, element, element.key, this.props.actions)}

// //                                 </td>

// //                             )
// //                         })}
// //                     </tr>
// //                 )
// //             })}

// //         </tbody>
// //     </table>   
// //     )
// // }

// //     render() {
// //         return (

// //             <div className={this.state.textAlign?"grid-body":"grid-body-right"} >
// //                 {this.displayGrid()}
// //                         </div>

// //         )
// //     }

// // }