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


//过滤函数（如果为零，自动补空）
function zeroToEmpty( str ) {
    var strFilter = null;
    return strFilter = (str == 0)? '  ' : str;
}

var args = getQueryStringArgs()
// console.log(args.ID)
$.ajax({
    type: "get",
    async: false,
    traditional: true,
    dataType: "jsonp", //数据类型为jsonp  
    jsonp: "Callback",
    data: {
        "Id": args.ID
    },
    url: 'http://' + changeUrl.address + '/talent_api?whereFrom=detail',
    success: function(msg) {
        console.log(msg);
        $("#name").text(zeroToEmpty(msg[0].Name))
        $("#education").text(zeroToEmpty(msg[0].Education))
        $("#workYear").text(zeroToEmpty(msg[0].WorkYear))
        $("#workPosition").text(zeroToEmpty(msg[0].ExpectWorkPlace))
        $("#salsry").text(zeroToEmpty(msg[0].ExpectSalary))
        $("#phone").text(zeroToEmpty(msg[0].Phone))
        $("#major").text(zeroToEmpty(msg[0].Major))
        $("#workNow").text(zeroToEmpty(msg[0].NowWorkplace))
        $("#wantedJob").text(zeroToEmpty(msg[0].ExpectWorkPosition))
        $("#email").text(zeroToEmpty(msg[0].Mail))
        $("#workExperience").text(zeroToEmpty(msg[0].WorkExperience))
        $("#educationalBackground").text(zeroToEmpty(msg[0].EducationBackground))
        $("#trainingExperience").text(zeroToEmpty(msg[0].TrainingBackground))
        $("#othersRequest").text(zeroToEmpty(msg[0].Other))
    }
})