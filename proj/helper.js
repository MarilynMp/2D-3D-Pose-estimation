
var maxVideoSize = 513;
var canvasSize = 400;
var stats = new Stats();

function isAndroids() {
  return /Android/i.test(navigator.userAgent);
}

function isiOSs() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobiles() {
  return isAndroid() || isiOS();
}

async function playVideos(){
  var video=document.getElementById('videos');
  video.width = maxVideoSize;
  video.height = maxVideoSize;
  return video;
}

function handleDataAvailables(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}


async function setupCameras() {
 var video = document.getElementById('videos');
  video.width = maxVideoSize;
  video.height = maxVideoSize;
  video.crossOrigin="anonymous";

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    var mobile = isMobiles();
    const stream = await navigator.mediaDevices.getUserMedia({
      'audios': false,
      'videos': {
        facingMode: 'user',
        width: mobile ? undefined : maxVideoSize,
        height: mobile ? undefined: maxVideoSize}
    });
    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  } else {
    var errorMessage = "This browser does not support video capture, or this device does not have a camera";
    alert(errorMessage);
    return Promise.reject(errorMessage);
  }
}

async function loadVideos() {
  // var video = await setupCamera();
  var video=await playVideos();


  //video.play();
  return video;

}

var guiState = {
  algorithm: 'single-pose',
  input: {
    mobileNetArchitecture: isMobiles() ? '0.50' : '1.01',
    outputStride: 16,
    imageScaleFactor: 0.5,
  },
  singlePoseDetection: {
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
  },
  multiPoseDetection: {
    maxPoseDetections: 2,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.3,
    nmsRadius: 20.0,
  },
  output: {
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
  },
  net: null,
};


function setupGuis(cameras, net) {
  guiState.net = net;

  // if (cameras.length > 0) {
  //   guiState.camera = cameras[0].deviceId;
  // }

  // var cameraOptions = cameras.reduce((result, { label, deviceId }) => {
  //   result[label] = deviceId;
  //   return result;
  // }, {});

  var gui = new dat.GUI({ width: 300 });

  
  var algorithmController = gui.add(
    guiState, 'algorithm', ['single-pose', 'multi-pose']);

  let input = gui.addFolder('Input');

  var architectureController =
    input.add(guiState.input, 'mobileNetArchitecture', ['1.01', '1.00', '0.75', '0.50']);

  input.add(guiState.input, 'outputStride', [8, 16, 32]);
  // Image scale factor: What to scale the image by before feeding it through the network.
  input.add(guiState.input, 'imageScaleFactor').min(0.2).max(1.0);
  input.open();

  let single = gui.addFolder('Single Pose Detection');
  single.add(guiState.singlePoseDetection, 'minPoseConfidence', 0.0, 1.0);
  single.add(guiState.singlePoseDetection, 'minPartConfidence', 0.0, 1.0);
  single.open();

  let multi = gui.addFolder('Multi Pose Detection');
  multi.add(
    guiState.multiPoseDetection, 'maxPoseDetections').min(1).max(20).step(1);
  multi.add(guiState.multiPoseDetection, 'minPoseConfidence', 0.0, 1.0);
  multi.add(guiState.multiPoseDetection, 'minPartConfidence', 0.0, 1.0);
  multi.add(guiState.multiPoseDetection, 'nmsRadius').min(0.0).max(40.0);

  let output = gui.addFolder('Output');
  output.add(guiState.output, 'showVideo');
  output.add(guiState.output, 'showSkeleton');
  output.add(guiState.output, 'showPoints');
  output.open();


  architectureController.onChange(function (architecture) {
    guiState.changeToArchitecture = architecture;
  });

  algorithmController.onChange(function (value) {
    switch (guiState.algorithm) {
      case 'single-pose':
        multi.close();
        single.open();
        break;
      case 'multi-pose':
        single.close();
        multi.open();
        break;
    }
  });
}


function setupFPSs() {
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}


function detectPoseInRealTimes(video, net) {
 var canvas = document.getElementById('outputs');
  var ctx = canvas.getContext('2d');
  
  
   var flipHorizontal = false;

  canvas.width = canvasSize;
  canvas.height = canvasSize;
   // frames per second
      let options = {mimeType: 'video/webm'};
      recordedBlobs = [];

      $('videos').on('play', function (e) {
  var audioCtx = new AudioContext();
  // create a stream from our AudioContext
  var dest = audioCtx.createMediaStreamDestination();
  aStream = dest.stream;
  // connect our video element's output to the stream
  var vid = document.getElementById('videos');
  var sourceNode = audioCtx.createMediaElementSource(vid);
  sourceNode.connect(dest)


   // output to our headphones
   sourceNode.connect(audioCtx.destination);


  cStream = canvas.captureStream();
  cStream.addTrack(aStream.getAudioTracks()[0]);

  mediaRecorder = new MediaRecorder(cStream);

  mediaRecorder.start(500);
  mediaRecorder.ondataavailable = handleDataAvailable;

});
  async function poseDetectionFrames() {

    if (guiState.changeToArchitecture) {
      guiState.net.dispose();

      // Load the PoseNet model weights for either the 0.50, 0.75, 1.00, or 1.01 version
      guiState.net = await posenet.load(Number(guiState.changeToArchitecture));

      guiState.changeToArchitecture = null;
    }

    // Begin monitoring code for frames per second
    stats.begin();
    var imageScaleFactor = guiState.input.imageScaleFactor;
    var outputStride = Number(guiState.input.outputStride);
	let poses= [];
    let minPoseConfidence;
    let minPartConfidence;
    switch (guiState.algorithm) {
      case 'single-pose':
        var pose = await guiState.net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
		VideoPose(pose);
		poses.push(pose);
        minPoseConfidence = Number(
          guiState.singlePoseDetection.minPoseConfidence);
        minPartConfidence = Number(
          guiState.singlePoseDetection.minPartConfidence);
        break;
      case 'multi-pose':
        poses = await guiState.net.estimateMultiplePoses(video, imageScaleFactor, flipHorizontal, outputStride,
          guiState.multiPoseDetection.maxPoseDetections,
          guiState.multiPoseDetection.minPartConfidence,
          guiState.multiPoseDetection.nmsRadius);

        minPoseConfidence = Number(guiState.multiPoseDetection.minPoseConfidence);
        minPartConfidence = Number(guiState.multiPoseDetection.minPartConfidence);
        break;
    }
	
	

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    if (guiState.output.showVideo) {
      ctx.save();
      // ctx.scale(-1, 1);
      ctx.translate(-canvasSize, 0);
      ctx.drawImage(video, 0, 0, canvasSize, canvasSize);
      ctx.restore();
      //capturer.capture(canvas);

    }

    var scale = canvasSize / video.width;

    poses.forEach(({ score, keypoints }) => {
		
      if (score >= minPoseConfidence) {
        if (guiState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence, ctx, scale);
        }
        if (guiState.output.showSkeleton) {
          drawSkeleton(keypoints, minPartConfidence, ctx, scale);
		  
        }
      }
    });
    stats.end();

	
    requestAnimationFrame(poseDetectionFrames);
  }
  $(video).on('pause', function() {
      console.log("Im here inside pause function")
return;});


    poseDetectionFrames();

}



/**
 * Kicks off the demo by loading the posenet model, finding and loading available
 * camera devices, and setting off the detectPoseInRealTime function.
 */
async function bindPages() {
  // Load the PoseNet model weights for version 1.01
  var net = await posenet.load();

  document.getElementById('loading').style.display = 'none';
  document.getElementById('mains').style.display = 'block';

  let video;

  try {
    video = await loadVideos();
  } catch(e) {
    console.error(e);
    return;
  }

  setupGuis([], net);
  setupFPSs();

  detectPoseInRealTimes(video, net);
}

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

bindPages(); // kick off the demo
