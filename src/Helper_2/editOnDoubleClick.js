import React, { Component } from 'react';

class Editpost extends Component {
    constructor() {
        super();
        this.state = {
            value: 'Some Text Here',
            isInEditMode: false,
        }
    }

    changeEditMode = () => {
        const { isInEditMode } = this.state;
        this.setState({
            isInEditMode: !isInEditMode
        })
        // console.log("should goto edit mode now")
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
    }

    renderEditView = () => {
        const { value } = this.state;
        return <div >
            <input type='text'
                defaultValue={value}
                ref='theTextInput' />
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>OK</button>
        </div>
    }

    renderDefaulView = () => {
        const { value } = this.state;
       return <div onDoubleClick={this.changeEditMode}>
            {value}
        </div>
    }

    render() {
        const { isInEditMode } = this.state;

        return isInEditMode ?
            this.renderEditView() : this.renderDefaulView()

    }
}

export default Editpost;
