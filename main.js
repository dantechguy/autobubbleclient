let wordArray, video;

let videoList = document.getElementsByTagName('video')
if (videoList.length > 0) {
    video = videoList[0]


    let id = new URLSearchParams(window.location.search).get('v')
    let url = 'https://autobubble.herokuapp.com/' + id
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            parsedData = JSON.parse(data)
            wordArray = convertUtterancesToPhrases(parsedData)
            // video.addEventListener('loadstart', event => {
                setupFaceRecognitionModel()
                    .then(res => mainLoop());
            // })
        })
        .catch(err => {
            console.log(err)
        })
}

var captionCoords = {
    x: 100,
    y: 100
}
var canMoveCaption = true
var previousSentenceNumber = -1

function mainLoop() {
    let captionData = getCurrentSentence(video.currentTime, wordArray)
    if (captionData !== null) {
        let {currentWords, boldIndex, sentenceNumber} = captionData

        if (previousSentenceNumber !== sentenceNumber) {
            canMoveCaption = true
            previousSentenceNumber = sentenceNumber
        }

        getCurrentFacePosition(video)
            .then(coords => {
                if (canMoveCaption) {
                    captionCoords = coords
                    canMoveCaption = false
                }
        }).catch(err => {
            // no face, dont update caption position
        })
        displayCaption(currentWords, boldIndex, captionCoords)
    } else {
        displayCaption("", 0, null)
    }
    
    requestAnimationFrame(mainLoop)
}