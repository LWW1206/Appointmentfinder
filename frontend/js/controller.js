$(document).ready(function () {
  $('.Details').hide();
  $('.newApp').hide();
  getAppointments();
  $('.list-group').on('click', '.list-group-item', function () {
    showdetails(this); // pass the clicked element as a parameter
  });  
  $('#appointment-form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submit action.
    savetoDatabase();
  });
});

function showdetails(element) {
  var appointmentId = $(element).data('id'); // use the passed element to get data-id
  console.log("Appointment ID: ", appointmentId);
  if(appointmentId != null) {
  $.ajax({
    type: "POST",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: "queryAppointmentById", param: appointmentId },
    dataType: "json",
    success: function (response) {
      console.log("Appointment details: ", response);
      var appointment = response[0];
      $('#detail-name').append(appointment.name);
      $('#detail-location').append(appointment.location);
      $('#detail-description').append(appointment.description);
      $('#detail-start').append(appointment.vote_start);
      $('#detail-end').append(appointment.vote_end);
      $('#detail-creator').append(appointment.creator);;
      $('.wrapper > .h2').hide();
      $('.list-group').hide();
      $('.Details').show();
    },
    error: function (err) {
      console.log(err);
    }
  });
}
}

$('#add-app-link').on('click', function () {
  $('.wrapper > .h2').hide();
  $('.list-group').hide();
  $('.Details').hide();
  $('.newApp').show();
});

function savetoDatabase() {
  var name = document.getElementById('name').value;
  var location = document.getElementById('location').value;
  var description = document.getElementById('description').value;
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var creator = document.getElementById('creator').value;
  var data = {
    ap_name: name,
    location: location,
    description: description,
    vote_start: start,
    vote_end: end,
    creator_name: creator
  };
  $.ajax({
    type: "POST",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: "createNewAppointment", param: data },
    dataType: "json",
    success: function (response) {
      console.log("Response: ", response);
        alert("Appointment saved successfully!");
        window.location.reload();
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function getAppointments() {
  $.ajax({
    type: "POST",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: "queryAppointments" },
    dataType: "json",
    success: function (response) {
      console.log("Appointments: ", response)
      var appointments = response;
      var listGroup = $('.list-group');
      //listGroup.empty();
      $.each(appointments, function(i, appointment) {
        var listItem = $('<a>').attr({
          href: '#',
          class: 'list-group-item list-group-item-action mylistitem',
          'data-id': appointment.id,
        }).text(appointment.name);
        console.log(appointment.id);
        console.log(appointment.name);
        listGroup.append(listItem);
      });
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function loaddata(searchmethode, searchterm, itemtype) {
  $.ajax({
    type: "DELETE",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: searchmethode, param: searchterm },
    dataType: "json",
    success: function (response) {
      console.log("Response: ", response)
      response.forEach(el => {
        if (el) {
          console.log(el)
          $("#container").append($("<p>").text(`${itemtype}(id=${el.id}, ${el}`))
        }
      });
    }
  });
}

function writedata(searchmethode, searchterm){
  $.ajax({
    type: "POST",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: searchmethode, param: searchterm },
    dataType: "json",
    success: function (response) {
      console.log("Response: ", response)
    },
    error: function (err){
      console.log(err);
    }
  });
}

function deletedata(searchmethode, searchterm){
  $.ajax({
    type: "DELETE",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: searchmethode, param: searchterm },
    dataType: "json",
    success: function (response) {
      console.log("Response: ", response)
    },
    error: function (err){
      console.log(err);
    }
  });
}
