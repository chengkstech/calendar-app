import React, { Component } from 'react';
import lists from '../../data/lists.json';
import '../todolist/Todo.scss';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            task: "",
            listOfTasks: [],
            receivedTask: false,
            completedTaskOfList: false,
            disabledCheckbox: false,
            value: props.value,
            currentDay: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderListOfTasks = this.renderListOfTasks.bind(this);
        this.addListFirstTimeToJson = this.addListFirstTimeToJson.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        this.setState({
            task: event.target.value
        })
    }

    handleSubmit() {
        // Bij de eerste keer een een lijst aanmaken moet ie pushen. Anders, wanneer alleen iets toevoegen aan bestaande array: concatten (conditional statement)
        // Why? Als je de eerste keer een lijst aanmaakt: stopt ie alles wel in een array. later als je nog iets anders wil toevoegen, dus lijst voor 2e keer wijzigen: doet niks. wijzigt de array niet.
        // if () {
        this.state.listOfTasks.push(this.state.task);
        // } else {
        //     this.state.listOfTasks.concat(this.state.task);
        // }
        this.setState({
            receivedTask: true
        })
        this.addListFirstTimeToJson();
    }

    addListFirstTimeToJson() {
        const toDoTasks = lists.find(toDo => {
            return toDo.date === `${this.props.value.getDate()}-${this.props.value.getMonth()}-${this.props.value.getYear()}`;
        });

        // console.log(`${this.props.value.getDate()}-${this.props.value.getMonth()}-${this.props.value.getYear()}`);
        if (!toDoTasks) {
            lists.push({
                date: `${this.props.value.getDate()}-${this.props.value.getMonth()}-${this.props.value.getYear()}`,
                tasks: this.state.listOfTasks
            });
        } else {
            toDoTasks.tasks.push(this.state.listOfTasks[this.state.listOfTasks.length - 1]);
        }

        console.log(JSON.stringify(lists));
    }

    disableCheckboxAfterCheck(index) {
        let ref = 'ref_' + index;
        this.refs[ref].disabled = !this.refs[ref].disabled;
        console.log("You completed the following task: " + ref);
    }

    handleDelete(task) {
        const toDoTasks = lists.find(toDo => {
            return toDo.date === `${this.props.value.getDate()}-${this.props.value.getMonth()}-${this.props.value.getYear()}`;
        });

        const index = toDoTasks.tasks.indexOf(task);
        
        toDoTasks.tasks.splice(index, 1);
        console.log(JSON.stringify(lists));
        this.forceUpdate();
    }

    renderListOfTasks() {
        const toDoTasks = lists.find(toDo => {
            return toDo.date === `${this.props.value.getDate()}-${this.props.value.getMonth()}-${this.props.value.getYear()}`;
        });
        
        if (!toDoTasks) {
            return <div>
            </div>
        }
        const taskLists = toDoTasks.tasks.map((u, index) => {
            return <>
                <div className='todo-item' >
                    <input type="checkbox"
                        key={u}
                        index={index}
                        onClick={() => this.disableCheckboxAfterCheck(index)}
                        // disabled={this.state.disabledCheckbox}
                        ref={'ref_' + index}
                        className="todo-task" />
                    <label className="todo-task" htmlFor="">{u}</label>
                    <div className="todo-remove-btn" key={index} onClick={() => this.handleDelete(u)}>X</div>
                </div>
            </>
        }
        )
        return (
            <div>
                {taskLists}
            </div>
        )
    }

    render() {
        return (
            <div className="todo-container">
                <h1 className="todo-title">ToDolist</h1>
                <div className="todo__fields">
                    <input className="todo__input" type="text" onChange={this.handleChange} />
                </div>
                <div className="todo__fields">
                    <button className="todo__fields__button" onClick={this.handleSubmit}>Add task to my ToDolist</button>
                </div>
                <div>
                    {this.renderListOfTasks()}
                </div>
            </div>
        )
    }
}

// Issues: 
// 1. Everything is checked but when removing one item, it unchecks the other items
// 2. When removing the an item, doesn't remove that paticular item, but the removes others that existed before

export default Todo;