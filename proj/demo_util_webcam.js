
var color = 'aqua';
var lineWidth = 5;
var scale=1;
function toTuples({ y, x }) {
  return [y, x];
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
function drawSegments([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeletons(keypoints, minConfidence, ctx, scale = 1) {
	
	//console.log(keypoints);
	
	//left elbow joint start
	if(compareLeftElbow(keypoints[5].position,keypoints[7].position,keypoints[9].position)==1){
		colors='green';
		
	}
	else{
		colors='black';
	}
if(keypoints[5].score >= minConfidence && keypoints[7].score >= minConfidence){ 
		
drawSegments(toTuple(keypoints[5].position),
      toTuple(keypoints[7].position), colors, scale, ctx);
}
if(keypoints[7].score >= minConfidence && keypoints[9].score >= minConfidence){ 
			  
drawSegments(toTuple(keypoints[7].position),
      toTuple(keypoints[9].position), colors, scale, ctx);
	  
}
		
	// left elbow joint ends
	
if(keypoints[6].score >= minConfidence && keypoints[8].score >= minConfidence){ 
			
	//right elbow joints
	drawSegments(toTuple(keypoints[6].position),
      toTuple(keypoints[8].position), color, scale, ctx);
}
if(keypoints[8].score >= minConfidence && keypoints[10].score >= minConfidence){ 
		
drawSegments(toTuple(keypoints[8].position),
      toTuple(keypoints[10].position), color, scale, ctx);
	  //right elbow joints ends.
}  
//right knee starts
if(keypoints[12].score >= minConfidence && keypoints[14].score >= minConfidence){ 
		
drawSegments(toTuple(keypoints[12].position),
      toTuple(keypoints[14].position), color, scale, ctx);
}
if(keypoints[14].score >= minConfidence && keypoints[16].score >= minConfidence){ 
		  
drawSegments(toTuple(keypoints[14].position),
      toTuple(keypoints[16].position), color, scale, ctx);
}  
//right knee ends

//left knee starts
if(keypoints[11].score >= minConfidence && keypoints[13].score >= minConfidence){ 
		
drawSegments(toTuple(keypoints[11].position),
      toTuple(keypoints[13].position), color, scale, ctx);
}
if(keypoints[13].score >= minConfidence && keypoints[15].score >= minConfidence){ 
			  
drawSegments(toTuple(keypoints[13].position),
      toTuple(keypoints[15].position), color, scale, ctx);

}


//left knee ends
if(keypoints[5].score >= minConfidence && keypoints[6].score > minConfidence){ 
			  
drawSegments(toTuple(keypoints[5].position),
      toTuple(keypoints[6].position), color, scale, ctx);
}
if(keypoints[6].score >= minConfidence && keypoints[12].score >= minConfidence){ 
		
drawSegments(toTuple(keypoints[6].position),
      toTuple(keypoints[12].position), color, scale, ctx);
}
if(keypoints[11].score >= minConfidence && keypoints[12].score >= minConfidence){ 
			  
drawSegments(toTuple(keypoints[11].position),
      toTuple(keypoints[12].position), color, scale, ctx);
}
if(keypoints[5].score >= minConfidence && keypoints[11].score >= minConfidence){ 
		 
drawSegments(toTuple(keypoints[5].position),
      toTuple(keypoints[11].position), color, scale, ctx);
}
	  
}

  /*adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(toTuple(keypoints[0].position),
      toTuple(keypoints[1].position), color, scale, ctx);
  });
  */


/**
 * Draw pose keypoints onto a canvas
 */
function drawKeypointss(keypoints, minConfidence, ctx, scale = 1) {
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


function renderImageToCanvass(image, size, canvas) {
  canvas.width = size[0];
  canvas.height = size[1];
  var ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);
}


function drawPointss(ctx, points, radius, color) {
  var data = points.buffer().values;

  for (let i = 0; i < data.length; i += 2) {
    var pointY = data[i];
    var pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}


    drawSegments([heatmapY, heatmapX], [offsetPointY, offsetPointX],
      color, scale, ctx);
  }
}
