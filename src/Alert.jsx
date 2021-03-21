import React, { useEffect } from "react"

function Alert({ type, content, show, list, showAlert }) {
  useEffect(() => {
    const alert = setTimeout(() => {
      showAlert()
    }, 2000)
    return () => {
      clearTimeout(alert)
    }
  }, [list, showAlert])

  return (
    <div>
      <div
        className={`alert alert-${!show && "hide"} alert-${type}`}
        role="alert"
      >
        {content}
      </div>
    </div>
  )
}

export default Alert
