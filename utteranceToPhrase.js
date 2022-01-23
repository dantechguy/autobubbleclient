const WORDS_PER_SUBTITLE = 15

function convertUtterancesToPhrases(utteranceArray) {
    let wordArray = []
    // loop through all utterances
    utteranceArray.forEach(utterance => {
        // within each utterance get phrases
        let phrase = {"words": []}
        utterance.words.forEach(wordJson => {
            if (phrase.words.length > WORDS_PER_SUBTITLE) {
                wordArray.push(phrase)
                phrase = {"words": []}
            }

            if (!phrase.hasOwnProperty("start")) {
                phrase.start = wordJson.start
            }
            phrase.end = wordJson.end
            phrase.words.push({
                "word": wordJson.punctuated_word,
                "time": wordJson.start
            })
        })
        wordArray.push(phrase)
    })

    return wordArray
}


/*
let words = [
    { // phrase 1
        "start": 0.5,
        "end": 2.5,
        "words": [
            {"word": "hello", "time": 0.5},
            {"word": "how", "time": 0.6},
            {"word": "are", "time": 0.65},
            {"word": "you", "time": 0.75},
            {"word": "doing", "time": 2.4},
        ]
    },
    { // phrase 2
        "start": 0.5,
        "end": 2.5,
        "words": [
            {"word": "hello", "time": 0.5},
            {"word": "how", "time": 0.6},
            {"word": "are", "time": 0.65},
            {"word": "you", "time": 0.75},
            {"word": "doing", "time": 2.4},
        ]
    }
]*/

// 1. Generate words array
//      For each utterance, get the start and end time
//      Get the list of punctuated words
//      For each word, get the start time
// 2. Write getCurrentSentence function
//      Binary search for current phrase
//      Return the joined sentence
//      Return how many bold words