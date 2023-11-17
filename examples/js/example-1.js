

let app = new PIXI.Application({ 
    width: 600, 
    height: 600, 
    backgroundColor: 0x1BEC98 
});
document.getElementById('canvas-container').appendChild(app.view);

const sprites = new PIXI.ParticleContainer(10000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});






app.stage.addChild(sprites);
// Büyük daireyi oluşturacak küçük daireler için parametreler
let centerX = app.screen.width / 2;
let centerY = app.screen.height / 2;
let bigCircleRadius = 200;
let smallCircleRadius = 3;
let totalCircles = 10000;

const circleArr = [];

for (let i = 0; i < totalCircles; i++) {
    let angle = Math.random() * Math.PI * 2;
    let radius = Math.sqrt(Math.random()) * bigCircleRadius;
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);

    const circle = PIXI.Sprite.from('assets/circle.png');
    circle.anchor.set(0.5);
    circle.scale.set(1.5 + Math.random() * 1);
    circle.x = x;
    circle.y = y;
    circle.tick = Math.random()*2;
    circle.randomDirection = Math.random()*2;
    circle.speed = Math.random()*.1;



    circleArr.push(circle);

    sprites.addChild(circle);
}



const circlesBoundsPadding = 100;
const circlesBounds = new PIXI.Rectangle(
    -circlesBoundsPadding,
    -circlesBoundsPadding,
   100 + circlesBoundsPadding * 2,
   100 + circlesBoundsPadding * 2,
);


let tick = 0;

app.ticker.add(() =>
{
    // iterate through the sprites and update their position
    for (let i = 0; i < circleArr.length; i++)
    {
        const circles = circleArr[i];

        circles.x += (Math.sin(circles.tick+(circles.randomDirection>1?tick:-tick) ) * circles.speed);
        circles.y += Math.cos(circles.tick+(circles.randomDirection>1?tick:-tick) ) * circles.speed;
      //  circles.rotation = -circles.direction + Math.PI;

    }

    // increment the ticker
    tick += 0.1;
});