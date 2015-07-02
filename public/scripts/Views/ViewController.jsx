'use strict';

var ViewController = React.createClass({
  render: function () {
    var View = this.state.view;
    return <View {...this.props}/>;
  },
  getInitialState: function () {
    return {view: ViewStore.get()};
  },
  componentDidMount: function () {
    ViewStore.addChangeListener(this._updateState);
  },
  _updateState: function () {
    this.setState({view: ViewStore.get()});
  }
});

React.render(<CrowdExperiment experiment_name="writing" experiment_app={ViewController}/>, document.getElementById('app'));