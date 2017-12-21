$(function() {
    var $img = $("#image")
    $img.cropper({
        aspectRatio: 1 / 1,
        crop: function(data) {
            // console.log(data)
            var $imgData = $img.cropper('getCroppedCanvas', {
                width: 200,
                height: 200
            })
            var dataurl = $imgData.toDataURL('image/png');
            $("#preview").attr("src", dataurl);
            $('#getData').val(dataurl)
        }
    })
    //  第一步，将base64转换成二进制图片（Blob）
    function dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(base64Data.split(',')[1]);
        else
            byteString = decodeURI(base64Data.split(',')[1]);
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    function submitImg() {
        //            第二步，构建formData
        var dataurl = $('#getData').val()
        // console.log(dataurl)
        var blob = dataURItoBlob(dataurl); // 上一步中的函数
        console.log(blob)
        var canvas = document.createElement('canvas');
        var dataURL = canvas.toDataURL('image/jpeg', 0.5);
        var fd = new FormData(document.forms[0]);
        fd.append("Base64", blob, 'image.png');

        //            第三步，使用AJAX提交
        $.ajax({
            url: 'http://192.168.0.167:8080/nsi-0.9/Admin_api?whereFrom=test&FileType=UserPortrait&UserMail=0&User_TureName=0&sql=00',
            method: 'POST',
            processData: false, //  不会将 data 参数序列化字符串
            contentType: false, //  根据表单 input 提交的数据使用其默认的 contentType
            dataType: 'json',
            data: fd,
            success:function(data) {
                console.log(data);
            }
        });
    }
    function alertuploadSucccess() {
        var $width = $(window).width(),
            $height = $(window).height(),
            $box = $("#box")
        // console.log($width, $height)
            $box.css({
                "left": ($width - 100) / 2,
                "top": ($height - 40) / 2,
            }).show(0).fadeOut(2000)

}
    
    $('#startUpload').click(function() {
        submitImg()
        alertuploadSucccess()
    })
})