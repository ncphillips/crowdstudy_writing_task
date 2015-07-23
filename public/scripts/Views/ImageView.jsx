'use strict';




var PreviousImageButton = React.createClass({
  render: function () {
    var cssClass = 'btn btn-info ' + (ImageStore.hasPrevious() ? '' : 'invisible');
    return (
      <div>
        <a href="#" type="button" onClick={ImageActions.previous} disabled={!ImageStore.hasPrevious()} className={cssClass}>
          <span className="glyphicon glyphicon-chevron-left"></span>Previous
        </a>
      </div>
    );
  }
});

var NextImageButton = React.createClass({
  render: function () {
    var cssClass = 'btn btn-info ' + (ImageStore.hasNext() ? '' : 'invisible');
    return (
      <div>
        <a href="#" type="button" onClick={ImageActions.next} disabled={!ImageStore.hasNext()} className={cssClass}>
          Next<span className="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    );
  }
});



var ImageListNav = React.createClass({
  render: function () {
    return <a href="#" className="btn btn-default" onClick={this._onClick}><span className="glyphicon glyphicon-th-list"></span> Back</a>
  },
  _onClick: function () {
    ViewActions.setView(VIEW_NAMES.IMAGE_LIST);
  }
});

/**
 * ImageView
 */
var ImageView = React.createClass({
  render: function () {
    var url = 'images/' + this.state.image.name;
    var style = {width: (100*(this.state.image.id / IMAGES.length)) + '%'};
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="row">
            <br/>
            <div className="text-center">
              <p>You have completed {this.state.image.id} out of {IMAGES.length} stories!</p>
            </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={style}> </div>
            </div>
            <h1>Image: {this.state.image.id + 1}</h1>
            <img className="center-block" height={this.state.imageHeight} src={url} />
            <br/>
            <StoryEdit image={this.state.image} saveCallback={this._saveCallback}/>
          </div>
        </div>
        <div className="col-md-3"> </div>
      </div>
    );
  },
  getInitialState: function () {
    return {
      imageHeight: this.imageHeight(),
      image: ImageStore.getCurrent()
    }
  },
  componentDidMount: function () {
    window.onresize = this.resetImageHeight;
    ImageStore.addChangeListener(this._setImage);
  },
  componentWillUnmount: function () {
    window.onresize = null;
    ImageStore.removeChangeListener(this._setImage);
  },
  resetImageHeight: function () {
    this.setState({imageHeight: this.imageHeight()});
  },
  imageHeight: function () {
    return window.innerHeight - 300
  },
  _setImage: function () {
    this.setState({image: ImageStore.getCurrent()});
  },
  _saveCallback: function () {
    if ((this.state.image.id + 1) % CONFIG.block_size === 0){
      ViewActions.setView(VIEW_NAMES.STORY_STATS);
    } else if (ImageStore.hasNext()) {
      ImageActions.next();
    } else {
      this.props.exit();
    }

  },
  viewStats: function () {
    ViewActions.setView(VIEW_NAMES.STORY_STATS);
  }
});