var colors = 'red';
var lineWidths = 5;
var scales=1;

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    var keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    var { y, x } = keypoint.position;
    ctx.beginPath();
    ctx.arc(x * scale, y * scale, 3, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
	
  }
}

async function start(){
var imageScaleFactor = 0.8;
    var flipHorizontal = false;
    var outputStride = 8;
    var maxPoseDetections = 2;
	var minPoseConfidence=0.2;
	var minPartConfidence=0.15;
    var imageElement = document.getElementById('cat');

    var net =  await posenet.load();
	var canvas = document.getElementById('poster');
var ctx = canvas.getContext('2d')
	//var pose= await net.estimateSinglePose(imageElement,imageScaleFactor,flipHorizontal,outputStride);
	var poses = await net.estimateMultiplePoses(imageElement, imageScaleFactor, flipHorizontal, outputStride,
          maxPoseDetections,
          minPartConfidence,
          );
		 poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
       
          drawKeypoints(keypoints, minPartConfidence, ctx, scales);
        
        
          draw(keypoints,ctx);
       
      }
    });
	
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
/*
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
	*/
	
	function draw(keypoints,ctx){
//console.log(poses);
setKeypoints(keypoints);
	  
	//left elbow joint start
	
	
drawSegmentss(toTuple(keypoints[5].position),
      toTuple(keypoints[7].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(keypoints[7].position),
      toTuple(keypoints[9].position), colors, scales, ctx);
	  
	
	// left elbow joint ends
	
	
	//right elbow joints
	drawSegmentss(toTuple(keypoints[6].position),
      toTuple(keypoints[8].position), colors, scales, ctx);

drawSegmentss(toTuple(keypoints[8].position),
      toTuple(keypoints[10].position), colors, scales, ctx);
	  //right elbow joints ends.
	  
//right knee starts

drawSegmentss(toTuple(keypoints[12].position),
      toTuple(keypoints[14].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(keypoints[14].position),
      toTuple(keypoints[16].position), colors, scales, ctx);
	  
//right knee ends

//left knee starts

drawSegmentss(toTuple(keypoints[11].position),
      toTuple(keypoints[13].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(keypoints[13].position),
      toTuple(keypoints[15].position), colors, scales, ctx);




//left knee ends	
  
drawSegmentss(toTuple(keypoints[5].position),
      toTuple(keypoints[6].position), colors, scales, ctx);

drawSegmentss(toTuple(keypoints[6].position),
      toTuple(keypoints[12].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(keypoints[11].position),
      toTuple(keypoints[12].position), colors, scales, ctx);
	  
drawSegmentss(toTuple(keypoints[5].position),
      toTuple(keypoints[11].position), colors, scales, ctx);

	  	  

	  
	  
	  

	}
	
	
	
	
start();