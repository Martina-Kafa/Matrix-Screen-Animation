const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "0101001110010101101011011001010010101011110100101010ABCDETJOIJDLKSAFHQOWEIRUTZTHGJFKDNXNBV335765849798224209100100101111101010abgdljgaprtiuoweruoretubnvmxcblsakdhfkjdshg1230943543870101010101アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "A";
    this.canvasHeight = canvasHeight;
  }
  draw(context, context2) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    context2.fillText(
      this.text,
      this.x * this.fontSize,
      this.y * this.fontSize
    );

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97) {
      this.y = 0;
    } else {
      this.y += 0.9;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.fontSize = 16;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 26;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = effect.fontSize + "px monospace";
    ctx.fillstyle = "#03A062";
    ctx.fillstyle = "#0aff0a";

    ctx2.textAlign = "center";
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = effect.fontSize + "px monospace";
    ctx.fillStyle = "green";

    effect.symbols.forEach((symbol) => symbol.draw(ctx, ctx2));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerWidth;
  effect.resize(canvas.width, canvas.height);
});
