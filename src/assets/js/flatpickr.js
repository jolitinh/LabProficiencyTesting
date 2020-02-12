//
// Flatpickr ==================================
//

// 'use strict';
import $ from 'jquery';

const Flatpickr = (function() {
  //
  // Variables
  //

  const $flatpickr = $('[data-toggle="flatpickr"]');

  //
  // Methods
  //

  function init($this) {
    const options = {
      mode: $this.data('flatpickr-mode') !== undefined ? $this.data('flatpickr-mode') : 'single',
    };

    // Init Flatpickr
    $this.flatpickr(options);
  }

  //
  // Events
  //

  if ($flatpickr.length) {
    $flatpickr.each(function() {
      init($(this));
    });
  }
})();

export default Flatpickr;
