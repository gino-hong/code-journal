/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $form = document.querySelector('form');
var $image = document.querySelector('img');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var object = {};
  object.title = $form.elements.title.value;
  object.photoUrl = $form.elements.photoUrl.value;
  object.notes = $form.elements.notes.value;
  object.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(object);
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
});
