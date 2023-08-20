const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 255;

const currentFrame = (index) => `./assets/playground-blue/${(index+1).toString()}.jpg`;
const images = [];
let ball = { frame:0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}
gsap.to(ball, {
    frame: frameCount -1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: true,
        pin: "canvas",
        end: "1000%",
    },
    onUpdate: render,
});

images[0].onload = render;

function render(){
    context.clearRect(0,0,canvas.width,canvas.height);
    const image = images[ball.frame];
    const imageWidth = image.width;
    const imageHeight = image.height;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const scaleX = canvasWidth / imageWidth;
    const scaleY = canvasHeight / imageHeight;
    const scaleToFit = Math.max(scaleX, scaleY);
    const scaledWidth = imageWidth * scaleToFit;
    const scaledHeight = imageHeight * scaleToFit;
    const offsetX = (canvasWidth - scaledWidth) / 2;
    const offsetY = (canvasHeight - scaledHeight) / 2;
    context.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);}

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      
