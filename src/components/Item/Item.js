import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
	render () {
		return (
			<div className="flex item-box">
				<div className="flex vertical inner-box">
					<p>{this.props.item.name}</p>
					<p className="owned">Owned: {this.props.item.quantity}</p>
				</div>
				<div className="flex vertical inner-box">
					<button onClick={this.props.click} id="buy-btn">Buy - ${this.props.item.price}</button>
				</div>
			</div>
		);
	}
}

export default Item;