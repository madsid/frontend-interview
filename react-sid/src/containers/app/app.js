import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getSampleAction} from '../../actions/sampleactions';
import './app.module.css';

import LearnMode from '../../components/learnmode/learnmode';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.createAction();
    this.state = {
      terms: [
        {
          id: 1,
          word: 'Nebraska',
          definition: 'Lincoln',
        },
        {
          id: 2,
          word: 'Massachusetts',
          definition: 'Boston',
        },
        {
          id: 3,
          word: 'California',
          definition: 'Sacramento',
        },
      ],      
    }
  }

  render() {
    const {message} = this.props.sample;
    const {terms} = this.state;
    return (
      <div>
        <LearnMode terms={terms}/>
        <p>{message || 'Hello'}</p> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sample: state.sample
});

const mapDispatchToProps = dispatch => ({
  createAction: () => dispatch(getSampleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
