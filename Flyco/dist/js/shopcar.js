$(function() {
    $data = JSON.parse(localStorage.getItem("flyco"))
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/productlist.php?uid=" + $data.id,
        success: function(resp) {
            console.log(resp.data)

            var str = ""
            resp.data.forEach((item, i) => {
                console.log(item.pdesc)
                    // console.log(JSON.parse(item.pname)[1])
                str += `<div class="listItems">
                <div class="listItem">
                <div class="bodyInfo">
                    <label for="">
                        <input type="checkbox" name="" id="" class="check">
                    </label>
                    <a href="" class="aImg">
                        <img src="${item.pimg}" alt="" class="infoImg">
                    </a>
                    <div class="listText">
                        <a href="">${JSON.parse(item.pname)[0]}</a><br>
                        <span>${JSON.parse(item.pname)[1]}</span>
                    </div>
                </div>
                <div class="listPrice"><span>￥${item.pprice}</span> </div>
                <div class="listNums">
                    <div class="listNum">
                        <span class="sub">-</span>
                        <div class="numInput">
                            <input type="text" class="num" value="${item.pdesc}">
                        </div>
                        <span class="add">+</span>
                    </div>
                </div>
                <div class="listPrices"><span>￥${item.pprice*item.pdesc}</span> </div>
                <div class="listText">
                    <a href="javascript:;">
                        <span class="del" pid=${item.pid}>删除</span>
                    </a>
                </div>
                </div>
            </div>`
            })
            $(".listBody").html(str)
                // console.log($data.id, $data.token)

            $(".del").click(function() {
                let pid = $(this).attr("pid")
                    // console.log(pid)
                    // alert("确定要删除吗")
                if (confirm("你确定要删除吗？")) {
                    $.ajax({
                        type: "get",
                        url: "http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php",
                        data: {
                            uid: $data.id,
                            pid: pid,
                            token: $data.token
                        },
                        success: (data) => {
                            if (data.code == 1) {
                                $(this).parentsUntil(".listItems").remove();
                                // $(this).parent().prevAll().remove()
                                // $(this).parent().remove()
                            }
                        }
                    });
                }

            })

            //复选框
            $(".checkAll").click(function() {
                $(".checkAll").add(".check").prop("checked", $(this).prop("checked"));
            });
            $(".check").click(function() {
                if ($(".check:checked").length === $(".check").length) {
                    $(".checkAll").prop("checked", true);
                } else {
                    $(".checkAll").prop("checked", false);
                }
            });

            //点击加减改
            $(".add").click(function() {
                $num = Number($(this).prev().find(".num").val())
                $(this).prev().find(".num").val(++$num)
            })

            $(".sub").click(function() {
                $num = Number($(this).next().find(".num").val())
                if ($num <= 1) {
                    $(this).next().find(".num").val(1)
                    return
                }
                $(this).next().find(".num").val(--$num)
            })

            $(".num").change(function(e) {
                if (Number($(this).val()) <= 1) {
                    $(this).val(1)
                }
                e.preventDefault();
            });



            // ${JSON.parse(item.pname)[1]} 22
            // ${JSON.parse(item.pname)[0]}

        }
    });

})