<?php
include("db/dataHandler.php");

class SimpleLogic
{
  private $dh;
  function __construct()
  {
    $this->dh = new DataHandler();
  }

  function handleRequest($method, $param)
  {
    switch ($method) {
      case "queryAppointments":
        $res = $this->dh->queryAppointments();
        break;
      case "queryAppointmentById":
        $res = $this->dh->queryAppointmentById($param);
        break;
      case "queryAppointmentOptions":
        $res = $this->dh->queryAppointmentOptions($param);
        break;
      case "queryAppointmentVotes":
        $res = $this->dh->queryAppointmentVotes($param);
        break;
      case "queryAppointmentComments":
        $res = $this->dh->queryAppointmentComments($param);
        break;
      default:
        $res = null;
        break;
    }
    return $res;
  }
}
