
<?php
	$email = $_POST["email"];
	$to = "info@realcorpcapital.co.uk";
	$headers = $_POST["name"];
	$message = $_POST["message"];
	
	mail($to, $message, $headers);
  

?>

