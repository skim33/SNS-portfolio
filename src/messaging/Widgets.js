import React from 'react'

import InfoIcon from '@material-ui/icons/Info'
import FiberManualRecordIcon  from '@material-ui/icons/FiberManualRecord'

import './Widgets.css'

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>

      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>

    </div>
  )

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>Breaking News</h2>
        <InfoIcon />
      </div>

      {newsArticle("Profile Exchange's Net Worth: $1,000,000,000")}
      {newsArticle("A Facebook panel will reveal on Wednesday whether Trump will regain his megaphone.")}
      {newsArticle("Man shot by FBI agent outside CIA headquarters after allegedly pulling out a weapon")}
      {newsArticle("[이제는 디지털 교육이다] '백년대계' 1년 새 급")}
      {newsArticle("Amazonそっくり詐欺メール注意")}
      {newsArticle("'마야 원주민 학대' 사과한 멕시코 대통령…진짜 속내는 '이것'")}
    </div>
  )
}

export default Widgets
