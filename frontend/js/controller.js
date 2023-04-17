$(document).ready(function () {
  // loaddata("queryAppointments", "", "Appointment");
  // loaddata("queryAppointmentById", 1, "Appointment");
  // loaddata("queryAppointmentOptions", 1, "Option");
  // loaddata("queryAppointmentVotes", 1, "Voting");
  // loaddata("queryAppointmentComments", 1, "Comment");

  // writedata("createNewAppointment", {"ap_name": "New appointment", "location": "The location", "description": "Appointment description", "vote_start": "2023-04-01", "vote_end": "2023-05-01", "creator_name": "Matthias"})
  // writedata("createNewOption", {"ap_id": 1, "op_start": "2023-04-25 12:00", "op_end": "2023-04-25 13:00"})
  // writedata("createNewVoting", {"ap_id": 1, "op_id": 1, "voter_name": "Tester"})
  // writedata("createNewComment", {"ap_id": 1, "author_name": "Tester", "comment_text": "Testing.."})

  // deletedata("deleteAppointment", 4);
});

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
