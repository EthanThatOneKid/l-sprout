// L-system, named after Astrid Lindenmayer, a Hungarian theoretical biologist and botanist.
// Lindenmayer used L-systems to describe the behaviour of plant cells and to model 
// the growth processes of plant development. 
// L-systems have also been used to model the morphology of a variety of organisms 
// and can be used to generate self-similar fractals such as iterated function systems.

var axiom = "F";
var sentence = axiom;
var takePic = false;
var rule = [];
var len = 130;
var angle = 0;
var generation = 0;
var r = 50;
var g = 255;
var b = 0;
var a = 255;
var cnv;

function generate() {
	len *= 1/2
	var nextSentence = "";
	for(var i = 0; i < sentence.length; i++) {
		var current = sentence.charAt(i);
		var found = false;
		for (var j = 0; j < rule.length; j++) {
			if (current == rule[j].a) {
				found = true;
				nextSentence += rule[j].b;
				break;
			}
		}
		if (!found) {nextSentence += current;}
	}
	sentence = nextSentence;
	generation += 1;
	r += 1000/999 * r;
	g -= 1/8 * g;
	a -= 1/6 * a;
	createP("Gen " + generation);
	createP(sentence);
}	

function algae() {
	resetMatrix();
	translate(width/2, height);
	background(64);
	stroke(r, g, b, a);
	for( var i = 0; i < sentence.length; i++) {
		var current = sentence.charAt(i);
		if (current == "F") {
			line(0, 0, 0, -len);
			translate(0, -len);
		}
		else if (current == "+") {
			rotate(angle);
		}
		else if (current == "-") {
			rotate(-angle);
		}
		else if (current == "[") {
			push();
		}
		else if (current == "]") {
			pop();
		}
	}
} // Turtle

function genAlgae() {
//RULE: IN EACH GENERATION, REPLACE ALL Fs WITH THE DNA
if (generation<5) {
	background(64);
	angle = radians(25);
	rule[0] = {
		a: "F",
		b: DNA
	}
	generate();
	algae();
}
};

function setup() {


var cnv = createCanvas(500, 500);
var x = (windowWidth - width) / 2 + 350;
var y = (windowHeight - height) / 2 + 50;
cnv.position(x, y);
background(64);

var button2 = createButton("Generate Shrub Pattern");
button2.position(900, 140);
button2.mousePressed(genAlgae);
}

var DNA = prompt("Please enter a code of F, +, -, [, & ]", "FF+[+F-F-F]-[-F+F+F]");

function draw() {
	fill(255);
	text("Gen: " + generation, width/20, height/20 + 10);
	
};
