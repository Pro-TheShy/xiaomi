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