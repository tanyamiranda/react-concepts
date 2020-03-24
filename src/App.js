import React from 'react';
import logo from './logo.svg';
import './App.css';

import Lifecycles from './component/lifecycles.component';

import Clicks from './component/clicks.component';

import {promiseFunction, asyncFunction, noFunctionSynchronizaton} from './async.js';

/*
Upon 
*/

class App extends React.Component {

  formatDate = (dateValue) => {
    let current_datetime = new Date(dateValue);
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

    return formatted_date;
  }


  constructor(props) {

    console.log('App constructor!');

    super(props);
    this.state = {
      meaningOfLife: "Click Me & Toggle Header buttons show LifeCycle events in console.",
      lastUpdated: "",
      clicks:0,
      pageLoaded: this.formatDate(props.pageLoaded),
      showHeader: true
    }
  }

  componentDidMount() {
    console.log('App componentDidMount!');
  }

  componentDidUpdate() {
    console.log('App componentDidUpdate!');
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount!');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App shouldComponentUpdate!', nextProps);
    return true;
  }

  toggleHeader = () => {

    console.log("toggleHeader");
    this.setState({showHeader: !this.state.showHeader});
  }

  handleClicks = () => {

    console.log("handleClicks");

    /*
        
    this.setState({clicks: this.state.clicks + 1, lastUpdated: formatted_date})
    console.log("clicks:", this.state.clicks);
    console.log("lastUpdated:", this.state.lastUpdated);
    
    This above code syntactically correct, but the setState() call is asynchronous, 
    so if you are excuting code after the setState() call, then it may be out of sync.
    The console.log() calls may print out old data.

    To remedy this, use call back functions in setState() as follows:

    this.setState(
     {clicks: this.state.clicks + 1, lastUpdated: formatted_date},
     () => {
        console.log("clicks:", this.state.clicks);
        console.log("lastUpdated:", this.state.lastUpdated);
     }
    );
    
    Good article explaining this:
    https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c

    */

   /* 
    Best practice indicates to use a function call with (prevState, prevProps) parameters
    to use the before and after values in the update. For example:
  */
    this.setState(
      (prevState, prevProps) => {
        //console.log("prevState:", prevState);
        return {clicks: prevState.clicks + prevProps.increment, lastUpdated: this.formatDate(Date.now())}
      },
      () => {
        //console.log("clicks:", this.state.clicks);
        //console.log("lastUpdated:", this.state.lastUpdated);
      }
   );


  }

  callPromiseAndAsynch = () => {
    promiseFunction();
    asyncFunction();
  }


  render() {

    console.log('App render!');

    return (
      <div className="App">
        <header className="App-header">
          <h1>REACT CONCEPTS</h1>
          <p><b>Snippets of code to demonstrate react concepts in action.</b></p>
          <img src={logo} className="App-logo" alt="logo" />
          <br/>
          <b>{this.state.showHeader ? <Lifecycles text={this.state.meaningOfLife} /> : ''}</b>
          <p>PageLoaded: {this.state.pageLoaded}</p>
          <Clicks clicks={this.state.clicks} lastUpdated={this.state.lastUpdated}/>
          <br/>
          <div className='buttons'>
            <button onClick={this.handleClicks}>click me!</button> 
            <button onClick={this.toggleHeader}>toggle header</button>
          </div>
          <h3>Control Asyncronous Calls</h3>
          <p><b>Click buttons below quickly to view synchronized calls to asyncronous functions in console.</b></p>  
          <div className='buttons'>
            <button onClick={promiseFunction}>Call promiseFunction Only</button>
            <button onClick={asyncFunction}>Call asyncFunction Only</button>
            <button onClick={this.callPromiseAndAsynch}>Execute Both</button>
            <button onClick={noFunctionSynchronizaton}>No Synchronization</button>
            
            
          </div>
        </header>
      </div>
    );

  }

}

export default App;
