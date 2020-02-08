import * as React from "react";
import { ICatodActions, IAgColumnDefs } from "./Models"

interface IProps<T> {
    colDef: IAgColumnDefs<T>
    data: T
}

interface IState<T> {
    actions: ICatodActions<T>[]
}

export class Actions<T> extends React.Component<IProps<T>, IState<T>>{
    constructor(props: IProps<T>) {
        super(props)
        this.state = { actions: [] }
    }

    componentDidMount() {
        if (this.props.colDef.cellEditorFramework) {
            this.setState({ actions: this.props.colDef.cellEditorFramework })
        }
    }

    render() {

        return (
            <div className="catod-actions">
                {this.state.actions ? this.state.actions.map((item: ICatodActions<T>, index: number) => {
                    return (
                        <span key={index}
                        title={item.title}
                            onClick={() => {
                                if (item.actionFn)
                                    item.actionFn(this.props.data)
                            }}
                            className={`fas fa-${item.icon}`}></span>
                    )
                }) : null}

            </div>
        )
    }

}