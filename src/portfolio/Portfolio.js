import React from 'react'

import PortFolioIcon from './PortfolioIcon'
import PortfolioPopUp from './PortfolioPopup'

import $ from "jquery"
import "../extremes.js"

import { Tooltip } from '@material-ui/core'
import { portfolioDetails } from './PortfolioDetails.js';

import './Portfolio.css'

class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      url: "",
      title: "",
      details: ""
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      open: false
    });
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.$el.extremes({
      diameter: 150
    });
  }

  componentWillUnmount() {
    this.$el.extremes("destroy");
  }

  render() {
    return (
      <div className={`home__body ${this.props.isToggled && 'toggled'}`}>
        <div className="icon"><PortFolioIcon /></div>
        <ul ref={el => this.el = el} className="popIn">
          <Tooltip 
            title={<div>Responsive Personal Website<br />- Basic Website using vanilla js<br /><br />・ HTML<br />・ CSS<br />・ JavaScript<br />&nbsp;&nbsp;- Library<br />&nbsp;&nbsp;&nbsp;&nbsp;・ jQuery<br />&nbsp;&nbsp;&nbsp;&nbsp;・ Three.js<br />&nbsp;&nbsp;&nbsp;&nbsp;・ anime.js</div>} 
            placement="right-start"
          >
            <li className="link" onClick={() => this.setState({open: !this.state.open, url: "https://shawn-kim-website.herokuapp.com", title: 'Shawn Kim Website', details: portfolioDetails[0]})}>
              {portfolioDetails[0].name}
            </li>
          </Tooltip>
          
          <Tooltip 
            title={<div>Offline PvP Chess Game<br /><br />・ React, RxJS - Frontend<br />&nbsp;&nbsp;- React DnD<br />・ JavaScript<br />&nbsp;&nbsp;- Library<br />&nbsp;&nbsp;&nbsp;&nbsp;・ Chess.js</div>} 
            placement="right-start"
          >
            <li className="link" onClick={() => this.setState({open: !this.state.open, url: "https://chess-17050.web.app", title: "Chess", details: portfolioDetails[1]})}>
              {portfolioDetails[1].name}
            </li>
          </Tooltip>
          
          <Tooltip 
            title={<div>Typical Cafe Website<br />・ Simple mobile responsive webiste<br /><br />・ React - Frontend<br />・ JavaScript<br />&nbsp;&nbsp;- Library<br />&nbsp;&nbsp;&nbsp;&nbsp;・ styled-components(Component library)<br />&nbsp;&nbsp;&nbsp;&nbsp;・ GSAP (Animation)<br />・ APIs<br />&nbsp;&nbsp;- Maps Javascript API</div>} 
            placement="right-end"
          >
            <li className="link" onClick={() => this.setState({open: !this.state.open, url: "https://shawn-kim-cafe-website.netlify.app/", title: "Cafe", details: portfolioDetails[2]})}>
              {portfolioDetails[2].name}
            </li>
          </Tooltip>
        
          <Tooltip 
            title={<div>Fully functional eCommerce Application<br />・ Test gateway:<br />&nbsp;&nbsp;- Credit card number: 4242 4242 4242 4242<br />&nbsp;&nbsp;- Expiration date: 04/24<br />&nbsp;&nbsp;- CVC: 242<br />&nbsp;&nbsp;- ZIP: 42424<br /><br />- React - Frontend<br />- Commerce.js - Backend<br /></div>} 
            placement="right-start"
          >
            <li className="link" onClick={() => this.setState({open: !this.state.open, url: "https://shawn-kim-ecommerce.netlify.app", title: "E-Commerce", details: portfolioDetails[3]})}>
              {portfolioDetails[3].name}
            </li>
          </Tooltip>
        
          <Tooltip 
            title={<div>Realtime Chat App<br />・ Log In<br />&nbsp;&nbsp;- User ID: Shawn<br />&nbsp;&nbsp;- Password: 123123<br /><br />・ React - Frontend<br />&nbsp;&nbsp;- React Chat Engine - Serverless chat API<br />・ JavaScript<br />&nbsp;&nbsp;- Library<br />&nbsp;&nbsp;&nbsp;&nbsp;・ Axios</div>} 
            placement="right-end"
          >
            <li className="link" onClick={() => this.setState({open: !this.state.open, url: "https://shawn-kim-chat-app.netlify.app", title: "Chat", details: portfolioDetails[4]})}>
              {portfolioDetails[4].name}
            </li>
          </Tooltip>
        
          <Tooltip 
            title={<div>Google Maps Travel Companion Application<br />・ Currently not working due to the consumption of all the allocated API calls under the subscription to the Travel Advisor API<br /><br />・ React - Frontend<br />・ JavaScript<br />&nbsp;&nbsp;- Library<br />&nbsp;&nbsp;&nbsp;&nbsp;・ Axios<br />・ APIs<br />&nbsp;&nbsp;- Travel Advisor API<br />&nbsp;&nbsp;- Open Weather Map API</div>} 
            placement="right-end"
          >
            <li className="link" onClick={() => this.setState({open: !this.state.open, url: "https://travel-advisor-api.netlify.app/", title: "Trip Advisor", details: portfolioDetails[5]})}>
              {portfolioDetails[5].name}
            </li>
          </Tooltip>
        
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
          <li><a className="link" href="http://shawn-kim-website.herokuapp.com">Coming soon...</a></li>
        </ul>
        
        <PortfolioPopUp open={this.state.open} onClose={this.closeModal} url={this.state.url} title={this.state.title} details={this.state.details} isToggled={this.props.isToggled} />
      </div>
    
    )
  }
}

export default Portfolio
