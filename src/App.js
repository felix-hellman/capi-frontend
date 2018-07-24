import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      drinkstate: '',
      orderstate: '',
      count: 0,
      buttonstate: [],
      buttonfunctions: [],
      buttons: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

    mockRecipieRequest(){
        return JSON.stringify([
            {"name":"ALLBERRY","ingredients": {"vodka": 13,"cranberry": 37}},
            {"name":"IM COMING HOME PLS","ingredients": {"vodka": "kek","cranberry": 1239132}}
        ]);
    }

    mockMakeDrinkRequest(payload){
        console.log("I did thinks tho" + payload)
    }

    componentDidMount(){
        let rec = JSON.parse(this.mockRecipieRequest())
        let names = Object.keys(rec);
        let list = []
        names.forEach(e => {
            console.log(e)
            var f = new Function('', 'console.log("vodka, " + '+JSON.stringify(rec[e].ingredients.vodka)+');console.log("cranberry, " + '+JSON.stringify(rec[e].ingredients.cranberry)+' + "!");');
            let element = React.createElement( "button", { className: 'button' , onClick: f,},rec[e].name);
            let parent = React.createElement( "li" , {}, element);
            list.push(parent);
        });
        this.setState({buttonstate: list})
        this.checkStatus();
        this.timerId = setInterval(
            () => this.checkStatus(),
            3000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

  handleClick () {
    axios.get(')http://10.46.1.193:2000/demo')
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
        /*axios.get('http://10.46.1.193:2000/status')
         .then(response => this.setState({orderstate: JSON.stringify(response.data.Available)})
         );*/
  }

  render () {
    return (
      <div className='button__container'>
        <p>Pump available : {this.state.orderstate} </p>
        <ul>
        {this.state.buttonstate}
        </ul>
      </div>
    )
  }
}


export default App
