import CSSTransitionGroup from "react-addons-css-transition-group"
import React from "react"

function List({ items, removeItem, editList, toggleChecked }) {
  return (
    <ul className="todo-lists">
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {items.map((item) => {
          return (
            <li
              className={`list-items ${item.checked && "done"}`}
              key={item.id}
            >
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="gender"
                  id={`${item.id}`}
                  value="male"
                  checked={item.checked}
                  onChange={() => toggleChecked(item.id)}
                />
                <label htmlFor={`${item.id}`}>{item.title}</label>
              </div>
              <span className="icons">
                <i
                  onClick={() => {
                    editList(item.id)
                  }}
                  className="fas fa-pen-square fa-lg edit-icon"
                ></i>
                <i
                  className="fas fa-trash fa-lg trash-icon"
                  onClick={() => {
                    removeItem(item.id)
                  }}
                ></i>
              </span>
            </li>
          )
        })}
      </CSSTransitionGroup>
    </ul>
  )
}

export default List
// {item.title}
