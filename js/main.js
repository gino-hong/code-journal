/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photoUrl');
var $image = document.querySelector('img');

$photoUrl.addEventListener('input', function (e) {
  $image.src = e.target.value;
});
