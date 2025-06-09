const HEIGHT = 600;
const WIDTH = 800;

interface Sprite {
    x: number;
    y: number;
}

type GameState = {
    player: Sprite,
    xOffset: number,
    yOffset: number
};

class Player implements Sprite {
    private x: number;
    private y: number;

    private image: HTMLImageElement;

    constructor() {
        this.x = 20;
        this.y = HEIGHT - 100;
        this.image = new Image();
        this.image.src = "guy.png";
    }

    draw(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number) {
        ctx.drawImage(this.image, this.x - xOffset, this.y - yOffset, 200, 100);
    }
};

const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!!;

const currentState: GameState = {
    player: new Player()
};


const background = new Image();
background.src = "./background.png";

let x = 0;
let canDraw = false;
background.addEventListener("load", () => {
    canDraw = true;
});

setInterval(() => {
    if(canDraw) {
        ctx.drawImage(background, x, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
        currentState.player.draw(ctx, 0, 0);
    }
}, 1000.0 / 30.0);

document.onkeydown = (e) => {
    if(e.code === "ArrowRight") {
        currentState.player.x = clamp(currentState.player.x + 30, 0, 800);
    } else if(e.code === "ArrowLeft") {
        currentState.player.x = clamp(currentState.player.x - 30, 0, 800);
    }
};

function clamp(x: number, min: number, max: number): number {
    if(x < min) {
        return min;
    } else if (x > max) {
        return max;
    } else {
        return x;
    }
}
