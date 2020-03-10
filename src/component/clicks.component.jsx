import React from 'react';

class Clicks extends React.Component {
  constructor() {
    super();
    console.log('Clicks constructor!');
  }

  componentDidMount() {
    console.log('Clicks componentDidMount!');
  }

  componentDidUpdate() {
    console.log('Clicks componentDidUpdate!');
  }

  componentWillUnmount() {
    console.log('Clicks componentWillUnmount!');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Clicks shouldComponentUpdate?', nextProps);
    return nextProps.clicks !== this.props.clicks;
  }

  render() {
    console.log('Clicks render!');
    return (
        <div>
            # of Clicks: {this.props.clicks}<br/>
            Last clicked: {this.props.lastUpdated}
        </div>
    );
  }

}

export default Clicks;