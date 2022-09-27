
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width = SCREEN_W;
vcan.height = SCREEN_H;

can.width = SCREEN_W * 3;
can.height = SCREEN_H * 3;

con.mozimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime;

//主役
let chImg = new Image();
chImg.src = "images/goku_child.png";

let chImg2 = new Image();
chImg2.src = "images/goku_adult.png";

//ブロック
let blImg = new Image();
blImg.src = "images/sprite_mario.png";

//キーボード
let keyb = {};

//キャラクター作成
let cha = new Cha(100, 100);
//フィールド作る
let field = new Field();

//ブロックオブジェクト
let block = [];
let item = [];

function updateObj(obj) {
     //スプライトブロック表示
     for(let i = obj.length - 1; i >= 0; i --) {
        obj[i].update();
        if(obj[i].kill)obj.splice(i, 1);
    }
}

//更新処理
function update() {
    field.update();

    updateObj(block);
    updateObj(item);

    cha.update();
}

//function drawSprite(snum, x, y) {
    //let sx = (snum&15)*16;
    //let sy = (snum>>4)*16;  
//}

function drawObj(obj) {
    //スプライトブロック表示
    for(let i = 0; i < obj.length; i ++) {
        obj[i].draw();
    }
}

//描画処理
function draw() {
    //画面を水色
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);


    //マップ表示
    field.draw();

    drawObj(block);
    drawObj(item);

    //キャラクター表示
    cha.draw();
    
    //drawSprite(cha_sprite, cha_x>>4, cha_y>>4);       
    
    /*vcon.font = "18px 'Impact'";
    vcon.fillStyle = "white";
    vcon.fillText("マ〇オが孫〇空だったら", 10, 20);*/

    //仮想から実画面
    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H,
        0, 0, SCREEN_W*3, SCREEN_H*3);
}

//ループ開始
window.onload = function () {
    startTime = performance.now();
    mainLoop();
}

//メインループ
function mainLoop() {

    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime)/GAME_FPS;

    if(nowFrame > frameCount) {

        let c = 0;
        while(nowFrame > frameCount) {
            frameCount++;

            update();
            if(++c >= 4)break;
        }

        draw();
    }
    
    requestAnimationFrame(mainLoop);
}



//キーボード押したとき
document.onkeydown = function (e) {
    if(e.keyCode == 37)keyb.Left = true;
    if(e.keyCode == 39)keyb.Right = true;
    if(e.keyCode == 40)keyb.bottom = true;
    if(e.keyCode == 38)keyb.top = true;

    if(e.keyCode == 90)keyb.fly = true;
    if(e.keyCode == 88)keyb.down = true;

    if(e.keyCode == 65) {
        block.push(new Block(368, 5, 5));
    }

    //if(e.keyCode == 65)field.scx --;
   // if(e.keyCode == 83)field.scx ++;
}

//キーボードはなしたとき
document.onkeyup = function (e) {
    if(e.keyCode == 37)keyb.Left = false;
    if(e.keyCode == 39)keyb.Right = false;
    if(e.keyCode == 40)keyb.bottom = false;
    if(e.keyCode == 38)keyb.top = false;

    if(e.keyCode == 90)keyb.fly = false;
    if(e.keyCode == 88)keyb.down = false;
}