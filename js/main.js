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
  data.entries.unshift(object);
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
  formToView();
  $ul.prepend(renderEntry(object));
  if (data.entries.length === 1) {
    var $placeholder = document.querySelector('#placeholder');
    $placeholder.remove();
  }
});

function renderEntry(entry) {
  var listItem = document.createElement('li');
  listItem.setAttribute('class', 'container mb20');

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  listItem.appendChild(rowDiv);

  var firstColumnHalf = document.createElement('div');
  firstColumnHalf.setAttribute('class', 'column-half');
  rowDiv.appendChild(firstColumnHalf);

  var entryImage = document.createElement('img');
  entryImage.setAttribute('src', entry.photoUrl);
  firstColumnHalf.appendChild(entryImage);

  var secondColumnHalf = document.createElement('div');
  secondColumnHalf.setAttribute('class', 'column-half');
  rowDiv.appendChild(secondColumnHalf);

  var titleRow = document.createElement('div');
  titleRow.setAttribute('class', 'flex space-between');
  secondColumnHalf.appendChild(titleRow);

  var entryHeading = document.createElement('h2');
  entryHeading.textContent = entry.title;
  titleRow.appendChild(entryHeading);

  var icon = document.createElement('i');
  icon.className = 'fas fa-pen';
  icon.id = 'edit';
  titleRow.appendChild(icon);

  var entryParagraph = document.createElement('p');
  entryParagraph.textContent = entry.notes;
  secondColumnHalf.appendChild(entryParagraph);

  return listItem;
}

var $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', renderAllEntries);

function renderAllEntries() {
  if (data.entries.length === 0) {
    var noEntries = document.createElement('li');
    noEntries.textContent = 'No entries have been recorded.';
    noEntries.className = 'tac';
    noEntries.id = 'placeholder';
    $ul.appendChild(noEntries);
  }
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  var $view = document.querySelectorAll('.view');
  for (var j = 0; j < $view.length; j++) {
    if ($view[j].id === data.view) {
      $view[j].className = 'view';
    } else {
      $view[j].className = 'view hidden';
    }
  }
}

var $a = document.querySelector('a');
var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');

$a.addEventListener('click', formToView);

function formToView() {
  $entryForm.className = 'view hidden';
  $entries.className = 'view';
  data.view = 'entries';
}

var $new = document.querySelector('#new');

$new.addEventListener('click', viewToForm);

function viewToForm() {
  $entryForm.className = 'view';
  $entries.className = 'view hidden';
  data.view = 'entry-form';
}
