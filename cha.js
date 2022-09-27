//キャラクタークラス

const GRAVITY = 4;
const MAX_SPEED = 32;

const TYPE_MINI = 1;
const TYPE_BIG = 2;
const TYPE_FIRE = 4;

class Cha {
    constructor (x, y) {
        this.x = x<<4;
        this.y = y<<4;
        this.w = 16;
        this.h = 32;
        this.vx = 0;
        this.vy = 0;
        this.jump = 0;

        this.kinoko = 0;
        this.type = TYPE_MINI;
    }

    //床の判定
    checkFloor() {
        if(this.vy <= 0) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if(field.isBlock(lx + 1, ly + 31) ||
           field.isBlock(lx + 14, ly + 31)) {
                this.jump = 0;
                this.vy = 0;
                this.y = ((((ly + 31)>>4)<<4) - 32)<<4;
        }
        
    }

    //天井の判定
    checkCeil() {
        if(this.vy >= 0) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        let bl;

        if(bl = field.isBlock(lx + 8, ly + 5)) {
                this.jump = 15;
                this.vy = 0;

                let x = (lx + 8)>>4;
                let y = (ly + 5)>>4;

                if(bl == 374) {}
                else if(bl!=371) {
                 block.push(new Block(374, x, y));
                 item.push(new Item(218, x, y, 0, 0, ITEM_KINOKO));
                 //item.push(new Item(486, x, y, 0, 0, ITEM_KUSA));
                }else {
                 block.push(new Block(bl, x, y, 1, 20, -60));
                 block.push(new Block(bl, x, y, 1, -20, -60));
                 block.push(new Block(bl, x, y, 1, 20, -20));
                 block.push(new Block(bl, x, y, 1, -20, -20));
                 }
        }
    }

     //横の判定
     checkWall() {

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        //右チェック
        if(field.isBlock(lx + 15, ly + 9) ||
           field.isBlock(lx + 15, ly + 15) ||
           field.isBlock(lx + 15, ly + 24)) {
                
                this.vx = 0;
                this.x -= 8;
        }else
        //左チェック
        if(field.isBlock(lx, ly + 9) ||
           field.isBlock(lx, ly + 15) ||
           field.isBlock(lx, ly + 24)) {
                
                this.vx = 0;
                this.x += 8;
           }
    }

    //ジャンプ処理
    updateJump () {
        //ジャンプ
    if(keyb.top) {
        if(this.jump == 0) {
            this.jump = 1;
            //this.vy = -64;
        }
        if(this.jump < 15) this.vy = -(64 - this.jump);
    }
    if(this.jump) this.jump ++;

    }

    //瞬間移動
    updateFly() {
        if(keyb.fly) {
            cha.y = -32;
        }
        if(keyb.down) {
            cha.vx = 256;
        }
    }

    //歩く処理
    updateWalk () {
        //横移動
   if(keyb.Left) {
    if(this.vx > -MAX_SPEED) this.vx -= 1;
   } else
   if(keyb.Right) {
    if(this.vx < MAX_SPEED) this.vx += 1;
   } else {
    //if(!this.jump) {
    if(this.vx > 0) this.vx -= 1;
    if(this.vx < 0) this.vx += 1;
    //}
   }
    }

    //更新処理
    update () {
       if(this.kill) location.reload();
        /*キノコ採ったとき
        if(this.kinoko) {
            //let anim = [];
            

            return;
        }*/

        this.updateJump();
        this.updateFly();
        this.updateWalk();

         //重力
         if(this.vy < 64) this.vy += GRAVITY;

         //横のチェック
         this.checkWall();

         //床チェック
         this.checkFloor();

         //天井チェック
         this.checkCeil();

         //座標移動
         this.x += this.vx;
         this.y += this.vy;

         
        //床にぶつかる
       /* if(this.y > 160<<4) {
          this.jump = 0;
          this.vy = 0;
          this.y = 160<<4;
        }*/
        
        if((this.y>>4) > FIELD_H * 16) {
            this.kill = true;

        }
    }

    //描画処理
    draw () {
        let px = (this.x>>4) - field.scx;
        let py = (this.y>>4) - field.scy;

        let w = this.w;
        let h = this.h;

        if(this.kinoko == 1) {
            vcon.drawImage(chImg2, px, py, w, h);
        }else 
        vcon.drawImage(chImg, px, py, w, h);
 
    }
}