
function loadCustomHTML(info) {
    const s_quiz = document.getElementById('s_quiz');
    let req_url = '../' + info.url + '/index.html';
    if ('htmlurl' in info) {
        req_url = '../' + info.url + '/' + info.htmlurl;
    }
    fetch(req_url).then((res) => {
        res.text().then((text) => {
            s_quiz.innerHTML = text;
        })
    });
    let map = info.javascript_map[info.htmlurl ? info.htmlurl : 'default'];
    for (i in map) {
        evalScript(info, map[i]);
    }
    setTimeout(() => {
        if (map !== undefined && map.length != 0) {
            customHTML_start();
        }
    }, 100);
}