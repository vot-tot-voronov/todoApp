import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    txt: ''
  }
  setSearchLabel = (e) => {
    function ucFirst(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    }
    const value = ucFirst(e.target.value);
    this.setState({
        txt: value
    });
    this.props.setSearch(value);
  }
  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="Type to search"
             value={this.state.txt}
             onChange={this.setSearchLabel}/>
    );
  }
}