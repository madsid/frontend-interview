import React from 'react';
import Styles from './learnmode.module.css';

const VIEWS = {
	SHOW_CHALLENGE: 'SHOW_CHALLENGE',
	SHOW_SUCCESS: 'SHOW_SUCCESS',
	SHOW_FAILURE: 'SHOW_FAILURE',
	SHOW_PRACTICE: 'SHOW_PRACTIVE',
	SHOW_FINISHED: 'SHOW_FINISHED',
};
export default class LearnMode extends React.Component {
	state = {
		id: 0,
		answer: '',
		view: VIEWS.SHOW_CHALLENGE,
		count: 0,
		status: {
			mastered: 0,
			familier: 0,
		},
	};

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	getFinishedStatus = () => {
		const { status, count } = this.state;
		const { terms } = this.props;
		let { mastered, familier } = status;
		if (count === terms.length - 1) {
			mastered++;
		} else {
			familier++;
		}
		return {
			mastered,
			familier,
		};
	};

	handleKeyPress = e => {
		const { view } = this.state;
		if (view === VIEWS.SHOW_FINISHED) {
			e.preventDefault();
			this.setState({
				id: 0,
				count: 0,
				answer: '',
				view: VIEWS.SHOW_CHALLENGE,
			});
		} else if (view === VIEWS.SHOW_SUCCESS) {
			e.preventDefault();
			this.setState({
				answer: '',
				view: VIEWS.SHOW_CHALLENGE,
			});
		} else if (view === VIEWS.SHOW_FAILURE) {
			e.preventDefault();
			this.setState({
				answer: '',
				view: VIEWS.SHOW_PRACTICE,
			});
		}
  };
  
	handleSubmit = e => {
		e.preventDefault();
		const { id, answer, count, view } = this.state;
		const { terms } = this.props;
		const nextId = id + 1;
		if (nextId >= terms.length) {
			const status = this.getFinishedStatus();
			this.setState({
				answer: '',
				view: VIEWS.SHOW_FINISHED,
				status,
			});
		} else {
			if (terms[id].definition.toLowerCase() === answer.toLowerCase()) {
				this.setState({
					id: nextId,
					count: view === VIEWS.SHOW_PRACTICE ? count : count + 1,
					view: VIEWS.SHOW_SUCCESS,
				});
			} else {
				this.setState({
					view: VIEWS.SHOW_FAILURE,
				});
			}
		}
	};

	handleChange = e => {
		e.preventDefault();
		this.setState({
			answer: e.target.value,
		});
	};

	renderCurrentView = () => {
		const { view, answer, id, status } = this.state;
		const { terms } = this.props;
		if (view === VIEWS.SHOW_CHALLENGE || view === VIEWS.SHOW_PRACTICE) {
			if (terms.length === 0) {
				return null;
			}
			return (
				<React.Fragment>
					<h1 className={Styles.LearnModePrompt}>{terms[id].word}</h1>
					<form className={Styles.LearnModeForm} onSubmit={this.handleSubmit}>
						<input
							autoFocus={true}
							className={Styles.LearnModeInput}
							type="text"
							value={answer}
							onChange={this.handleChange}
						/>
						<button className={Styles.LearnModeSubmit} type="submit">
							Submit
						</button>
					</form>
				</React.Fragment>
			);
		} else if (view === VIEWS.SHOW_SUCCESS || view === VIEWS.SHOW_FAILURE) {
			return (
				<p>
					{view} - {answer}
				</p>
			);
		} else if (view === VIEWS.SHOW_FINISHED) {
			return (
				<React.Fragment>
					<p>{view}</p>
					<p>Familier: {status.familier}</p>
					<p>Mastered: {status.mastered}</p>
				</React.Fragment>
			);
		}
		return null;
  };
  
	render() {
		return <div className={Styles.LearnMode}>{this.renderCurrentView()}</div>;
	}
}
