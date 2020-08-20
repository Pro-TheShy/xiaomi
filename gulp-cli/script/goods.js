//listTopModule
var listTopModule = (function () {
    var liWrap = $1('.li-wrap');
    var showCon = $1('.show-con');
    var newLi = document.createElement('li');
    var topNavLi = document.querySelectorAll('.top-nav li');
    addListEvent();
    function addListEvent() {
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
    allGoods.onmouseenter = function () {
        liWrap.style.display = 'none';
        allGoods.firstElementChild.style.color = '#ff6700';
        allGoodsList.style.display = 'block';
    }
    allGoods.onmouseleave = function () {
        allGoods.firstElementChild.style.color = '#333';
        allGoodsList.style.display = 'none';
    }
    allGoodsList.onmouseenter = function () {
        var newDiv = document.createElement('div');
        newDiv.className = 'all-goods-list-hover';
        allGoods.appendChild(newDiv);
        for (var m = 0; m < 10; m++) {
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
        allGoodsListHover.onmouseenter = function () {
            allGoodsListHover.style.display = 'block';
        }
        allGoodsListHover.onmouseleave = function () {
            allGoodsListHover.style.display = 'none';
        }
    }
})()

//点击关闭
var clickCloseModule = (function(){
    var close = $1('.close');
    close.onclick = function(){
        close.parentNode.parentNode.style.display = 'none'; 
    }
})()

//轮播图carousel
var carouselModule = (function(){
    var imgs = $2('.main img');
    var nums = $2('.num li');
    var prev = $1('.prev');
    var next = $1('.next');
    var main = $1('.main');
    var timer,timer1;
    var flag = 1;
    var showIndex = 0;

    //进入页面执行
    animate(imgs[showIndex],{'opacity':1},function(){
        timer = setInterval(function(){
            moveNext();  
        },5000)
    })
    //显示下一张
    function moveNext(){
        // 清除上一个样式
        imgs[showIndex].className = '';
        nums[showIndex].className = '';
        imgs[showIndex].style.opacity = 0; 

        showIndex++;

        if (showIndex >= imgs.length) {
            showIndex = 0;
        }
        imgs[showIndex].className = 'show';
        nums[showIndex].className = 'active';
        animate(imgs[showIndex], { 'opacity': 1 });
    }
    function movePrev() {
        imgs[showIndex].className = '';
        nums[showIndex].className = '';
        imgs[showIndex].style.opacity = 0;

        showIndex--;

        if (showIndex < 0) {
            showIndex = imgs.length - 1;
        }
        imgs[showIndex].className = 'show';
        nums[showIndex].className = 'active';

        animate(imgs[showIndex], { 'opacity': 1 });
        flag = 0;
    }
    //点击下一页
    next.onclick = function () {
        clearInterval(timer);
        clearInterval(imgs[showIndex].timer);
        clearTimeout(timer1);
        moveNext();

        timer = setInterval(function () {
            moveNext();
        }, 5000);
    }
    prev.onclick = function () {
        clearInterval(timer);
        clearInterval(imgs[showIndex].timer);
        clearTimeout(timer1);
        movePrev();

        timer = setInterval(function () {
            movePrev();
        }, 5000);
    }

    main.onmouseenter = function(){
        clearInterval(timer);
        clearInterval(imgs[showIndex].timer);
        clearTimeout(timer1);
    }
    main.onmouseleave = function(){
        // clearTimeout(timer1);
        timer1 = setTimeout(function(){
            moveNext();
        },2000)
        timer = setInterval(function () {
            moveNext();
        }, 5000);    
    }



    for (var j = 0; j < nums.length; j++) {
        nums[j].index = j;
        nums[j].onclick = function () {
            clearInterval(timer);
            clearInterval(imgs[showIndex].timer);

            imgs[showIndex].className = '';
            nums[showIndex].className = '';
            imgs[showIndex].style.opacity = 0.02;

            showIndex = this.index;

            imgs[showIndex].className = 'show';
            nums[showIndex].className = 'active';
            animate(imgs[showIndex], { 'opacity': 1 });
            if (flag) {
                timer = setInterval(function () {
                    moveNext();
                }, 4000);
            } else {
                timer = setInterval(function () {
                    movePrev();
                }, 4000);
            }
        }
    }

})()

// 顶部滑出效果
var topAnimateModules = (function(){
    var themeWrap = $1('.theme-wrap');
    // window.onscroll = function(){
    //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (scrollTop >= 204){
    //         animate(themeWrap, { 'height': '63px' });
    //         themeWrap.style.position = 'sticky';
    //         themeWrap.style.top = 0;
    //         themeWrap.style.boxShadow = 'darkgrey 0px 5px 5px';
    //     }else{
    //         themeWrap.style.position = 'unset';
    //     }
    // }
    window.addEventListener('scroll', scrollEvent());
    function scrollEvent(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 204) {
            animate(themeWrap, { 'height': '63px' });
            themeWrap.style.position = 'sticky';
            themeWrap.style.top = 0;
            themeWrap.style.boxShadow = 'darkgrey 0px 5px 5px';
        } else {
            // themeWrap.style.position = 'unset';
            themeWrap.style.boxShadow = 'none';
        }
    }
})()
// var topAnimateModules = (function () {
//     var themeWrap = $1('.theme-wrap');
//     var newDiv = document.createElement('div');
//     newDiv = themeWrap.cloneNode(true);
//     newDiv.classList.add('newDiv');
//     document.body.appendChild(newDiv);

//     window.onscroll = function () {
//         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//         if (scrollTop >= 204) {
//             // animate(themeWrap, { 'height': '63px' });
//             themeWrap.style.position = 'sticky';
//             themeWrap.style.top = 0;
//             themeWrap.style.boxShadow = 'darkgrey 0px 5px 5px';
//         } else {
//             themeWrap.style.position = 'unset';
//         }
//         // if (scrollT >= 204){
//         //     newDiv.style.display = 'block';
//         //     newDiv.style.position = 'absolute';
//         //     newDiv.style.left = 0 + 'px';
//         //     newDiv.style.top = -scrollT + 'px';
//         //     animate(newDiv, { 'height': '63px' });
//         // }

    