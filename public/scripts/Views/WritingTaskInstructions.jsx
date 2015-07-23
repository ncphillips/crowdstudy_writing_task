var WritingTaskInstructions = React.createClass({
  render: function () {
    "use strict";
    var cid = ImageStore.getCurrent().id;
    var style = {width: (100 * (cid/IMAGES.length)) + '%'};
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <br/>
          <div className="text-center">
            <p>You have completed {cid} out of {IMAGES.length} stories!</p>
          </div>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={style}> </div>
          </div>
          <h1>Writing Task</h1>
          <div>
            <p>
              Welcome to the UPEI HCI Lab Writing Task!
            </p>
            <p>
              Over the course of this task, you will be shown {IMAGES.length} images. For each image
              we ask that you write a short story about that image. Each story should be
              between 1 and 5 lines long.
            </p>
            <p>
              After every {CONFIG.block_size} image, you will be given some feedback and you will be asked to
              answer a couple questions about that feedback.
            </p>
            <p>
              To finish of the task, we'll have you fill out a short questionaire about
              your experience doing this task.
            </p>
            <p>
              Thank you for taking part in this task. Press the button below to start!
            </p>
          </div>
          <input type="button" value="Begin" className="btn btn-block btn-primary" onClick={this._onClick}/>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  },
  _onClick: function () {
    "use strict";
    ViewActions.setView(VIEW_NAMES.IMAGE_VIEW);
  }
});