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

  checkStatus() {
        axios.get('http://10.46.1.193:2000/status')
         .then(response => this.setState({orderstate: JSON.stringify(response.data.Available)})
         );
  }

  render () {
    return (
      <div className='button__container'>
        <p>Pump available : {this.state.orderstate} </p>
        <button className='button' onClick={this.handleClick}>Order Drink</button>
        <p>{this.state.drinkstate}</p>
      </div>
    )
  }
}


export default App
