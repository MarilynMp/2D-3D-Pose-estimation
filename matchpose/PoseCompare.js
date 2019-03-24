var keyPose; //image Pose
var LeftHipDegree;
var LeftElbowDegree; 
var RightHipDegree;
var RightElbowDegree; 
var towards;
var towardss;
function setKeypoints(pose)
{
	keyPose=pose;
	console.log(keyPose);
	LeftArmAngle();
	RightArmAngle();
}

function getAngle(a,b,c)
{
	var ax=a.x;
	var ay=a.y;
	var bx=b.x;
	var by=b.y;
	var cx=c.x;
	var cy=c.y;
	
var p12 = Math.sqrt(Math.pow((ax - bx),2) + Math.pow((ay - by),2));
var p13 = Math.sqrt(Math.pow((ax - cx),2) + Math.pow((ay - cy),2));
var p23 = Math.sqrt(Math.pow((bx - cx),2) + Math.pow((by - cy),2));

//angle in degrees
var resultDegree = Math.acos(((Math.pow(p23, 2)) + (Math.pow(p12, 2)) - (Math.pow(p13, 2))) / (2 * p23 * p12)) * 180 / Math.PI;
return resultDegree;	
}
function LeftArmAngle(){

LeftElbowDegree=getAngle(keyPose[5].position,keyPose[7].position,keyPose[9].position);
LeftHipDegree=getAngle(keyPose[7].position,keyPose[5].position,keyPose[11].position);
if(keyPose[5].position.x> keyPose[9].position.x)
{
	towards="right";
	
}
else
{
	towards="left";
}
	
}
function compareLeftElbow(a,b,c,d){ //  (5,7,9,11)           5-7,7-9 and 7-5,5-11
	
	
var resultDegree = getAngle(a,b,c);
//console.log("webcamPose Elbow:",resultDegree);
//console.log("elbowPose",LeftElbowDegree);
var resultDegrees = getAngle(b,a,d);
//console.log("webcamPose:",resultDegrees);
//console.log(LeftHipDegree);
//var canvas = document.getElementById('output');
  //var ctx = canvas.getContext('2d');
  //"Right Elbow->"+"Target:"+RightElbowDegree+  "Right Hip->"+"Target:"+RightHipDegree+
  //ctx.fillText("Left Elbow->"+"Target:"+LeftElbowDegree+"Actual:"+resultDegree, 50,100 );
  //ctx.fillText("Left Hip->"+"Target:"+LeftHipDegree+"Actual:"+resultDegrees, 50,150 );
  //ctx.font = "15px Verdana black";
if( resultDegree>=LeftElbowDegree-10 && resultDegree<=LeftElbowDegree+10){
	
	
	if(resultDegrees>=LeftHipDegree-10 && resultDegrees<=LeftHipDegree+10) 
	{
		if(towards=="right")
		{
			if(a.x>=c.x)
				return 1;
			else
				return 0;
			
		}
		else
		{
			if(a.x<c.x)
				return 1;
			else
				return 0;
		}
		
	}
	else{ return 0;}
	
	
}
else{
	return 0;
}




}

function compareRightElbow(a,b,c,d){ //  (6,8,10,12)           6-8,8-10 and 8-6,6-12
	
	
var resultDegree = getAngle(a,b,c);
//console.log("webcamPose Right Elbow:",resultDegree);
//console.log("RightelbowPose",LeftElbowDegree);
var resultDegrees = getAngle(b,a,d);
//console.log("RightwebcamPose:",resultDegrees);
//console.log(RightHipDegree);
/*var canvas = document.getElementById('output');
  var ctx = canvas.getContext('2d');
  //"Right Elbow->"+"Target:"+RightElbowDegree+  "Right Hip->"+"Target:"+RightHipDegree+
  ctx.fillText("Actual:"+resultDegree, 50,100 );
  ctx.fillText("Actual:"+resultDegrees, 50,150 );
  ctx.font = "20px Verdana black";*/
if( resultDegree>=RightElbowDegree-10 && resultDegree<=RightElbowDegree+10){
	
	
	if(resultDegrees>=RightHipDegree-10 && resultDegrees<=RightHipDegree+10) 
	{
		if(towardss=="left")
		{
			if(a.x<=c.x)
				return 1;
			else
				return 0;
			
		}
		else
		{
			if(a.x>c.x)
				return 1;
			else
				return 0;
		}
		
	}
	else{ return 0;}
	
	
}
else{
	return 0;
}




}

function RightArmAngle(){
	
	//console.log("Image Keypoints");
	//console.log(keyPose);
	
	//left elbow
RightElbowDegree=getAngle(keyPose[6].position,keyPose[8].position,keyPose[10].position);
RightHipDegree=getAngle(keyPose[8].position,keyPose[6].position,keyPose[12].position);
if(keyPose[6].position.x> keyPose[10].position.x)
{
	towardss="right";
	
}
else
{
	towardss="left";
}
	
}