var Vpose=[]
var WPose=[]
function VideoPose(pose){
	
	Vpose.push(pose);
	console.log("Pose value :");
	console.log(pose);
	console.log("VPose array value :");
	console.log(Vpose);
	
}


function WebPose(pose){
	
	Wpose.push(pose);
	
}

function getPose(){
	return Vpose;
}

function ComparePose(){
	console.log("from array");
	console.log(Vpose);
	
}

