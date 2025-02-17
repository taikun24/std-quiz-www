function report_error(error) {
    document.write('クイズの準備中にエラーが発生しました！<br>以下の内容を報告してください。<br><textarea style="width:90vw;height:50vh;">'
        + 'Info: Javascript error\n'
        + error + '\nUA:' + window.navigator.userAgent + '\nCurrent url:' + location.href + '</textarea>')
        + '';
}
function evalScript(info, url) {
    var s = document.createElement("script");
    s.src = '../' + info.url + '/' + url;
    document.body.appendChild(s);
}