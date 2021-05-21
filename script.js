function convert(curRates ,param1) {
    
    console.log(curRates[0]);
    // var usdId = param1[0];
    // var eurId = curRates[1];
    // var plnId = param1[2]; //10pln
    // var rubId = param1[3]; //100rub
    // var kztId = param1[4]; //1000
    
    
    document.getElementById('res').value = 12;   
    e = document.getElementById('EUR').value
    s = document.getElementById('USD').value
    r = document.getElementById('RUB').value
    p = document.getElementById('PLN').value
    k = document.getElementById('KZT').value

    if (e == s && e == r) {
        factor1 = 1
        factor2 = 1
    } else if (e == 'EUR' && s == 'USD') {
        factor1 = 1.06;
        factor2 = 89.87;
    } else if (s == 'USD' && e == 'EUR') {
        factor1 = 1 / 1.06;
    } else if (r == 'RUB' && e == 'EUR') {
        factor2 = 0.0106;
    }


    if (param1 == "C") {
        document.getElementById('secondinput').value = document.getElementById('firstinput').value * factor
        document.getElementById('therthdinput').value = document.getElementById('firstinput').value * factor2
    }
    if (param1 == "F") {
        document.getElementById('firstinput').value = document.getElementById('secondinput').value * factor
    }
    if (param1 == "D") {
        document.getElementById('therthdinput').value = document.getElementById('therthdinput').value * factor2
    }

}
var uri = 'https://www.nbrb.by/API/';
$(function() {
    $('#btn').click(function() {
       rates2();
    });

});
function rates2() {
    var curRates = [];
    $.getJSON(uri + 'ExRates/Rates', {
            'onDate': new Date($('#iDate').val()).toUTCString(),
            'Periodicity': '0'
        })
        .done(function(data) {
           $.each(data, function(key, item) {
             if(item["Cur_ID"] == 145){
                 
                 curRates.push(item["Cur_OfficialRate"])
             }
             if(item["Cur_ID"] == 292){
               
                curRates.push(item["Cur_OfficialRate"])
            }
            if(item["Cur_ID"] == 293){
               
                curRates.push(item["Cur_OfficialRate"])
            }
            if(item["Cur_ID"] == 298){
               
                curRates.push(item["Cur_OfficialRate"])
            }
            if(item["Cur_ID"] == 301){
               
                curRates.push(item["Cur_OfficialRate"])
            }   

           
     
            });
        });
        console.log(curRates);
        console.log(curRates.length);
       
        convert(curRates);
             
    }

// function clearData(){
//     $("#ul").remove(); 
//     };
