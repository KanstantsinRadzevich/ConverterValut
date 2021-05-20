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
var uri = 'https://www.nbrb.by/API/';
$(function() {
    $('#mode').change(function() {
        $('#res').empty();
        switch ($('#mode').val()) {
            case '0':
                $('#onDate').hide();
                $('#Cur').hide();
                $('#period').hide();
                break;
            case '1':
                $('#onDate').hide();
                $('#Cur').show();
                $('#period').hide();
                break;
            case '2':
            case '10':
            case '11':
                $('#onDate').show();
                $('#Cur').show();
                $('#period').hide();
                break;
            case '6':
            case '8':
            case '9':
                $('#onDate').hide();
                $('#Cur').show();
                $('#period').hide();
                break;
            case '3':
                $('#onDate').hide();
                $('#Cur').show();
                $('#period').show();
                break;
            case '4':
            case '5':
                $('#onDate').show();
                $('#Cur').hide();
                $('#period').hide();
                break;
            case '7':
                $('#onDate').hide();
                $('#Cur').hide();
                $('#period').hide();
                break;
        };
    });

    $('#btn').click(function() {

        rates(0);
    });

    function currencies() {
        $.getJSON(uri + 'ExRates/Currencies')
            .done(function(data) {
                $.each(data, function(key, item) {
                    $('<li>', {
                        text: JSON.stringify(item)
                    }).appendTo($('#res'));
                });
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    };

    function currency() {
        $.getJSON(uri + 'ExRates/Currencies/' + $('#iCur').val())
            .done(function(data) {
                $('<li>', {
                    text: JSON.stringify(data)
                }).appendTo($('#res'));
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    };

    function parseRuDate(s) {
        var parts = s.split('.');
        if (parts.length != 3) return NaN;

        parts[0] = parseInt(parts[0], 10);
        parts[1] = parseInt(parts[1], 10);
        parts[2] = parseInt(parts[2], 10);

        if (isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return NaN;
        if (parts[0] < 0 || parts[1] < 0 || parts[2] < 0) return NaN;

        return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    function rates(p) {
        $.getJSON(uri + 'ExRates/Rates', {
                'onDate': parseRuDate($('#iDate').val()).toUTCString(),
                'Periodicity': p
            })
            .done(function(data) {
                $.each(data, function(key, item) {
                    $('<li>', {
                        text: JSON.stringify(item)
                    }).appendTo($('#res'));
                });
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    };

    function ratestoday(p) {
        $.getJSON(uri + 'ExRates/Rates', {
                'Periodicity': p
            })
            .done(function(data) {
                $.each(data, function(key, item) {
                    $('<li>', {
                        text: JSON.stringify(item)
                    }).appendTo($('#res'));
                });
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    };

    function rate(p) {
        $.getJSON(uri + 'ExRates/Rates/' + $('#iCur').val(), {
                'onDate': parseRuDate($('#iDate').val()).toUTCString(),
                'ParamMode': p
            })
            .done(function(data) {
                $('<li>', {
                    text: JSON.stringify(data)
                }).appendTo($('#res'));
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    };

    function ratetoday(p) {
        $.getJSON(uri + 'ExRates/Rates/' + $('#iCur').val(), {
                'ParamMode': p
            })
            .done(function(data) {
                $('<li>', {
                    text: JSON.stringify(data)
                }).appendTo($('#res'));
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    };

    function ratedyn() {
        $.getJSON(uri + 'ExRates/Rates/Dynamics/' + $('#iCur').val(), {
                'startDate': parseRuDate($('#ifrom').val()).toUTCString(),
                'endDate': parseRuDate($('#ito').val()).toUTCString()
            })
            .done(function(data) {
                $.each(data, function(key, item) {
                    $('<li>', {
                        text: JSON.stringify(item)
                    }).appendTo($('#res'));
                });
                $('#btn').removeAttr("disabled");
            }).error(function(err) {
                $('#btn').removeAttr("disabled");
                alert('ошибка');
            });
    }
});