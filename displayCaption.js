
var captionDiv = document.createElement('div');
document.body.appendChild(captionDiv);
captionDiv.id = "caption"
var captionHidden = true;
const CHAR_WIDTH_THRESHOLD = 40;

function displayCaption(words, boldIndex, coords) {

	if (words.length === 0) {
		if (captionHidden === false) {
			captionDiv.style.opacity = 1
			captionHidden = true
		}
	} else {
		if (captionDiv === true) {
			captionDiv.style.opacity = 0
			captionHidden = false
		}

		captionDiv.innerHTML = ''

		words.forEach((word, i) => {
			let wordSpan = document.createElement('span')
			wordSpan.textContent = word + ' '
			if (i <= boldIndex) {
				wordSpan.classList.add('noWidthBold', 'captionWord')
			}
			captionDiv.appendChild(wordSpan)
		})

		let video = document.getElementsByTagName('video')[0]
		let boundingRect = video.getBoundingClientRect()
		// console.log(boundingRect.left, boundingRect.top, video.clientWidth, video.clientHeight, coords)
		captionDiv.style.left = coords.x*video.clientWidth + boundingRect.left + "px"
		captionDiv.style.top = coords.y*video.clientHeight + boundingRect.top + "px"
	}
}