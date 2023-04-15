<?php
class Appointment
{
  public $id;
  public $name;
  public $location;
  public $description;
  public $vote_start;
  public $vote_end;
  public $creator;

  function __construct($id, $name, $location, $description, $vote_start, $vote_end, $creator)
  {
    $this->id = $id;
    $this->name = $name;
    $this->location = $location;
    $this->description = $description;
    $this->vote_start = $vote_start;
    $this->vote_end = $vote_end;
    $this->creator = $creator;
  }
}
