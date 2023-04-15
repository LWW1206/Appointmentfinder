<?php
include("./models/appointment.php");
include("./models/comment.php");
include("./models/option.php");
include("./models/voting.php");

class DataHandler
{

  public function queryAppointments()
  {
    include_once("dbaccess.php");
    $res = array();
    $sql = "SELECT * from appointments;";
    $stmt = $mysqli->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $name, $location, $description, $vote_start, $vote_end, $creator);
    for ($i = 0; $i < $stmt->num_rows; $i++) {
      $stmt->fetch();
      $item = new Appointment($id, $name, $location, $description, $vote_start, $vote_end, $creator);
      array_push($res, $item);
    }
    return $res;
  }

  public function queryAppointmentById($ap_id)
  {
    include_once("dbaccess.php");
    $res = array();
    $sql = "SELECT * from appointments a WHERE a.ap_id = ?;";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $ap_id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $name, $location, $description, $vote_start, $vote_end, $creator);
    for ($i = 0; $i < $stmt->num_rows; $i++) {
      $stmt->fetch();
      $item = new Appointment($id, $name, $location, $description, $vote_start, $vote_end, $creator);
      array_push($res, $item);
    }
    return $res;
  }

  public function queryAppointmentOptions($ap_id)
  {
    include_once("dbaccess.php");
    $res = array();
    $sql = "SELECT * from options o WHERE o.ap_id = ?;";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $ap_id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($op_id, $ap_id, $start, $end);
    for ($i = 0; $i < $stmt->num_rows; $i++) {
      $stmt->fetch();
      $item = new Option($op_id, $ap_id, $start, $end);
      array_push($res, $item);
    }
    return $res;
  }

  public function queryAppointmentVotes($ap_id)
  {
    include_once("dbaccess.php");
    $res = array();
    $sql = "SELECT * from votings v WHERE v.ap_id = ?;";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $ap_id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($v_id, $ap_id, $op_id, $voter_name);
    for ($i = 0; $i < $stmt->num_rows; $i++) {
      $stmt->fetch();
      $item = new Voting($v_id, $ap_id, $op_id, $voter_name);
      array_push($res, $item);
    }
    return $res;
  }

  public function queryAppointmentComments($ap_id)
  {
    include_once("dbaccess.php");
    $res = array();
    $sql = "SELECT * from comments c WHERE c.ap_id = ?;";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $ap_id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $ap_id, $author, $text);
    for ($i = 0; $i < $stmt->num_rows; $i++) {
      $stmt->fetch();
      $item = new Comment($id, $ap_id, $author, $text);
      array_push($res, $item);
    }
    return $res;
  }
}
