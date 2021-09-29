import React from 'react'
import "./HomePopUp.css"

class HomePopUp extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <iframe title={this.props.title} src={this.props.url}></iframe>
          <button onClick={this.props.closePopup}　className="closeBtn"><span>&times;</span></button>
        </div>
      </div>
    );
  }
}

export default HomePopUp
