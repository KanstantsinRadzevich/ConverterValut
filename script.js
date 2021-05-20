function convert(param1) {
    var factor1;
    var factor2;
    e = document.getElementById('from').value
    s = document.getElementById('to').value
    r = document.getElementById('to2').value

    if (e == s && e == r) {
        factor = 1
        factor2 = 1
    } else if (e == 'EUR' && s == 'USD') {
        factor = 1.06;
        factor2 = 89.87;
    } else if (s == 'USD' && e == 'EUR') {
        factor = 1 / 1.06;
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