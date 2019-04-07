import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getSampleAction} from '../../actions/sampleactions';
import {getStudySet} from '../../actions/studysetactions';
import './app.module.css';

import LearnMode from '../../components/learnmode/learnmode';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.createAction();
    this.props.getStudySet(1);  
  }

  render() {
    const {message} = this.props.sample;
    const {terms} = this.props.study;
    return (
      <div>
        <span>{message}</span>
        <LearnMode terms={terms}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sample: state.sample,
  study: state.study,
});

const mapDispatchToProps = dispatch => ({
  createAction: () => dispatch(getSampleAction()),
  getStudySet: id => dispatch(getStudySet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
