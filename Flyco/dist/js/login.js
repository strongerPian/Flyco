$(function() {
    $("#btn").click(function() {
        $.ajax({
            type: "get",
            url: "http://jx.xuzhixiang.top/ap/api/login.php",
            data: {
                username: $("#userInput").val(),
                password: $("#pwdInput").val()
            },
            success: function(resp) {
                console.log(resp)
                if (resp.code === 1) {
                    alert(`${resp.msg}，即将返回首页`)
                    location.replace('../index.html')
                } else {
                    alert(resp.msg)
                }

            }
        });
        return false;
    })
})