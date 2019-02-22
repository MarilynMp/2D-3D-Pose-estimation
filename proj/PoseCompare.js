var keyPose; //image Pose
var LeftHipDegree;
var LeftElbowDegree; 
function setKeypoints(pose)
{
	keyPose=pose;
	//console.log(keyPose.keypoints[5].position);
	//left arm
	FindAngle_Img();
}

function getKeypoints()
{
	return keyPose;
}
function FindAngle_Img(){
	
	//console.log("Image Keypoints");
	//console.log(keyPose);
	
	//left elbow
var px=keyPose.keypoints[5].position.x;
var py=keyPose.keypoints[5].position.y;
	
var qy=keyPose.keypoints[7].position.y;
var qx=keyPose.keypoints[7].position.x;
var rx=keyPose.keypoints[9].position.x;
var ry=keyPose.keypoints[9].position.y;
//var {ry,rx}=keyPose.keypoints[9].position;
console.log(px,py,qx,qy,rx,ry);
var q12 = Math.sqrt(Math.pow((px - qx),2) + Math.pow((py - qy),2));
var q13 = Math.sqrt(Math.pow((px - rx),2) + Math.pow((py - ry),2));
var q23 = Math.sqrt(Math.pow((qx - rx),2) + Math.pow((qy - ry),2));
 LeftElbowDegree = Math.acos(((Math.pow(q23, 2)) + (Math.pow(q12, 2)) - (Math.pow(q13, 2))) / (2 * q23 * q12)) * 180 / Math.PI;
//console.log("elbowPose",LeftElbowDegree);
var ax=keyPose.keypoints[7].position.x;
var ay=keyPose.keypoints[7].position.y;	
var by=keyPose.keypoints[5].position.y;
var bx=keyPose.keypoints[5].position.x;
var cx=keyPose.keypoints[11].position.x;
var cy=keyPose.keypoints[11].position.y;

var p12 = Math.sqrt(Math.pow((ax - bx),2) + Math.pow((ay - by),2));
var p13 = Math.sqrt(Math.pow((ax - cx),2) + Math.pow((ay - cy),2));
var p23 = Math.sqrt(Math.pow((bx - cx),2) + Math.pow((by - cy),2));
LeftHipDegree = Math.acos(((Math.pow(p23, 2)) + (Math.pow(p12, 2)) - (Math.pow(p13, 2))) / (2 * p23 * p12)) * 180 / Math.PI;
//console.log("elbowPose",LeftHipDegree);

	
	
}
function compareLeftElbow(a,b,c,d){ //5,7,7,9
	var ax=a.x;
	var ay=a.y;
	var bx=b.x;
	var by=b.y;
	var cx=c.x;
	var cy=c.y;
	//var dx=d.x;
	//var dy=d.y;
	console.log(ax,ay);
	//write comparing algo over here
var p12 = Math.sqrt(Math.pow((ax - bx),2) + Math.pow((ay - by),2));
var p13 = Math.sqrt(Math.pow((ax - cx),2) + Math.pow((ay - cy),2));
var p23 = Math.sqrt(Math.pow((bx - cx),2) + Math.pow((by - cy),2));

//angle in degrees
var resultDegree = Math.acos(((Math.pow(p23, 2)) + (Math.pow(p12, 2)) - (Math.pow(p13, 2))) / (2 * p23 * p12)) * 180 / Math.PI;
console.log("webcamPose",resultDegree);

if( resultDegree>=LeftElbowDegree-10 && resultDegree<=LeftElbowDegree+10){
	
	/*
	if()
	{
		return 1;
	}
	else return 0;
	*/
	return 1;
	
}
else{
	return 0;
}


console.log(LeftElbowDegree);

}

