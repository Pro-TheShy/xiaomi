//toTop
var toTop = (function () {
    var anchor = $1('.toTop');
    if (!anchor){
        return;
    }
    window.onscroll = function () {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight;
        if (scrollT >= windowHeight) {
            anchor.style.display = 'block';
            anchor.onclick = function () {
                // document.documentElement.scrollTop = 0;
                // document.body.scrollTop = 0;
                animate(document.documentElement, { 'scrollTop': 0 });
                animate(document.body, { 'scrollTop': 0 });
            }
        } else {
            anchor.style.display = 'none';
        }
    }
})()

//头部功能
var headModule = (function(){
    var goods = $1('.goods');
    var goodsShow = $1('.goods-show');
    var downApp = $1('.downApp');
    var showMa = $1('.show-ma');
    var search = $1('.search');
    var searchList = $1('.search-list');
    var ipt = $1('.ipt');
    var searchBtn = $1('.search-btn');
    goods.onmouseenter = function () {
        goodsShow.style.display = 'block';
        animate(goodsShow, { 'height': 100 })
    }
    goods.onmouseleave = function () {
        goodsShow.innerText = '';
        animate(goodsShow, { 'height': 0 }, function () {
            goodsShow.style.display = 'none';
            goodsShow.innerText = '购物车中没有商品,赶紧选购吧!';
        });
    }
    downApp.onmouseenter = function () {
        showMa.style.display = 'block';
        animate(showMa, { 'height': 130 });
    }
    downApp.onmouseleave = function () {
        showMa.innerHTML = '';
        animate(showMa, { 'height': 0 }, function () {
            showMa.style.display = 'none';
            showMa.innerHTML = `<img src="../image/indexImg/head-leftNav-appMa.png" alt="">
                        <p>小米商城APP</p>`;
        });
    }
    ipt.onfocus = function () {
        searchList.style.display = 'block';
        ipt.style.border = '1px solid #ff6700';
        searchBtn.style.border = '1px solid #ff6700';
        searchBtn.style.borderLeft = 'none';

    }
    ipt.onblur = function () {
        searchList.style.display = 'none';
        ipt.style.border = '1px solid #e0e0e0';
        searchBtn.style.border = '1px solid #e0e0e0';
        searchBtn.style.borderLeft = 'none';
    }
})()


