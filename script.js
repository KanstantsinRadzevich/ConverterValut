function backGroundColor(ID) {
    changeInputColor();
    document.getElementById(ID).style.backgroundColor = "lightgreen";
    document.getElementById(ID).style.color = "red";
    document.getElementById(ID).style.fontWeight = "bold";
};

function changeInputColor() {
    var y = document.getElementsByTagName("input");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.backgroundColor = "";
        y[i].style.color = "";
        y[i].style.fontWeight = "";
    };
};

var uri = 'https://api.nbrb.by';//https://api.nbrb.by
// $(function () {
//     $('#btnGet').click(function () {
//         document.getElementById("msg").innerText = ('Курсы обновлены на указанную дату!')
//         // alert('Курсы обновлены на указанную дату!');
//         rates2();
//     });
// });
//https://api.nbrb.by/ExRates/Rates/UZS?ParamMode=2

document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("msg").innerText = ('Курсы установлены на СЕГОДНЯ!')
        setTimeout(()=>{
            document.getElementById("msg").innerText= ""
        },4000)
        rates2();

})
function getRates() {
    document.getElementById("msg").innerText = ('Курсы обновлены на указанную дату!')
    setTimeout(()=>{
        document.getElementById("msg").innerText= ""
    },3000)
    curRates = []
    rates2();
}
var curRates = [];
function rates2(e) {
    curRates = []
   
    //https://api.nbrb.by/ExRates/Rates?onDate=Wed%2C+18+Oct+2023+09%3A40%3A35+GMT&Periodicity=0

    let date;
    let dateInput = $('#iDate').val();
    if (dateInput) {
        const dateArr = dateInput.split("-");
        date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
    } else {
        const now = new Date();
        date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }

    console.log(date, $('#iDate').val())
    $.getJSON(uri + '/ExRates/Rates', {
        'onDate': new Date(date).toUTCString(),
        'Periodicity': '0'
    }).done(function (data) {
        console.log(data)
        $.each(data, function (key, item) {
            if (item["Cur_Abbreviation"] == "EUR") { //292 EUR
                curRates.push(item["Cur_OfficialRate"])
            };
            if (item["Cur_Abbreviation"] == "USD") { //145 usd Cur_Abbreviation":"USD"    
                curRates.push(item["Cur_OfficialRate"])
            };
            if (item["Cur_Abbreviation"] == "RUB") {  //298 RUB
                curRates.push(item["Cur_OfficialRate"])
            };
            if (item["Cur_Abbreviation"] == "PLN") {  //293 PLN
                curRates.push(item["Cur_OfficialRate"])
            };
            if (item["Cur_Abbreviation"] == "KZT") {  //301 KZT
                curRates.push(item["Cur_OfficialRate"])
            };
        });
        //crossCur(curRates, e);
    });
};

function crossCur( e) {
    var usdId = parseFloat(curRates[0], 10); //
    var eurId = parseFloat(curRates[1], 10); //EUR
    var plnId = parseFloat(curRates[2], 10); //10pln
    var rubId = parseFloat(curRates[3], 10); //100rub
    var kztId = parseFloat(curRates[4], 10); //1000 kzt
    console.log(curRates)

    if (e == "E") {
        document.getElementById('USD').value = (document.getElementById('EUR').value * (eurId / usdId).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('EUR').value * (eurId * 100 / rubId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('EUR').value * (eurId * 10 / plnId).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('EUR').value * (eurId * 1000 / kztId).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('EUR').value * eurId).toFixed(4);
    };
    if (e == "U") {
        document.getElementById('EUR').value = (document.getElementById('USD').value * (usdId / eurId).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 100 / rubId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 10 / plnId).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 1000 / kztId).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('USD').value * usdId).toFixed(4);
    };
    if (e == "R") {
        document.getElementById('EUR').value = (document.getElementById('RUB').value * (rubId / 100 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('RUB').value * (rubId / 100 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('RUB').value * (rubId / 100 / plnId * 10).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('RUB').value * (rubId / 100 / kztId * 1000).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('RUB').value * rubId / 100).toFixed(4);
    };
    if (e == "P") {
        document.getElementById('EUR').value = (document.getElementById('PLN').value * (plnId / 10 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('PLN').value * (plnId / 10 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('PLN').value * (plnId / 10 / rubId * 100).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('PLN').value * (plnId / 10 / kztId * 1000).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('PLN').value * plnId / 10).toFixed(4);
    };
    if (e == "K") {
        document.getElementById('EUR').value = (document.getElementById('KZT').value * (kztId / 1000 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('KZT').value * (kztId / 1000 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('KZT').value * (kztId / 1000 / plnId * 10).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('KZT').value * (kztId / 1000 / rubId * 100).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('KZT').value * kztId / 1000).toFixed(4);
    };

    if (e == "B") {
        document.getElementById('EUR').value = (document.getElementById('BYN').value / eurId).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('BYN').value / usdId).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('BYN').value / plnId * 10).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('BYN').value / rubId * 100).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('BYN').value / kztId * 1000).toFixed(4);
    };
};


function displayTransport() {
    const transport = document.querySelector(".transports");
    transport.style.display ="flex";

}

function getSaldo(e) {
    const inInp = document.getElementById('in');
    let valueInInp = + inInp.value;
    const inpTransports = document.querySelectorAll(".transport");
    const saldoInp = document.getElementById('saldo');

    if (valueInInp > 0) {
        let debt = valueInInp;
        inpTransports.forEach((el) => {
            console.log(+el.value)
            let val = +el.value
            debt = debt - val
            console.log(debt)
        })

        saldoInp.value = debt
    } 
}

function clearInp() {
   
    
    const transport = document.querySelector(".transports");
    transport.style.display ="none";
}

function clearRates() {
    document.getElementById('EUR').value = '';
    document.getElementById('USD').value = '';
    document.getElementById('PLN').value = '';
    document.getElementById('RUB').value = '';
    document.getElementById('KZT').value = '';
    document.getElementById('BYN').value = '';
    document.getElementById('iDate').value = '';
    changeInputColor();
    document.getElementById("msg").innerText= "Значения курсов установлены - На сегодня"
    setTimeout(()=>{
        document.getElementById("msg").innerText= ""
    },3000)
    curRates = [];
    console.log("curRates, curRates" , curRates)
    rates2();
}

