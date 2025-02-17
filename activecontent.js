let urlparam = null;
function loadContent(id, params) {
    if (path == undefined) path = 'quiz';
    history.pushState({}, "", "/" + path + "/" + id + '?' + params);
}

window.addEventListener("popstate", () => {
    const id = location.pathname.split("/").pop();
    document.getElementById("content").textContent = "ページID: " + id;
});
let params;
// 初回ロード時
window.addEventListener("DOMContentLoaded", () => {
    const id = location.pathname.split("/").pop();
    let url = new URL(window.location.href);
    params = url.searchParams;
    urlparam = params.get('q');
    let params_text = '';
    params.keys().forEach(element => {
        if (element == 'q') return;
        params_text += element + '=';
        params_text += params.get(element) + '&';
    });
    loadContent(urlparam, params_text);
});