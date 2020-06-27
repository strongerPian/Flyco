class Cart {
    constructor() {
        this.shop = $data ? JSON.parse(localStorage.getItem($data.id)) : {}
    }
    saveData(pid, num, isTrue) {
        //判断是否登录
        $data = JSON.parse(localStorage.getItem("flyco")) //登录数据
        if ($data) {
            // console.log("已登录")
            //找到对应的登录账号
            //判断是否是第一次添加商品
            this.shop = localStorage.getItem($data.id) ? JSON.parse(localStorage.getItem($data.id)) : {}
            if (!this.shop[pid] || isTrue) {
                this.shop[pid] = num

            } else {

                this.shop[pid] += num
            }
            // console.log(this.shop)
            localStorage.setItem($data.id, JSON.stringify(this.shop))

            //购物车图标上的数字
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
            }
        } else {
            alert("请登陆后再添加购物车")
        }
    }

}