var container = document.querySelector('.page-container')
// 獲取瀏覽器視窗高度
var viewHeight = document.documentElement.clientHeight
// 獲取滾動的頁數
var pageNum = document.querySelectorAll('.page-item').length
// 初始化當前位置, 距離原始頂部距離
var currentPosition = 0
// 設置頁面高度
container.style.height = viewHeight + 'px'
// 向下滾動頁面
function goDown () {
    if (currentPosition > - viewHeight * (pageNum - 1)) {
        currentPosition = currentPosition - viewHeight
        container.style.top = currentPosition + 'px'
    }
}
// 向上滾動頁面
function goUp () {
    if (currentPosition < 0) {
        currentPosition = currentPosition + viewHeight
        container.style.top = currentPosition + 'px'
    }
}

// 節流函數
function throttle (fn, delay) {
    let baseTime = 0
    return function () {
        const currentTime = Date.now()
        if (baseTime + delay < currentTime) {
        fn.apply(this, arguments)
        baseTime = currentTime
        }
    }
}

// 初始鼠標滾動
var handlerWheel = throttle(scrollMove, 1000)
let changClass = document.querySelector('.page-container')
let tagClass = document.querySelector('.tag-box')
let thisPage = 0
let pageNumber = changClass.children
let scrollMax = pageNumber.length - 1
let i = 0
let tagBtn = document.querySelectorAll('.tag-btn')
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousewheel_event#The_detail_property
// firefox的頁面滾動事件其他瀏覽器不一樣
if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
    document.addEventListener('mousewheel', handlerWheel, false)
} else {
    document.addEventListener('DOMMouseScroll', handlerWheel, false)
}
function scrollMove (e) {
    // 用頁面移動距離換算成目前的頁面
    nowTop = Math.abs(parseInt(container.style.top))
    let thisPage = nowTop / viewHeight
    i = thisPage
    if (e.deltaY > 0) {
        goDown();
        if (i < scrollMax) {
            changClass.children[thisPage].classList.remove('active');
            tagClass.children[thisPage].classList.remove('active');
            thisPage ++;
            changClass.children[thisPage].classList.add('active');
            tagClass.children[thisPage].classList.add('active');
            i++
        } else {
            return
        }
    } else {
        goUp()
        if (i > 0) {
            changClass.children[thisPage].classList.remove('active');
            tagClass.children[thisPage].classList.remove('active');
            thisPage --;
            changClass.children[thisPage].classList.add('active');
            tagClass.children[thisPage].classList.add('active');
            i--
        } else {
            return
        }
    }
} 
// 點擊跳轉並加入class
for(j=0;j<pageNumber.length;j++){
    let btnNum = tagBtn[j].dataset.num;
    tagBtn[j].addEventListener('click',function(i){
        for(k=0;k<pageNumber.length;k++){
            tagClass.children[k].classList.remove('active')
            changClass.children[k].classList.remove('active')
        }
        currentPosition = - btnNum*viewHeight
        container.style.top =currentPosition + 'px'
        changClass.children[btnNum].classList.add('active')
        tagClass.children[btnNum].classList.add('active')
    },false)
}

// 處理移動端滑動
var touchStartY = 0
document.addEventListener('touchstart', event => {
    touchStartY = event.touches[0].pageY
})
var handleTouchEnd = throttle(touchEnd, 500)
document.addEventListener('touchend', handleTouchEnd)
function touchEnd (e) {
    var touchEndY = e.changedTouches[0].pageY
    if (touchEndY - touchStartY < 0) { // 向上滑動, 頁面向下滾動
        goDown();
        if (i < scrollMax) {
            changClass.children[thisPage].classList.remove('active')
            thisPage ++
            changClass.children[thisPage].classList.add('active')
            i ++
        }else{
            return
        }
    } 
    if (touchEndY - touchStartY > 0) {
        goUp();
        if (i > 0) {
            changClass.children[thisPage].classList.remove('active')
            thisPage --
            changClass.children[thisPage].classList.add('active')
            i --
        }else{
            return
        }
    }
    else{
        return
    }
}

// 調整視窗重整
window.onresize = function(){
    window.location.reload();
}

// 輪盤效果
let lotBtn = document.querySelector('#lot-btn')
let giftNum = document.querySelectorAll('.small')
let num=0;
let shijian=Math.ceil(Math.random()*2000+3200);
lotBtn.addEventListener('click',test,false)

// setInterval(要執行的代碼, 每毫秒執行)
function test(){
    oTime=setInterval(dianji,200);
}
function dianji() {
    // num++;
    o = Math.ceil(Math.random()*giftNum.length)
    // if (num>giftNum.length-1){
    //     num=0
    // }
    for(j=0;j<giftNum.length;j++){
        giftNum[j].id="";
    }
    giftNum[o].id="act";
    // setTimeout(要執行的代碼, 等待的毫秒)
    setTimeout(tingzhi,shijian);
    function tingzhi() {
        clearInterval(oTime)
    }
}

