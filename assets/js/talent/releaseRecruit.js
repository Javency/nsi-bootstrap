$(function() {
    $.ajax({
        type :   "get",
        async: true,
        traditional: true,
        data: {
            'member_sign': $.cookie('usertitle'),
            'username': $.cookie('username'),
            'UserVerifyCode': $.cookie('userVerifyCode')
        }, //提交的参数
        url: 'http://' + changeUrl.address + '/User_api?whereFrom=verify',
        dataType :   "jsonp", //数据类型为jsonp  
        jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success :   function(msg) {
            // alert('成功')
            console.log(msg.verifyResult);
            if (msg.verifyResult < 0) {
                alert('您还没有登录，登录后即可发布招聘信息')
                window.location.href = "../user/login.html" //未登录，跳回登录页面
                console.log($.cookie('usertitle'))
                console.log($.cookie('username'))
                console.log($.cookie('userVerifyCode'))
                console.log($.cookie('User_TureName'))
            } else {
                $('.loginUser').text($.cookie('User_TureName'))
            }
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });

    //过滤函数（如果为空，自动补零）
    function autoAddZero(str) {
        var strFilter = null;
        return strFilter = (str == '') ? 0 : str;
    }

    //输入框传后台带标签
    function autoChangeStyle(obj) {
        var val = $(obj).val();
        var reg = new RegExp("\n", "g")
        val = val.replace(reg, "</p><p>");
        return val = "<p>" + val + "</p>";
        console.log(val);
    }

    $("#next").on('click', function() {
        var insertData = {
            'Name': autoAddZero($("#enterpriseName").val()),
            'Intro': autoAddZero(autoChangeStyle("#corporateProfile")),
            'Brief_intro': autoAddZero($("#oneSentence").val()),
            'Province': autoAddZero($("#selProvince").val()),
            'City': autoAddZero($("#selCity").val()),
            'Site': autoAddZero($("#workSpot").val()),
            'Link_name': autoAddZero($("#name").val()),
            'Link_phone': autoAddZero($("#tel").val()),
            'Link_mail': autoAddZero($("#mail").val())
        }
        $.ajax({
            type: 'post',
            async: true,
            traditional: true,
            dataType: 'jsonp',
            jsonp: 'Callback',
            url: 'http://' + changeUrl.address + '/Recuitment_api?whereFrom=insert',
            data: insertData,
            success: function() {
                console.log(1)
            }
        })
    })


    //监听用户输入字数
    $("#corporateProfile").keyup(function() {
        var wordTotal = 100,
            userWordCount = $("#corporateProfile").val().length,
            differences = wordTotal - userWordCount;
        $("#userWord").text(differences)
    })
})