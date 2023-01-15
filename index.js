// template tabel data hasil
// let data = 
// [
//     {
//         name: '',
//         age: 0,
//         gejala: ['gejala1', 'gejala2'],
//         presentase: 0
//     },
//     {
//         name: '',
//         age: 0,
//         gejala: ['gejala1', 'gejala2'],
//         presentase: 0
//     },
//     {
//         name: '',
//         age: 0,
//         gejala: ['gejala1', 'gejala2'],
//         presentase: 0
//     }
// ];

// list gejala covid
let listGejalaCovid = [
    'tenggorokan gatal',
    'nyeri punggung',
    'hidung pilek atau tersumbat',
    'sakit kepala',
    'bersin berlebih',
    'banyak berkeringat di malam hari',
    'badan pegal',
    'anosmia',
    'batuk kering',
    'suara serak',
    'nyeri otot'
];

// list gejala pasien
let listGejalaPasien = 'demam, batuk kering, pilek, sesak nafas';

document.getElementById('submitName').addEventListener("click", function() { 
    let user = document.getElementById('name').value;
    if (!user) {
        alert("Tolong masukkan nama");
    }
    else {
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('secondPage').removeAttribute("style");
        document.getElementById('greeting').innerText = `Hello, ${user}`;
    }
})

document.getElementById('submitGejala').addEventListener("click", function() { 
    let greeting = document.getElementById('greeting').innerText;
    let username = '';
    for (let i = 6; i < greeting.length; i++) {
        username += greeting[i];
    }
    let gejala = document.getElementById('gejala').value;
    if (!gejala) {
        return alert("Tolong masukkan gejala");
    }
    // Get data
    let data = input(username, gejala, listGejalaCovid, listGejalaCovid);

    // Ubah message
    changeMessage(data);

    // Buat table data
    appendTableData(data);
})

let count = 0;
function deleteItem(currentIndex) {
    document.getElementById(`tr-${currentIndex}`).remove();
}

function changeMessage(data) {
    document.getElementById('message').innerText = data[0].message;
    document.getElementById('result').removeAttribute("style");
    document.getElementById('result').style.marginTop = '10px';
}

function appendTableData(data) {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const nameText = document.createTextNode(data[0].name);
    const persentase = document.createElement("td");
    const namePresentase = document.createTextNode(`${data[0].persentase}%`);
    const action = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add("deleteButton");
    deleteButton.setAttribute('id','deleteItem');
    deleteButton.setAttribute("onclick", `deleteItem(${count})`);
    name.appendChild(nameText);
    persentase.appendChild(namePresentase);
    action.appendChild(deleteButton);
    tr.appendChild(name);
    tr.appendChild(persentase);
    tr.appendChild(action);
    tr.setAttribute('id',`tr-${count}`);
    document.getElementById("tbody").appendChild(tr);
    count++;
}

function input(name, listGejalaPasien, listGejalaCovid) {
    let output = [];
    let perOrang = {};
    let gejalaPasien = listGejalaPasien.split(", ");
    perOrang.name = name;
    perOrang.gejala = gejalaPasien;
    let count = 0;
    for (let i = 0; i < listGejalaCovid.length; i++) {
        for (let j = 0; j < gejalaPasien.length; j++) {
            if (listGejalaCovid[i] === gejalaPasien[j]) {
                count++;
            }
        }
    }
    let persentase = Math.floor((count / listGejalaCovid.length) * 100);
    perOrang.persentase = persentase;
    if (persentase <= 20) {
        perOrang.message = 'Anda tidak perlu kedokter, dan jaga kesehatan';
    } else if (persentase > 20 && persentase <= 75) {
        perOrang.message =  'Anda tidak perlu kedokter tetapi anda harus banyak istirahat, minum air putih, dan jaga kesehatan';
    } else {
        perOrang.message =  'Anda terindikasi Covid19 segera kedokter';
    }
    output.push(perOrang);
    return output;
}

// let pasien1 = input('Naufal', listGejalaPasien, listGejalaCovid);
// console.log(pasien1);