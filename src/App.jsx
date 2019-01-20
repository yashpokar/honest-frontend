import React, { Component } from 'react';

import axios from 'axios';

import './App.sass';

export default class App extends Component {
	state = { address: '', error: '', outlet: '', isFetching: false }

	findOutletNearAddress (e) {
		const { address } = this.state;

		e.preventDefault();

		if (! address) {
			return this.setState({ error: 'Please set the address first.' });
		}

		this.setState({ isFetching: true });

		axios.get('http://127.0.0.1:5000', { params: { address } })
			.then(({data}) => {
				const { outlet, error } = data;

				if (error) {
					return this.setState({ error, address: '', isFetching: false });
				}

				this.setState({ outlet, address: '', isFetching: false });
			})
			.catch(err => this.setState({ error: err.message, isFetching: false }));
	}

	render () {
		const { address, error, outlet, isFetching } = this.state;

		return (
			<div className="flex middle center as-column fullwidth fullheight">
				<div className={ `error${ error ? ' show' : '' }` } onClick={ () => this.setState({ error: '' }) }>{ error }</div>

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

							<button className="button fullwidth" disabled={ isFetching === true }>
								Find Outlet
							</button>
						</form>
					</div>

					<div className={ `card__override flex middle center${ outlet ? ' is-active' : '' }` }>
						<span className="card__override-close" onClick={ () => this.setState({ outlet: '' }) }>&times;</span>

						<span className="card__override-content">
							au_vienna_dreyhausenstr
						</span>
					</div>
				</div>
			</div>
		);
	}
}
