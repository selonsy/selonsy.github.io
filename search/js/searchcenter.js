$(function () {
    initParam();
    bindDom();
    setweather(); 
});

function initParam() {
    //输入框焦点
    $('.searchIpt').focus();
}

function setweather() {
                $.ajax({
                    url: 'http://api.jirengu.com/weather.php',//?callback=getWeather',
                    type:'post',
                    async:true,
                    //dataType: 'json',
                    //jsonp:'callback',
                    success: function (data) {
                        //Todo:这里改成使用插件去获取最新的实时的数据
                        data = JSON.parse(data);
                        if (data.status == 'success') {
                            var result = data.results[0];                            
                            $("#p_location").text(result.currentCity);
														$("#p_pm25").text(result.pm25);
                            var weather = result.weather_data[0];
                            $("#p_date").text(weather.date);
                            $("#p_weather").text(weather.weather);
                            $("#p_temperature").text(weather.temperature);
                            var time = new Date().getHours();
                            $("#img_weather").attr("src", time >= 18 ? weather.nightPictureUrl : weather.dayPictureUrl);
                        }
                        else {
                            $("#p_location").text("快乐星球");
                            $("#p_weather").text("好的不得了");
                            $("#p_temperature").text("10086℃");
                        }
                    },
                    error: function (xhr, status) {
                        console.log(status);
                        console.log(xhr.responseText);
                    }
                });
            };

						function bindDom() {

    //点击按钮
    $('.searchBTN').click(function () {
        var key = $('.searchIpt').val();
        //ToDo:验证输入是否合法
        if (!key) { return; }
        if ($(this).attr('for') == "baidu") {
            window.open('http://www.baidu.com/s?wd=' + key);
        }
        else {
            window.open('https://www.google.com.hk/#newwindow=1&q=' + key);
        }
    });

    //回车事件
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $('#btnSearchB').click();
        }
    });

    $('.uname,.topMenus').hover(function () {
        $('.topMenus').stop(true, true).fadeIn(200);
    }, function () {
        $('.topMenus').stop(true, true).delay(500).fadeOut(200);
    });

    $('.ctnerTab a').click(function () {
        if (!$(this).hasClass('on')) {
            $('.ctnerTab a').removeClass('on').eq($(this).index()).addClass('on');
            $('.rtNavs').stop(true, true).hide(200).eq($(this).index()).show(300);
        }
    });

    $('.menusWrapper a').click(function () {
        if (!$(this).hasClass('active')) {
            $('.menusWrapper a').removeClass('active').eq($(this).index()).addClass('active');
            $('.cbox').stop(true, true).animate({ top: 318 }, 100).hide().eq($(this).index()).animate({ top: 0 }, 400).show();
        }
    });

    $('.smallPics a').click(function () {
        if (!$(this).hasClass('active')) {
            $('.smallPics a').removeClass('active').eq($(this).index()).addClass('active');
            $('.picLink').stop(true, true).removeClass('active').eq($(this).index()).addClass('active');
        }
    });

    $('.titleT').hover(function () {
        if (!$(this).hasClass('on')) {
            $('.titleT').removeClass('on').eq($(this).index()).addClass('on');
            $('.topicB').stop(true, true).hide().eq($(this).index()).show();
        }
    });

    $('#music-control').on('click', function () {
        var that = $(this);
        if (that.hasClass('on')) {
            $("#music-content").hide();
            that.removeClass('on');
        }
        else {
            $("#music-content").show();
            that.addClass('on');
        }
    });
}

