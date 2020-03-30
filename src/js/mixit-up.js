$(document).ready(function () {
  var mixer = mixitup('.mixitp-up', {
    pagination: {
      limit: 9 // impose a limit of 8 targets per page
    },
    animation: {
      effects: 'fade scale stagger(50ms)' // Set a 'stagger' effect for the loading animation
    }
  });



  function getRange() {

    var min = +$('input[name="price"]:checked').data('priceMin');
    var max = +$('input[name="price"]:checked').data('priceMax');
    return {
      min: min,
      max: max
    };
  }

  /**
   * Ensures that the mixer is re-filtered whenever the value of a range
   * input changes.
   *
   * @return {void}
   */

  function handleRangeInputChange() {
    mixer.filter(mixer.getState().activeFilter);
  }

  /**
   * Allows us to manipulate the test result (`true` or `false`) of a
   * target against the current filter selector(s) (e.g. `.blue`).
   *
   * In this case we want to apply an additional constraint of whether or not the
   * target is within an arbitrary range, and override the test result to `false`
   * if not. The function must always return the test result.
   *
   * @param {boolean} testResult
   *     A boolean indicating whether or not the target is passing the current filtering criteria.
   * @param {mixitup.Target} target
   *     A reference to the target being tested
   * @return {boolean}
   */

  function filterTestResult(testResult, target) {
    var size = Number(target.dom.el.getAttribute('data-size'));
    var range = getRange();

    if (size < range.min || size > range.max) {
      testResult = false;
    }

    return testResult;
  }

  // Using the static method `registerFilter` from the MixItUp plugins API, we can
  // register the above function as a filter, to manipulate the value returned from the
  // `testResultEvaluateHideShow` hook.

  mixitup.Mixer.registerFilter('testResultEvaluateHideShow', 'range', filterTestResult);

  // Listen for change events from the two range inputs
  $('input[name="price"]').click(function (e) {
    handleRangeInputChange();

  });
});