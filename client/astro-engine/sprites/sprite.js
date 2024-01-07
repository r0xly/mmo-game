export class Sprite {
    constructor(src = "", sWidth = 0, sHeight = 0, inverse = false, sx = 0, sy = 0) {
        this.sx = sx;
        this.sy = sy;
        this.src = src;
        this.image = new Image();
        this.inverse = inverse;
        this.image.src = src;
        this.sHeight = sHeight || this.image.height;
        this.sWidth = sWidth || this.image.width;
    }

    flip() {
        return new Sprite(this.src, this.sWidth, this.sHeight, !this.inverse, this.sx, this.sy);
    }
}
