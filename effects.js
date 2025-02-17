function snd_play(obj) {
    obj.currentTime = 0;
    obj.play();
}
function pop_up(text, cs) {
    document.getElementById('popup').className = 'popup popup-pop';
    document.getElementById('text').innerText = text;
    document.getElementById('text').className = 'popup-text ' + cs;
}
function green_flash() {
    input.className = 'quiz-input green-flash';
    setTimeout(() => input.className = 'quiz-input', 500)
}
function red_flash() {
    input.className = 'quiz-input red-flash';
    setTimeout(() => input.className = 'quiz-input', 500)
}
function effect_correct() {
    green_flash();
    pop_up('正解', 'red');
    snd_play(document.getElementById('snd_correct'));
}
function effect_wrong() {
    red_flash();
    snd_play(document.getElementById('snd_wrong'));
    pop_up('不正解', 'blue');
}