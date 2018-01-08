$(function() {
    // console.log(123)
    // 公司信息验证
    var $next = $("#next"),
        $tab1 = $("#companyInfo_tab1"),
        $tab2 = $("#jobManage_tab2");
    $("#companyInfo_tab1").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: { /*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 验证
        fields: {
            // 公司名称
            companyName: {
                validators: {
                    notEmpty: {
                        message: "公司名不能为空"
                    }
                }
            },
            // 公司简介
            corporateProfile: {
                validators: {
                    notEmpty: {
                        message: "企业简介不能为空"
                    }
                }
            },
            // 公司地点
            workSpot: {
                validators: {
                    notEmpty: {
                        message: "公司地点不能为空"
                    }
                }
            },
            // 一句话简介
            oneSentence: {
                validators: {
                    notEmpty: {
                        message: "请填写一句话简介"
                    }
                }
            },
            // 联系人姓名
            uName: {
                validators: {
                    notEmpty: {
                        message: "联系人姓名不能为空"
                    }
                }
            },
            // 联系人电话
            uTel: {
                validators: {
                    notEmpty: {
                        message: "联系人电话不能为空"
                    },
                    regexp: {
                        regexp: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                        message: '电话号码格式不正确'
                    }
                }
            },
            // 联系人邮箱
            uEmail: {
                validators: {
                    notEmpty: {
                        message: "邮箱不能为空"
                    },
                    emailAddress: {
                        message: '邮箱格式不正确'
                    }

                }
            }
        }
    });

    $next.on("click", function() {
        if ($next.prop("disable") === false) {
            console.log(1)
        }
    });
    // 职位管理验证
});