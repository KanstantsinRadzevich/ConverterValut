function convert(param1){
    var factor;
    f = document.getElementById('from').value
    s = document.getElementById('to').value
    t = document.getElementById('to2').value

    if(f == t){
        factor = 1
    }
    else if(f == 'EUR' && s == 'USD'){
        factor = 1.06;
    }
    // else if(f == 'USD' && s == 'EUR'){
    //     factor = 1/1.06;
    // }
    else if(f == 'RUB' && t == 'EUR'){
        factor = 0.0106;
    }


    if(param1 == "C"){
        document.getElementById('secondinput').value = document.getElementById('firstinput').value * factor
    }
    // if(param1 == "F"){
    //     document.getElementById('firstinput').value = document.getElementById('secondinput').value * factor
    // }
    if(param1 == "D"){
        document.getElementById('firstinput').value = document.getElementById('therthdinput').value * factor
    }

}