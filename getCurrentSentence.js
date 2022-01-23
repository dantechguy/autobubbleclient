function getCurrentSentence(time, script) {
    let phrase_count=0;
    for (; phrase_count<script.length; phrase_count++) {
        if (script[phrase_count].start <= time && time <= script[phrase_count].end) {
            break;
        }
        if (time <= script[phrase_count].start && time <= script[phrase_count].end) {
            return null; // there is a gap between phrases
        }
    }
    if (phrase_count === script.length) {
        return null;
    }

    words = Object.values(script[phrase_count].words);
    words = words.map(word => word.word);

    let bold_index = 0;
    let words_arr = script[phrase_count].words;
    while (bold_index < words_arr.length && words_arr[bold_index].time < time) {
        bold_index++;
    }

    return {
        "currentWords": words, 
        "boldIndex": bold_index-1,
        "sentenceNumber": phrase_count
    }
}