//アイテムクラス

const ITEM_KINOKO = 1;
const ITEM_KUSA = 2;
const ITEM_STAR = 4;
const ITEM_FIRE = 8;

class Item extends Sprite {

    constructor(sp, x, y, vx, vy, tp) {
        super(sp, x, y, vx, vy);
        if(tp == undefined) tp = ITEM_KINOKO;
        this.tp = tp;
    }

    //横の判定
    checkWall() {

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        //右チェック
        if(field.isBlock(lx + 15, ly + 3)  ||
           field.isBlock(lx + 15, ly + 12) ||
           field.isBlock(lx, ly + 3)       ||
           field.isBlock(lx, ly + 12)) {
                
                this.vx *= -1;

        }
    }

    //床の判定
    checkFloor() {
        if(this.vy <= 0) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if(field.isBlock(lx + 1, ly + 15) ||
           field.isBlock(lx + 14, ly + 15)) {
                
                this.vy = 0;
                this.y = ((((ly + 15)>>4)<<4) - 16)<<4;
        }
    }

    //キノコ処理
    proc_kinoko() {
        if(checkHit (this, cha)) {
            this.kill = true;

           cha.kinoko = 1;

            return true;
        }

        if(++ this.count <= 32) {
            this.sz = (1 + this.count)>>1;
            this.y -= 1<<3;
            if(this.count == 32) this.vx = 16;
            return true;
        }
        return false;
    }

    //草処理
    proc_kusa() {
        /*if(checkHit (this, cha)) {
            this.kill = true;

           cha.kinoko = 1;

            return true;
        }*/

        if(this.y > 0) {
            //this.sz = (1 + this.count)>>1;
            this.count ++;
            if(this.count < 16) this.sz = this.count;
            else this.sz = 16;

            this.y -= 1<<4;
            //if(this.count == 32) this.vx = 16;
            //return true;
        }
        return false;
    }

    //更新処理
    update() {
        if(this.kill) return;

        switch(this.tp) {
            case ITEM_KINOKO:
                if(this.proc_kinoko()) return;
                break;

            case ITEM_KUSA:
                this.proc_kusa();
                return;
        }

        this.checkWall();

        this.checkFloor();

        super.update();
    }

    draw() {
        super.draw();
        if(this.tp == ITEM_KUSA) {
        let c = (this.count - 16)>>4;
        for(let i = 0; i <= c; i ++) {
        let an = 486 + 16;
        let sx = (an & 15)<<4;
        let sy = (an >> 4)<<4;

        let px = (this.x>>4) - (field.scx);
        let py = (this.y>>4) - (field.scy);

        let s;
        if(i == c) s = (this.count % 16);
        else s = 16;
        py += 16 + i * 16;

        vcon.drawImage(blImg, sx, sy, 16, s, px, py, 16, 16);
        }
        }
    }
}