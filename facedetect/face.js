
async function setupFaceRecognitionModel() {

    let url = 'https://autobubble.herokuapp.com/weights'
    Promise.all([
        await faceapi.loadSsdMobilenetv1Model(url),
        await faceapi.loadTinyFaceDetectorModel(url),
        await faceapi.loadFaceLandmarkModel(url),
        await faceapi.loadFaceLandmarkTinyModel(url),
        await faceapi.loadFaceRecognitionModel(url),
        await faceapi.loadFaceExpressionModel(url)
    ])
}

async function getCurrentFacePosition(videoElement) {
    let promise = new Promise(async (accept, reject) => {
        const displaySize = { width: videoElement.videoWidth, height: videoElement.videoHeight }
        //faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi.detectAllFaces(videoElement, 
            new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks().withFaceExpressions();
        // boxes will size properly for the video element
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        //console.log(resizedDetections)
        if (resizedDetections.length === 0) {
            reject('no face')
        } else {
            accept({
                x: (resizedDetections[0].alignedRect.box.x + resizedDetections[0].alignedRect.box.width + 20) / displaySize.width, 
                y: (resizedDetections[0].alignedRect.box.y - 20) / displaySize.height // + resizedDetections[0].alignedRect.box.height
            });
        }
    })
    return promise
    
}