import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Order Fruit Item 5',
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Fix the problem in the car',
    isCompleted: false,
  },
  {
    id: 7,
    title: 'Confirm the slot for Friday',
    isCompleted: false,
  },
  {
    id: 8,
    title: 'Get me a new car',
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({ inputValue: event.target.value })
  }

  onAddTodo = event => {
    event.preventDefault()
    const { inputValue } = this.state
    const trimmedInput = inputValue.trim()

    if (trimmedInput === '') return

    const parts = trimmedInput.split(' ')
    const lastPart = parts[parts.length - 1]
    const parsedQuantity = parseInt(lastPart)

    let title = trimmedInput
    let quantity = 1

    if (!isNaN(parsedQuantity) && parsedQuantity > 0 && parts.length > 1) {
      title = parts.slice(0, parts.length - 1).join(' ')
      quantity = parsedQuantity
    }

    const newTodos = []
    for (let i = 0; i < quantity; i += 1) {
      newTodos.push({
        id: uuidv4(),
        title,
        isCompleted: false,
      })
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      inputValue: '',
    }))
  }

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  onToggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted }
        }
        return todo
      }),
    }))
  }

  onEditTodo = (id, updatedTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: updatedTitle }
        }
        return todo
      }),
    }))
  }

  render() {
    const { todosList, inputValue } = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>

          <form className="add-todo-form" onSubmit={this.onAddTodo}>
            <input
              type="text"
              className="add-input"
              value={inputValue}
              onChange={this.onChangeInput}
              placeholder="Enter todo title (e.g. Learn React 3)"
            />
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                onDeleteTodo={this.onDeleteTodo}
                onToggleComplete={this.onToggleComplete}
                onEditTodo={this.onEditTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
