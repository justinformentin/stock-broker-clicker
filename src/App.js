import React, { Component } from 'react';
import './App.css';
import Item from './components/Item/Item';

const roundNumber = (number) => {
  return (Math.round(number * 100) / 100 );
};

class App extends Component {
  constructor(props) {
    super (props);
    this.state = {
      score: 0,
      increment: 1,
      itemIncrement: 0,
      intern: {
        name: "Intern (+1/c)",
        quantity: 0,
        basePrice: 15,
        price: 15,
        incAmount: 1
      },
      trader: {
        name: "Trader (+5/s)",
        quantity: 0,
        basePrice: 100,
        price: 100,
        incAmount: 5
      },
      tradingAlgorithm: {
        name: "Trading Algorithm (+10/s)",
        quantity: 0,
        basePrice: 500,
        price: 500,
        incAmount: 10
      },
      insiderTrader: {
        name: "Insider Trader (+50/c)",
        quantity: 0,
        basePrice: 1100,
        price: 1100,
        incAmount: 50
      },
      lobbyist: {
        name: "Lobbyist (+100/s)",
        quantity: 0,
        basePrice: 6000,
        price: 6000,
        incAmount: 100
      },
      bank: {
        name: "Bank (+200/s)",
        quantity: 0,
        basePrice: 20000,
        price: 20000,
        incAmount: 200
      },
      itemPrice: (item) => {
        return (item.basePrice * Math.pow(1.15, item.quantity));
      },
      addScore: () => {
        this.setState({ score: this.state.score + this.state.increment});
      },
      toggleBuyMenu: () => {
        let buyMenu = document.getElementById("buy-area-mobile");
        let gameArea = document.getElementById("click-area-items");
        if (buyMenu.style.display === "none") {
          buyMenu.style.display = "block";
          gameArea.style.display = "none";
        } else {
          buyMenu.style.display = "none";
          gameArea.style.display = "block";
        }
      },
      buyClickItem: (item) => {
        if (this.state.score >= item.price) {
          this.setState({ score: this.state.score - item.price});
          this.setState({ increment: roundNumber(this.state.increment + item.incAmount)});
          item.quantity++;
          item.price = Math.round((item.basePrice * Math.pow(1.15, item.quantity) * 100) / 100 );
            }
          },
      buyIdleItem: (item) => {
        if (this.state.score >= item.price) {
          this.setState({ score: this.state.score - item.price});
          this.setState({ itemIncrement: roundNumber(this.state.itemIncrement + item.incAmount)});
          item.quantity++;
          item.price = Math.round((item.basePrice * Math.pow(1.15, item.quantity) * 100) / 100);
        }
      },
      incrementItem: () => {
        if (this.state.itemIncrement > 0) {
        this.setState({score: roundNumber(this.state.score + this.state.itemIncrement)});
        setTimeout(this.state.incrementItem, 250);
        } else {
        setTimeout(this.state.incrementItem, 250);
        }
      },
      saveGame: () => {
        localStorage.setItem('saveData', JSON.stringify(this.state));
        console.log('game saved');
      },
      loadGame: () => {
        this.setState(() => JSON.parse(localStorage.getItem("saveData")));
        console.log(JSON.parse(localStorage.getItem("saveData")));
      },
      autoSave: () => {
        this.state.saveGame();
        setTimeout(this.state.autoSave, 15000);
      },
    };
  }
  componentWillMount() {
    if (JSON.parse(localStorage.getItem("saveData")) != null) {
      this.setState(() => JSON.parse(localStorage.getItem("saveData")));
      console.log('game loaded from previous save');
    }
  }
  componentDidMount() {
    this.state.incrementItem();
    this.state.autoSave();
  }
  render() {
    return (
      <div id="body" className="flex vertical">
        <div className="flex" id="site-title">
          <p>Stock Broker Clicker</p>
        </div>
        <div className="flex" id="game-body">
          <div className="flex vertical" id="click-area">
            <div id="click-area-items">
              <p>${this.state.score}</p>
              <button onClick={this.state.addScore}><img src="./coin.png" alt="Gold Coin" /></button>
              <div className="increment-text">
                <p>$ Per Click: {this.state.increment}</p>
                <p>$ Per Second: {this.state.itemIncrement}</p>
              </div>
            </div>
            <div className="" id="buy-area-mobile">
              <div id="buy-area-mobile-items">
                <div className="flex outer-box">
                  <Item click={() => this.state.buyClickItem(this.state.intern)} item={this.state.intern}></Item>
                  <Item click={() => this.state.buyIdleItem(this.state.trader)} item={this.state.trader}></Item>
                </div>
                <div className="flex outer-box">
                  <Item click={() => this.state.buyIdleItem(this.state.tradingAlgorithm)} item={this.state.tradingAlgorithm}></Item>
                  <Item click={() => this.state.buyClickItem(this.state.insiderTrader)} item={this.state.insiderTrader}></Item>
                </div>
                <div className="flex outer-box">
                  <Item click={() => this.state.buyClickItem(this.state.lobbyist)} item={this.state.lobbyist}></Item>
                  <Item click={() => this.state.buyIdleItem(this.state.bank)} item={this.state.bank}></Item>
                </div>
              </div>
          </div>
          </div>
          <div id="desktop-buy-area">
            <div className="flex vertical" id="desktop-items">
              <Item click={() => this.state.buyClickItem(this.state.intern)} item={this.state.intern}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.trader)} item={this.state.trader}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.tradingAlgorithm)} item={this.state.tradingAlgorithm}></Item>
              <Item click={() => this.state.buyClickItem(this.state.insiderTrader)} item={this.state.insiderTrader}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.lobbyist)} item={this.state.lobbyist}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.bank)} item={this.state.bank}></Item>
            </div>
          </div>
        </div>
          <div className="mobile-menu"></div>
        </div>
    );
  }
}

export default App;
