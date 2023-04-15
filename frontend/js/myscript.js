$(document).ready(function () {
  $('.Details').hide();
  $('.newApp').hide();
  $('.list-group-item').on('click', function () {
    showdetails();
  });
});

function showdetails() {
  $('.wrapper > .h2').hide();
  $('.list-group').hide();
  $('.Details').show();
}

$('#add-app-link').on('click', function () {
  $('.wrapper > .h2').hide();
  $('.list-group').hide();
  $('.Details').hide();
  $('.newApp').show();
});
