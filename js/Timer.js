(function () {
    "use strict";

    var timerList = [];
    var stepsPerSecond = 1;

    function updateTime(id) {
        for (var i = 0; i < timerList.length; i++) {
            if (timerList[i].id === id) {
                timerList[i].time = 1000 * (60 * (60 * Number($('#timer-' + id + '-hour').val()) + Number($('#timer-' + id + '-min').val())) + Number($('#timer-' + id + '-sec').val()));
                break;
            }
        }
    }

    function addTimer() {
        var last = $('#timers').children().last();
        var id = 0;
        if (last.length > 0) {
            var lastId = Number(last.attr('id').substring(last.attr('id').search('-') + 1));
            id = lastId + 1;
        }
        $('#timers').append(
            '<div id="timer-' + id + '" class="timer row">' +
                '<div class="row col-md-1"></div>' +
                '<div class="row col-md-9">' +
                    '<input id="timer-' + id + '-hour" type="text" value="00" maxlength=2 size=2/>' +
                    '<button id="timer-' + id + '-inc-hour" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-plus"></span> ' +
                    '</button>' +
                    '<button id="timer-' + id + '-dec-hour" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-minus"></span> ' +
                    '</button>' +
                    '<div class="spacer"></div>' +
                    '<input id="timer-' + id + '-min" type="text" value="00" maxlength=2 size=2/>' +
                    '<button id="timer-' + id + '-inc-min" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-plus"></span> ' +
                    '</button>' +
                    '<button id="timer-' + id + '-dec-min" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-minus"></span> ' +
                    '</button>' +
                    '<div class="spacer"></div>' +
                    '<input id="timer-' + id + '-sec" type="text" value="00" maxlength=2 size=2/>' +
                    '<button id="timer-' + id + '-inc-sec" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-plus"></span> ' +
                    '</button>' +
                    '<button id="timer-' + id + '-dec-sec" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-minus"></span> ' +
                    '</button>' +
                '</div>' +
                '<div class="row col-md-2 timer-control">' +
                    '<button id="timer-' + id + '-play" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-play"></span> ' +
                    '</button>' +
                    '<button id="timer-' + id + '-del" type="button" class="btn btn-default btn-sm">' +
                        '<span class="glyphicon glyphicon-remove"></span> ' +
                    '</button>' +
                '</div>' +
            '</div>'
        );
        $('#timer-' + id + '-del').click(function () {
            $('#timer-' + id).remove();
            for (var i = 0; i < timerList.length; i++) {
                if (timerList[i].id === id) {
                    timerList.splice(i, 1);
                    break;
                }
            }
        });
        $('#timer-' + id + '-inc-hour').click(function () {
            var hour = Number($('#timer-' + id + '-hour').val());
            if (hour === 99) {
                hour = "00";
            } else {
                hour++;
                if (hour < 10) {
                    hour = "0" + hour;
                }
            }
            $('#timer-' + id + '-hour').val(hour);
            updateTime(id);
        });
        $('#timer-' + id + '-dec-hour').click(function () {
            var hour = Number($('#timer-' + id + '-hour').val());
            if (hour === 0) {
                hour = "99";
            } else {
                hour--;
                if (hour < 10) {
                    hour = "0" + hour;
                }
            }
            $('#timer-' + id + '-hour').val(hour);
            updateTime(id);
        });
        $('#timer-' + id + '-inc-min').click(function () {
            var min = Number($('#timer-' + id + '-min').val());
            if (min === 59) {
                min = "00";
                $('#timer-' + id + '-inc-hour').click();
            } else {
                min++;
                if (min < 10) {
                    min = "0" + min;
                }
            }
            $('#timer-' + id + '-min').val(min);
            updateTime(id);
        });
        $('#timer-' + id + '-dec-min').click(function () {
            var min = Number($('#timer-' + id + '-min').val());
            if (min === 0) {
                min = "59";
                $('#timer-' + id + '-dec-hour').click();
            } else {
                min--;
                if (min < 10) {
                    min = "0" + min;
                }
            }
            $('#timer-' + id + '-min').val(min);
            updateTime(id);
        });
        $('#timer-' + id + '-inc-sec').click(function () {
            var sec = Number($('#timer-' + id + '-sec').val());
            if (sec === 59) {
                sec = "00";
                $('#timer-' + id + '-inc-min').click();
            } else {
                sec++;
                if (sec < 10) {
                    sec = "0" + sec;
                }
            }
            $('#timer-' + id + '-sec').val(sec);
            updateTime(id);
        });
        $('#timer-' + id + '-dec-sec').click(function () {
            var sec = Number($('#timer-' + id + '-sec').val());
            if (sec === 0) {
                sec = "59";
                $('#timer-' + id + '-dec-min').click();
            } else {
                sec--;
                if (sec < 10) {
                    sec = "0" + sec;
                }
            }
            $('#timer-' + id + '-sec').val(sec);
            updateTime(id);
        });
        $('#timer-' + id + '-play').click(function () {
            for (var i = 0; i < timerList.length; i++) {
                if (timerList[i].id === id) {
                    if (!timerList[i].active && timerList[i].time > 0) {
						var d = new Date();
						timerList[i].lastTime = d.getTime();
                        $('#timer-' + id + '-play span').addClass('glyphicon-pause');
                        $('#timer-' + id + '-play span').removeClass('glyphicon-play');
                    } else {
                        $('#timer-' + id + '-play span').removeClass('glyphicon-pause');
                        $('#timer-' + id + '-play span').addClass('glyphicon-play');
                    }
                    timerList[i].active = !timerList[i].active;
                }
            }
        });
        $('#timer-' + id + '-hour').keyup(function () {
			var timerIdHour = $('#timer-' + id + '-hour');
			var timerIdHourVal = Number(timerIdHour.val());
			if(isNaN(timerIdHourVal )){
				timerIdHour.val("00");
			}
			if(timerIdHourVal < 10){
				timerIdHour.val("0" + timerIdHourVal);
			}				
			updateTime(id);
		});
		$('#timer-' + id + '-min').keyup(function () {
			var timerIdMin = $('#timer-' + id + '-min');
			var timerIdMinVal = Number(timerIdMin.val());
			if(isNaN(timerIdMinVal )){
				timerIdMin.val("00");
			}
			if(timerIdMinVal > 59){
				timerIdMin.val("59");
			}
			if(timerIdMinVal < 10){
				timerIdMin.val("0" + timerIdMinVal);
			}
			updateTime(id);
		});
		$('#timer-' + id + '-sec').keyup(function () {
			var timerIdSec = $('#timer-' + id + '-sec');
			var timerIdSecVal = Number(timerIdSec.val());
			if(isNaN(timerIdSecVal )){
				timerIdSec.val("00");
			}
			if(timerIdSecVal > 59){
				timerIdSec.val("59");
			}
			if(timerIdSecVal < 10){
				timerIdSec.val("0" + timerIdSecVal);
			}
			updateTime(id);
		});
        timerList.push({ id: id, active: false, time: 0 });
    };

    function printTime(id, time) {
        var hour = Math.floor(time / (1000 * 60 * 60));
        var min = Math.floor(time / (1000 * 60)) % 60;
        var sec = Math.floor(time / 1000) % 60;

        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        $('#timer-' + id + '-hour').val(hour);
        $('#timer-' + id + '-min').val(min);
        $('#timer-' + id + '-sec').val(sec);
    };

	// TODO: Alert
    
    function alert(id) { };

    function step() {
        for (var i = 0; i < timerList.length; i++) {
            if (timerList[i].active && timerList[i].time > 0) {
				var d = new Date();
				var stepSize = d.getTime() - timerList[i].lastTime;
				timerList[i].lastTime = d.getTime();
                if (timerList[i].time < stepSize) {
                    timerList[i].time = 0;
                    $('#timer-' + timerList[i].id + '-play').click();
                    alert(timerList[i].id);
                } else {
                    timerList[i].time -= stepSize;
                }
                printTime(timerList[i].id, timerList[i].time);
            }
        }
    }
    
    window['Timer'] = function (id) {
    	$('#' + id).html(
    		'<div id="timers">' +
    		'</div><!-- timers -->' +
    		'<div class="row">' +
            	'<div class="col-md-5"></div>' +
            	'<div class="col-md-2">' +
                	'<button id="add-timer" type="button" class="btn btn-default btn-lg">' +
                    	'<span class="glyphicon glyphicon-plus"></span>' + 
                    '</button>' +
                '</div>' +
                '<div class="col-md-5"></div>' +
            '</div>'
        );
        $('#add-timer').click(function () {
            addTimer();
        });
        $('#add-timer').click();

        setInterval(step, 1000 / stepsPerSecond);
    };
} ());
