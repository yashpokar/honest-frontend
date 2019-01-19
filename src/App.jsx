import React, { Component } from 'react';

import axios from 'axios';

import './App.sass';

export default class App extends Component {
	state = { address: '', error: '' }

	findOutletNearAddress (e) {
		const { address } = this.state;

		e.preventDefault();

		if (! address) {
			return this.setState({ error: 'Please set the address first.' });
		}

		axios.get('http://127.0.0.1:5000', { params: { address } })
			.then(({data}) => {
				console.log(data);
			})
			.catch(err => this.setState({ error: err.message }));
	}

	render () {
		const { address, error } = this.state;

		return (
			<div className="flex middle center as-column fullwidth fullheight">
				<div className={ `error${ error ? ' show' : '' }` }>{ error }</div>

				<div className="card">
					<h2 className="card__title">Find Outlet Near Your Address</h2>

					<div className="card__body">
						<form onSubmit={ this.findOutletNearAddress.bind(this) }>
							<input
								type="text"
								className="input-box fullwidth"
								placeholder="Enter your address here"
								onChange={ e => this.setState({ address: e.target.value, error: '' }) }
								value={ address } />

							<button className="button fullwidth">
								Find Outlet
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
