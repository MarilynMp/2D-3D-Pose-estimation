
<?php
// Fetching Values From URL
$name2 = $_POST['name1'];
$email2 = $_POST['email1'];
$message2 = $_POST['message1'];

echo "Form Submitted succesfully";

 $to = 'mari169802@gmail.com';
 $subject = "New Message From Client: ".$email2;
 $body = '<html>
    <body>
     <h2>Client Info</h2>
     <p> Client Name: '.$name2.'</p>
     <p>Client Email: '.$email2.'</p>
	 <br>
	 <h2>Client Message</h2>
<p>'.$message2.'</p>
    </body>
   </html>';

//headers
$headers  = "From: ".$name2." <".$email2.">\r\n";
$headers .= "Reply-To: ".$email2."\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset-utf-8";

//send
$send = mail($to, $subject, $body, $headers);

?>