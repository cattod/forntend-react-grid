import React, { Component } from "react";
import { ICatodActions, ICatodcolumnDefs } from "./Model"
import "./grid.scss"

interface IProps<T> {
    rowData: T,
    colDef: ICatodcolumnDefs<T>
    actionsCatod: ICatodActions<T>[]
}
export class Actions<T> extends Component<IProps<T>>{
    render() {

        return (
            <div className="action-cattod">
                {this.props.actionsCatod ? this.props.actionsCatod.map((item: ICatodActions<T>, index: number) => {
                    return (

                        <button key={index}
                            onClick={() => {
                                if (item.actionFn)
                                    item.actionFn(this.props.rowData)
                            }}
                            type="button" className="btn btn-light btn-sm action-padding"
                        >

                            <span
                                title={item.title}
                                className={`fas fa-${item.icon}`}
                            >
                            </span>
                            {item.title}
                        </button>
                    )
                }) : null}

            </div>
        )
    }
}