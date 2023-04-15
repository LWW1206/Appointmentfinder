<?php
class Voting
{
  public $v_id;
  public $ap_id;
  public $op_id;
  public $voter_name;

  function __construct($v_id, $ap_id, $op_id, $voter_name)
  {
    $this->v_id = $v_id;
    $this->ap_id = $ap_id;
    $this->op_id = $op_id;
    $this->voter_name = $voter_name;
  }
}
