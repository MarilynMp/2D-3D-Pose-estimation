var colors = 'red';
var lineWidths = 5;
var scales=1;
async function start(){
var imageScaleFactor = 0.85;
    var flipHorizontal = false;
    var outputStride = 16;
    var maxPoseDetections = 3;

    var imageElement = document.getElementById('cat');

    var net =  await posenet.load();
	var pose= await net.estimateSinglePose(imageElement,imageScaleFactor,flipHorizontal,outputStride);
	draw(pose);
}

  function toTuple({ y, x }) {
  return [y, x];
}

    
	
	function drawSegmentss([ay, ax], [by, bx], colors, scales, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scales, ay * scales);
  ctx.lineTo(bx * scales, by * scales);
  ctx.lineWidth = lineWidths;
  ctx.strokeStyle = colors;
  ctx.stroke();
}
function draw(poses){
//console.log(poses);
var canvas = document.getElementById('poster');
var ctx = canvas.getContext('2d');
setKeypoints(poses);
	  
	//left elbow joint start
	
	
drawSegmentss(toTuple(poses.keypoints[5].position),
      toTuple(poses.keypoints[7].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(poses.keypoints[7].position),
      toTuple(poses.keypoints[9].position), colors, scales, ctx);
	  
	
	// left elbow joint ends
	
	
	//right elbow joints
	drawSegmentss(toTuple(poses.keypoints[6].position),
      toTuple(poses.keypoints[8].position), colors, scales, ctx);

drawSegmentss(toTuple(poses.keypoints[8].position),
      toTuple(poses.keypoints[10].position), colors, scales, ctx);
	  //right elbow joints ends.
	  
//right knee starts

drawSegmentss(toTuple(poses.keypoints[12].position),
      toTuple(poses.keypoints[14].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(poses.keypoints[14].position),
      toTuple(poses.keypoints[16].position), colors, scales, ctx);
	  
//right knee ends

//left knee starts

drawSegmentss(toTuple(poses.keypoints[11].position),
      toTuple(poses.keypoints[13].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(poses.keypoints[13].position),
      toTuple(poses.keypoints[15].position), colors, scales, ctx);




//left knee ends	
  
drawSegmentss(toTuple(poses.keypoints[5].position),
      toTuple(poses.keypoints[6].position), colors, scales, ctx);

drawSegmentss(toTuple(poses.keypoints[6].position),
      toTuple(poses.keypoints[12].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(poses.keypoints[11].position),
      toTuple(poses.keypoints[12].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(poses.keypoints[5].position),
      toTuple(poses.keypoints[11].position), colors, scales, ctx);

	  	  

	  
	  
	  

	}
start();