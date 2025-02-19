function customHTML_start() {
    if (params.get('result') !== null) {
        document.getElementById('result-show').style.display = null;
        document.getElementById('result-percent').innerHTML = (params.get('result') / 100) + '%';
    }
};
