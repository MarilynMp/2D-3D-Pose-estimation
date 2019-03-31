var keyPose; //image Pose
var LeftHipDegree,LeftWaistDegree;
var LeftElbowDegree,LeftKneeDegree; 
var RightHipDegree,RightWaistDegree;
var RightElbowDegree,RightKneeDegree; 
var towards;
var towardss;
var towardsleg;
var towardssleg;
function setKeypoints(pose)
{
	keyPose=pose;
	console.log(keyPose);
	console.log(keyPose[5].position);
	LeftArmAngle();
	RightArmAngle();
	LeftLegAngle();
	RightLegAngle();
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
/******************mod****************/

function LeftLegAngle(){

LeftKneeDegree=getAngle(keyPose[11].position,keyPose[13].position,keyPose[15].position);
LeftWaistDegree=getAngle(keyPose[13].position,keyPose[11].position,keyPose[12].position);
if(keyPose[11].position.x> keyPose[15].position.x)
{
	towardsleg="right";
	
}
else
{
	towardsleg="left";
}
	
}

function RightLegAngle(){

RightKneeDegree=getAngle(keyPose[12].position,keyPose[14].position,keyPose[16].position);
RightWaistDegree=getAngle(keyPose[14].position,keyPose[12].position,keyPose[11].position);
if(keyPose[12].position.x> keyPose[16].position.x)
{
	towardssleg="right";
	
}
else
{
	towardssleg="left";
}
	
}

function compareLeftLeg(a,b,c,d){ //  (11,13,15,12)          
	
	
var resultDegree = getAngle(a,b,c);
//console.log("webcamPose Elbow:",resultDegree);
//console.log("elbowPose",LeftElbowDegree);
var resultDegrees = getAngle(b,a,d);

var canvas = document.getElementById('LeftLeg');
 var ctx = canvas.getContext('2d');
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.restore();
 ctx.font = "15px Verdana black";
 ctx.fillText("Left Knee-> "+"Target:"+Math.round(LeftKneeDegree)+" Actual:"+Math.round(resultDegree), 10,10 );
 ctx.fillText("Left Hip-> "+"Target:"+Math.round(LeftWaistDegree)+" Actual:"+Math.round(resultDegrees), 10,25 );
 




if( resultDegree>=LeftKneeDegree-10 && resultDegree<=LeftKneeDegree+10){
	
	
	if(resultDegrees>=LeftWaistDegree-10 && resultDegrees<=LeftWaistDegree+10) 
	{
		if(towardsleg=="right")
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


function compareRightLeg(a,b,c,d){          
	
	
var resultDegree = getAngle(a,b,c);
//console.log("webcamPose Elbow:",resultDegree);
//console.log("elbowPose",LeftElbowDegree);
var resultDegrees = getAngle(b,a,d);

var canvas = document.getElementById('RightLeg');
 var ctx = canvas.getContext('2d');
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.restore();
 ctx.font = "15px Verdana black";
 ctx.fillText("Right Knee-> "+"Target:"+Math.round(RightKneeDegree)+" Actual:"+Math.round(resultDegree), 10,10 );
 ctx.fillText("Right Hip-> "+"Target:"+Math.round(RightWaistDegree)+" Actual:"+Math.round(resultDegrees), 10,25 );
 




if( resultDegree>=RightKneeDegree-10 && resultDegree<=RightKneeDegree+10){
	
	
	if(resultDegrees>=RightWaistDegree-10 && resultDegrees<=RightWaistDegree+10) 
	{
		if(towardssleg=="left")
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



/****************end*******************/





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
var canvas = document.getElementById('LeftArm');
 var ctx = canvas.getContext('2d');
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.restore();
 ctx.font = "15px Verdana black";
 ctx.fillText("Left Elbow-> "+"Target:"+Math.round(LeftElbowDegree)+" Actual:"+Math.round(resultDegree), 10,10 );
 ctx.fillText("Left Shoulder-> "+"Target:"+Math.round(LeftHipDegree)+" Actual:"+Math.round(resultDegrees), 10,25 );
 
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
var canvas = document.getElementById('RightArm');
 var ctx = canvas.getContext('2d');
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.restore();
 ctx.font = "15px Verdana black";
 ctx.fillText("Right Elbow-> "+"Target:"+Math.round(RightElbowDegree)+" Actual:"+Math.round(resultDegree), 10,10 );
 ctx.fillText("Right Shoulder-> "+"Target:"+Math.round(RightHipDegree)+" Actual:"+Math.round(resultDegrees), 10,25 );
 
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