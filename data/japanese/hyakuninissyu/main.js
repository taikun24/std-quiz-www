let keys = '';
let input = document.getElementById('input');
{
    document.addEventListener('keydown', function (e) {
        const key = e.key.toLowerCase();
        if (key == 'backspace') {
            keydel();
        } else if (key == 'n') {
            if (keys.length != 0) {
                let bef = keys[keys.length - 1];
                if (bef == 'n') { keydel(); keyadd('ん'); } else { keyadd(key); }
            } else {
                keyadd(key);
            }
        } else if (key.length == 1 && key.match(/[a-z]/i)) {
            keyadd(key);
        } else if (key == '-') {
            keys += 'ー';
        } else if (key == 'enter') {
            check();
        }
        update();
    });
};
const boin = { 'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お' };
const idbo = ['a', 'i', 'u', 'e', 'o']
const siin = {
    'k': 'かきくけこ', 's': 'さしすせそ', 't': 'たちつてと', 'n': 'なにぬねの', 'h': 'はひふへほ'
    , 'm': 'まみむめも', 'y': 'やいゆえよ', 'r': 'らりるれろ', 'w': 'わゐうゑを'
    , 'p': 'ぱぴぷぺぽ', 'b': 'ばびぶべぼ', 'g': 'がぎぐげご', 'z': 'ざじずぜぞ',
    'd': 'だぢづでど', 'f': ['ふぁ', 'ふぃ', 'ふ', 'ふぇ', 'ふぉ'], 'x': 'ぁぃぅぇぉ', 'l': 'ぁぃぅぇぉ',
    'c': 'かしくせこ',
    'v': ['ゔぁ', 'ゔぃ', 'ゔ', 'ゔぇ', 'ゔぉ'],
    'q': ['くぁ', 'くぃ', 'く', 'くぇ', 'くぉ'],
    'j': ['じゃ', 'じ', 'じゅ', 'じぇ', 'じょ']
}
const dsiin = {
    'xt': ['xた', 'xち', 'っ', 'xて', 'xと'],
    'xk': ['ゕ', 'xき', 'xく', 'ゖ', 'xこ'],
    'xw': ['ゎ', 'xうぃ', 'xう', 'xうぇ', 'xを'],
    'xy': ['ゃ', 'ぃ', 'ゅ', 'ぇ', 'ょ'],
    'qy': ['くゃ', 'くぃ', 'くゅ', 'くぇ', 'くょ']
};
const py = 'ゃぃゅぇょ';
function keyadd(k) {
    let bef2 = undefined;
    if (keys.length >= 2) {
        bef2 = keys[keys.length - 2]
    }
    let bef = keys[keys.length - 1];
    if (k in boin) {
        if (keys[keys.length - 1] in siin) {
            keydel();
            if ((bef2 + bef) in dsiin) {
                keydel();
                keys += dsiin[bef2 + bef][idbo.indexOf(k)];
            } else if (bef == 'y' && bef2 in siin) {
                keydel();
                keys += siin[bef2][1];
                keys += py[idbo.indexOf(k)];
            } else {
                keys += siin[bef][idbo.indexOf(k)];
            }
        } else {
            keys += boin[k];
        }
    } else {
        if (bef == k && bef !== undefined) {
            keydel();
            keys += 'っ'
        }
        keys += k;
    }
}
function keydel() {
    if (keys.length != 0) {
        keys = keys.substring(0, keys.length - 1);
    }
}
function update() {
    input.innerHTML = keys;
    if (keys == '') input.innerHTML = '(入力して下さい)';
}

const shuffleArray = (array) => {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1))
        // 配列の要素の順番を入れ替える
        let tmpStorage = cloneArray[i]
        cloneArray[i] = cloneArray[rand]
        cloneArray[rand] = tmpStorage
    }

    return cloneArray
}
function show(id, quiz, show = false, correct = true) {
    num.innerHTML = (id + 1) + '番';
    let ku = ogura[id].slice(0, ogura[id].length);
    ku[quiz] = '<b style="color:' + (show ? (correct ? 'red' : 'blue') : 'red') + ';">' + (show ? ku[quiz] : ('？'.repeat(ku[quiz].length))) + '</b>';
    up.innerHTML = ku[0] + '　' + ku[1] + '　' + ku[2];
    down.innerHTML = ku[3] + '　' + ku[4];
}

function check() {
    const q = quizs[now];
    if (!result) {
        check_ans.innerHTML = '次へ';
        if (keys == ogura[q['id']][q['quiz']]) {
            resultE.innerHTML = '<b style="color:red;">正解</b>'
            animation();
            correct += 1;
        } else {
            resultE.innerHTML = '<b style="color:blue;">不正解</b><br>正答　' + ogura[q['id']][q['quiz']];
        }
        show(quizs[now]['id'], quizs[now]['quiz'], true, keys == ogura[q['id']][q['quiz']]);
        result = true;
    } else {
        check_ans.innerHTML = '解答する'
        now++;
        if (now == quizs.length) {
            location.href = 'index.html?r=' + parseInt(correct / quizs.length * 10000);
            return;
        }
        resultE.innerHTML = '';
        keys = '';
        show(quizs[now]['id'], quizs[now]['quiz'])
        update();
        result = false;
    }
}
function animation() {
    const createPetal = () => {
        const petalEl = document.createElement('span');
        petalEl.className = 'petal';
        const minSize = 10;
        const maxSize = 15;
        const size = Math.random() * (maxSize + 1 - minSize) + minSize;
        petalEl.style.width = `${size}px`;
        petalEl.style.height = `${size}px`;
        petalEl.style.left = Math.random() * 0.9 * innerWidth + 'px';
        document.body.appendChild(petalEl);

        // 一定時間が経てば花びらを消す
        setTimeout(() => {
            petalEl.remove();
        }, 3000);

    }
    setTimeout(async () => {
        for (var i = 0; i < 30; i++) {
            createPetal();
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    });
}
let result, resultE, up, down, quizs, now, correct, num, check_ans, start, end, count;

function customHTML_start() {
    result = false;
    resultE = document.getElementById('result');
    up = document.getElementById('up');
    down = document.getElementById('down');
    quizs = []
    now = 0;
    correct = 0;
    num = document.getElementById('num');
    check_ans = document.getElementById('check-ans');
    start, end, count;
    url = new URL(window.location.href);
    params = url.searchParams;
    start = params.get('s') - 1;
    end = params.get('e') - 1;
    count = params.get('c') || 10;
    // Create Quiz
    for (var i = start; i <= end; i++) {
        for (var j = 0; j < 5; j++) {
            quizs.push({ 'id': i, 'quiz': j });
            //console.log('a');
        }
    }
    quizs = shuffleArray(quizs);
    if (count < quizs.length) {
        quizs = quizs.slice(0, count);
    }
    show(quizs[now]['id'], quizs[now]['quiz'])
    document.addEventListener('click', () => document.getElementById('vkey').focus());
    document.getElementById('vkey').addEventListener('change', () => { document.getElementById('vkey').value = null });
}