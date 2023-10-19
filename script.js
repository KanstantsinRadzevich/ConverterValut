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

//https://api.nbrb.by/ExRates/Rates/UZS?ParamMode=2

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("msg").innerText = ('Курсы установлены на СЕГОДНЯ!')
    setTimeout(() => {
        document.getElementById("msg").innerText = ""
    }, 4000)
    rates2();

})
function getRates() {
    document.getElementById("msg").innerText = ('Курсы обновлены на указанную дату!')
    setTimeout(() => {
        document.getElementById("msg").innerText = ""
    }, 3000)
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

    $.getJSON(uri + '/ExRates/Rates', {
        'onDate': new Date(date).toUTCString(),
        'Periodicity': '0'
    }).done(function (data) {
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
        // clearInputsRates();
    });
};

function crossCur(e) {
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
    transport.style.display = "flex";

}

function getDebit() {
    const inInp = document.getElementById('in');
    let valueInInp = + inInp.value;
    const inpTransports = document.querySelectorAll(".sumConverted");
    const saldoInp = document.getElementById('saldo');

    if (valueInInp > 0) {
        let debt = valueInInp;
        inpTransports.forEach((el) => {
            console.log(+el.value)
            let val = +el.value
            debt = debt - val
            console.log(debt)
        })

        saldoInp.value = debt.toFixed(4);
    }
}

function clearInp() {
    const transport = document.querySelector(".transports");
    transport.style.display = "none";
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
    const msg = document.getElementById("msg");
    msg.style.display = "block";
    msg.innerText = "Значения курсов установлены - На сегодня"
    setTimeout(() => {
        msg.style.display = "none";

    }, 2000)
    curRates = [];
    console.log("curRates, curRates", curRates)
    rates2();
}

function clearInputsRates() {
    curRates = [];
    console.log("curRates, curRates", curRates)
    rates2();
    document.getElementById('EUR').value = '';
    document.getElementById('USD').value = '';
    document.getElementById('PLN').value = '';
    document.getElementById('RUB').value = '';
    document.getElementById('KZT').value = '';
    document.getElementById('BYN').value = '';
    changeInputColor();
    const msg = document.getElementById("msg");
    msg.style.display = "block";
    msg.innerText = "Значения курсов установлены - На Дату"
    setTimeout(() => {
        msg.style.display = "none";
    }, 2000)
}

function updateSum() {
    const allSum = document.querySelectorAll(".sum");
    allSum.forEach((el) => {
        if (el.value == "") return;
        const parent = el.parentNode;
        parent.querySelector(".sumConverted").value = 0;

        const sumInput = parent.querySelector(".sum");
        const sumInputValue = sumInput.value;
        console.log(sumInputValue)

        const valuta = parent.querySelector("select").value;
        console.log(valuta)

        const sumConverted = parent.querySelector(".sumConverted");
        const sumConvertedValue = sumConverted.value;
        console.log(sumConvertedValue)

        convertSum(sumInputValue, valuta, sumConverted)

    })
}


function convertSum(sumInputValue, valuta, sumConverted) {

    const inValuta = document.getElementById("inList").value;
    console.log("inValuta", inValuta)
    if (!inValuta) return;

    const sumToConvert = sumInputValue // document.getElementById(`${inpSource}`).value;// sumInputValue
    if (!sumToConvert) return;
    if (!valuta) return;


    let inValutaConverted = sumConverted //document.getElementById(`${eventId}Converted`); // sumConvertedValue


    if (inValuta == "EUR" && valuta == "USD") {
        inValutaConverted.value = (sumToConvert * curRates[0] / curRates[1]).toFixed(4);
    }
    if (inValuta == "USD" && valuta == "EUR") {
        inValutaConverted.value = (sumToConvert * curRates[1] / curRates[0]).toFixed(4);
    }
    if (inValuta == "EUR" && valuta == "RUB") {
        inValutaConverted.value = (sumToConvert * curRates[3] / curRates[1] / 100).toFixed(4);
    }
    if (inValuta == "RUB" && valuta == "EUR") {
        inValutaConverted.value = (sumToConvert * curRates[1] / curRates[3] * 100).toFixed(4);
    }
    if (inValuta == "EUR" && valuta == "PLN") {
        inValutaConverted.value = (sumToConvert * curRates[2] / curRates[1] / 10).toFixed(4);
    }
    if (inValuta == "PLN" && valuta == "EUR") {
        inValutaConverted.value = (sumToConvert * curRates[1] / curRates[2] * 10).toFixed(4);
    }
    if (inValuta == "EUR" && valuta == "KZT") {
        inValutaConverted.value = (sumToConvert * curRates[4] / curRates[1] / 1000).toFixed(4);
    }
    if (inValuta == "KZT" && valuta == "EUR") {
        inValutaConverted.value = (sumToConvert * curRates[1] / curRates[4] * 1000).toFixed(4);
    }
    if (inValuta == "EUR" && valuta == "BYN") {
        inValutaConverted.value = (sumToConvert / curRates[1]).toFixed(4);
    }
    if (inValuta == "BYN" && valuta == "EUR") {
        inValutaConverted.value = (sumToConvert * curRates[1]).toFixed(4);
    }
    if (inValuta == "USD" && valuta == "RUB") {
        inValutaConverted.value = (sumToConvert * curRates[3] / curRates[0] / 100).toFixed(4);
    }
    if (inValuta == "RUB" && valuta == "USD") {
        inValutaConverted.value = (sumToConvert * curRates[0] / curRates[3] * 100).toFixed(4);
    }
    if (inValuta == "USD" && valuta == "PLN") {
        inValutaConverted.value = (sumToConvert * curRates[2] / curRates[0] / 10).toFixed(4);
    }
    if (inValuta == "PLN" && valuta == "USD") {
        inValutaConverted.value = (sumToConvert * curRates[0] / curRates[2] * 10).toFixed(4);
    }
    if (inValuta == "USD" && valuta == "KZT") {
        inValutaConverted.value = (sumToConvert * curRates[4] / curRates[0] / 1000).toFixed(4);
    }
    if (inValuta == "KZT" && valuta == "USD") {
        inValutaConverted.value = (sumToConvert * curRates[0] / curRates[4] * 1000).toFixed(4);
    }
    if (inValuta == "USD" && valuta == "BYN") {
        inValutaConverted.value = (sumToConvert / curRates[0]).toFixed(4);
    }
    if (inValuta == "BYN" && valuta == "USD") {
        inValutaConverted.value = (sumToConvert * curRates[0]).toFixed(4);
    }
    if (inValuta == "RUB" && valuta == "PLN") {
        inValutaConverted.value = (sumToConvert * curRates[2] / curRates[3] * 10).toFixed(4);
    }
    if (inValuta == "PLN" && valuta == "RUB") {
        inValutaConverted.value = (sumToConvert * curRates[3] / curRates[2] / 10).toFixed(4);
    }
    if (inValuta == "RUB" && valuta == "KZT") {
        inValutaConverted.value = (sumToConvert * curRates[4] / curRates[3] / 10).toFixed(4);
    }
    if (inValuta == "KZT" && valuta == "RUB") {
        inValutaConverted.value = (sumToConvert * curRates[3] / curRates[4] * 10).toFixed(4);
    }
    if (inValuta == "RUB" && valuta == "BYN") {
        inValutaConverted.value = (sumToConvert / curRates[3] * 100).toFixed(4);
    }
    if (inValuta == "BYN" && valuta == "RUB") {
        inValutaConverted.value = (sumToConvert * curRates[3] / 100).toFixed(4);
    }
    if (inValuta == "PLN" && valuta == "KZT") {
        inValutaConverted.value = (sumToConvert * curRates[4] / curRates[2] / 100).toFixed(4);
    }
    if (inValuta == "KZT" && valuta == "PLN") {
        inValutaConverted.value = (sumToConvert * curRates[2] / curRates[4] * 100).toFixed(4);
    }
    if (inValuta == "PLN" && valuta == "BYN") {
        inValutaConverted.value = (sumToConvert / curRates[2] * 10).toFixed(4);
    }
    if (inValuta == "BYN" && valuta == "PLN") {
        inValutaConverted.value = (sumToConvert * curRates[2] / 10).toFixed(4);
    }
    if (inValuta == "KZT" && valuta == "BYN") {
        inValutaConverted.value = (sumToConvert / curRates[4] * 1000).toFixed(4);
    }
    if (inValuta == "BYN" && valuta == "KZT") {
        inValutaConverted.value = (sumToConvert * curRates[4] / 1000).toFixed(4);
    }


    if (inValuta == "EUR" && valuta == "EUR") {
        inValutaConverted.value = sumToConvert;
    }
    if (inValuta == "USD" && valuta == "USD") {
        inValutaConverted.value = sumToConvert;
    }
    if (inValuta == "RUB" && valuta == "RUB") {
        inValutaConverted.value = sumToConvert;
    }
    if (inValuta == "PLN" && valuta == "PLN") {
        inValutaConverted.value = sumToConvert;
    }
    if (inValuta == "KZT" && valuta == "KZT") {
        inValutaConverted.value = sumToConvert;
    }
    if (inValuta == "BYN" && valuta == "BYN") {
        inValutaConverted.value = sumToConvert;
    }
    getDebit();
}

