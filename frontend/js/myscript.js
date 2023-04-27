$(document).ready(function () {
  $('.Details').hide();
  $('.newApp').hide();
  getAppointments();
  const startInput = document.getElementById("start");
  const endInput = document.getElementById("end");
  startInput.addEventListener("change", generateRecommendations);
  endInput.addEventListener("change", generateRecommendations);
  $('.list-group').on('click', '.list-group-item', function () {
    showdetails();
  });
  $('#appointment-form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submit action.
    savetoDatabase();
  });
});

function showdetails() {
  $('.wrapper > .h2').hide();
  $('.list-group').hide();
  $('.Details').show();

  var appointmentId = $(this).data('id');
  $.ajax({
    type: "POST",
    url: "../backend/serviceHandler.php",
    cache: false,
    data: { method: "queryAppointmentById", param: appointmentId },
    dataType: "json",
    success: function (response) {
      console.log("Appointment details: ", response);
      var appointment = response;
      $('#detail-name').append(appointment.ap_name);
      $('#detail-location').append(appointment.location);
      $('#detail-description').append(appointment.description);
      $('#detail-start').append(appointment.vote_start);
      $('#detail-end').append(appointment.vote_end);
      $('#detail-creator').append(appointment.creator_name);
      $('.Details').show();
      $('.newApp').hide();
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
      var appointmentId = response.appointmentId;
      alert("Appointment saved successfully!");
      window.location.reload();

      const recommendations = document.querySelectorAll(".recommendations-list li");
      const recommendationsArray = [];
      recommendations.forEach(recommendation => {
        recommendationsArray.push(recommendation.textContent);
      });
      //console.log(recommendationsArray);
      saveOptions(appointmentId, recommendationsArray);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function saveOptions(appointmentId, recommendationsArray) {
  console.log("in saveOptions");
  const startDates = [];
  const endDates = [];
  for (const str of recommendationsArray) {
    const [startDateStr, startTimeStr, endDateStr, endTimeStr] = str.split(/[\s,-]+/);
    const startDateTimeStr = `${startDateStr.split('.').reverse().join('-')} ${startTimeStr}`;
    const endDateTimeStr = `${endDateStr.split('.').reverse().join('-')} ${endTimeStr}`;
    startDates.push(startDateTimeStr);
    endDates.push(endDateTimeStr);
  }
  console.log(startDates);
  console.log(endDates);
  for(var i = 0; i < startDates.length; i++){
    console.log(appointmentId),
    console.log(startDates[i]),
    console.log(endDates[i])
    var data = {
      ap_id: appointmentId, // pass the auto-incremented appointment ID here
      op_start: startDates[i],
      op_end: endDates[i],
    };
    $.ajax({
      type: "POST",
      url: "../backend/serviceHandler.php",
      cache: false,
      data: { method: "createNewOption", param: data },
      dataType: "json",
      success: function (response) {
        console.log("Response: ", response);
        alert("Option saved successfully!");
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
}


let recommendationsContainer = null;

function generateRecommendations() {
  const startTime = new Date(document.getElementById("start").value);
  const endTime = new Date(document.getElementById("end").value);
  const duration = (endTime - startTime) / (1000 * 60); // duration in minutes

  if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) {
    return;
  }
  if (recommendationsContainer) {
    recommendationsContainer.remove();
  }

  recommendationsContainer = document.createElement("div");
  recommendationsContainer.classList.add("recommendations-container");

  const recommendationsHeader = document.createElement("h3");
  recommendationsHeader.textContent = "Recommended appointment times:";

  const recommendationsList = document.createElement("ul");
  recommendationsList.classList.add("recommendations-list");

  let count = 0;
  while (count < 3) {
    const offset = Math.floor(Math.random() * duration);
    const recommendationTime = new Date(startTime.getTime() + (offset * 60000));
    const endTimeFormatted = new Date(recommendationTime.getTime() + (3 * 60 * 60 * 1000));
    const startTimeFormatted = recommendationTime.toLocaleString('de-DE');
    const endTimeFormattedString = endTimeFormatted.toLocaleString('de-DE');

    if (recommendationTime <= endTime) {
      const recommendationItem = document.createElement("li");
      recommendationItem.innerHTML = `<span>${startTimeFormatted} - ${endTimeFormattedString}</span>`;
      recommendationsList.appendChild(recommendationItem);
      count++;
    }
  }
  recommendationsContainer.appendChild(recommendationsHeader);
  recommendationsContainer.appendChild(recommendationsList);

  const newAppForm = document.getElementById("appointment-form");
  newAppForm.insertBefore(recommendationsContainer, newAppForm.lastElementChild);
}

//['25.4.2023, 23:57:00 - 26.4.2023, 02:57:00', '28.4.2023, 19:15:00 - 28.4.2023, 22:15:00', '28.4.2023, 14:18:00 - 28.4.2023, 17:18:00']
/*const arr = ['25.4.2023, 23:57:00 - 26.4.2023, 02:57:00', '28.4.2023, 19:15:00 - 28.4.2023, 22:15:00', '28.4.2023, 14:18:00 - 28.4.2023, 17:18:00'];

const startDates = [];
const endDates = [];

for (const str of arr) {
  const [startDateStr, startTimeStr, endDateStr, endTimeStr] = str.split(/[\s,-]+/);
  const startDateTimeStr = `${startDateStr.split('.').reverse().join('-')} ${startTimeStr}`;
  const endDateTimeStr = `${endDateStr.split('.').reverse().join('-')} ${endTimeStr}`;
  startDates.push(startDateTimeStr);
  endDates.push(endDateTimeStr);
}

console.log(startDates);
console.log(endDates);

Output:
["2023-4-25 23:57:00", "2023-4-28 19:15:00", "2023-4-28 14:18:00"]
["2023-4-26 02:57:00", "2023-4-28 22:15:00", "2023-4-28 17:18:00"]

*/

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
        //console.log(appointment.id);
        //console.log(appointment.name);
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
