$(document).ready(function () {
  //console.log("WTF");
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

const addOptionBtn = document.querySelector("#add-option-btn");
const form = document.querySelector("#appointment-form");

addOptionBtn.addEventListener("click", () => {
  //console.log("in here");
  const newInput = document.createElement("div");
  newInput.innerHTML = `
  <div class="row" id = "option-row">
  <div class="input-box col"> <input type="datetime-local" id="option-start" name="option-start" required> </div>
  <div class="input-box col"> <input type="datetime-local" id="option-end" name="option-end" required> </div>
  </div>
  `;
  form.insertBefore(newInput, addOptionBtn);
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
      addOptionToDetails(appointmentId);
      console.log("Appointment details: ", response);
      var appointment = response[0];
      $('#detail-name').append(appointment.name);
      $('#detail-location').append(appointment.location);
      $('#detail-description').append(appointment.description);
      $('#detail-start').append(appointment.vote_start);
      $('#detail-end').append(appointment.vote_end);
      $('#detail-creator').append(appointment.creator);

      $('.wrapper > .h2').hide();
      $('.list-group').hide();
      $('.Details').show();

      if ($('.mylistitem[data-id="' + appointmentId + '"]').hasClass('over')) {
        $('form input').prop('disabled', true);
        $('form button').prop('disabled', true);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}
}

function addOptionToDetails(id) {
  $.ajax({
    type: "POST",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: "queryAppointmentOptions", param: id },
    dataType: "json",
    success: function (response) {
      console.log(response);
      var options = response;
      var optionDiv = $('<div>').addClass('option-div');
      $.each(options, function (i, option) {
        var start = option.start;
        var end = option.end;
        console.log(start);
        console.log(end);
        var optionItem = $('<div>').addClass('form-check');
        var label = $('<label>').addClass('form-check-label').text(start + ' to ' + end);
        var input = $('<input>').addClass('form-check-input').attr({
          type: 'checkbox',
          name: 'option',
          value: start + ' to ' + end
        });
        optionItem.append(input).append(label);
        optionDiv.append(optionItem);
      });
      $('.appointment.option').html('<h2>voteable appointment options:</h2>');
      $('.appointment.option').append(optionDiv);
    },
    error: function (err) {
      console.log(err);
    }
  });
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
    creator_name: creator,
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
        var ap_id = response[1]; // get the last insert ID from the response
        saveOptions(ap_id);
        window.location.reload();
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function saveOptions(ap_id) {
  let rows = document.querySelectorAll("#option-row");
  rows.forEach(function (row) {
    let start_op = row.querySelector("#option-start").value;
    let end_op = row.querySelector("#option-end").value;
    const data = {
      ap_id: ap_id,
      op_start: start_op,
      op_end: end_op,
    };
    $.ajax({
      type: "POST",
      url: "../backend/serviceHandler.php",
      cache: false,
      data: { method: "createNewOption", param: data },
      dataType: "json",
      success: function (response) {
        console.log("Response: ", response);
      },
      error: function (err) {
        console.log(err);
      }
    });
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
      var currentDate = new Date();
      $.each(appointments, function(i, appointment) {
        var listItem = $('<a>').attr({
          href: '#',
          class: 'list-group-item list-group-item-action mylistitem' + (currentDate > new Date(appointment.vote_end) ? ' over' : ''),
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