var uri = 'https://www.nbrb.by/API/';
$(function() {
    $('#btnGet').click(function() {
        alert("Курсы обновлены на дату, указанную в календаре. Если ничего не выбрно - установлены курсы на сегодня!");
        rates2();


    });

});

function rates2(e) {

    var curRates = [];
    $.getJSON(uri + 'ExRates/Rates', {
            'onDate': new Date($('#iDate').val()).toUTCString(),
            'Periodicity': '0'
        })
        .done(function(data) {
            $.each(data, function(key, item) {

                if (item["Cur_ID"] == 145) {

                    curRates.push(item["Cur_OfficialRate"])
                }
                if (item["Cur_ID"] == 292) {

                    curRates.push(item["Cur_OfficialRate"])
                }
                if (item["Cur_ID"] == 293) {

                    curRates.push(item["Cur_OfficialRate"])
                }
                if (item["Cur_ID"] == 298) {

                    curRates.push(item["Cur_OfficialRate"])
                }
                if (item["Cur_ID"] == 301) {

                    curRates.push(item["Cur_OfficialRate"])
                }

            });


            crossCur(curRates, e);
        });


}

function crossCur(curRates, e) {


    var usdId = parseFloat(curRates[0], 10); //USD
    var eurId = parseFloat(curRates[1], 10); //EUR
    var plnId = parseFloat(curRates[2], 10); //10pln
    var rubId = parseFloat(curRates[3], 10); //100rub
    var kztId = parseFloat(curRates[4], 10); //1000




    if (e == "E") {
        document.getElementById('USD').value = document.getElementById('EUR').value * eurId / usdId;
        document.getElementById('RUB').value = document.getElementById('EUR').value * eurId * 100 / rubId;
        document.getElementById('PLN').value = document.getElementById('EUR').value * eurId * 10 / plnId;
        document.getElementById('KZT').value = document.getElementById('EUR').value * eurId * 1000 / kztId;
        document.getElementById('BYN').value = document.getElementById('EUR').value * eurId;
    }
    if (e == "U") {

        document.getElementById('EUR').value = document.getElementById('USD').value * usdId / eurId;
        document.getElementById('RUB').value = document.getElementById('USD').value * usdId / eurId * eurId * 100 / rubId;
        document.getElementById('PLN').value = document.getElementById('USD').value * usdId / eurId * eurId * 10 / plnId;
        document.getElementById('KZT').value = document.getElementById('USD').value * usdId / eurId * eurId * 1000 / kztId;
        document.getElementById('BYN').value = document.getElementById('USD').value * usdId;
    }
    if (e == "R") {

        document.getElementById('EUR').value = document.getElementById('RUB').value * rubId / 100 / eurId;
        document.getElementById('USD').value = document.getElementById('RUB').value * rubId / 100 / usdId;
        document.getElementById('PLN').value = document.getElementById('RUB').value * rubId / 100 / plnId * 10;
        document.getElementById('KZT').value = document.getElementById('RUB').value * rubId / 100 / kztId * 1000;
        document.getElementById('BYN').value = document.getElementById('RUB').value * rubId / 100;

    }
    if (e == "P") {

        document.getElementById('EUR').value = document.getElementById('PLN').value * plnId / 10 / eurId;
        document.getElementById('USD').value = document.getElementById('PLN').value * plnId / 10 / usdId;
        document.getElementById('RUB').value = document.getElementById('PLN').value * plnId / 10 / rubId * 100;
        document.getElementById('KZT').value = document.getElementById('PLN').value * plnId / 10 / kztId * 1000;
        document.getElementById('BYN').value = document.getElementById('PLN').value * plnId / 10;
    }
    if (e == "K") {

        document.getElementById('EUR').value = document.getElementById('KZT').value * kztId / 1000 / eurId;
        document.getElementById('USD').value = document.getElementById('KZT').value * kztId / 1000 / usdId;
        document.getElementById('PLN').value = document.getElementById('KZT').value * kztId / 1000 / plnId * 10;
        document.getElementById('RUB').value = document.getElementById('KZT').value * kztId / 1000 / rubId * 100;
        document.getElementById('BYN').value = document.getElementById('KZT').value * kztId / 1000;
    }
    if (e == "B") {

        document.getElementById('EUR').value = document.getElementById('BYN').value / eurId;
        document.getElementById('USD').value = document.getElementById('BYN').value / usdId;
        document.getElementById('PLN').value = document.getElementById('BYN').value / plnId * 10;
        document.getElementById('RUB').value = document.getElementById('BYN').value / rubId * 100;
        document.getElementById('KZT').value = document.getElementById('BYN').value / kztId * 1000;
    }
};



document.getElementById("btnClr").addEventListener("click", function() {
    // document.getElementById('EUR').value = '';
    // document.getElementById('USD').value = '';
    // document.getElementById('PLN').value = '';
    // document.getElementById('RUB').value = '';
    // document.getElementById('KZT').value = '';
    // document.getElementById('BYN').value = '';
    alert('Значения курсов установлены по умолчанию на сегодня');
});