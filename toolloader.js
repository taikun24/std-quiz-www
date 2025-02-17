window.onload = async function () {
    if (urlparam == undefined) {
        const url = new URL(window.location.href);
        params = url.searchParams;
        urlparam = params.get('q');
    }
    const res = await fetch('../data/tools.json');
    const json = await res.json();
    if (json[urlparam]) {
        const info = json[urlparam];
        document.getElementById('title').innerText += ' ' + info.name;
        const resH = await fetch('../' + info.url + '/index.html');
        const HTML = await resH.text();
        document.getElementById('main').innerHTML = HTML;
        if (info.js !== undefined && info.js.length != 0) {
            info.js.forEach(path => {
                evalScript(info, path);
            });
        }
        setTimeout(() => {
            tools.start();
        }, 100)
    } else {
        report_error('invaild_tool');
    }
}