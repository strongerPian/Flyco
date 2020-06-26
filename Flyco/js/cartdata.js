$data = JSON.parse(localStorage.getItem("flyco")) //登录数据

class Cart {
    constructor() {
        this.shop = $data ? JSON.parse(localStorage.getItem($data.id)) : {}
    }
    saveData(pid, num, isTrue) {
        //判断是否登录
        if ($data) {
            console.log("已登录")
                //找到对应的登录账号
                //判断是否是第一次添加商品
            this.shop = localStorage.getItem($data.id) ? JSON.parse(localStorage.getItem($data.id)) : {}
            if (!this.shop[pid] || isTrue) {
                this.shop[pid] = num

            } else {

                this.shop[pid] += num
            }
            console.log(this.shop)
            localStorage.setItem($data.id, JSON.stringify(this.shop))
        } else {
            alert("请登陆后再添加购物车")
        }
    }

    /*
    upDate() {
        //点击加减改
        $(".add").click(function() {
            $num = Number($(this).prev().find(".num").val())
            $(this).prev().find(".num").val(++$num)
            $pid = $(this).attr("data-id")
            cart.saveData($(this).attr("data-id"), $(this).prev().find(".num").val())
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
    }*/


}