import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      drinkstate: '',
      orderstate: '',
      count: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

    componentDidMount(){
        this.checkStatus()
        this.timerId = setInterval(
            () => this.checkStatus(),
            3000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

  handleClick () {
    axios.get('http://10.46.1.193:2000/demo')
      .then(response => this.setState({drinkstate: response.data.name}));
    this.checkStatus();
  }
    orderVodkaCranberry(){
        axios.get('http://10.46.1.193:2000/cranberryvodka'
        ).then(response => this.setState({drinkstate: response.data.name}));
        this.checkStatus();
    }
    orderVodka(){
        axios.get('http://10.46.1.193:2000/vodka')
        .then(response => this.setState({drinkstate: response.data.name}));
        this.checkStatus();
    }


  checkStatus() {
        axios.get('http://10.46.1.193:2000/status')
         .then(response => this.setState({orderstate: JSON.stringify(response.data.Available)})
         );
  }

  render () {
    return (
      <div className='button__container'>
        <p>Pump available : {this.state.orderstate} </p>
        <ul><li>
        <button className='button' onClick={this.handleClick}>Order Trustly Special 6Cl</button></li>

        <li><button className='button' onClick={this.orderVodkaCranberry}>Order Vodka Cranberry 6cl</button></li>
        <li><button className='button' onClick={this.orderVodka}>Order Vodka 6cl</button></li>
        </ul>
        <p>{this.state.drinkstate}</p>
      </div>
    )
  }
}


export default App
