$(document).ready(function () {
  loaddata("queryAppointments", "", "Appointment");
  // loaddata("queryAppointmentById", 1, "Appointment");
  // loaddata("queryAppointmentOptions", 1, "Option");
  // loaddata("queryAppointmentVotes", 1, "Voting");
  // loaddata("queryAppointmentComments", 1, "Comment");
});

function loaddata(searchmethode, searchterm, itemtype) {
  $.ajax({
    type: "GET",
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
