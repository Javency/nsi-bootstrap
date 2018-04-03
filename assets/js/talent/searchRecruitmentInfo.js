//封装ajax
function myAjax(data, url, success) {
    $.ajax({
        type :   "get",
        async: true,
        traditional: true,
        data: data, //提交的参数
        url: url,
        // dataType :   "jsonp", //数据类型为jsonp  
        // jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success:function(msg) {
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
    for (var i = 0; i < msg.data01.length; i++) {
        var template= ' <div class="container result">' +
                        '<div class="row">' +
                        '<div class="result_pic col-md-2 col-sm-12 col-xs-12"><i class="iconfont icon-ren1"></i></div> ' +
                        '<div class="row result_body col-md-10 col-sm-12 col-xs-12">' +
                        '<p class="col-md-12 col-sm-12 col-xs-12 name"><a href="./detailTalent.html?ID=' + msg.data01[i].Id + '">' + msg.data01[i].Position + '</a></p>' +
                        '<p class="col-md-6 col-sm-6 col-xs-6">' +
                        '工作年限：' +
                        '<span>' + msg.data01[i].Seniority + '</span>' +
                        '</p>' +
                        '<p class="col-md-6 col-sm-6 col-xs-6">' +
                        '招聘企业名称：' +
                        '<span>' + msg.data01[i].recuitment_name + '</span>' +
                        '</p>' +
                        '<p class="col-md-6 col-sm-6 col-xs-6">' +
                        '工作地点：' +
                        '<span>' + msg.data01[i].Areas+msg.data01[i].Areas02+msg.data01[i].Areas03+ '</span>' +
                        '</p>' +
                        '<p class="col-md-6 col-sm-6 col-xs-6">' +
                        '提交时间：' +
                        '<span>' + msg.data01[i].Load_time + '</span>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        ' </div>'
        $("#result").append(template)
    }
}

// 招聘信息
$("#search").on("click", function() {
    generalSearch()
 })
 $("#searchKey").keydown(function(e) {
        var curKey = e.which;
        if (curKey === 13) {
            generalSearch();
            return false;
        }
    })


// //搜索20条
function generalSearch() {
    var passVal = $('#searchKey').val()
    // console.log(passVal);
    $.ajax({
        type: "get",
        async: true,
        traditional: true,
        data: {
            'recuitment_searchKey': passVal,
        }, //提交的参数
        url: "http://" + changeUrl.address + "/Recuitment_api?whereFrom=job_search", //获取搜索的总条数
        // dataType: "jsonp", //数据类型为jsonp  
        // jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success:function(data) {
            // console.log(data.data01)
            var totalPages = Math.ceil((data.count / 10));
            // console.log(totalPages)
            //分页
            layui.use(['layer', 'laypage', 'element'], function() {
                var layer = layui.layer,
                    laypage = layui.laypage,
                    element = layui.element();
                laypage({
                    cont: 'pageDemo', //分页容器的id
                    pages: totalPages, //总页数
                    skin: '#5FB878', //自定义选中色值
                    // ,skip: true //开启跳页
                    jump: function(obj, first) {
                        $('#result').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show() //遮罩层
                        var passVal = $('#searchKey').val()
                        var data01 = {
                            'recuitment_searchKey': passVal,
                            'pageNum': obj.curr,
                            'OnePageNum': 10
                        }
                        if (data.count !== 0) {
                            myAjax(data01, "http://" + changeUrl.address + "/Recuitment_api?whereFrom=job_search", createList)
                        } else {
                            $('#loadgif').hide()
                            $('#floatLayer').hide() //遮罩层
                        }
                    }
                });
            })
            $('.gengeralSearchNum').text(data.count)
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
            'recuitment_searchKey': '',
            'pageNum': 1,
            'OnePageNum': 40
        }
        myAjax(data02, 'http://' + changeUrl.address + '/Recuitment_api?whereFrom=job_search', fn)
    } else {
        var datailRecruitment = decodeURIComponent(args['whereFrom'])
        var data01 = {
            'recuitment_searchKey': datailRecruitment,
            'pageNum': 1,
            'OnePageNum': 40
        }
        $('#searchKey').val(datailRecruitment)
        $('#result').html('')
        myAjax(data01, 'http://' + changeUrl.address + '/Recuitment_api?whereFrom=job_search', fn)
    }
}
//初始数据加载
$(function() {
    initLoad(generalSearch)
})