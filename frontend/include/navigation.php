<?php
switch($_GET['page']){
    case "page1" :
        include "include/page1.php";
        break;
    case "page2" :
        include "include/page2.php";
        break;
    case "page3" :
        include "include/page3.php";
        break;
    default:
        include "include/list.php";
        break;
    }

?>