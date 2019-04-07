import React from 'react';
import Styles from './learnmode.module.css';

export default class LearnMode extends React.Component {
  render() {
    return (
      <div className={Styles.LearnMode}>
        <h1 className={Styles.LearnModePrompt}>{this.props.terms[0].word}</h1>
        <form className={Styles.LearnModeForm}>
          <input autoFocus={true} className={Styles.LearnModeInput} type="text" />
          <button className={Styles.LearnModeSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
