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

var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(props) {
        var _this = _super.call(this, props) || this;
        _this._textAlign = true;
        _this.createHeader = function (newData) {
            //    let newData =  this.props.dataRow 
            // let newCol = Object.keys(newData[0])  
            var newCol = Object.keys(newData[0]).map(function (item) {
                return {
                    title: item[0].toUpperCase() + item.slice(1),
                    key: item,
                    icon: ""
                };
            });
            return newCol;
        };
        _this.state = { loading: false,
            headerDef: undefined,
            message: "There is not any data for show in grid",
            textAlign: true
        };
        return _this;
    }
    Grid.prototype.componentDidMount = function () {
        var _a;
        var element = document.querySelector('.grid-body');
        var style = element ? getComputedStyle(element) : "";
        var _TA = this.state.textAlign;
        if (style !== "") {
            if (style.direction === "rtl") {
                _TA = false;
            }
        }
        var newHeader = undefined;
        if (this.props.dataRow && !this.props.columnDef) {
            newHeader = this.createHeader(this.props.dataRow);
        }
        else if (this.props.columnDef) {
            newHeader = this.props.columnDef;
            // this.setState({headerDef:this.props.columnDef})
        }
        if (this.props.actions) {
            (_a = newHeader) === null || _a === void 0 ? void 0 : _a.push({ title: "", key: "action", icon: "" });
        }
        this.setState({ headerDef: newHeader, textAlign: _TA });
    };
    Grid.prototype.tableRow = function (rowData, colDef, key, actions) {
        if (key === "action" && actions) {
            return React__default.createElement(Actions, { rowData: rowData, colDef: colDef, actionsCatod: actions });
        }
        else {
            if (colDef.displayValue && colDef.valueGetter) {
                return rowData[key];
            }
            else if (colDef.displayValue) {
                return colDef.displayValue(rowData);
            }
            else if (colDef.valueGetter) {
                return colDef.valueGetter(rowData);
            }
            else
                return rowData[key];
        }
    };
    Grid.prototype.render = function () {
        var _this = this;
        var _a, _b;
        return (React__default.createElement("div", { className: this.state.textAlign ? "grid-body" : "grid-body-right" },
            this.state.loading ? React__default.createElement("div", null, "loading...") :
                React__default.createElement("table", { className: "table table-bordered table-sm table-hover" },
                    React__default.createElement("thead", { className: "back-header" },
                        React__default.createElement("tr", null, (_a = this.state.headerDef) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                            return (React__default.createElement("th", { scope: "col", key: item.key }, item.title));
                        }))),
                    React__default.createElement("tbody", null, (_b = this.props.dataRow) === null || _b === void 0 ? void 0 : _b.map(function (item, index) {
                        var _a;
                        return (React__default.createElement("tr", { key: index }, (_a = _this.state.headerDef) === null || _a === void 0 ? void 0 : _a.map(function (element, id) {
                            return (React__default.createElement("td", { key: id }, _this.tableRow(item, element, element.key, _this.props.actions)));
                        })));
                    }))),
            !this.props.columnDef && !this.props.dataRow ? React__default.createElement("p", { className: "empty-grid" }, this.props.message ? this.props.message : this.state.message) : null));
    };
    return Grid;
}(React.Component));

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
//# sourceMappingURL=index.js.map
