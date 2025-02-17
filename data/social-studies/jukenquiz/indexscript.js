let selection = "";
let k;
function customHTML_start() {
    k = document.getElementsByClassName('item');
}

function jump() {
    let q = parseInt(document.getElementsByClassName('input1')[0].value);
    switch (selection) {
        case "地理":
            window.location.href = "./jukenquiz?html&url=quiz.html&type=地理&nof=" + q;
            break;

        case "歴史":
            window.location.href = "./jukenquiz?html&url=quiz.html&type=歴史&nof=" + q;
            break;

        case "理科":
            window.location.href = "./jukenquiz?html&url=quiz.html&type=理科&nof=" + q;
            break;
        default:
            window.location.href = "./jukenquiz?html&url=quiz.html&nof=" + q;
    }
}
function select(tp) {
    selection = tp;
    k[0].style = "border: none;";
    k[1].style = "border: none;";
    k[2].style = "border: none;";
    switch (selection) {
        case "地理":
            k[0].style = "border: 5px solid #ff0000;margin:calc(3%-5px) calc(3%-5px);";
            break;

        case "歴史":
            k[1].style = "border: 5px solid #ff0000;margin:calc(3%-5px) calc(3%-5px);";
            break;

        case "理科":
            k[2].style = "border: 5px solid #ff0000;margin:calc(3%-5px) calc(3%-5px);";
            break;
        default:

    }
}