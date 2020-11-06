export class Sun {
    constructor() {

        this.total = 60;
        this.gap = 1 / this.total;
        this.originPos = [];
        this.pos = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        //해 크기를 창 비율에 맞게끔 ㅋ 
        this.radius = (150 * this.stageHeight * this.stageWidth) / 1960000;
        for (let i = 0; i < this.total; i++) {
            const pos = this.getCirclePoint(this.radius, this.gap * i);
            this.originPos[i] = pos;
            this.pos[i] = pos;
        }

        this.fps = 30;
        this.fpsTime = 1000 / this.fps;

        this.x = this.stageWidth - this.radius - 140;
        this.y = this.radius + 40;
    }

    draw(ctx, t) {
        if (!this.time) {
            this.time = t;
        }
        const now = t - this.time;
        if (now > this.fpsTime) {
            this.time = t;
            this.updatePoints();
        }

        ctx.fillStyle = '#ffb200';
        ctx.beginPath();
        //ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        //지글지글
        let pos = this.pos[0];
        ctx.moveTo(pos.x + this.x, pos.y + this.y);
        for (let i = 1; i < this.total; i++) {
            const pos = this.pos[i];
            ctx.lineTo(pos.x + this.x, pos.y + this.y);
        }
        ctx.fill();
    }

    updatePoints() {
        for (let i = 1; i < this.total; i++) {
            const pos = this.originPos[i];
            this.pos[i] = {
                x: pos.x + this.ranInt(5),
                y: pos.y + this.ranInt(5),
            }
        }
    }

    ranInt(max) {
        return Math.random() * max;
    }

    getCirclePoint(radius, t) {
        const theta = Math.PI * 2 * t;

        return {
            x: (Math.cos(theta) * radius),
            y: (Math.sin(theta) * radius)
        };
    }
}