var WritingTaskInstructions = React.createClass({
  render: function () {
    "use strict";
    return (
      <div>
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <SubmitStoriesButton className="btn-block" callback={this.props.exit}/><br/>
          <h1>Writing Task: Instructions</h1>
          <div>
            <p>
              Welcome to the UPEI HCI Lab Writing Task!
            </p>
            <p>
              Over the course of this task, you will be shown 20 images. For each image
              we ask that you write a short story about that image. Each story should be
              between 1 and 5 lines long.
            </p>
            <p>
              After each image, you will be given some feedback and you will be asked to
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
          <input type="button" className="btn btn-primary" onClick={this._onClick}/>
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  },
  _onClick: function () {
    "use strict";
    ViewActions.setView(VIEW_NAMES.IMAGE_VIEW);
  }
});