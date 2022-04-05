/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');

var previousEntryFormClass = localStorage.getItem('entry-form-class');
if (previousEntryFormClass !== null) {
  $entryForm.className = previousEntryFormClass;
}
var previousEntriesClass = localStorage.getItem('entries-class');
if (previousEntriesClass !== null) {
  $entries.className = previousEntriesClass;
}

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('data-local-storage', dataJSON);
  this.localStorage.setItem('entry-form-class', $entryForm.className);
  this.localStorage.setItem('entries-class', $entries.className);
});
