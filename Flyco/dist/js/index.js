$(function() {

    /*cp-fixed */
    $(window).scroll((e) => {
        $scroll = $(window).scrollTop()
            // console.log($scroll)
        if ($scroll > 400) {
            $(".fixedTop").css("display", "block")
        } else {
            $(".fixedTop").css("display", "none")
        }
    })
    $(".fixedTop").click(function() {
        $("html,body").animate({
            scrollTop: 0
        })
    })



    /* headList*/
    $.ajax({
        type: "get",
        url: "data/data.json",
        success: function(resp) {
            var str = ''
            resp.headList.forEach((item, i) => {
                str += `
                        <a href="html/list.html?id=${item.id}" class="item" data-id="${item.id}">
                            <img src="${item.img}" alt="">
                            <p>${item.name}</p>
                        </a>`
            })
            $(".listItems").html(str)
        }
    });

    $.ajax({
        type: "get",
        url: "../data/data.json",
        success: function(resp) {
            var str = ''
            resp.headList.forEach((item, i) => {
                str += `
                        <a href="list.html" class="item" data-id="${item.id}" >
                            <img src="../${item.img}" alt="">
                            <p>${item.name}</p>
                        </a>`
            })
            $(".listItems1").html(str)
        }
    });

    $(".liHover").mouseover(function() {
        $(".headList").show()
    })
    $(".headList").mouseleave(() => {
        $(".headList").hide()
    })


    /*判断登录状态*/
    $data = JSON.parse(localStorage.getItem("flyco"))
    if ($data) {

        // user.classList.add('islogin')
        // b.innerHTML = username

        $(".login").addClass("islogin")
        $(".loginOff").find("b").text($data.username)
    }
    $(".exit").click(function() {
        localStorage.removeItem('flyco')
        $(".login").removeClass("islogin")
    })

    $(".loreg").mouseover(function() {
        $(".login").show()
    }).mouseleave(() => {
        $(".login").hide()
    })



    /*轮播图*/
    $("#play ul li:first").clone(true).appendTo('#play ul') //在图片末尾追加第一张图片
    $("#play ul").css({
            width: $('#play ul li').length * $('#play ul li').outerWidth()
        }) //设置ul宽度
    for (var j = 0; j < $('#play ul li').length - 1; j++) {
        $("<li>").appendTo("#play ol")
    } //根据图片数量创建按钮
    $("#play ol li").eq(0).addClass("liActive") //默认第一个按钮有样式
    var iNow = 0 //代表当前图片显示的下标
    $("#play ol li").click(function() {
            iNow = $(this).index()
            tab()
        }) //点击按钮切换对应图片
    var timer = null
    timer = setInterval(function() {
            iNow++
            tab()
        }, 2000) //自动循环轮播
    $("#play").mouseenter(function() {
            clearInterval(timer)
        }).mouseleave(function() {
            timer = setInterval(function() {
                iNow++
                tab()
            }, 2000)
        }) //添加移入移出
    function tab() {
        $("#play ol li").eq(iNow).addClass("liActive").siblings().removeClass("liActive")
        if (iNow == $('#play ul li').size() - 1) {
            $("#play ol li").eq(0).addClass("liActive").siblings().removeClass("liActive")
        }
        // console.log(-iNow * $('#play ul li').outerWidth())
        $("#play ul").stop().animate({
            left: -iNow * $('#play ul li').outerWidth()
        }, 1000, function() {
            if (iNow >= $('#play ol li').size()) {
                iNow = 0
                $("#play ul").css("left", 0)
            }
        })
    } //切换，单独封装成函数


    /* 销量 TOP */
    $(".topLists ul").find("li").mouseenter(function() {
        $(this).addClass("liAct").siblings().removeClass("liAct")
        $.ajax({
            type: "get",
            url: "data/data.json",
            success: (data) => {
                let b = 1;
                let str = "";
                for (var i = $(this).index() * 3; i < ($(this).index() + 1) * 3; i++) {
                    str += `<div class="ag animate" data-id="${data.topList[i].productSn}">
                        <div class="ag-top">
                            <img src="img/t${b}.png" alt="">
                        </div>
                        <div class="ag-bottom" style="background-image: url('img/b${b}.png');">
                            <div class="ag-body">
                                <div class="ag-body-num">
                                    <span>Top
                                        <strong>${b}</strong>
                                    </span>
                                </div>
                                <div class="ag-body-img">
                                    <img src="${data.topList[i].pic}" alt="">
                                </div>
                                <div class="ag-body-text">
                                    <h3>${data.topList[i].name}</h3>
                                    <strong>${data.topList[i].subTitle}</strong>
                                </div>
                            </div>
                        </div>
                    </div>`
                    b++
                };
                $(".listR").html(str)

                /*点击跳转详情页 */
                $(".animate").click($reload)

            }
        })
    })

    /*封装点击跳转详情页 */
    $reload = function() {
        $attr = $(this).attr("data-id")
        console.log($attr)
        window.location = "html/item.html?id=" + $attr
    }


    /*剃须刀 */
    $.ajax({
        type: "get",
        url: "data/data.json",
        success: function(resp) {
            // console.log(resp.shaver)
            var str = ''
            resp.shaverList.forEach((item, i) => {
                str += ` <div class="sha-item  animate" data-id="${item.productSn}">
                <div class="sha-img">
                    <img src="${item.pic}" alt="" class="img">
                    <div class="sha-tag">
                        <img src="img/new.png" alt="">
                    </div>
                    <div class="sha-sc"  data-id="${item.productSn}">
                        <img src="img/redsc.png" alt="">
                    </div>
                </div>
                <div class="sha-bottom">
                    <span class="name">${item.name}</span>
                    <span class="tag">${item.subTitle}</span>
                    <div class="sha-price">
                        <b>￥</b> <span>${item.price}</span>
                    </div>
                </div>
            </div>`
            })
            $(".shaCon").html(str)

            /*点击跳转详情页 */
            $(".animate").click($reload)

        }
    });

    /*电吹风 */
    $.ajax({
        type: "get",
        url: "data/data.json",
        success: function(resp) {
            // console.log(resp.shaver)
            var str = ''
            resp.hairList.forEach((item, i) => {
                str += `  <div class="hairItem animate" data-id="${item.productSn}">
                <img src="${item.pic}" alt="" class="img">
                <div class="itemBottom">
                    <span class="name">${item.name}</span>
                    <span class="tag">${item.subTitle}</span>
                    <div class="hairPrice">
                        <b>￥</b>
                        <span>${item.price}</span>
                    </div>
                </div>
            </div>`
            })
            $(".hairList").html(str)

            /*点击跳转详情页 */
            $(".animate").click($reload)

        }
    });



    /*理发器 */
    $.ajax({
        type: "get",
        url: "data/data.json",
        success: function(resp) {
            // console.log(resp.shaver)
            var str = ''
            resp.shaverList.forEach((item, i) => {
                str += ` <div class="cutCon animate" data-id="${item.productSn}">
                <div class="cutItem" style="background-image: url('img/bg~.png');">
                    <img src="${item.pic}" alt="" class="img">
                    <div class="cut-tag">
                        <img src="img/new.png" alt="">
                    </div>
                </div>
                <div class="cut-bottom">
                    <span class="name">${item.name}</span>
                    <span class="tag">${item.subTitle}</span>
                    <div class="price">
                        <b>￥</b> <span>${item.price}</span>
                    </div>
                </div>
            </div>`
            })
            $(".cutCons").html(str)

            /*点击跳转详情页 */
            $(".animate").click($reload)

        }
    });
    /*烫发器 */
    $.ajax({
        type: "get",
        url: "data/data.json",
        success: function(resp) {
            // console.log(resp.shaver)
            var str = ''
            resp.curlerList.forEach((item, i) => {
                str += `<div class="curItem animate" data-id="${item.productSn}">
                <div class="leftImg">
                    <img src="${item.pic}" alt="">
                </div>
                <div class="itemRight">
                    <div class="name">${item.name}</div>
                    <div class="cur-tag">
                        <li>均匀加热 </li>
                        <li>防烫支架 </li>
                        <li>恒温护发</li>
                    </div>
                    <div class="price">
                        <b>￥</b> <span>${item.price}</span>
                    </div>
                </div>
            </div>`
            })

            $(".curCons").html(str)

            /*点击跳转详情页 */
            $(".animate").click($reload)

        }
    });

    /*毛球修剪器 */
    $.ajax({
        type: "get",
        url: "data/data.json",
        success: function(resp) {
            // console.log(resp.shaver)
            var str = ''
            resp.trimmerList.forEach((item, i) => {
                str += `<div class="trimItem animate" data-id="${item.productSn}" style=" background-image: url(img/sixbg.png);">
            <div class="itemText">
                <span class="name">${item.name}</span>
                <span class="tag">${item.subTitle}</span>
                <div class="price">
                    <b>￥</b> <span>${item.price}</span>
                </div>
            </div>
            <div class="itemImg">
                <img src="${item.pic}" alt="" class="img">
                <div class="trim-tag">
                    <img src="img/new.png" alt="">
                </div>
            </div>
        </div>`
            })

            $(".trimCons").html(str)


            /*点击跳转详情页 */
            $(".animate").click($reload)

        }
    });

    /* bannerother*/
    $(".left").click(() => {
        $(".items").animate({
            left: -193
        }, 500)
    })
    $(".right").click(() => {
        $(".items").animate({
            left: 1
        }, 500)
    })

    //剃须刀点击加入购物车(触发了跳转事件)
    // $(".sha-sc").click(function() {
    //     $pid = $(this).attr("data-id")
    //     console.log($pid)
    // })











    /*列表页  list.html */
    //conMenu
    $.ajax({
        type: "get",
        url: "../data/data.json",
        success: function(resp) {
            var str = '<a href="">全部</a>'
            resp.headList.forEach(item => {
                str += `<a href="">${item.name}</a>`
            })
            $(".topList").html(str)
        }
    });
    //conList
    $.ajax({
        type: "get",
        url: "../data/data.json",
        success: function(resp) {
            // console.log(data)
            var str = ''
            resp.list.forEach((item, i) => {
                str += `
                    <div class="listItem animateList" data-id="${item.productSn}">
                        <div class="listImg">
                            <img src="${item.pic}" alt="">
                        </div>
                    <div class="tag">
                        <img src="../img/new.png" alt="">
                    </div>
                    <span class="title">
                        ${item.description}
                    </span>
                    <div class="listName" data-id="${item.id}">
                        <span> ${item.name} </span>
                        <img src="../img/bluesc.png" alt="">
                    </div>
                    <p class="price">￥ ${item.price}</p>
                    </div>`
            })
            $(".lists").html(str)

            /*点击跳转详情页 */
            $(".animateList").click(function() {
                $attr = $(this).attr("data-id")
                console.log($attr)
                window.location = "item.html?id=" + $attr
            })


        }
    });
})