//封装ajax
function myAjax(data, url, success) {
    $.ajax({
        type :   "get",
        async: true,
        traditional: true,
        data: data, //提交的参数
        url: url,
        dataType :   "jsonp", //数据类型为jsonp  
        jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success :   function(msg) {
            console.log(msg);
            success(msg);
            $('#loadgif').hide()
            $('#floatLayer').hide() //遮罩层
            $("html,body").animate({ scrollTop: 0 }, 0);
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });
}

// 解析url
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {};
    var items = qs.length ? qs.split("&") : [];
    var item = null;
    var name = null;
    var value = null;
    len = items.length;
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

//创建列表
function createList(msg) {
    for (var i = 0; i < msg.length; i++) {
        $("#result").append(
            '<div class="container result">' +
            '<div class="row">' +
            '<div class="result_pic col-md-2 col-sm-12 col-xs-12"><i class="iconfont icon-ren1"></i></div> ' +
            '<div class="row result_body col-md-10 col-sm-12 col-xs-12">' +
            '<p class="col-md-12 col-sm-12 col-xs-12 name"><a href="./detailTalent.html?ID=' + msg[i].Id + '" id="talent${i}">' + msg[i].Name + '</a></p>' +
            '<p class="col-md-6 col-sm-6 col-xs-6">' +
            '工作年限：' +
            '<span>' + msg[i].WorkYear + '</span>' +
            '</p>' +
            '<p class="col-md-6 col-sm-6 col-xs-6">' +
            '期望工作职位：' +
            '<span>' + msg[i].ExpectWorkPosition + '</span>' +
            '</p>' +
            '<p class="col-md-6 col-sm-6 col-xs-6">' +
            '专业：' +
            '<span>' + msg[i].Major + '</span>' +
            '</p>' +
            '<p class="col-md-6 col-sm-6 col-xs-6">' +
            '期望工作城市：' +
            '<span>' + msg[i].ExpectWorkPlace + '</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            ' </div>'
        )
    }
}



// 招聘需求模板
// function recruitmentTemplatesLoad() {
//     var val = $("#searchKey").val();
//     $("#result").html("");
//     $.ajax({
//         type: "get",
//         async: false,
//         traditional: true,
//         dataType: "jsonp", //数据类型为jsonp  
//         jsonp:   "Callback",
//         data: {
//             'searchKey': val
//         }, //提交的参数
//         url: 'http://' + changeUrl.address + '/talent_api?whereFrom=search',
//         success: function(msg) {
//             for (var i = 0; i < msg.length; i++) {
//                 $("#result").append(
//                     `
//                     <div class="container result">
//                         <div class="row">
//                             <div class="result_pic col-md-2 col-sm-12 col-xs-12"><img src="" alt=""></div>
//                             <div class="row result_body col-md-10 col-sm-12 col-xs-12">
//                                 <p class="col-md-12 col-sm-12 col-xs-12 name"> <a href="#">${msg[i].Id}</a> </p>
//                                 <p class="col-md-6 col-sm-6 col-xs-6">
//                                     工作年限：
//                                     <span>${msg[i].WorkYear}年</span>
//                                 </p>
//                                 <p class="col-md-6 col-sm-6 col-xs-6">
//                                     招聘企业名称：
//                                     <span>${msg[i].CompanyName}</span>
//                                 </p>
//                                 <p class="col-md-6 col-sm-6 col-xs-6">
//                                     工作地点：
//                                     <span>${msg[i].WorkPlace}</span>
//                                 </p>
//                                 <p class="col-md-6 col-sm-6 col-xs-6">
//                                     提交时间：
//                                     <span>${msg[i].UpLoadDate}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 `
//                 )
//             }
//         }
//     })
// }

// 点击跳转查询
// $("#searchKey").on("click", function() {
//     var val = $("#searchKey").val();
//     if ($("#rck").is(".active")) {
//         $("#search").on("click", function() {
//             // window.location.href = "./search.html?whereFrom=" + val;
//             talentTemplatesLoad();
//         })
//         $("#searchKey").keydown(function(e) {
//             var curKey = e.which;
//             if (curKey === 13) {
//                 // window.location.href = "./search.html?whereFrom=" + val;
//                 talentTemplatesLoad();
//                 return false;
//             }
//         })
//     } else {
//         $("#search").on("click", function() {
//             // window.location.href = "./zhaopinxinxi.html?whereFrom=" + val;
//             recruitmentTemplatesLoad();
//         })
//         $("#searchKey").keydown(function(e) {
//             var curKey = e.which;
//             if (curKey === 13) {
//                 // window.location.href = "./zhaopinxinxi.html?whereFrom=" + val;
//                 recruitmentTemplatesLoad();
//                 return false;
//             }
//         })
//     }
// })

// 人才搜索
$("#search").on("click", function() {
    var val = $("#searchKey").val();
    if ($("#rck").is(".active")) {
        // window.location.href = "./search.html?whereFrom=" + val;
        generalSearch()
        $("#searchKey").keydown(function(e) {
            var curKey = e.which;
            if (curKey === 13) {
                // window.location.href = "./search.html?whereFrom=" + val;
                generalSearch();
                return false;
            }
        })
    } else {
        // window.location.href = "./zhaopinxinxi.html?whereFrom=" + val;
        generalSearch()
        $("#searchKey").keydown(function(e) {
            var val = $("#searchKey").val(),
                curKey = e.which;
            if (curKey === 13) {
                // window.location.href = "./zhaopinxinxi.html?whereFrom=" + val;
                generalSearch();
                return false;
            }
        })
    }
})


//搜索20条
function generalSearch() {
    var passVal = $('#searchKey').val()
    console.log(passVal);
    $.ajax({
        type: "get",
        async: true,
        traditional: true,
        data: {
            'talent_searchKey': passVal,
        }, //提交的参数
        url: "http://" + changeUrl.address + "/talent_api?whereFrom=count", //获取搜索的总条数
        dataType: "jsonp", //数据类型为jsonp  
        jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success :   function(data) {
            console.log(data)
            var totalPages = Math.ceil((data.countAllRS / 20));
            //分页
            layui.use(['layer', 'laypage', 'element'], function() {
                var layer = layui.layer,
                    laypage = layui.laypage,
                    element = layui.element();
                laypage({
                    cont: 'pageDemo01', //分页容器的id
                    pages: totalPages, //总页数
                    skin: '#5FB878', //自定义选中色值
                    //,skip: true //开启跳页
                    jump: function(obj, first) {
                        $('#result').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show() //遮罩层
                        var passVal = $('#searchKey').val()
                        var data01 = {
                            'talent_searchKey': passVal,
                            'pageNum': obj.curr,
                            'OnePageNum': 40
                        }
                        if (data.countAllRS != 0) {
                            myAjax(data01, "http://" + changeUrl.address + "/talent_api?whereFrom=search", createList)
                        } else {
                            $('#loadgif').hide()
                            $('#floatLayer').hide() //遮罩层
                        }
                    }
                });
            })
            $('.gengeralSearchNum').text(data.countAllRS)
        },
        error: function() {
            alert('请求数据失败！');
        }
    });
}

//外部页面跳转过来，如果为空，执行空搜，否则执行一次带参数的搜索
function initLoad(fn) {
    var args = getQueryStringArgs();
    if (jQuery.isEmptyObject(args)) {
        var data02 = {
            'talent_searchKey': '',
            'pageNum': 1,
            'OnePageNum': 40
        }
        myAjax(data02, 'http://' + changeUrl.address + '/talent_api?whereFrom=search', fn)
    } else {
        var datailSchool = decodeURIComponent(args['whereFrom'])
        var data01 = {
            'talent_searchKey': datailSchool,
            'pageNum': 1,
            'OnePageNum': 40
        }
        $('#searchKey').val(datailSchool)
        $('#result').html('')
        myAjax(data01, 'http://' + changeUrl.address + '/talent_api?whereFrom=search', fn)
    }
}
//初始数据加载
$(function() {
    initLoad(generalSearch)
})