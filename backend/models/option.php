<?php
class Option
{
  public $op_id;
  public $ap_id;
  public $start;
  public $end;

  function __construct($op_id, $ap_id, $start, $end)
  {
    $this->op_id = $op_id;
    $this->ap_id = $ap_id;
    $this->start = $start;
    $this->end = $end;
  }
}
