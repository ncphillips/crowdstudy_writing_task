'use strict';
if (typeof require !== 'undefined') {
  var Store = require('../Store');
}

var StoryStore = new Store();

var blank_story= {
  img: 0,
  text: "",
  done: false
};

StoryStore._stories = [];

StoryStore.d_index = StoryStore.dispatcher(function (action) {
  console.log("StoryStore – Callback called...back");
});



