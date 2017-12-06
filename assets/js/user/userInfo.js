//我的基本信息
$(function () {
    // console.log($.cookie('username'))
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            UserName:$.cookie('username')
        },//提交的参数
        url:'http://'+changeUrl.address+'/User_api?whereFrom=UserInfo',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            $('.User_TureName').text(msg[0].User_TureName)
            $('#Member_sign').text(msg[0].Member_sign)
            $('#User_score').text(msg[0].User_score)
            $('#name').text(msg[0].name)
            $('#User_phone').text(msg[0].User_phone)
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})

//获取我的简历信息
function getResumeInfo() {
    $.ajax({
        type: "get",
        async: false,
        traditional: true,
        data: {
            UserMail:$.cookie('username')
        },//提交的参数
        url: 'http://' + changeUrl.address + '/talent_api?whereFrom=detail',
        dataType: "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success: function (msg) {
            console.log(msg)
            $('#ResumeName').text(msg[0].Name)
            $('#Sex').text((msg[0].Sex == 0) ? '女' : '男')
            $('#Phone').text(msg[0].Phone)
            $('#Mail').text(msg[0].Mail)
            $('#Education').text(msg[0].Education)
            $('#Major').text(msg[0].Major)
            $('#NowWorkplace').text(msg[0].NowWorkplace)
            $('#WorkYear').text(msg[0].WorkYear)
            $('#Public').text((msg[0].Public == 0) ? '否' : '是')

            $('#ExpectWorkPlace').text(msg[0].ExpectWorkPlace)
            $('#ExpectWorkPosition').text(msg[0].ExpectWorkPosition)
            $('#ExpectSalary').text(msg[0].ExpectSalary)
            $('#Other').text(msg[0].Other)

            $('#WorkExperience').text(msg[0].WorkExperience)
            $('#EducationBackground').text(msg[0].EducationBackground)
            $('#TrainingBackground').text(msg[0].TrainingBackground)
        },
        error: function () {
            alert('网络繁忙，请稍后再试！');
        }
    });
}
// 判断是否填写基本信息
function isAddPrimaryInfo() {
    $.ajax({
        type: "get",
        async: false,
        traditional: true,
        data: {
            UserMail:$.cookie('username')
        },//提交的参数
        url: 'http://' + changeUrl.address + '/talent_api?whereFrom=HavaTalent',
        dataType: "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success: function (msg) {
            console.log(msg)
            if(msg.msg01 == -1){
                //没有填写简历基本信息
                $('#upLoadResume').click(function () {
                    $('#myModal02').modal({
                        keyboard: true
                    })
                    return false;
                })
            }else {
                //已填写简历基本信息
                $('#noBaseInfo').addClass('hide')
                $('#hasBaseInfo').removeClass('hide')
                getResumeInfo()
                //点击显示图片上传模态框（自制）
                $('#upLoadResume').click(function () {
                    $('#upImgModal').animate({
                        top:100
                    },500)
                    $('#modalBg').css({'background':'rgba(0,0,0,.6)','position':'fixed','z-index':5})
                    var api = 'talent_api',key01 = 'whereFrom',key02 = 'UserMail' ,key03 = 'User_TureName' ,key04 = 'CompanyName' ;
                    var para01 = 'UpResume' , para02 = $.cookie('username') , para03 = $.cookie('User_TureName') ,para04 = 0 ;
                    uploadFile(api,key01,key02,key03,key04,para01,para02,para03,para04,setAutoJump)
                })
                $('#closeUpImg').click(function () {
                    $('#upImgModal').animate({
                        top:-500
                    },500)
                    $('#modalBg').css({'background':'','position':'','z-index':''})
                })
            }

            if(msg.msg02 != -1 ){  //已上传简历附件
                $('#noUpResume').addClass('hide')
                $('#UpResume').removeClass('hide')
                $('#previewResume').attr('href','http://data.xinxueshuo.cn/upFile/talent/'+$.cookie('username')+$.cookie('User_TureName')+'.'+msg.msg02)
                //点击显示图片上传模态框（自制）加简历更新
                $('#refreshResume').click(function () {
                    $('#upImgModal').animate({
                        top:100
                    },500)
                    $('#modalBg').css({'background':'rgba(0,0,0,.6)','position':'fixed','z-index':5})
                    var api = 'talent_api',key01 = 'whereFrom',key02 = 'UserMail' ,key03 = 'User_TureName' ,key04 = 'CompanyName' ;
                    var para01 = 'UpResume' , para02 = $.cookie('username') , para03 = $.cookie('User_TureName') ,para04 = 0 ;
                    uploadFile(api,key01,key02,key03,key04,para01,para02,para03,para04,setAutoJump)
                })
                $('#closeUpImg').click(function () {
                    $('#upImgModal').animate({
                        top:-500
                    },500)
                    $('#modalBg').css({'background':'','position':'','z-index':''})
                })

            }else {
                $('#noUpResume').removeClass('hide')
                $('#UpResume').addClass('hide')
            }
        },
        error: function () {
            alert('网络繁忙，请稍后再试！');
        }
    });
}

$(function () {
    if($.cookie('username') != undefined){
        isAddPrimaryInfo()
    }
})

//自动跳转
var timeNum = 3
function autoJump() {
    $('.timeNum').text(timeNum)
    timeNum--;
    // console.log(timeNum)
    if(timeNum == 0){
        window.location.href = '../user/userInfo.html'
    }
}

function setAutoJump() {
    $('.shadowWrap,#autoJump').removeClass('hide')
    setInterval(function () {
        autoJump()
    },1000)
}


$(function () {
    getCookie();
})







