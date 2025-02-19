let filters = [];
async function load_info(id) {
    const response = await fetch('../data/quizs.json');
    const json = await response.json();
    if (json[id] === undefined) return { result: false };
    json[id].result = true;
    let info = json[id];
    document.getElementById('title').innerText = info.name;
    document.getElementById('description').innerText = info.desc;
    document.getElementById('info').innerText = info.genne + '/';
    if ('tags' in info) {
        info.tags.forEach(element => {
            document.getElementById('tags').innerHTML +=
                '<b class="tag">' + element + '</b>';
        });
    }
    return info;
}
function shuffle_array(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}
async function load_quiz(path) {
    const response = await fetch(path);
    const text = await response.text();
    const lines = text.split('\n');
    let quiz = [];
    let filter = 'none';
    for (var i in lines) {
        const line = lines[i];
        const sliced = line.slice(1).replaceAll('\r', '');
        let current = quiz.length != 0 ? quiz[quiz.length - 1] : undefined;
        switch (line[0]) {
            case 'F':
                filter = sliced.slice();
                filters.push(sliced);
                break;
            case 'Q':
                quiz.push({
                    "line": i,
                    "quiz": sliced,
                    "filter": filter
                });
                break;
            case 'A':
                if (current["ans"] === undefined) current["ans"] = [sliced]; else current["ans"].push(sliced);
                current["type"] = 'normal';
                break;
            case 'R':
                current["ruby"] = sliced;
                break;
            case 'Y':
                if (current["ans"] === undefined) current["ans"] = [sliced]; else current["ans"].push(sliced);
                current["type"] = 'year';
                break;
            case 'O':
                if (current["ans"] === undefined) current["ans"] = [sliced]; else current["ans"].push({ c: false, value: sliced });
                current["type"] = 'multi';
                break;
            case 'X':
                if (current["ans"] === undefined) current["ans"] = [sliced]; else current["ans"].push({ c: false, value: sliced });
                break;
            case '#':
                // Comments
                break;
            default:
                break;
        }
    }
    document.getElementById('info').innerText += quiz.length + '問';
    return quiz;
}