
var uri = 'https://www.nbrb.by/API/';
$(function() {
    $('#btn').click(function() {
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
            
       
        crossCur(curRates, e);
    });

    
}
    function crossCur(curRates, e) {
    
    
        var usdId = parseFloat(curRates[0], 10); //USD
        var eurId = parseFloat(curRates[1], 10); //EUR
        var plnId = parseFloat(curRates[2], 10); //10pln
        var rubId = parseFloat(curRates[3], 10); //100rub
        var kztId = parseFloat(curRates[4], 10); //1000
        console.log(usdId / eurId)
        
        
        
        if (e == "E") {
           document.getElementById('USD').value = document.getElementById('EUR').value *eurId/usdId;
           document.getElementById('RUB').value = document.getElementById('EUR').value *eurId*100/rubId;
           document.getElementById('PLN').value = document.getElementById('EUR').value *eurId*10/plnId;
           document.getElementById('KZT').value = document.getElementById('EUR').value *eurId*1000/kztId;
        }
        if (e == "U") {
            
           document.getElementById('EUR').value = document.getElementById('USD').value *usdId/eurId;
           document.getElementById('RUB').value = document.getElementById('USD').value *usdId/eurId *eurId*100/rubId;
           document.getElementById('PLN').value = document.getElementById('USD').value *usdId/eurId *eurId*10/plnId;
           document.getElementById('KZT').value = document.getElementById('USD').value *usdId/eurId *eurId*1000/kztId;
        }
        if (e == "R") {
            
            document.getElementById('EUR').value = document.getElementById('RUB').value *eurId*100/rubId/eurId;
            document.getElementById('USD').value = document.getElementById('RUB').value *eurId*100/rubId /eurId *eurId/usdId;
            document.getElementById('PLN').value = document.getElementById('RUB').value *eurId*100/rubId /eurId *eurId*10/plnId;
            document.getElementById('KZT').value = document.getElementById('RUB').value *eurId*100/rubId /eurId *eurId*1000/kztId;
         }
         if (e == "P") {
            
            document.getElementById('EUR').value = document.getElementById('PLN').value *eurId*10/plnId/eurId;
            document.getElementById('USD').value = document.getElementById('PLN').value *eurId*10/plnId/eurId*eurId/usdId;
            document.getElementById('RUB').value = document.getElementById('PLN').value *eurId*10/plnId/eurId*eurId*100/rubId;
            document.getElementById('KZT').value = document.getElementById('PLN').value *eurId*10/plnId/eurId*eurId*1000/kztId;
         }
         if (e == "K") {
            
            document.getElementById('EUR').value = document.getElementById('KZT').value *eurId*1000/kztId/eurId;
            document.getElementById('USD').value = document.getElementById('KZT').value *eurId*1000/kztId/usdId;
            document.getElementById('PLN').value = document.getElementById('KZT').value *eurId*1000/kztId*10/plnId;
            document.getElementById('RUB').value = document.getElementById('KZT').value *eurId*1000/kztId*100/rubId;
         }
    };

  
  

