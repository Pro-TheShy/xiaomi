//top
var topModule = (function () {
    var liWrap = $1('.li-wrap');
    var showCon = $1('.show-con');
    var newLi = document.createElement('li');
    var topNavLi = document.querySelectorAll('.top-nav li');
    for (var i = 0; i < topNavLi.length - 2; i++) {
        topNavLi[i].index = i;
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
})()

//banner轮播图
var imgs = document.querySelectorAll('.main img');
var nums = document.querySelectorAll('.num li');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var timer;
var flag = 1;
var showIndex = 0;


// 进入页面执行
animate(imgs[showIndex],{'opacity':1},function(){
    timer = setInterval(function(){
        moveNext();
    },5000);
});

function moveNext(){
    imgs[showIndex].className = '';
    nums[showIndex].className = '';
    imgs[showIndex].style.opacity = 0.02;

    showIndex++;

    if (showIndex >= imgs.length){
        showIndex = 0;
    }
    imgs[showIndex].className = 'show';
    nums[showIndex].className = 'active';

    animate(imgs[showIndex],{'opacity':1});
}

function movePrev() {
    imgs[showIndex].className = '';
    nums[showIndex].className = '';
    imgs[showIndex].style.opacity = 0.02;

    showIndex--;

    if (showIndex < 0) {
        showIndex = imgs.length-1;
    }
    imgs[showIndex].className = 'show';
    nums[showIndex].className = 'active';

    animate(imgs[showIndex], { 'opacity': 1 });
    flag = 0;
}

//点击下一页
next.onclick = function(){
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);
    moveNext();

    timer = setInterval(function () {
        moveNext();
    }, 5000);
}
prev.onclick = function () {
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);
    movePrev();

    timer = setInterval(function () {
        movePrev();
    }, 5000);
}

for(var j = 0;j<nums.length;j++){
    nums[j].index = j;
    nums[j].onclick = function(){
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

var listPosi = $1('.list-posi');
var bannerListLi = document.querySelectorAll('.list li');
for (var g = 0; g < bannerListLi.length;g++){   
    bannerListLi[g].onmouseenter = function(){
        listPosi.style.display = 'block'; 
    }
    listPosi.onmouseleave = function () {
        listPosi.style.display = 'none';
    }
}

//倒计时
var timeModule = (function(){
    var hour = $1('.hours');
    var min = $1('.min');
    var sec = $1('.sec');
    var timer = setInterval(function(){
        var d = new Date();
        var res = Date.parse('2020/08/24 14:00:00');
        var time = d.getTime();
        var dao = res - time;

        //天
        var js1 = 1000 * 60 * 60 * 24;
        var day = parseInt(dao / js1);
        //小时
        var js2 = 1000 * 60 * 60;
        var js3 = parseInt(dao % js1)
        var hours = parseInt(js3 / js2);

        //分
        var js4 = 1000 * 60;
        var js5 = parseInt(dao % js2);
        var minutes = parseInt(js5 / js4);

        //秒
        var js6 = 1000;
        var js7 = parseInt(dao % js4);
        var seconds = parseInt(js7 / js6);

        hour.innerText = hours;
        min.innerText = minutes;
        sec.innerText = seconds;
    },1)
})()


//滚动条轮播
var lunBoModule = (function (){
    var lunBo = $1('.lunBo');
    var lunBoCon = $1('.lunBo-con');
    var btnPrev = $1('.main1-btnPrev');
    var btnNext = $1('.main1-btnNext');
    var con = document.querySelectorAll('.con');
    var newCon = document.createElement('div');
    newCon.className = 'con';
    lunBoCon.appendChild(newCon);
    newCon.innerHTML = con[0].innerHTML;
    
    var len = con.length;
    var timer1,timer2,flag = 1;
    var wid = newCon.clientWidth;
    //滚动条向右
    function moveLeft(){
        timer1 = setInterval(()=>{
            lunBo.scrollLeft++;
            if (lunBo.scrollLeft % newCon.clientWidth === 0){
                clearInterval(timer1);
                timer2 = setTimeout(()=>{
                    moveLeft();
                },2000)
            }
            if (lunBo.scrollLeft >= (newCon.clientWidth * len)) {
               lunBo.scrollLeft = 0;
            }
        },10);
    }
    moveLeft();
    // moveRight();
    function moveRight() {
        timer1 = setInterval(() => {
            lunBo.scrollLeft--;
            if (lunBo.scrollLeft % newCon.clientWidth === 0) {
                clearInterval(timer1);
                timer2 = setTimeout(() => {
                    moveRight();
                }, 2000)
            }
            if (lunBo.scrollLeft <= 0 ) {
                lunBo.scrollLeft = newCon.clientWidth * len;
            }
        }, 10);
    }
    //点击切换
    function clickPrev(wid) {
        animate(lunBo, { 'scrollLeft': wid});
    }   

    //添加向左点击事件
    btnPrev.onclick = function(){
        clearInterval(timer1);
        clearInterval(timer2);
        //判断当前滚动条
        if (lunBo.scrollLeft < wid){
            clickPrev(wid);
        } else if (lunBo.scrollLeft >= wid && lunBo.scrollLeft < wid*2){
            clickPrev(2*wid);
        } else if (lunBo.scrollLeft >= 2*wid && lunBo.scrollLeft < wid * 3) {
            clickPrev(3 * wid);
        }
        flag = 1;
    }
    //向右事件
    btnNext.onclick = function () {
        clearInterval(timer1);
        clearInterval(timer2);
        //判断当前滚动条
        if (lunBo.scrollLeft <= wid) {
            clickPrev(0);
        } else if (lunBo.scrollLeft > wid && lunBo.scrollLeft <= wid * 2) {
            clickPrev(wid);
        } else if (lunBo.scrollLeft > 2 * wid && lunBo.scrollLeft <= wid * 3) {
            clickPrev(2 * wid);
        }
        // moveRight();
        flag = 0;
    }
    lunBo.onmouseenter = function () {
        clearInterval(timer1);
        clearInterval(timer2);
    }
    lunBo.onmouseleave = function () {
        if (flag) {
            moveLeft();
        } else {
            moveRight();
        }
    }
})();

