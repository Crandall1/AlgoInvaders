let win, pX;
let fontRegular;
let sig;

let r1, r2, r3, r4;
let hue, c1, c2, c3, gradient, cnt;
let frame, mask, instance, x, y, x1, x2;

function preload() 
{
	mask = loadImage('mask.png');
}

function setup() 
{
	angleMode(DEGREES);
	frameRate(30);
	colorMode(HSB, 360, 100, 100, 1);
	
	windowResized();
}

function windowResized()
{
	if (windowWidth > windowHeight) win = windowHeight;
	else win = windowWidth;
	createCanvas(win, win);
	
	pX = win * 0.01;
	
	cnt = 1;
	hue = random(360);
	
	x = 0;
	y = 0;
	x1 = pX * 0;
	x2 = pX * 100;
	background(100);
	noStroke();
	
	push();
		{
			//translate(pX * 18 * x, pX * 18 * y);
			fill(random(20, 80));
			rect(pX * 1, pX * 1, pX * 99, pX * 99);
			
			drawingContext.shadowOffsetX = 0;
  		drawingContext.shadowOffsetY = pX * 5;
  		drawingContext.shadowBlur = pX * 5;
  		drawingContext.shadowColor = 'rgba(0,0,0,0.75)';
			
			let num = random(5, 10);
			for (let i = 0; i < num; i++)
			{
				fill(color(hue, random(25, 100), random(50,100), 1));
				let y1 = random(pX * 20, pX * 80);
				let y2 = random(pX * 20, pX * 80);
				let h = random(pX * 1, pX * 20);
				quad(x1, y1, x2, y2, x2, y2 + h, x1, y1 + h);
			}
			drawingContext.shadowBlur = 0;
			drawingContext.shadowColor='rgba(0,0,0,0)';
			image(mask, 0, 0, pX * 100, pX * 100);
		}
		pop();
}

function draw() 
{
	background(100, 0.005);
	if (frameCount % 100 == 0) windowResized();
}



function mousePressed()
{
	windowResized();
}

function keyPressed() 
{
  if (keyCode === 70) {
		//windowResized();
	} else if (keyCode === 83) {
		saveCanvas("thumb", "png");
	}
}