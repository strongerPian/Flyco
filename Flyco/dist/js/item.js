$(function() {
    var pid = location.search.split('=')[1]
        // console.log(pid)
    $.ajax({
        type: "get",
        url: "../data/data.json",
        success: function(resp) {
            var newArr = []
            for (var key in resp) {
                for (var i = 0; i < resp[key].length; i++) {
                    if (resp[key][i].productSn == pid) {
                        newArr.push(resp[key][i])
                        break
                    }
                }
            }
            var shop = newArr[0]
            var str = ` <div class="shopTitle">
               <span><a href="../index.html">首页</a>/</span>
               <span>${shop.name}</span>
           </div>
           <div class="shop">
               <div class="shopLeft">

                   <div class="shopImg">
                        <div class='small'>
                           <img src="${shop.pic}" alt="" class="img">
                           <div class='mark'></div>
                        </div>
                        <div class='big'>
                               <img src="${shop.pic}" alt="" class="img">
                        </div>
                   </div>
                   
                   <div class="bottomImg">
                       <div class="imgLeft">&lt;</div>
                       <div class="imgCenter">
                           <div class="imgItems">
                               <div class="imgItem"><img src="${shop.pic}" alt="" class="img"></div>
                               <div class="imgItem"><img src="https://pic.flyco.net.cn/mall/goods/FS372/main/b2fb79b1c21a4d0eb481003c0bd33cc8.png" alt="" class="img"></div>
                               <div class="imgItem"><img src="https://pic.flyco.net.cn/mall/goods/FS375/b85eef7e5f2645448d4c042cb9921351.png" alt="" class="img"></div>
                               <div class="imgItem"><img src="https://pic.flyco.net.cn/mall/goods/FH6276/main/05ee5f427e984f4dae12b0fc7be5937f.png" alt="" class="img"></div>
                               <div class="imgItem"><img src="https://pic.flyco.net.cn/mall/goods/FH6232/main/6c0b1a54f53d45a296e9a02833828b3e.png" alt="" class="img"></div>
                           </div>
                       </div>
                       <div class="imgRight">&gt;</div>
                   </div>
               </div>
               <div class="shopRight">
                   <p class="infoTitle">${shop.name}</p>
                   <p class="desc">${shop.subTitle}</p>
                   <div class="infoTime">
                       <span>口碑推荐  净界出色</span>
                       <span>仅剩02天11时13分13秒</span>
                   </div>
                   <div class="infoItem">
                       <div class="infoItemL">
                           <div class="infoName">活动价</div>
                           <span class="symble">￥</span>
                           <span class="infoPrice">${shop.promotionPrice}</span>
                           <span class="originaPrice">[￥${shop.price}]</span>
                       </div>
                       <div class="infoItemR">
                           <span>累计评价 1893</span>
                       </div>
                   </div>
                   <div class="infoService">
                       <div class="infoSerL">
                           <div class="infoName">服务</div>
                       </div>
                       <div class="infoSerR">
                           <div class="SRItem">
                               <img src="../img/v.png" alt="">
                               <span>满69元免邮费</span>
                           </div>
                           <div class="SRItem">
                               <img src="../img/v.png" alt="">
                               <span>官方正品保障</span>
                           </div>
                           <div class="SRItem">
                               <img src="../img/v.png" alt="">
                               <span>两年全国联保</span>
                           </div>
                           <div class="SRItem">
                               <img src="../img/v.png" alt="">
                               <span>7天无忧退换货</span>
                           </div>
                           <div class="SRItem">
                               <img src="../img/v.png" alt="">
                               <span>24小时发货</span>
                           </div>
                       </div>
                   </div>
                   <div class="infoLimit">
                       <div class="infoName">限制</div>
                       <span>特价商品不可与优惠券叠加使用</span>
                   </div>
                   <div class="infoLimit">
                       <div class="infoName">不包邮</div>
                       <span>台湾、香港、澳门、海外</span>
                   </div>
                   <div class="infoSpe">
                       <div class="speL">
                           <div class="infoName">规格</div>
                       </div>
                       <div class="speR">
                           <img src="${shop.pic}" alt="">
                       </div>
                   </div>
                   <div class="infoNum">
                       <div class="numL">
                           <div class="infoName">数量</div>
                       </div>
                       <div class="numR">
                           <span class="sub">-</span>
                           <input type="text" value="1" class="num">
                           <span class="add">+</span>
                       </div>
                   </div>
                   <div class="infoBuy">
                       <button class="addCar">加入购物车</button>
                       <button class="byNow">立即购买</button>
                   </div>
               </div>
           </div>`

            $("#shopping").html(str)

            /*title */
            $("head").find("title").text(`飞科${shop.name}产品选购——飞科电器官网 - 飞科电器自营官方商城`)

            /*放大镜 */
            $('.small').mouseenter(function() {
                    $('.mark').add('.big').show(20)
                }).mouseleave(function() {
                    $('.mark').add('.big').hide(20)
                })
                .mousemove(function(ev) {
                    var left = ev.clientX - $(".small").offset().left - $('.mark').width() / 2,
                        top = ev.clientY - $(".small").offset().top - $('.mark').height() / 2,
                        maxLeft = $(".small").outerWidth() - $('.mark').outerWidth(),
                        maxTop = $(".small").outerHeight() - $('.mark').outerHeight()

                    if (left < 0) left = 0
                    if (left > maxLeft) left = maxLeft
                    if (top < 0) top = 0
                    if (top > maxTop) top = maxTop

                    $('.mark').css({
                        left: left,
                        top: top
                    })
                    $(".big img").css({
                        left: -3 * left,
                        top: -3 * top
                    })
                })


            /*bottomImg */
            $(".imgItem").find("img").hover(function() {
                $img = $(this).attr("src")
                $(".big").find(".img").attr("src", $img)
                $(".small").find(".img").attr("src", $img)
            })


            //点击按钮加减改
            $(".add").click(function() {
                $num = Number($(".num").val())
                $(".num").val(++$num)
            })

            $(".sub").click(function() {
                $num = Number($(".num").val())
                if ($num <= 1) {
                    $(".num").val(1)
                    return
                }
                $(".num").val(--$num)
            })

            $(".num").change(function(e) {
                if (Number($(".num").val()) <= 1) {
                    $(".num").val(1)
                }
                e.preventDefault();
            });


            /*添加购物车 */
            $data = JSON.parse(localStorage.getItem("flyco")) //登录数据


            let cart = new Cart()
            $(".addCar").click(() => {
                cart.saveData(pid, Number($(".num").val()), false)
            })

            // $(".addCar").on("click", cart.saveData(pid, Number($(".num").val()), false))

        }
    });
})