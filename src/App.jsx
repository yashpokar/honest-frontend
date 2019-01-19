import React, { Component } from 'react';

import './App.sass';

export default class App extends Component {
	findOutletNearAddress (e) {
		e.preventDefault();
	}

	render () {
		return (
			<div className="flex middle center fullwidth fullheight">
				<div className="card">
					<h2 className="card__title">Find Outlet Near Your Address</h2>

					<div className="card__body">
						<form onSubmit={ this.findOutletNearAddress.bind(this) }>
							<input type="text" className="input-box fullwidth" placeholder="Enter your address here" />

							<button className="button fullwidth">Find Outlet</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
