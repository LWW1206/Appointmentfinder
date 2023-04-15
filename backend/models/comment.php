<?php
class Comment
{
  public $id;
  public $ap_id;
  public $author;
  public $text;

  function __construct($id, $ap_id, $author, $text)
  {
    $this->id = $id;
    $this->ap_id = $ap_id;
    $this->author = $author;
    $this->text = $text;
  }
}
