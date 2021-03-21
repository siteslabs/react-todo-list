import React, { useEffect, useState } from "react"
import Alert from "./Alert"
import List from "./List"

const initialList = () => {
  const list = JSON.parse(localStorage.getItem("todo-list"))
  if (list) {
    return list
  }
  return []
}

const App = () => {
  const [text, setText] = useState(""),
    [alert, setAlert] = useState({
      type: "",
      content: "",
      show: false,
    }),
    [list, setList] = useState(initialList()),
    [edit, setEdit] = useState(false),
    [editId, setEditId] = useState(0),
    changeHandler = (e) => {
      setText(e.target.value)
    },
    submitHandler = (e) => {
      e.preventDefault()
      if (!text) {
        showAlert("warning", "Emty value", true)
      } else if (text && edit) {
        setList(
          list.map((item) => {
            if (item.id === editId) {
              item.title = text
            }
            return item
          })
        )
        setEdit(false)
        setText("")
        setEditId(0)
      } else {
        setList([
          ...list,
          { title: text, id: new Date().getTime(), checked: false },
        ])
        showAlert("success", "New todo has been added", true)
        setText("")
      }
    },
    removeItem = (id) => {
      setList(list.filter((item) => item.id !== id))

      showAlert("danger", "Todo has been removed", true, "removed")
    },
    showAlert = (type = "", content = "", show = false) => {
      setAlert({ type, content, show })
    },
    clearList = () => {
      setList([])
      showAlert("danger", "List is cleared", true)
    },
    editList = (id) => {
      setText(list.find((item) => item.id === id).title)
      setList(
        list.map((item) => {
          if (item.id === id) {
            item.animateClass = "remove"
          }
          return item
        })
      )
      setEditId(id)
      setEdit(true)
      showAlert("warning", "editing", true)
    },
    toggleChecked = (id) => {
      setList(
        list.map((item) => {
          if (item.id === id) {
            return { ...item, checked: !item.checked }
          }
          return item
        })
      )
    }

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list))
  }, [list])

  return (
    <div className="container">
      <div className="todo-list">
        <div className="todo-list__title">works to be done</div>

        {alert && <Alert {...alert} list={list} showAlert={showAlert} />}
        <form className="todo-list__form" onSubmit={submitHandler}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="New Todo"
              value={text}
              onChange={changeHandler}
            />
            <button className="submit-btn btn" id="button-addon2">
              <i className="fas fa-plus-square fa-lg plus-icon"></i>
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div>
            <List
              items={list}
              editList={editList}
              removeItem={removeItem}
              toggleChecked={toggleChecked}
            />
            <div className="remove-btn">
              <button className="remove" onClick={clearList}>
                CLEAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
