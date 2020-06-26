$(function() {
    $data = JSON.parse(localStorage.getItem("flyco"))
        // console.log($data.id)
    $uid = $data.id //userID
    $info = JSON.parse(localStorage.getItem($uid)) //购物车数据{pid:num}
        // console.log($info)

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
            console.log(newArr)
            var str = ''
            newArr.forEach((item, i) => {
                str += `<div class="listItems"><div class="listItem">
                     <div class="bodyInfo">
                         <label for="">
                             <input type="checkbox" name="" id="" class="check">
                         </label>
                         <a href="" class="aImg">
                             <img src="${item.pic}" alt="" class="infoImg">
                         </a>
                         <div class="listText">
                             <a href="">${item.name}</a><br>
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

            //复选框
            $(".checkAll").click(function() {
                $(".checkAll").add(".check").prop("checked", $(this).prop("checked"));
                if ($(".checkAll").prop("checked") == false) {
                    $(".amount").text(0)
                    console.log(123)
                }
                showTotal()

            });
            $(".check").click(function() {
                if ($(".check:checked").length === $(".check").length) {
                    $(".checkAll").prop("checked", true);
                    showTotal()
                } else {
                    $(".checkAll").prop("checked", false);
                    if ($(".checkAll").prop("checked") == false) {
                        $(".amount").text(0)
                        console.log(123)
                    }
                    showTotal()

                }
            });



            let cart = new Cart()
                // cart.upDate()


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
                e.preventDefault();
            });

            //计算总价
            function showTotal() {
                var total = 0;
                var number = 0;
                $(".check").each(function() {
                    var isChecked = $(this).prop("checked")
                    if (isChecked == true) {
                        var id = $(this).parent().parent().siblings(".listPrices").find("span").text()
                        total += Number(id);
                        number += 1;
                        $(".amount").text(total)
                    }
                })
            }

            // 点击删除
            $(".del").click(function() {
                if (confirm("你确定要删除吗？")) {
                    $pid = $(this).attr("data-id")
                    $delshop = (JSON.parse(localStorage.getItem($uid)))

                    delete $delshop[$pid]
                    localStorage.setItem($data.id, JSON.stringify($delshop))
                    $(this).parentsUntil(".listItems").remove();

                    //修改单选框状态,重新计算总价
                    $(this).parentsUntil(".listItems").find(".check").prop("checked", false)
                    showTotal()
                }
            })

            //批量删除
            /*
            $(".delAll").click(function() {
                alert("确定删除选中的商品吗")
                    // if ($($(".check").prop("checked") == true))
                for (var i = 0; i < $(".check").size(); i++) {
                    if ($(".check").eq(i).prop("checked") == true) {
                        let pid = $(".check").eq(i).prop("checked", true).attr("pid1")
                        let index = $(".check").eq(i).prop("checked", true).parent().parent().index()
                        $.ajax({
                            type: "get",
                            url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                            data: {
                                uid: id,
                                pid: pid,
                            },
                            success: (data) => {
                                $(".Sgou").find(".Std:eq(" + index + ")").remove()
                                showTotal()
                                $.ajax({
                                    type: "get",
                                    url: "http://jx.xuzhixiang.top/ap/api/cart-list.php?id=24772",
                                    success: (data) => {
                                        if (data.data.length == 0) {
                                            $(".Sgou").html(sstr)
                                            $(".Allprice").text(0)
                                            location.href = "list.html"
                                        }
                                    }
                                })
                            }

                        });
                    }
                }
            })*/



        }
    });



    //         $(".del").click(function() {
    //             let pid = $(this).attr("pid")
    //                 // console.log(pid)
    //                 // alert("确定要删除吗")
    //             if (confirm("你确定要删除吗？")) {
    //                 $.ajax({
    //                     type: "get",
    //                     url: "http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php",
    //                     data: {
    //                         uid: $data.id,
    //                         pid: pid,
    //                         token: $data.token
    //                     },
    //                     success: (data) => {
    //                         if (data.code == 1) {
    //                             $(this).parentsUntil(".listItems").remove();
    //                             // $(this).parent().prevAll().remove()
    //                             // $(this).parent().remove()
    //                         }
    //                     }
    //                 });
    //             }

    //         })


})