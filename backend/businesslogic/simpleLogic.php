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
      case "createNewAppointment":
        $res = $this->dh->createNewAppointment($param);
        break;
      case "createNewOption":
        $res = $this->dh->createNewOption($param);
        break;
      case "createNewVoting":
        $res = $this->dh->createNewVoting($param);
        break;
      case "createNewComment":
        $res = $this->dh->createNewComment($param);
        break;
      case "deleteAppointment":
        $res = $this->dh->deleteAppointment($param);
        break;
      // case "deleteOption":
      //   $res = $this->dh->deleteOption($param);
      //   break;
      // case "deleteVoting":
      //   $res = $this->dh->deleteVoting($param);
      //   break;
      // case "deleteComment":
      //   $res = $this->dh->deleteComment($param);
      //   break;
      default:
        $res = null;
        break;
    }
    return $res;
  }
}
