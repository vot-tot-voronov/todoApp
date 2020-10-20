import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
    state = {
        label: ''
    }
    onLabelChange = (e) => {
        function ucFirst(str) {
            if (!str) return str;
            return str[0].toUpperCase() + str.slice(1);
        }
        const value = ucFirst(e.target.value);
        this.setState({
            label: value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        });
    };
    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text" 
                       className="form-control"
                       placeholder="What do you want to do?"
                       onChange={this.onLabelChange}
                       value={this.state.label}/> 
                <button className="btn btn-outline-secondary item-add-form-btn">
                    Add
                </button>
            </form>
        );
    }
}