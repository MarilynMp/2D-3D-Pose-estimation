<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" href="swc.css">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="stylesheet" href="swc.css">
<title>Gallery from Folder Demo</title>
<style type="text/css">

li{
    list-style-type:none;
    margin-right:50px;
    margin-bottom:30px;
    float:left;
	box-shadow: 10px 10px 5px grey;
}


</style></head>

<body bgcolor="	black">
<div>
<div>
<center><h1 style="color: white ; font-family: Arial Black">IMAGE GALLERY</h1></center>
<div id="boxes">
<div style="top: 50%; left: 50%; display: none;" id="dialog" class="window"> 
<div id="san">
<a href="#" class="close agree"><img src="close-icon.png" width="25" style="float:right; margin-right: -25px; margin-top: -20px;"></a>
<img src="ins2.JPG" width="450">
</div>
</div>
<div style="width: 2478px; font-size: 32pt; color:white; height: 1202px; display: none; opacity: 0.4;" id="mask"></div>
</div>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js"></script> 
<script src="swc.js"></script>



<ul>
    <?php
        $dirname = "images/";
        $images = glob($dirname."*.jpg");
        
foreach($images as $image) {?>



    <li><button onClick="selectImage('<?php echo($image) ?>')"><img src='<?php echo($image)?>'  width="350" height="350" /><br /></button></li>
<?php
        }   



	
    ?>
	<script  src="imageSource.js"></script>
	
	<script>
	
	function selectImage(image)
	{
		var imageName=image;
		
		localStorage.setItem("imageSrc",image);
		window.location.href = "camera.html";
		
		
	}
	</script>
	<script src="swc.js"></script>
</ul>

</body>
</html>