//登录后的导航条状态
$(function() {
    // alert(0)
    console.log($.cookie('usertitle'))
    console.log($.cookie('username'))
    if ($.cookie('usertitle') && $.cookie('username')) {
        //导航条登录显示控制
        // alert(1)
        $('.rightNav li').eq(1).css('display', 'none')
        $('.rightNav li').eq(2).css('display', 'none')
        $('.rightNav li').eq(3).css('display', 'block')
        $('.rightNav li').eq(4).css('display', 'block')
        $('.loginUser').text($.cookie('User_TureName'))
        $('#userLevel').text('Lv' + $.cookie('usertitle'))
    } else {
        // alert(2)
        $('.rightNav li').eq(1).css('display', 'block')
        $('.rightNav li').eq(2).css('display', 'block')
        $('.rightNav li').eq(3).css('display', 'none')
        $('.rightNav li').eq(4).css('display', 'none')
    }
})

//退出登录，删除cookie
function exitLogin() {
    $.cookie('usertitle', null, { expires: -1, path: '/' });
    $.cookie('username', null, { expires: -1, path: '/' });
    $.cookie('User_TureName', null, { expires: -1, path: '/' });
    $.cookie('userVerifyCode', null, { expires: -1, path: '/' });
    window.location.href = '../user/login.html'
}

$('#exitLogin01').click(function() {
    exitLogin()
})


//返回顶部
$(function() {
    $('#backToTop').hide()
    $(window).scroll(function() {
        if ($(this).scrollTop() > 54) {
            $('#backToTop').fadeIn()
        } else {
            $('#backToTop').fadeOut()
        }
    })
    $('#backToTop').click(function() {
        $('html , body').animate({ scrollTop: 0 }, 'slow');
    })
})

//意见反馈移动端消失
$(function() {
    var screenWidth = $(window).width()
    if (screenWidth < 768) {
        $('#advice').hide()
    }
})




console.log('2018-01-23-11:30')

// 改换首页 2018.01.10

// 学校数据库信息列表滚动
$(function() {
    // autoRoll
    function autoRoll() {
        var speed = 0,
            timer = null,
            $box = $(".scrollBox"),
            $liHeight = $box.children().height(),
            $dynamicList = $(".dynamicList"),
            $clone = $(".scrollBox_clone");
        $box.children().clone(true).appendTo($clone)

        function auto() {
            speed++;
            if (speed >= $box.height()) {
                speed = 0;
            }
            $box.css({ top: -speed + "px" })
        }

        timer = setInterval(auto, 50);

        $dynamicList.hover(function() {
            clearInterval(timer);
        }, function() {
            clearInterval(timer);
            timer = setInterval(auto, 50);
        })
    }
    autoRoll()
})

$(function() {
    var $scrollBox = $(".scrollBox");
    $.ajax({
        type: "POST",
        async: true,
        traditional: true,
        dataType: 'jsonp',
        data: {
            'School_searchKey': "",
            'pageNum': 1,
            'OnePageNum': 10
        },
        jsonp: 'Callback',
        url: 'http://' + changeUrl.address + '/School_api?whereFrom=search',
        success: function(msg) {
            for (var i = 0; i < msg.length; i++) {
                $scrollBox.append(
                    '<li><a class="white" href="http://data.xinxueshuo.cn/nsi/school/detail.html?whereFrom=search&School_name=' + msg[i].Id + '">• &nbsp;' + msg[i].School_name + '</a></li>'
                )
            }
        },
        error: function(msg) {
            console.log(msg)
        }
    })
})

// 机构库
$(function() {
    function autoLeft() {
        var $box = $(".institutionsBox"),
            $boxWidth = $box.width(),
            timer = null,
            $institutionsBase = $(".institutionsBase");

        timer = setInterval(auto, 3000);

        function auto() {

            if ($box.offset().left <= (-$boxWidth / 3)) {
                $box.css({ left: 0 })
            }
            $box.animate({ left: "-=" + ($boxWidth / 3 + 2) }, 600)
        }

        $institutionsBase.hover(function() {
            clearInterval(timer)
        }, function() {
            clearInterval(timer);
            timer = setInterval(auto, 3000);
        })
    }
    autoLeft();
})

// 搜索Tab
$(function() {
    //默认学校搜索
    $('#SearchButton').click(function() {
        var searchVal = $('#search').val()
        window.location.href = '../school/search.html?whereFrom=' + searchVal
    })

    $('#search').keydown(function(e) {
        var curKey = e.which; //兼容火狐
        if (curKey == 13) {
            var searchVal = $('#search').val()
            window.location.href = '../school/search.html?whereFrom=' + searchVal
        }
    })

    var oUl = $("#searchTab"),
        aLi = oUl.children(),
        aHotSearch = $(".hotContent");
    aLi.on("click", function() {
        var search = $("#search"),
            searchVal = $("#search").val(),
            searchBtn = $("#SearchButton");
        $(this).addClass("activeTab").siblings().removeClass("activeTab");
        aHotSearch.eq($(this).index()).fadeIn(100).siblings().fadeOut(100);
        switch ($(this).index()) {
            case 0:
                searchBtn.click(function() {
                    var searchVal = $("#search").val();
                    window.location.href = '../school/search.html?whereFrom=' + searchVal
                })
                search.keydown(function(e) {
                    console.log(1)
                    var searchVal = $("#search").val();
                    e = e || window.event;
                    var curkey = e.which;
                    if (curkey == 13) {
                        window.location.href = '../school/search.html?whereFrom=' + searchVal
                    }
                })
                break;
            case 1:
                searchBtn.click(function() {
                    var searchVal = $("#search").val();
                    window.location.href = '../company/searchCompany.html?whereFrom=' + searchVal
                })
                search.keydown(function(e) {
                    var searchVal = $("#search").val();
                    e = e || window.event;
                    var curkey = e.which;
                    if (curkey === 13) {
                        window.location.href = '../company/searchCompany.html?whereFrom=' + searchVal
                    }
                })
                break;
            case 2:
                searchBtn.click(function() {
                    var searchVal = $("#search").val();
                    window.location.href = '../talent/searchTalent.html?whereFrom=' + searchVal
                })
                search.keydown(function(e) {
                    var searchVal = $("#search").val();
                    e = e || window.event;
                    var curkey = e.which;
                    if (curkey === 13) {
                        window.location.href = '../talent/searchTalent.html?whereFrom=' + searchVal
                    }
                })
                break;
            case 3:
                searchBtn.click(function() {
                    var searchVal = $("#search").val();
                    window.location.href = '../project/searchProject.html?whereFrom=' + searchVal
                })
                search.keydown(function(e) {
                    var searchVal = $("#search").val();
                    e = e || window.event;
                    var curkey = e.which;
                    if (curkey === 13) {
                        window.location.href = '../project/searchProject.html?whereFrom=' + searchVal
                    }
                })
                break;
        }
    })
})


$('.hoverClose').on('click',function () {
    $('#toMobile').addClass('hide')
})




