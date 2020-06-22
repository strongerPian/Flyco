$(function() {


    $("#userInput").change(function() {
        $.ajax({
            type: "get",
            url: "http://jx.xuzhixiang.top/ap/api/checkname.php?username=1",
            success: function(data) {
                // console.log(data)
                if (data.code == 0) {
                    $("#text").text("昵称太火爆了,换一个吧 -_- !")
                } else {
                    $("#text").text("恭喜,昵称可用^_^")
                }
            },
            data: {
                username: $("#userInput").val()
            }
        })
    })
    $("#btn").click(function() {
        $.ajax({
            type: "get",
            url: "http://jx.xuzhixiang.top/ap/api/reg.php",
            data: {
                username: $("#userInput").val(),
                password: $("#pwdInput").val()
            },
            success: function(resp) {
                console.log(resp)
                if (resp.code === 1) {
                    alert(`${resp.msg}，即将跳转登录页`)
                    location.replace('./login.html')
                } else {
                    alert(resp.msg)
                }
            }
        });
        return false;
    })


})