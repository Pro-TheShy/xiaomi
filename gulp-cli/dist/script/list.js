//top
var listTopModule = (function () {
    var liWrap = $1('.li-wrap');
    var showCon = $1('.show-con');
    var newLi = document.createElement('li');
    var topNavLi = document.querySelectorAll('.top-nav li');
    addListEvent();
    function addListEvent(){
        for (var i = 1; i < topNavLi.length - 2; i++) {
            topNavLi[i].index = i - 1;
            topNavLi[i].onmouseenter = function () {
                var liA = this.querySelector('a');
                liA.style.color = '#ff6700';
                var liImg = showCon.querySelectorAll('img');
                for (var n = 0; n < liImg.length; n++) {
                    liImg[n].src = '../image/indexImg/head-li-pic' + this.index + '.jpg';
                }
                liWrap.style.display = 'block';
                animate(showCon, { "height": 229 });
            }
            topNavLi[i].onmouseleave = function () {
                var liA = this.querySelector('a');
                liA.style.color = '#333';
            }
            showCon.onmouseleave = function () {
                var timer = setTimeout(() => {
                    liWrap.style.display = 'none';
                }, 250);
                animate(showCon, { "height": 0 }, function () {
                    clearTimeout(timer);
                    var liA = this.querySelector('a');
                    liA.style.color = '#ff6700';
                });
            }
        }
    }
    var allGoods = $1('.all-goods');
    var allGoodsList = $1('.all-goods-list');
    allGoods.onmouseenter = function(){
        liWrap.style.display = 'none';
        allGoods.firstElementChild.style.color = '#ff6700';
        allGoodsList.style.display = 'block';
    }
    allGoods.onmouseleave = function(){
        allGoods.firstElementChild.style.color = '#333';
        allGoodsList.style.display = 'none';
    }
    allGoodsList.onmouseenter = function () {
        var newDiv = document.createElement('div');
        newDiv.className = 'all-goods-list-hover' ;
        allGoods.appendChild(newDiv);
        for(var m = 0;m < 10;m++){
            newDiv.innerHTML += `<a href="">
                            <img src="../image/indexImg/bannerList-pic.jpg" alt="">
                            <p>小米10 Pro</p>
                        </a>`;
        }
        var allGoodsListHover = $1('.all-goods-list-hover');
        allGoodsListHover.style.display = 'block';
        allGoodsList.onmouseleave = function () {
            allGoodsListHover.style.display = 'none';
        }
        allGoodsListHover.onmouseenter = function(){
            allGoodsListHover.style.display = 'block';
        }
        allGoodsListHover.onmouseleave = function () {
            allGoodsListHover.style.display = 'none';
        }
    }
})()

var listMainModule = (function(){
    var phoneCon = $1('.main-phone-con');
    var tvCon = $1('.main-TV-con');
    //获取和转换数据
    function dataDeal(json,dom){
        var json = JSON.parse(json);
        var len = json.imgUrl.length - 1;
        var nameLen = json.name.length - 1;
        var imgSrc = json.imgUrl.substring(1, len).split(',');
        var nameSrc = json.name.substring(1, nameLen).split(',');
        for (var i = 0; i < imgSrc.length; i++) {
            dom.innerHTML += `
        <a href="./goodsdetail" code="${i}00">
                    <img src=${imgSrc[i]} alt="">
                    <p>${nameSrc[i]}</p>
                </a>`;
        }
        for (var j = 0; j < 10; j++) {
            dom.innerHTML += `
        <a href="./goodsdetail" code="000">
                    <img src=${imgSrc[0]} alt="">
                    <p>${nameSrc[0]}</p>
                </a>`;
        }
    }
    //请求手机数据
    ajax({
        url:'../data/listgoods-phone.json',
        type:'get',
        dataType:'json',
        success:function(json){
            dataDeal(json,phoneCon);
            var phoneConA = phoneCon.querySelectorAll('a');

            for (var n = 0; n < phoneConA.length; n++) {
                if ((n+1) % 5 === 0 ) {
                    phoneConA[n].className = 'noBorder';
                }
            }
        }
    });
    //请求电视数据
    ajax({
        url: '../data/listgoods-tv.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            dataDeal(json,tvCon);
            var tvConA = tvCon.querySelectorAll('a');
            for (var n = 0; n < tvConA.length; n++) {
                if ((n + 1) % 5 === 0) {
                    tvConA[n].className = 'noBorder';
                }
            }
        }
    });
    //main-title点击事件
    var mainTitle = $2('.main-title');
    var ghb = 1;

    function listShow(dom){
        dom.nextElementSibling.style.display = 'block';
        dom.style.background = 'url(../image/listImg/main-phone-topBg.jpg) no-repeat left 30px';
        ghb = 1;
    }
    for (var i = 0; i < mainTitle.length;i++){
        mainTitle[i].onclick = function(){
            if (ghb){
                this.nextElementSibling.style.display = 'none';
                this.style.background = 'url(../image/listImg/main-phone-topBgClick.jpg) no-repeat left 30px';
                ghb = 0; 
            }else{
                listShow(this); 
            }
        }
    }
})()