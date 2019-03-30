import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import StockViewer from './components/StockViewer';

class App extends React.Component {
  componentDidMount() {
    console.log('App mounted');
  }

  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <Route path="/*" component={StockViewer} />
        </BrowserRouter>
      </div>
    );
  }
}

// TODO add app level data and dispatches
App.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
