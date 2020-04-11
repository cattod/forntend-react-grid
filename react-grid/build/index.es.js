'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Actions = /** @class */ (function (_super) {
    __extends(Actions, _super);
    function Actions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Actions.prototype.render = function () {
        var _this = this;
        return (React__default.createElement("div", { className: "action-cattod" }, this.props.actionsCatod ? this.props.actionsCatod.map(function (item, index) {
            return (React__default.createElement("button", { key: index, onClick: function () {
                    if (item.actionFn)
                        item.actionFn(_this.props.rowData);
                }, type: "button", className: "btn btn-light btn-sm action-padding" },
                React__default.createElement("span", { title: item.title, className: "fas fa-" + item.icon }),
                item.title));
        }) : null));
    };
    return Actions;
}(React.Component));

var EnumConsts;
(function (EnumConsts) {
    EnumConsts["ThereIsNotAnyDataToShowInGrid"] = "There is not any data to show in grid";
    EnumConsts["None"] = "none";
    EnumConsts["RTL"] = "rtl";
    EnumConsts["Action"] = "action";
    EnumConsts["Descending"] = "descending";
    EnumConsts["Ascending"] = "ascending";
    EnumConsts["Right"] = "right";
    EnumConsts["Left"] = "left";
})(EnumConsts || (EnumConsts = {}));

//CatodGrid component
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(props) {
        var _this = _super.call(this, props) || this;
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
        _this.rowCell = function (rowData, colDef, key, actions) {
            // there is a discrete for action data, which need our component definition
            if (key === EnumConsts.Action && actions) {
                return React__default.createElement(Actions, { rowData: rowData, colDef: colDef, actionsCatod: actions });
            }
            else {
                return colDef.displayValue(rowData);
            }
        };
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
        _this.sortHandle = function (sortType, key) {
            if (_this.state.headerDef) {
                if (_this.props.onSort) {
                    _this.props.onSort(key, sortType.sortType);
                }
                _this.setState({ sortType: { type: sortType.sortType, key: key } });
            }
        };
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
        _this.selectSortType = function (data) {
            if (data.sortable) {
                if (data.key === _this.state.sortType.key) {
                    switch (_this.state.sortType.type) {
                        case EnumConsts.Ascending:
                            return React__default.createElement("div", null,
                                data.title,
                                _this.upSvg(data));
                        case EnumConsts.Descending:
                            return React__default.createElement("div", null,
                                data.title,
                                _this.downSvg(data));
                        case EnumConsts.None:
                            return React__default.createElement("div", null,
                                data.title,
                                _this.unsortSVG(data));
                        default: return React__default.createElement("div", null,
                            data.title,
                            _this.unsortSVG(data));
                    }
                }
                else
                    return React__default.createElement("div", null,
                        data.title,
                        _this.unsortSVG(data));
            }
            return data.title;
        };
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
        _this.unsortSVG = function (data) {
            return React__default.createElement("svg", { height: "15", width: "20", name: "sort", onClick: function () { return _this.sortHandle({ sortType: EnumConsts.Ascending }, data.key); } },
                React__default.createElement("polyline", { points: "8,5 11,0 14,5 11,0 11,15", className: "sort-svg" }),
                React__default.createElement("polyline", { points: "5,0 5,15 2,10 5,15 8,10", className: "sort-svg" }),
                "Sorry, your browser does not support inline SVG.");
        };
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
        _this.upSvg = function (data) {
            return React__default.createElement("svg", { height: "15", width: "10", name: "up", onClick: function () { return _this.sortHandle({ sortType: EnumConsts.Descending }, data.key); } },
                React__default.createElement("polyline", { points: "2,5 5,0 8,5 5,0 5,15", className: "sort-svg" }),
                "Sorry, your browser does not support inline SVG.");
        };
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
        _this.downSvg = function (data) {
            return React__default.createElement("svg", { height: "15", width: "10", name: "up", onClick: function () { return _this.sortHandle({ sortType: EnumConsts.None }, data.key); } },
                React__default.createElement("polyline", { points: "5,0 5,15 2,10 5,15 8,10 ", className: "sort-svg" }),
                "Sorry, your browser does not support inline SVG.");
        };
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
        _this.displayGrid = function () {
            if (_this.props.dataRow.length < 1 && _this.props.columnDef.length < 1) {
                return React__default.createElement("p", { className: "empty-grid" }, _this.props.message ?
                    _this.props.message :
                    _this.state.message);
            }
            else if (_this.props.dataRow.length < 1 && _this.props.columnDef.length > 0) {
                return (React__default.createElement("div", null,
                    _this.tableGrid(),
                    React__default.createElement("p", { className: "empty-grid" }, _this.props.message ? _this.props.message : _this.state.message)));
            }
            return _this.tableGrid();
        };
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
        _this.tableGrid = function () {
            var _a;
            //
            return (React__default.createElement("table", { className: "table table-bordered table-sm table-hover row-hover-catod" },
                React__default.createElement("thead", { className: "back-header" },
                    React__default.createElement("tr", null, (_a = _this.state.headerDef) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                        return (React__default.createElement("th", { scope: "col", key: item.key, id: item.key }, _this.selectSortType(item)));
                    }))),
                React__default.createElement("tbody", null, _this.props.dataRow.map(function (item, index) {
                    var _a;
                    return (React__default.createElement("tr", { key: index }, (_a = _this.state.headerDef) === null || _a === void 0 ? void 0 : _a.map(function (element, id) {
                        return (React__default.createElement("td", { key: id }, _this.rowCell(item, element, element.key, _this.props.actions)));
                    })));
                }))));
        };
        _this.state = {
            headerDef: undefined,
            message: EnumConsts.ThereIsNotAnyDataToShowInGrid,
            textAlign: true,
            sortType: { type: "", key: "" }
            // sortType:{sortType:EnumConsts.None}     
        };
        return _this;
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
    Grid.prototype.componentDidMount = function () {
        var _a;
        var element = document.querySelector('.grid-body');
        var style = element ? getComputedStyle(element) : "";
        var _TA = this.state.textAlign;
        var newHeader = this.props.columnDef;
        //check for direction in props and parent project direction
        if (this.props.direction) {
            _TA = this.props.direction === "right" ? false : true;
        }
        else {
            if (style !== "") {
                if (style.direction === EnumConsts.RTL) {
                    _TA = false;
                }
            }
        }
        //check for action in grid props and add column to grid
        if (this.props.actions) {
            (_a = newHeader) === null || _a === void 0 ? void 0 : _a.push({
                title: "",
                key: EnumConsts.Action,
                displayValue: function () { return ""; },
                valueGetter: function () { return ""; }
            });
        }
        //update state for new changes
        this.setState({ headerDef: newHeader, textAlign: _TA });
    };
    Grid.prototype.render = function () {
        return (React__default.createElement("div", { className: this.state.textAlign ? "grid-body" : "grid-body-right" }, this.displayGrid()));
    };
    return Grid;
}(React.Component));
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

var CatodGrid = /** @class */ (function (_super) {
    __extends(CatodGrid, _super);
    function CatodGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CatodGrid.prototype.render = function () {
        return (React.createElement(Grid, { columnDef: this.props.columnDef, dataRow: this.props.dataRow, actions: this.props.actions, message: this.props.message }));
    };
    return CatodGrid;
}(React.Component));

exports.CatodGrid = CatodGrid;
//# sourceMappingURL=index.es.js.map
