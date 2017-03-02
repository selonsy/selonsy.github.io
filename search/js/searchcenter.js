$(function () {
    initParam();
    bindDom();
    setweather();
});

function initParam() {
    //输入框焦点
    $('.searchIpt').focus();

    //我的导航菜单集合
    var nav_list = [
        //common
        {type:'common', href: 'http://www.baidu.com/', title: '百度', show: 'Baidu' },
        {type:'common', href: 'https://www.google.com.hk/', title: '谷歌', show: 'Google' },
        {type:'common', href: 'http://www.cnblogs.com/', title: '博客园', show: 'CnBlog' },
        {type:'common', href: 'http://stackoverflow.com/', title: '栈溢出', show: 'StackOverflow' },
        {type:'common', href: 'http://github.com/shenjl', title: 'GitHub', show: 'GitHub' },

        {type:'common', href: 'http://www.w3cschool.cn/', title: 'w3c', show: 'W3cSchool' },
        {type:'common', href: 'http://www.runoob.com/', title: '菜鸟', show: 'Ruoob' },
        {type:'common', href: 'http://www.zhihu.com/', title: '知乎', show: 'ZhiHu' },
        {type:'common', href: 'http://www.imooc.com/', title: '慕课', show: 'IMooc' },
        {type:'common', href: 'https://shimo.im/', title: '石墨', show: 'ShiMo' },

        {type:'common', href: 'http://www.youku.com/', title: '优酷', show: 'YouKu' },
        {type:'common', href: 'http://www.taobao.com/', title: '淘宝', show: 'TaoBao' },
        {type:'common', href: 'http://www.jd.com/', title: '京东', show: 'JD' },
        {type:'common', href: 'http://www.douban.com/', title: '豆瓣', show: 'DouBan' },
        {type:'common', href: 'http://tv.sohu.com/', title: '搜狐视频', show: 'Sohu' },

        {type:'common', href: 'https://oj.leetcode.com/', title: 'LeetCode', show: 'LeetCode' },

        //work
        {type:'work', href: 'http://zpm.hr.duoyi.com/', title: '校招后台', show: '正-校招后台' },
        {type:'work', href: 'http://xz.duoyi.com/', title: '校招官网', show: '正-校招官网' },
        {type:'work', href: 'http://hr.duoyi.com/', title: '社招官网', show: '正-社招官网' },
        
    ];

    var nav_type = [
        'common',
        'dev',
        'tool',
        'work',
        'fun'
    ];

    const filterBytype = type => item => {
        return item.type==type;
    }

    (function show_nav_list() {
        var html = '<div class="navContent">' +
            '<a href="{0}" target="_blank" title="{1}">' +
            '<img width="115" height="70" src="img/ie.png" alt="" />' +
            '<div><span>{2}</span></div>' +
            '</a>' +
            '</div>';

        for (var i = 0; i < nav_type.length; i++) {
            var obj = $('.nav_' + nav_type[i]);
            var new_html = "";
            var new_nav_list = nav_list.filter(filterBytype(nav_type[i]));
            for (var j = 0; j < new_nav_list.length; j++) {
                var item = new_nav_list[j];
                new_html += html.format(item.href,item.show, item.title);
            }
            obj.html(new_html);
        }
    })();
}

function setweather() {
    $.ajax({
        url: 'http://api.jirengu.com/weather.php',//?callback=getWeather',
        type: 'post',
        async: true,
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

