'use strict';

var LABELS = {
  rows: {
    workers_last: "Your Last 3 Stories",
    workers_average: "Your Average Story",
    population_average: "Average Worker's Story",
    population_elite: "Expert Worker's Story"
  },
  cols: {
    time: 'Time/Story',
    time_per_story: 'Time/Story',
    words: 'Average Story Length'
  }
};

var StoryStatsRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.label}</td>
        <td className="active">{Math.round(this.props.data.time/100)/10} sec.</td>
        <td className="active">{Math.round(this.props.data.words * 100)/100} words</td>
      </tr>
    );
  }
});

var StoryStats = React.createClass({
  render: function () {
    var cid = ImageStore.getCurrent().id;
    var style = {width: (100 * (cid/IMAGES.length)) + '%'};

    var rows = Object.getOwnPropertyNames(this.state.stats).map(function (stat_name) {
      var data = this.state.stats[stat_name];
      var label = LABELS.rows[stat_name];
      if (data && data.time && data.words) {
        return <StoryStatsRow label={label} data={data}/>
      }
      return null;
    }.bind(this));
    return (
      <div>
        <br/>
        <div className="text-center">
          <p>You have completed {cid} out of {IMAGES.length} stories!</p>
        </div>
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={style}> </div>
        </div>
        <h2 className="text-center">Writing Task</h2>
        <table className="table">
          <caption>
            <h3>Feedback Table</h3>
          </caption>
          <thead>
            <tr>
              <td></td>
              <td>{LABELS.cols.time}</td>
              <td>{LABELS.cols.words}</td>
            </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
    );
  },
  getInitialState: function () {
    var image = ImageStore.getCurrent();
    var blockNum = ((image.id  + 1)/ CONFIG.block_size) - 1;
    return {
      stats: StoryStatsStore.generateBlockStats(blockNum),
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
    var blockNum = ((this.state.image.id  + 1)/ CONFIG.block_size) - 1;
    this.setState({stats: StoryStatsStore.generateBlockStats(blockNum)});
  },
  setImage: function () {
    this.setState({image: ImageStore.getCurrent()}, this.setStats);
  }
});


var StoryStatsView = React.createClass({
  render: function () {
    var image = ImageStore.getCurrent();
    var blockNum = ((image.id  + 1)/ CONFIG.block_size) - 1;
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <StoryStats />
          <Questions callback={this._onClick} is_first_feedback={blockNum === 0}/>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  },
  _onClick: function (q) {
    if (ImageStore.hasNext()) {
      ImageActions.next();
      var image = ImageStore.getCurrent();
      var blockNum = (image.id/ CONFIG.block_size) - 1;
      var worker = WorkerStore.get();
      var experiment = ExperimentStore.get();
      experiment.stats_questions = experiment.stats_questions || [];
      experiment.stats_questions.push({
        questions: q,
        stats: StoryStatsStore.generateBlockStats(blockNum)
      });
      ExperimentActions.update(worker._id, 'writing_task', experiment);
      ViewActions.setView(VIEW_NAMES.IMAGE_VIEW);
    } else {
      this.props.exit();
    }
  }
});
