'use strict';

var StoryEdit = React.createClass({
  render: function () {
    var edited = this.state.new_story !== this.state.story;
    var btnCss = 'btn btn-block btn-' + (edited ? 'primary' : 'default');

    return (
      <div className="story-edit">
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Write your story here..."
            value={this.state.new_story}
            onKeyDown={this._onKeyDown}
            autofocus={true}
            onChange={this._onChange}/>
        </div>
        <input
          type="button"
          disabled={!edited}
          className={btnCss}
          onClick={this._save}
          defaultValue="Save"/>
      </div>
    );
  },
  getInitialState: function () {
    return this._getState();
  },
  _getState: function () {
    var text = StoryStore.get(this.props.image.id).text;
    return {
      edit: {
        text_old: text,
        text_new: '',
        time_start: null,
        time_end: null,
        key_presses: []
      },
      worker: WorkerStore.get(),
      new_story: text || '',
      story: text || ''
    };
  },
  componentDidMount: function () {
    this.setState(this._getState());
  },
  componentWillReceiveProps: function () {
    this.replaceState({}, this.componentDidMount);
  },
  _onKeyDown: function (e) {
    var edit = this.state.edit;
    if (!edit.key_presses.length) {
      edit.time_start = new Date();
    }
    edit.key_presses.push(e.keyCode);
    this.setState({state: edit});
  },
  _onChange: function (e) {
    this.setState({new_story: e.target.value});
  },
  _save: function () {
    var iid = this.props.image.id;
    var text = this.state.new_story;
    var edit = this.state.edit;
    edit.text_new = text;
    edit.time_end = new Date();

    this.setState({story: text}, this.componentWillReceiveProps);
    StoryActions.update(iid, text, edit);
    console.log("saving");
    this.props.saveCallback();
  }
});