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

var $searchbar = document.querySelector('#searchbar');
$searchbar.addEventListener('submit', function (e) {
  e.preventDefault();
  $ul.innerHTML = '';
  var search = $searchbar.elements.search.value;
  for (var i = 0; i < data.entries.length; i++) {
    if (search.toLowerCase() === data.entries[i].title.toLowerCase()) {
      $ul.prepend(renderEntry(data.entries[i]));
    }
  }
  if ($ul.innerHTML === '') {
    var notFound = document.createElement('li');
    notFound.textContent = 'No search results found.';
    notFound.className = 'tac';
    $ul.appendChild(notFound);
  }
  $searchbar.reset();
});

var $form = document.querySelector('form');
var $h2 = document.querySelector('h2');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
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
  } else {
    object = {};
    object.title = $form.elements.title.value;
    object.photoUrl = $form.elements.photoUrl.value;
    object.notes = $form.elements.notes.value;
    object.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === object.entryId) {
        data.entries[i] = object;
      }
    }
    $ul.innerHTML = '';
    renderAllEntries();
    $form.reset();
    $image.src = 'images/placeholder-image-square.jpg';
    formToView();
    data.editing = null;
  }
});

function renderEntry(entry) {
  var listItem = document.createElement('li');
  listItem.setAttribute('data-entry-id', entry.entryId);
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
  icon.id = entry.entryId;
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
$a.addEventListener('click', function () {
  if (data.editing !== null) {
    $form.reset();
    $image.src = 'images/placeholder-image-square.jpg';
    formToView();
    data.editing = null;
  }
  $ul.innerHTML = '';
  renderAllEntries();
  $searchbar.reset();
});

function formToView() {
  $entryForm.className = 'view hidden';
  $entries.className = 'view';
  data.view = 'entries';
}

var $new = document.querySelector('#new');

$new.addEventListener('click', viewToForm);
$new.addEventListener('click', function () {
  $h2.textContent = 'New Entry';
  $delete.className = 'delete hidden';
  $bottomRow.className = 'tar mb20';
  $searchbar.reset();
});

function viewToForm() {
  $entryForm.className = 'view';
  $entries.className = 'view hidden';
  data.view = 'entry-form';
}

var $delete = document.querySelector('.delete');
var $bottomRow = document.querySelector('#bottomRow');

var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$ul.addEventListener('click', function (e) {
  if (e.target.matches('i')) {
    $h2.textContent = 'Edit Entry';
    viewToForm();
    $delete.className = 'delete';
    $bottomRow.className = 'flex space-between';
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(e.target.id)) {
        data.editing = data.entries[i];
      }
    }
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photoUrl;
    $image.src = $photoUrl.value;
    $notes.value = data.editing.notes;
    $searchbar.reset();
  }
});

var $modal = document.querySelector('.modal');
var $overlay = document.querySelector('.overlay');

$delete.addEventListener('click', function () {
  $modal.classList.remove('hidden');
  $overlay.classList.remove('hidden');
});

var $grayButton = document.querySelector('.gray-button');

$grayButton.addEventListener('click', function () {
  $overlay.className = 'overlay hidden';
  $modal.className = 'modal hidden';
});

var $orangeButton = document.querySelector('.orange-button');
$orangeButton.addEventListener('click', function () {
  var index = data.editing.entryId;
  for (var i = 0; i < data.entries.length; i++) {
    if (index === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  $ul.innerHTML = '';
  renderAllEntries();
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
  formToView();
  data.editing = null;
  $overlay.className = 'overlay hidden';
  $modal.className = 'modal hidden';
});
