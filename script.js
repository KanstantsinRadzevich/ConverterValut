function backGroundColor(ID) {
    changeInputColor();
    document.getElementById(ID).style.backgroundColor = "lightgreen";
    document.getElementById(ID).style.color = "red";
    document.getElementById(ID).style.fontWeight = "bold";
};

function changeInputColor(){
    var y = document.getElementsByTagName("input");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.backgroundColor = "";
        y[i].style.color = "";
        y[i].style.fontWeight = "";
    };
};

var uri = 'https://www.nbrb.by/API/';
$(function() {
    $('#btnGet').click(function() {
        var w = window.open('','','width=500,height=40');
        w.document.write('Курсы обновлены на дату, указанную в календаре. Если ничего не выбрно - установлены курсы на сегодня!');
        w.focus();
        setTimeout(function() {w.close();}, 2000);
        rates2();    
    });    
});    
        //https://www.nbrb.by/API/ExRates/Rates/841?onDate=2021-07-30&ParamMode=1
function rates2(e) {
    var curRates = [];
    //----Для получения одной валюты по коду. Буду использовать для узбекского сума  //
    var curAbbr = "UZS";
    $.getJSON(uri + 'ExRates/Rates/' + curAbbr, { 'onDate':new Date($('#iDate').val()).toUTCString(), 'ParamMode': 2 })
    .done(function (data) {
        curRates.push(data.Cur_OfficialRate);
    }).error(function (err) {
               alert('ошибка');
       });


    //----Для получения группы валют по коду. Буду использовать выборку из массива//
    $.getJSON(uri + 'ExRates/Rates', {
        'onDate': new Date($('#iDate').val()).toUTCString(),
        'Periodicity': '0'
    }).done(function(data) {
          $.each(data, function(key, item) {
              if (item["Cur_Abbreviation"] == "USD") { //145 usd Cur_Abbreviation":"USD"    
                  curRates.push(item["Cur_OfficialRate"])
              };
              if (item["Cur_Abbreviation"] == "EUR") { //292 EUR
                  curRates.push(item["Cur_OfficialRate"])
              };
              if (item["Cur_Abbreviation"] == "PLN") {  //293 PLN
                  curRates.push(item["Cur_OfficialRate"])
              };
              if (item["Cur_Abbreviation"] == "RUB") {  //298 RUB
                  curRates.push(item["Cur_OfficialRate"])
              };
              if (item["Cur_Abbreviation"] == "KZT") {  //301 KZT
                  curRates.push(item["Cur_OfficialRate"])
              };
          });
        crossCur(curRates, e);
    });
};

function crossCur(curRates, e) {
    var uzsId = parseFloat(curRates[0], 10); //10000
    var usdId = parseFloat(curRates[1], 10); //USD
    var eurId = parseFloat(curRates[2], 10); //EUR
    var plnId = parseFloat(curRates[3], 10); //10pln
    var rubId = parseFloat(curRates[4], 10); //100rub
    var kztId = parseFloat(curRates[5], 10); //1000
    
    if (e == "E") {
        document.getElementById('USD').value = (document.getElementById('EUR').value * (eurId / usdId).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('EUR').value * (eurId * 100 / rubId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('EUR').value * (eurId * 10 / plnId).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('EUR').value * (eurId * 1000 / kztId).toFixed(4)).toFixed(4);
        document.getElementById('UZS').value = (document.getElementById('EUR').value * (eurId * 10000 / uzsId).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('EUR').value * eurId).toFixed(4);
    };
    if (e == "U") {
        document.getElementById('EUR').value = (document.getElementById('USD').value * (usdId / eurId).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 100 / rubId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 10 / plnId).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 1000 / kztId).toFixed(4)).toFixed(4);
        document.getElementById('UZS').value = (document.getElementById('USD').value * (usdId / eurId * eurId * 10000 / uzsId).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('USD').value * usdId).toFixed(4);
    };
    if (e == "R") {
        document.getElementById('EUR').value = (document.getElementById('RUB').value * (rubId / 100 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('RUB').value * (rubId / 100 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('RUB').value * (rubId / 100 / plnId * 10).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('RUB').value * (rubId / 100 / kztId * 1000).toFixed(4)).toFixed(4);
        document.getElementById('UZS').value = (document.getElementById('RUB').value * (rubId / 100 / uzsId * 10000).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('RUB').value * rubId / 100).toFixed(4);
    };
    if (e == "P") {
        document.getElementById('EUR').value = (document.getElementById('PLN').value * (plnId / 10 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('PLN').value * (plnId / 10 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('PLN').value * (plnId / 10 / rubId * 100).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('PLN').value * (plnId / 10 / kztId * 1000).toFixed(4)).toFixed(4);
        document.getElementById('UZS').value = (document.getElementById('PLN').value * (plnId / 10 / uzsId * 1000).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('PLN').value * plnId / 10).toFixed(4);
    };
    if (e == "K") {
        document.getElementById('EUR').value = (document.getElementById('KZT').value * (kztId / 1000 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('KZT').value * (kztId / 1000 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('KZT').value * (kztId / 1000 / plnId * 10).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('KZT').value * (kztId / 1000 / rubId * 100).toFixed(4)).toFixed(4);
        document.getElementById('UZS').value = (document.getElementById('KZT').value * (kztId / 1000 / uzsId *10000).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('KZT').value * kztId / 1000).toFixed(4);
    };
    if (e == "UZ") {
        document.getElementById('EUR').value = (document.getElementById('UZS').value * (uzsId / 10000 / eurId).toFixed(4)).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('UZS').value * (uzsId / 10000 / usdId).toFixed(4)).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('UZS').value * (uzsId / 10000 / plnId * 10).toFixed(4)).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('UZS').value * (uzsId / 10000 / rubId * 100).toFixed(4)).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('UZS').value * (uzsId / 10000 / kztId * 1000).toFixed(4)).toFixed(4);
        document.getElementById('BYN').value = (document.getElementById('UZS').value * uzsId / 10000).toFixed(4);
    };
    if (e == "B") {
        document.getElementById('EUR').value = (document.getElementById('BYN').value / eurId).toFixed(4);
        document.getElementById('USD').value = (document.getElementById('BYN').value / usdId).toFixed(4);
        document.getElementById('PLN').value = (document.getElementById('BYN').value / plnId * 10).toFixed(4);
        document.getElementById('RUB').value = (document.getElementById('BYN').value / rubId * 100).toFixed(4);
        document.getElementById('KZT').value = (document.getElementById('BYN').value / kztId * 1000).toFixed(4);
        document.getElementById('UZS').value = (document.getElementById('BYN').value / uzsId * 10000).toFixed(4);
    };
};

