/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photoUrl');
var $image = document.querySelector('img');

$photoUrl.addEventListener('input', function (e) {
  if (isImage(e.target.value)) {
    $image.src = e.target.value;
  } else {
    $image.src = 'images/placeholder-image-square.jpg';
  }
});

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

var $form = document.querySelector('form');

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
