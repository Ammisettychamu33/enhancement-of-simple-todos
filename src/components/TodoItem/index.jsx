import { useState } from 'react'
import './index.css'

const TodoItem = props => {
  const { todoDetails, onDeleteTodo, onToggleComplete, onEditTodo } = props
  const { id, title, isCompleted } = todoDetails

  const [isEditing, setIsEditing] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(title)

  const onClickEditSave = () => {
    if (isEditing) {
      if (updatedTitle.trim() !== '') {
        onEditTodo(id, updatedTitle.trim())
      }
    }
    setIsEditing(prev => !prev)
  }

  const onChangeTitle = event => {
    setUpdatedTitle(event.target.value)
  }

  return (
    <li className="todo-item">
      <div className="todo-item-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isCompleted}
          onChange={() => onToggleComplete(id)}
        />
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={updatedTitle}
            onChange={onChangeTitle}
          />
        ) : (
          <p className={`title-text ${isCompleted ? 'completed' : ''}`}>
            {title}
          </p>
        )}
      </div>

      <div className="buttons-container">
        <button
          type="button"
          className="edit-save-btn"
          onClick={onClickEditSave}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDeleteTodo(id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
