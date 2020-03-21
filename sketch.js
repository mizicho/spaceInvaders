var ship;
var flowers = [];
var drops = [];

function setup(){
    createCanvas (600, 500);
    ship = new Ship();
    //drop = new Drop();
    for (var i = 0; i < 6; i++){
        flowers[i] = new Flower(i*80+80, 60); // x, y 
    }
}

function draw(){
    background (51);
    ship.show();
    ship.move();
    for (var i = 0; i < drops.length; i++){
        drops[i].show();
        drops[i].move();
        for (var j = 0; j < flowers.length; j++){
            if (drops[i].hits(flowers[j])){
                flowers[j].grow();
                drops[i].evaporate();
            }
        }
    }

    
    var edge = false;
    for (var i = 0; i < flowers.length; i++){
        flowers[i].show();
        flowers[i].move();
        if (flowers[i].x > width || flowers[i].x < 0){
            edge = true;
        }
    }

    if (edge){
        for (var i = 0; i < flowers.length; i++){
            flowers[i].shiftDown(); 
        }
    }

    for (var i = drops.length -1; i >=0 ; i--){ //왜 마이너스로 하는가..
        if(drops[i].toDelete){
            drops.splice(i, 1);
        }
    }
}


function keyReleased(){
    if (key != " "){
        ship.setDir(0); 
    }
}


function keyPressed(){
    if (key === ' '){
        var drop = new Drop(ship.x, height);
        drops.push(drop);
    }
    if (keyCode === RIGHT_ARROW){
        ship.setDir(1); //why right can't be used?
    } else if (keyCode === LEFT_ARROW){
        ship.setDir(-1);
    }
}