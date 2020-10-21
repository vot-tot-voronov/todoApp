import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    txt: '',
    status: 'all'
  };
  createTodoItem(text) {
    return {
      label: text,
      done: false,
      important: false,
      id: this.maxId++
    }
  };
  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      }
    });
  };
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ]
      return {
        todoData: newArray
      };
    });
  };
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };
  setTextState = (text) => {
    this.setState({
      txt: text
    })
  }
  searchLabel = (array, txt) => {
    if (txt === '') {
      return array;
    }
    return array.filter(el => {
      return el.label.includes(txt);
    });
  };
  statusFilter = (array, status) => {
    switch (status) {
      case 'all': 
        return array;
      case 'active':
        return array.filter(el => !el.done);
      case 'done':
        return array.filter(el => el.done);
      default:
        return array;
    }
  };
  onStatusChange = (status) => {
    this.setState({
      status: status
    });
  };


  render() {
    const { todoData, txt, status } = this.state;
    const visibleItems = this.statusFilter(this.searchLabel(todoData, txt), status);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.filter(el => !el.done).length;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel setSearch={this.setTextState}/>
          <ItemStatusFilter status={status}
                            onStatusChange={this.onStatusChange} />
        </div>
        <TodoList 
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <ItemAddForm addItem={ this.addItem }/>
      </div>
    );
  }
};