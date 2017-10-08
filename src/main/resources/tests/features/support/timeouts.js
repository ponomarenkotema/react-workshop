'use strict';

var timeouts = {
  defaultTimeout: 5000,
  defaultShortTimeout: 1000,
  sessionInitTimeout: 15 * 1000,
  pageLoadTimeout: 15 * 1000,
  pageReadyTimeout: 15 * 1000,
  asyncScriptLoadTimeout: 30 * 1000,
  uiElementsRenderDefaultTimeout: 10 * 1000,
  uiElementsNotVisibleDefaultTimeout: 2 * 1000,
  waitGoogleAutocompleteTimeout: 0.5 * 1000 * 6
};

module.exports = timeouts;