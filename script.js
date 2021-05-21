function convert(param1) {
    var usdId = 145;
    var eurId = 293;
    var plnId = 355; //10pln
    var rubId = 298; //100rub
    var kztId = 302; //1000
    
    
    
    var factor1;
    var factor2;
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

    // function currencies() {
    //     $.getJSON(uri + 'ExRates/Currencies')
    //         .done(function(data) {
    //             $.each(data, function(key, item) {
    //                 $('<li>', {
    //                     text: JSON.stringify(item)
    //                 }).appendTo($('#res'));
    //             });
    //             $('#btn').removeAttr("disabled");
    //         }).error(function(err) {
    //             $('#btn').removeAttr("disabled");
    //             alert('ошибка');
    //         });
    // };

    // function currency() {
    //     $.getJSON(uri + 'ExRates/Currencies/' + $('#iCur').val())
    //         .done(function(data) {
    //             $('<li>', {
    //                 text: JSON.stringify(data)
    //             }).appendTo($('#res'));
    //             $('#btn').removeAttr("disabled");
    //         }).error(function(err) {
    //             $('#btn').removeAttr("disabled");
    //             alert('ошибка');
    //         });
    // };

    // function rates(p) {
    //     $.getJSON(uri + 'ExRates/Rates', {
    //             'onDate': new Date($('#iDate').val()).toUTCString(),
    //             'Periodicity': p
    //         })
    //         .done(function(data) {
    //             $.each(data, function(key, item) {
    //                 $('<li>', {
    //                     text: JSON.stringify(item)
    //                 }).appendTo($('#res'));
    //             });

                
    //             $('#btn').removeAttr("disabled");
    //         }).error(function(err) {
    //             $('#btn').removeAttr("disabled");
    //             alert('ошибка');
    //         });
    // };
    
    
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
                 
                 curRates.push([item["Cur_OfficialRate"]])
             }
             if(item["Cur_ID"] == 292){
               
                curRates.push([item["Cur_OfficialRate"]])
            }
            if(item["Cur_ID"] == 293){
               
                curRates.push([item["Cur_OfficialRate"]])
            }
            if(item["Cur_ID"] == 298){
               
                curRates.push([item["Cur_OfficialRate"]])
            }
            if(item["Cur_ID"] == 301){
               
                curRates.push([item["Cur_OfficialRate"]])
            }   

           
     
            });
        })
        console.log(curRates)
        convert(curRates);
        return curRates;
       
    }

// function clearData(){
//     $("#ul").remove(); 
//     };
