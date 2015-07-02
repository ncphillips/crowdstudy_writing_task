'use strict';
/**
 * Thumbnail Component
 */
var Thumbnail = React.createClass({
  render: function () {
    //return <img className="img-thumbnail" src={this.props.src} height={this.props.height} width={this.props.width}/>
    return <img className="img-circle img-thumbnail" src={this.props.src} />
  },
  getDefaultProps: function () {
    return {
      height: 25,
      width: 25
    }
  }
});

var ImageSummary = React.createClass({
  render: function () {
    var story = StoryStore.get(this.props.id).text;
    var css = story ? "label label-success": "label label-warning";
    var text = story ? "Completed" :  "Incomplete";
    story = story ? story : "Click the thumbnail to write your story.";
    return (
      <div className="panel panel-default" onClick={this._onClick}>
        <div className="panel-body">
          <div className="col-sm-4">
            <Thumbnail {...this.props}/>
          </div>
          <div className="col-sm-8">
            <p><b>Status: </b><span className={css}>{text}</span></p>
            <p>{story}</p>
          </div>
        </div>
      </div>
    );
  },
  _onClick: function (e) {
    this.props.callback(e, this.props.id);
  }
});

/**
 * Image List View Component
 */
var ImageList = React.createClass({
  render: function () {
    var images = this.state.images;

    var image_thumbnails = images.map(function (image) {
      var url = 'images/' + image.name;
      return <ImageSummary key={image.id} id={image.id} src={url} callback={this._viewImage}/>
    }.bind(this));

    return (
      <div>
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h1>Images</h1>
          <SubmitStoriesButton className="btn-block" callback={this.props.exit}/><br/>
          {image_thumbnails}
          <SubmitStoriesButton className="btn-block" callback={this.props.exit}/>
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  },
  getInitialState: function () {
    return {
      images: this._getImages()
    };
  },
  _viewImage: function (event, key) {
    ImageActions.set(key);
  },
  _getImages: function () {
    return ImageStore.all();
  }
});
