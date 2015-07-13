'use strict';

var StoryStats = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Stats</h2>
        <table className="table">
          <thead>
            <tr>
              <td></td>
              <td>Length</td>
              <td>Time</td>
              <td>Key-Presses</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You</td>
              <td>{this.state.stats.story_length}</td>
              <td>{this.state.stats.time_spent}</td>
              <td>{this.state.stats.key_presses}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  getInitialState: function () {
    var image = ImageStore.getCurrent();
    return {
      stats: StoryStatsStore.get(image.id),
      image: image
    };
  },
  componentDidMount: function () {
    StoryStatsStore.addChangeListener(this.setStats);
    ImageStore.addChangeListener(this.setImage)
  },
  componentWillUnmount: function () {
    StoryStatsStore.removeChangeListener(this.setStats);
  },
  setStats: function () {
    this.setState({stats: StoryStatsStore.get(this.state.image.id)});
  },
  setImage: function () {
    this.setState({image: ImageStore.getCurrent()}, this.setStats);
  }
});


var StoryStatsView = React.createClass({
  render: function () {
    var text = ImageStore.hasNext() ? "Next Image" : "Finish Task";
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <StoryStats />
          <input type="button" className="btn btn-primary center-block" onClick={this._onClick} value={text}/>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  },
  _onClick: function () {
    if (ImageStore.hasNext()) {
      ImageActions.next();
      ViewActions.setView(VIEW_NAMES.IMAGE_VIEW);
    } else {
      this.props.exit();
    }
  }
});