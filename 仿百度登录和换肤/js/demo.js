/// <reference path="jquery-1.10.2.min.js" />

function Exit() {
    localStorage.removeItem("loginuser");
    location.reload();
}
//只有页面加载完毕之后，才能找对象，只有找到对象之后，才能够执行事件
$(function () {
    var user = localStorage.getItem("loginuser");
    if (user == null) {
        $("#duser").hide();
        $("#dexit").hide();
        $("#dlogin").show();
    }
    else {
        $("#duser").show().html(user);
        $("#dexit").show();
        $("#dlogin").hide();
    }
    var s = localStorage.getItem("bgsrc");
    if (s == null) {
        $("body").css("background-image", "url('img/bg2.jpg')");
    }
    else {
        $("body").css("background-image", "url('" + s + "')");
    }
    $("#dcbg a").click(function () {
        $("#picbg").slideDown(500);
    });
    $("#dup a").click(function () {
        $("#picbg").slideUp(500);
    });

    $(".pic img").click(function () {
        var src = $(this).attr("src");
        localStorage.setItem("bgsrc", src);
        $("body").css("background-image", "url('" + src + "')");
    });

    $("#txtTitle").keyup(function () {
        var title = $.trim($(this).val());//获取到文本框里面的内容
        if (title == "") {
            $("#con").hide();
        }
        else {
            $("#con").show();
            //1、后台页面 2、传递的参数 3、后台处理之后的结果
            $.post("/Handler2.ashx", { "title": title }, function (data) {
                $("#con").html("").append(data);
                $("#con").find("li").bind("click", function () {
                    $("#txtTitle").val($(this).text());
                    $("#con").hide();
                });
                $("#con").find("li").bind("mouseover", function () {
                    $(this).addClass("bg");
                });
                $("#con").find("li").bind("mouseleave", function () {
                    $(this).removeClass("bg");
                });
            });
        }
    });
});


function ShowLoginBox() {
    $("#txtUserName").val("");
    $("#txtPwd").val("");
    layer.open({
        type: 1,
        title: "登录",
        area: ["393px", "270px"],
        content: $("#dloginbox")
    });
}
function Login() {
    var username = $("#txtUserName").val();//获取到用户名
    var pwd = $("#txtPwd").val();//获取密码
    if (username == "" || pwd == "") {
        layer.msg("用户名或者密码不能为空", {
            time: 1000,
            icon: 5
        });
    }
    else {
        //1、后台页面  2、传递的值 3、后台处理之后的结果
        $.post("/Handler1.ashx", { "username": username, "pwd": pwd }, function (data) {
            if (data == "ok") {
                layer.msg("登录成功", {
                    time: 1000,
                    icon: 6
                }, function () {
                    layer.closeAll();
                    localStorage.setItem("loginuser", username);//吧登录的用户名保存在本机
                    location.reload();
                });
            }
            else {
                layer.msg("用户名或者密码错误", {
                    time: 1000,
                    icon: 5
                });
            }
        });
    }
}