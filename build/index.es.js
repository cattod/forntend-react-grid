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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
                React__default.createElement("span", { title: item.title, className: "" + item.icon }),
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
var Grid1 = /** @class */ (function (_super) {
    __extends(Grid1, _super);
    function Grid1(props) {
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
            var _a;
            if (data.sortable) {
                for (var i in _this.state.sortType) {
                    if (data.key === ((_a = _this.state.sortType[i]) === null || _a === void 0 ? void 0 : _a.columnKey)) {
                        switch (_this.state.sortType[i].sortType) {
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
                    else {
                        if (!_this.props.multiSort) {
                            return React__default.createElement("div", null,
                                data.title,
                                _this.unsortSVG(data));
                        }
                    }
                }
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
            return React__default.createElement("div", { className: "scroll table-responsive" }, _this.tableGrid());
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
            return (React__default.createElement("table", { className: _this.props.className + " table " + (_this.props.actions ? "row-hover-catod" : "") },
                _this.props.dataRow.length < 1 ? React__default.createElement("caption", { className: "empty-grid" }, _this.props.message ? _this.props.message : _this.state.message) : null,
                React__default.createElement("thead", { className: "back-header" },
                    React__default.createElement("tr", null, (_a = _this.state.headerDef) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                        return (React__default.createElement("th", { scope: "col", key: item.key, id: item.key }, _this.selectSortType(item)));
                    }))),
                React__default.createElement("tbody", null, _this.props.dataRow.map(function (item, index) {
                    var _a;
                    return (React__default.createElement("tr", { key: index }, (_a = _this.state.headerDef) === null || _a === void 0 ? void 0 : _a.map(function (element, id) {
                        return (React__default.createElement("td", { key: id, className: "break-text-grid" }, _this.rowCell(item, element, element.key, _this.props.actions)));
                    })));
                }))));
        };
        _this.state = {
            lastSortType: [],
            headerDef: undefined,
            message: EnumConsts.ThereIsNotAnyDataToShowInGrid,
            textAlign: true,
            sortType: []
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
    Grid1.prototype.componentDidMount = function () {
        var _a, _b;
        var element = document.querySelector('.grid-body');
        var style = element ? getComputedStyle(element) : "";
        var _TA = this.state.textAlign;
        var newHeader = this.props.columnDef;
        var newSortType = [];
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
            });
        }
        if (newHeader.length) {
            for (var _i = 0, newHeader_1 = newHeader; _i < newHeader_1.length; _i++) {
                var item = newHeader_1[_i];
                if (item.sortable) {
                    newSortType.push({ columnKey: item.key, sortType: "none" });
                }
            }
        }
        if ((_b = this.props.defaultSort) === null || _b === void 0 ? void 0 : _b.length) {
            for (var j in this.props.defaultSort) {
                for (var i in newSortType) {
                    if (this.props.defaultSort[j].columnKey === newSortType[i].columnKey) {
                        newSortType.splice(Number(i), 1);
                        newSortType.unshift(this.props.defaultSort[j]);
                    }
                }
            }
        }
        //update state for new changes
        this.setState({ headerDef: newHeader, textAlign: _TA, sortType: newSortType, lastSortType: newSortType });
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
    Grid1.prototype.sortHandle = function (sortType, key) {
        return __awaiter(this, void 0, void 0, function () {
            var newSortType, j, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newSortType = this.state.sortType;
                        if (!this.props.multiSort) {
                            for (j in this.state.sortType) {
                                newSortType[j].sortType = "none";
                                if (this.state.sortType[j].columnKey === key) {
                                    newSortType.splice(Number(j), 1);
                                    newSortType.unshift({ sortType: sortType.sortType, columnKey: key });
                                }
                            }
                        }
                        else {
                            for (j in this.state.sortType) {
                                if (this.state.sortType[j].columnKey === key) {
                                    newSortType.splice(Number(j), 1);
                                    newSortType.unshift({ sortType: sortType.sortType, columnKey: key });
                                }
                            }
                        }
                        if (!this.state.headerDef) return [3 /*break*/, 2];
                        if (!this.props.onSort) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.onSort(newSortType)];
                    case 1:
                        _a.sent();
                        this.setState({ sortType: newSortType });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Grid1.prototype.render = function () {
        return (React__default.createElement("div", { className: this.state.textAlign ? "grid-body" : "grid-body-right" }, this.displayGrid()));
    };
    return Grid1;
}(React.Component));
var Grid = React__default.memo(Grid1);

var CatodGrid = /** @class */ (function (_super) {
    __extends(CatodGrid, _super);
    function CatodGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CatodGrid.prototype.render = function () {
        return (React.createElement(Grid, { columnDef: this.props.columnDef, dataRow: this.props.dataRow, actions: this.props.actions, message: this.props.message, direction: this.props.direction, onSort: this.props.onSort, multiSort: this.props.multiSort, className: this.props.className }));
    };
    return CatodGrid;
}(React.Component));

exports.CatodGrid = CatodGrid;
//# sourceMappingURL=index.es.js.map
