//
// Highlight.js ==================================
//

// 'use strict';
import $ from "jquery";
import hljs from "highlight.js";

var Highlight = (function() {
  //
  // Variables
  //

  var $highlight = $(".highlight");

  //
  // Methods
  //

  function init(i, block) {
    hljs.highlightBlock(block);
  }

  //
  // Events
  //

  $highlight.each(function(i, block) {
    init(i, block);
  });
})();
