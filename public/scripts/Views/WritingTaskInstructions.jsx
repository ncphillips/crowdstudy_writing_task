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
              Over the course of this task; you will be shown {IMAGES.length} images.
            </p>
            <p>
              For each image we ask that you write a short, creative story about that image.
              Each story should be at least one line long, and the longer the better.
              Your goal is to be as creative, witty, and funny as possible...but also be fast.
            </p>
            <p>
              After every {CONFIG.block_size} images, you will be given some feedback and you will be asked to
              answer a few questions about that feedback.
            </p>
            <p>
              To finish of the task, we'll have you fill out a short questionnaire about
              your experience doing this task.
            </p>
            <p>
              In summary:
              <ul>
                <li>Stories must be at least one line long, but longer is better</li>
                <li>Make sure to write your stories as <em>quickly</em> as you can</li>
                <li>And above all, write a <em>creative</em> and <em>fun</em> little story!</li>
              </ul>
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