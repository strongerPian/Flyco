$(function() {
    // $data = localStorage.getItem("flyco") ? JSON.parse(localStorage.getItem("flyco")) : {}
    $data = JSON.parse(localStorage.getItem("flyco"))

    // console.log($data.id)
    $uid = $data.id //userID
    $info = JSON.parse(localStorage.getItem($uid)) //购物车数据{pid:num}
        // console.log($info)

    console.log(localStorage.getItem($uid))

    //判断购物车是否为空,展示不同页面
    if (localStorage.getItem($uid) == "{}") {
        $(".null").show()
        $(".carList").hide()
    } else {
        $(".null").hide()
        $(".carList").show()
    }

    $.ajax({
        type: "get",
        url: "../data/data.json",
        success: function(resp) {
            // console.log(resp)
            var newArr = []
            for (var key in resp) {
                for (var i = 0; i < resp[key].length; i++) {
                    for (var pid in $info) {
                        if (resp[key][i].productSn == pid) {
                            newArr.push(resp[key][i])
                            break;
                        }
                    }

                }
            }

            var str = ''
            newArr.forEach((item, i) => {
                str += `<div class="listItems"><div class="listItem">
                     <div class="bodyInfo">
                         <label for="">
                             <input type="checkbox" data-id=${item.productSn} id="" class="check">
                         </label>
                         <b class="bImg animateList" data-id="${item.productSn}">
                             <img src="${item.pic}" alt="" class="infoImg">
                         </b>
                         <div class="listText">
                             <b class="animateList" data-id="${item.productSn}">${item.name}</b><br>
                             <span>${item.subTitle}</span>
                         </div>
                     </div>
                     <div class="listPrice">￥<span>${item.promotionPrice}</span> </div>
                     <div class="listNums">
                         <div class="listNum">
                             <span class="sub" price=${item.promotionPrice} data-id=${item.productSn}>-</span>
                             <input type="text" class="num" price=${item.promotionPrice} data-id=${item.productSn} value="${$info[item.productSn]}">
                             <span class="add" price=${item.promotionPrice} data-id=${item.productSn}>+</span>
                         </div>
                     </div>
                     <div class="listPrices">￥<span>${$info[item.productSn] * item.promotionPrice}</span> </div>
                     <div class="listText">
                         <a href="javascript:;">
                             <span class="del" data-id=${item.productSn}>删除</span>
                         </a>
                     </div></div>
                 </div>`
            })
            $(".listBody").html(str)

            /*点击跳转详情页 */
            $(".animateList").click(function() {
                $attr = $(this).attr("data-id")
                    // console.log($attr)
                window.location = "item.html?id=" + $attr
            })

            //复选框
            $(".checkAll").click(function() {
                $(".checkAll").add(".check").prop("checked", $(this).prop("checked"));
                if ($(".checkAll").prop("checked") == false) {
                    $(".amount").text(0)
                        // console.log(123)
                }
                showTotal()

            });
            $(".check").click(function() {
                if ($(".check:checked").length === $(".check").length) {
                    $(".checkAll").prop("checked", true);
                    showTotal()
                } else {
                    $(".checkAll").prop("checked", false);
                    // if ($(".checkAll").prop("checked") == false) {
                    $(".amount").text(0)
                        // }
                    showTotal()
                }
            });



            let cart = new Cart()


            //点击加减改
            $(".add").click(function() {
                $num = Number($(this).prev().val())
                    // console.log($num)
                $(this).prev().val(++$num)
                cart.saveData($(this).attr("data-id"), 1)
                    //计算单个总价
                $(this).parent().parent().next().find("span").text(
                    $(this).attr("price") * $(this).parent().find(".num").val()
                )
                showTotal() //计算总价
                scnum()
            })

            $(".sub").click(function() {
                $num = Number($(this).next(".num").val())
                if ($num <= 1) {
                    $(this).next().val(1)
                    return
                }
                $(this).next().val(--$num)
                cart.saveData($(this).attr("data-id"), -1)
                    //计算单个总价
                $(this).parent().parent().next().find("span").text(
                    $(this).attr("price") * $(this).parent().find(".num").val()
                )
                showTotal()
                scnum()
            })

            $(".num").change(function(e) {
                if (Number($(this).val()) <= 1) {
                    $(this).val(1)
                }
                cart.saveData($(this).attr("data-id"), Number($(this).val()), true)
                    //计算单个总价
                $(this).parent().parent().next().find("span").text(
                    $(this).attr("price") * $(this).val()
                )
                showTotal()
                scnum()
                e.preventDefault();
            });


            //计算总价
            function showTotal() {
                var total = 0;
                // var number = 0;
                $(".check").each(function() {
                    if ($(this).prop("checked")) {
                        var id = $(this).parent().parent().siblings(".listPrices").find("span").text()
                        total += Number(id);
                        // number += 1;
                        $(".amount").text(total)
                    }
                })
            }


            //封装scnum (购物车图标数字)
            function scnum() {
                $info = JSON.parse(localStorage.getItem($data.id))

                $scnum = 0
                for (var key in $info) {
                    $scnum += $info[key]
                }
                // console.log($scnum)
                if ($scnum < 1) {
                    $(".scnum").hide()
                } else {
                    $(".scnum").show().text($scnum)
                        // $(".js").find("span").text($scnum)
                }
            }
            // $(".js").find("span").text($scnum)



            // 点击删除
            $(".del").click(function() {
                if (confirm("你确定要删除吗？")) {
                    $pid = $(this).attr("data-id")
                    $delshop = (JSON.parse(localStorage.getItem($uid)))

                    delete $delshop[$pid]
                    localStorage.setItem($data.id, JSON.stringify($delshop))
                    $(this).parentsUntil(".listItems").remove();

                    //修改scnum
                    scnum()

                    //修改单选框状态,重新计算总价
                    for (var i = 0; i < $(".check").size(); i++) {
                        if ($(".check").eq(i).prop("checked") == false) {
                            $(".amount").text(0)
                        } else {
                            $(this).parentsUntil(".listItems").find(".check").prop("checked", false)
                            showTotal()
                        }
                    }

                    if (localStorage.getItem($uid) == "{}") {
                        $(".null").show()
                        $(".carList").hide()
                    }
                }
            })


            //批量删除
            $(".delAll").click(function() {
                if (confirm("你确定要删除吗？")) {
                    $(".check:checked").each(function() { // 遍历选中的checkbox
                        var index = $(this).parent().parent().parent().parent().index(); // 获取check所在行的顺序
                        console.log(index)
                        $(".listBody").find(".listItems:eq(" + index + ")").remove()

                        $pid = $(this).attr("data-id")
                        $delshop = (JSON.parse(localStorage.getItem($uid)))
                        delete $delshop[$pid]
                        localStorage.setItem($data.id, JSON.stringify($delshop))
                    });


                    //修改scnum
                    scnum()

                    //修改复选框状态,总价为0
                    $(".checkAll").prop("checked", false)
                    $(".amount").text(0)


                    if (localStorage.getItem($uid) == "{}") {
                        $(".null").show()
                        $(".carList").hide()
                    }
                }
            })
        }
    });





})