import React, {Component} from "react";

import TodoStore from '../store/TodoStore';
import * as TodoActions from "../actions/TodoActions";
import Todo from './Todo';
import InputForm from './InputForm';
import "../assets/css/App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: TodoStore.getAll()
        }
    }

    componentWillMount() {
        // This function will fire up when store will change
        TodoStore.on("change", () => {
            this.setState({
                todos: TodoStore.getAll()
            });
        });
    }

    createTodo() {
        // This is very static. Will make it dynamic from React form.
        TodoActions.createTodo(Date.now());
    }

    render() {
        const {todos} = this.state;  // get the todos state and copy to todos
        const TodoComponent = todos.map((todo) => {
            // return Todo component and send item as props
            if(todo.isCompleted)
                return <del><Todo item={todo.text} key={todo.id}/></del>;
            else
                return <Todo item={todo.text} key={todo.id}/>
        });

        return (
            <div className="App">
                <h1>TODO Application</h1>
                <InputForm/>

                <div className="todo">
                    {TodoComponent}
                </div>
            </div>
        );
    }
}

export default App;
