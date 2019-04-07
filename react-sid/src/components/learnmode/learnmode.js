import React from 'react';
import Styles from './learnmode.module.css';

const VIEWS = {
  'SHOW_SUCCESS': 'SHOW_SUCCESS',
  'SHOW_FAILUTE': 'SHOW_FAILURE',
  'SHOW_FINISHED': 'SHOW_FINISHED',
  'SHOW_CHALLENGE': 'SHOW_CHALLENGE',
}
export default class LearnMode extends React.Component {
  state = {
    id: 0,
    answer: '',
    VIEW: VIEWS.SHOW_CHALLENGE,
  }

  componentDidMount () {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillMount () {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { terms } = this.props;
    const { id, answer } = this.state;
    if (terms[id].definition.toLowerCase() === answer) {
      this.setState({
        VIEW: VIEWS.SHOW_SUCCESS,
      });
    } else {
      this.setState({
        VIEW: VIEWS.SHOW_FAILUTE,
      })
    }
  }

  handleChange = e => {
    const val = e.target.value;
    this.setState({
      answer: val,
    });
  }

  handleKeyPress = e => {
    if (e.key !== 'Meta' && e.key !== 'Control' && e.key !== 'Alt') {
      const { id, VIEW } = this.state;
      const { terms } = this.props;
      if (VIEW === VIEWS.SHOW_SUCCESS || VIEW === VIEWS.SHOW_FAILUTE || VIEW === VIEWS.SHOW_FINISHED) {
        e.preventDefault();
        if (id + 1 >= terms.length) {
          if (VIEW === VIEWS.SHOW_FINISHED) {
            this.setState({
              id: 0,
              VIEW: VIEWS.SHOW_CHALLENGE,
            });
          } else {
            this.setState({
              VIEW: VIEWS.SHOW_FINISHED,
            })
          }
        } else {
          this.setState({
            id: VIEW === VIEWS.SHOW_SUCCESS ? id + 1 : id,
            VIEW: VIEWS.SHOW_CHALLENGE,
          });
        }
      }
    }
  }

  renderFailure = showText => {
    return (
      <React.Fragment>
        <p className={Styles.LearnModeExplainHeader}> YOU SAID</p>
        <p className={Styles.LearnModeExplainTextWrong}>{showText}</p>
      </React.Fragment>
    )
  }

  renderView = () => {
    const { id, VIEW, answer } = this.state;
    const { terms } = this.props;
    if (VIEW === VIEWS.SHOW_SUCCESS || VIEW === VIEWS.SHOW_FAILUTE) {
      const isSuccess = VIEW === VIEWS.SHOW_SUCCESS;
      return (
        <div onKeyPress={this.handleKeyPress} autoFocus={true}>
          <h1 className={isSuccess ? Styles.LearnModeSuccessHeader : Styles.LearnModeFailureHeader}>
            {isSuccess ? 'Correct! Nicely done' : 'Study this one!'}
          </h1>
          <p className={Styles.LearnModeExplainHeader}> DEFINITION</p>
          <p className={Styles.LearnModeExplainText}>{terms[id].word}</p>
          <p className={Styles.LearnModeExplainHeader}> CORRECT ANSWER</p>
          <p className={Styles.LearnModeExplainTextCorrect}>{terms[id].definition}</p>
          {isSuccess ? '' : this.renderFailure(answer)}
          <button className={Styles.LearnModeSubmit} type="submit">
            PressAnyKeyToContinue
          </button>
        </div>
      )
    } else if (VIEW === VIEWS.SHOW_CHALLENGE) {
      const word = terms[id].word;
      return (
        <React.Fragment>
          <h1 className={Styles.LearnModePrompt}>{word}</h1>
          <form className={Styles.LearnModeForm}>
            <input autoFocus={true} className={Styles.LearnModeInput} type="text" onChange={this.handleChange} />
            <button className={Styles.LearnModeSubmit} type="submit" onClick={this.handleSubmit}>
              Answer
          </button>
          </form>
        </React.Fragment>
      );
    } else if (VIEW === VIEWS.SHOW_FINISHED) {
      return (
        <div onKeyPress={this.handleKeyPress} autoFocus={true}>
          <h1 className={Styles.LearnModeSuccessHeader}>
            Finished, Nicely done.
          </h1>
          <button className={Styles.LearnModeSubmit} type="submit">
            PressAnyKeyToContinue
          </button>
        </div>
      )
    }
    return null;
  }

  render () {
    const { terms } = this.props;

    if (!terms.length) {
      return null;
    }

    return (
      <div className={Styles.LearnMode}>
        {this.renderView()}
      </div>
    );
  }
}
