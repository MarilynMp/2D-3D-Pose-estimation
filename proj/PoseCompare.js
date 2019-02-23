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

LeftElbowDegree=getAngle(keyPose.keypoints[5].position,keyPose.keypoints[7].position,keyPose.keypoints[9].position);
LeftHipDegree=getAngle(keyPose.keypoints[7].position,keyPose.keypoints[5].position,keyPose.keypoints[11].position);
if(keyPose.keypoints[5].position.x> keyPose.keypoints[9].position.x)
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
var resultDegrees = getAngle(b,c,d);
//console.log("webcamPose:",resultDegrees);
//console.log(LeftHipDegree);
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
var resultDegrees = getAngle(b,c,d);
//console.log("RightwebcamPose:",resultDegrees);
//console.log(RightHipDegree);

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
RightElbowDegree=getAngle(keyPose.keypoints[6].position,keyPose.keypoints[8].position,keyPose.keypoints[10].position);
RightHipDegree=getAngle(keyPose.keypoints[8].position,keyPose.keypoints[6].position,keyPose.keypoints[12].position);
if(keyPose.keypoints[6].position.x> keyPose.keypoints[10].position.x)
{
	towardss="right";
	
}
else
{
	towardss="left";
}
	
}
