
console.clear();

var n, boxes = [],
    column = -1,
    c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    ImgBox = function(i) {
        
        if (i%5==0) column++;
            
        this.index = i;
        this.img = new Image();
        this.img.src = 'https://picsum.photos/id/'+(i+30)+'/300/900/';      
        this.x = 300*column;
        this.y = this.progress = 0;
        
        var r = (column%2==0);
        this.tl = gsap.timeline({repeat:-1, defaults:{duration:1, ease:'none'}})
            .fromTo(this, { y:r?1600:-400, progress:0 }, { y:r?-400:1600, progress:1 }, 0)
            .play(this.index%5/5)
            .timeScale( gsap.utils.wrap([0.006,0.007,0.02,0.01], column) )

        this.draw = function() {
        if (!this.img.complete) return;
            ctx.translate( this.x, this.y );
            ctx.drawImage( this.img, 0, 500-500*this.progress, 300, 400, 0, 0, 300, 400);
            ctx.translate( -this.x, -this.y );
        }
    };


window.onload = function(){    
    n = Math.ceil(1+window.innerWidth/300)*5;
    c.width = n/5*300;
    c.height = 1600;

    for (var i=0; i<n; i++) boxes.push( new ImgBox(i) );

    gsap.ticker.add(onTick);
    gsap.set(c, {position: 'absolute', left:'50%', top:-110, xPercent:-50, rotate:5});
}

function onTick(){
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i=0; i<n; i++) boxes[i].draw();
}





// TO DO...
// - add interactivity
// - handle resize