let quiz = [];
let current = 0;
let input;
let isChecking = false;
let corr = 0;
let custom_html;
let progress_bar;
let progress_text;
let quiz_info = [];
function on_click_start() {
    if (!custom_html) {
        filterQuiz();
        sliceQuiz();
        progress_bar.value = 0;
        progress_text.innerText = '1/' + quiz.length;
        progress_bar.max = quiz.length;
    } to_main();
}
function hasExt(info, extension_name) {
    if (!('extensions' in info)) return false;
    return info.extensions.includes(extension_name);
}


function onError(type, error) {
    location.href = '../error.html?type=' + type + '&error=' + btoa(error);
}
function filterQuiz() {
    let f = document.getElementById('filter-i').value
    quiz = quiz.filter((q) => f == 'all' || q.filter == f || q.filter == 'none');
}
function sliceQuiz() {
    let s = document.getElementById('num-i').value;
    if (s <= 0) s = 1; if (s > quiz.length) s = quiz.length;
    quiz = quiz.slice(0, s);
}
window.onload = async function () {
    try {
        if (urlparam == null) {
            let url = new URL(window.location.href);
            params = url.searchParams;
            urlparam = params.get('q');
        }
        if (urlparam === null || urlparam === undefined) {
            onError('no_params', '');
        }
        let info = await load_info(urlparam);
        if (!info.result) {
            onError('invaild_id', urlparam);
        }
        if (params.get('onlyresult') != undefined) {
            setTimeout(() => { to_main(); corr = parseInt(params.get('onlyresult')); to_result(); })
            return;
        }
        custom_html = hasExt(info, 'custom-html');
        if (params.get('html') != undefined && params.get('url') != undefined) {
            info.htmlurl = params.get('url');
            setTimeout(to_main, 0);
        }
        if (custom_html) { loadCustomHTML(info); return; }
        quiz = await load_quiz('../' + info.url);
        if (quiz == undefined || quiz.length == 0) onError('invaild_quiz');
        shuffle_array(quiz);
        filters.forEach(element => document.getElementById('filter-i').innerHTML += "<option value='" + element + "'>" + info.filter[element] + "</option>");
        input = document.getElementById('inp');
        progress_bar = document.getElementById('progress');
        progress_text = document.getElementById('progress_text');
        input.addEventListener('input', inputing_check);
        document.body.addEventListener('keydown', (e) => {
            if (is_main && e.key == 'Control') {
                hint();
            }
        })
    } catch (error) {
        report_error(error);
    }
}
function IMEEnd() {
    input.blur();
    setTimeout(() => input.focus());
}
function is_correct() {
    if (quiz[current].ans.includes(input.value)) return true;
    if (quiz[current].type == 'year' && quiz[current].ans[0] + '年' == input.value) return true;
    return false;
}

function check_ans() {
    let correct_ans = quiz[current].ans[0];
    if (quiz[current].type == 'year') '年';
    if (hint_step == 3) { input.value = ''; }
    if (is_correct()) {
        let anaume = document.getElementsByClassName('anaume')
        if (anaume.length != 0) anaume.item(0).innerText = correct_ans;
        else document.getElementById('correct').innerText = correct_ans;
        if (quiz[current]["ruby"] !== undefined) document.getElementById('ruby').innerText = quiz[current]["ruby"];
        effect_correct();
        if (hint_step == 0) {
            corr++;
            quiz_info.push(true);
        } else quiz_info.push(false);
        isChecking = true;
    } else {
        effect_wrong();
    }
}
function next() {
    document.getElementById('popup').className = 'popup';
    current++;
    progress_bar.value++;
    progress_text.innerText = (progress_bar.value + 1) + '/' + quiz.length;
    hint_step = 0;
    if (quiz.length == current) {
        to_result();
        return;
    }
    refresh_question();
    isChecking = false;
}
function handle_toquiz() {
    next();
    document.getElementById('next').innerText = '回答';
    IMEEnd();
    input.value = null;
    document.getElementById('correct').innerText = '';
}
function handle_checkans() {
    if (check_ans()) document.getElementById('next').innerText = '次へ';
}
function handle_next() {
    if (isChecking) {
        handle_toquiz();
    } else {
        handle_checkans();
    }
}
let is_main = false;
function refresh_question() {
    if (custom_html) return;
    if (params.get('onlyresult') != undefined) return;
    const html = quiz[current].quiz.replace(/\[(.*?)\]/g, '<b class="s_blue">$1</b>').replace('()', '<b class="anaume">？</b>');
    document.getElementById('quiz').innerHTML = html;
    document.getElementById('ruby').innerText = null;
}
function to_main() {
    document.getElementById('s_start').className = 'hide';
    document.getElementById('s_quiz').className = '';
    refresh_question();
    is_main = true;
}
function to_result() {
    is_main = false;
    document.getElementById('s_quiz').className = 'hide';
    document.getElementById('s_result').className = '';
    document.getElementById('percent').innerText = params.get('onlyresult') != null ? (corr / 100) + '%' : Math.round(corr / quiz.length * 100) + '%';
    if (params.get('onlyresult') != null || custom_html) return;
    let table = document.getElementById('table');
    for (let i in quiz_info) {
        let spanS = (!quiz_info[i] ? '<span class="miss">' : '');
        let spanE = (!quiz_info[i] ? '</span>' : '');
        table.innerHTML += `<tr><th>${spanS}${quiz[i].quiz}${spanE}</th><th>
        ${spanS}${quiz_info[i] ? 'O' : 'X'}${spanE}</th><th>${spanS}${quiz[i].ans[0]}${spanE}</th></tr>`
    }
}
let hint_step = 0;
function hint() {
    let ans = quiz[current].ans[0];
    if (hint_step == 1 || hint_step == 2 || hint_step == 3) {
        hint_step = 3;
        input.value = ans;
        if (quiz[current]["ruby"] !== undefined) document.getElementById('ruby').innerText = quiz[current]["ruby"];
        return;
    }
    let i = parseInt(ans.length / 4);
    if (i < 1) i = 1;
    hint_step = 1;
    input.value = ans.slice(0, i);
}
function inputing_check(e) {
    if (isChecking) {
        handle_toquiz();
        return;
    }
    if (hint_step == 3) {
        inp.value = '';
        hint_step = 2;
    }
    if (is_correct()) {
        handle_checkans();
    }
}
function reloadWithoutResult() {
    const url = new URL(location.href);
    const ps = url.searchParams;
    ps.delete('onlyresult');
    location.href = url.href;
}