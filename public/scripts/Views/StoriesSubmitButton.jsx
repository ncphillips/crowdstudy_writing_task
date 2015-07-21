
var SubmitStoriesButton = (function() {
  'use strict';

  return React.createClass({
    render: function () {
      var css = '';
      var text = '';
      var completed = this.numCompleted() === this.state.num_images;
      if (completed) {
        css = 'btn btn-success' + this.props.className;
        text = 'Finish!';
      } else {
        css = 'btn btn-default ' + this.props.className;
        text = this.numCompleted() + " / " + this.state.num_images + " Stories Complete";
      }
      return (
        <input type="button" disabled={!completed} className={css} value={text} onClick={this.props.callback}/>
      );
    },
    getInitialState: function () {
      return {
        stories: StoryStore.all(),
        num_images: ImageStore.all().length
      }
    },
    numCompleted: function () {
      var completed = 0;
      this.state.stories.forEach(function (story) {
        if (story.text !== '') {
          completed += 1;
        }
      });
      return completed;
    },
    setStories: function () {
      this.setState({stories: StoryStore.all()});
    },
    componentDidMount: function () {
      StoryStore.addChangeListener(this.setStories);
    },
    componentWillUnmount: function () {
      StoryStore.removeChangeListener(this.setStories);
    },
    _onClick: function () {
      this.props.callback(this.state.stories);
    }
  });
})();