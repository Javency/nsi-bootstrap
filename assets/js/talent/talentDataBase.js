// 点击跳转查询

$("#search").on("click", function() {
    var val = $("#searchKey").val();
    if ($("#rck").is(".active")) {
        window.location.href = "./searchTalent.html?whereFrom=" + val;
        // talentTemplatesLoad()
        $("#searchKey").keydown(function(e) {
            var curKey = e.which;
            if (curKey === 13) {
                window.location.href = "./searchTalent.html?whereFrom=" + val;
                talentTemplatesLoad();
                return false;
            }
        })
    } else {
        window.location.href = "./zhaopinxinxi.html?whereFrom=" + val;
        // recruitmentTemplatesLoad()
        $("#searchKey").keydown(function(e) {
            var val = $("#searchKey").val(),
                curKey = e.which;
            if (curKey === 13) {
                window.location.href = "./zhaopinxinxi.html?whereFrom=" + val;
                // recruitmentTemplatesLoad();
                return false;
            }
        })
    }
})