import React from "react"

import "./HeaderOption.css"

function HeaderOption({ Icon, title, onClick, isToggled }) {
  return (
    <div onClick={onClick} className={`headerOption ${isToggled && 'toggled'}`}>
      {Icon && <Icon className="headerOption__icon" />}
      <span className={`headerOption__title ${isToggled && 'toggled'}`}>{title}</span>
    </div>
  )
}

export default HeaderOption
