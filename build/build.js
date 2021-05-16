var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
    Nombre: 0,
    steps: 30,
    temperature: 1,
};
gui.add(params, "steps", 30, 100, 5);
gui.add(params, "temperature", 1, 10, 0.5);
var music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
var rnnPlayer = new mm.Player();
music_rnn.initialize();
var Usertext;
var output;
var Tabmot;
var Partition;
var button;
var chant;
var player;
var font;
function start() {
    startPlaying();
    backgroundWords();
}
function startPlaying() {
    Partition = separer(Usertext);
    chant = createPartition(Partition);
    player = new mm.Player();
    player.start(chant);
    player.stop();
    if (rnnPlayer.isPlaying()) {
        rnnPlayer.stop();
        return;
    }
    console.log(chant.notes);
    var qns = mm.sequences.quantizeNoteSequence(chant, 4);
    music_rnn
        .continueSequence(qns, params.steps, params.temperature)
        .then(function (sample) { return rnnPlayer.start(sample); });
}
function newTyping() {
    output.html(Usertext.value());
}
function separer(Usertext) {
    var Tabmot = splitTokens(Usertext.elt.value);
    print(Tabmot);
    return Tabmot;
}
function createPartition(Partition) {
    var debut = 0.0;
    var fin = 0.5;
    var note;
    var mot = 0;
    var chanson = {
        notes: [],
        totalTime: 0
    };
    var x = Partition.length;
    for (var i = 0; i < x; i++) {
        var y = Partition[i].length;
        for (var j = 0; j < y; j++) {
            mot = ((mot + unchar(Partition[i][j]) - 20) / y | 0);
        }
        if (mot > 80) {
            mot = (random(70, 80) | 0);
        }
        if (mot < 50) {
            mot = (random(50, 60) | 0);
        }
        note = { pitch: mot, startTime: debut, endTime: fin };
        chanson.notes.push(note);
        debut = debut + 0.5;
        fin = fin + 0.5;
        chanson.totalTime = chanson.totalTime + 0.5;
    }
    return chanson;
}
function backgroundWords() {
    var text = Usertext.value();
    for (var i = 0; i < 100; i++) {
        push();
        fill(random(255), 255, 255);
        translate(random(width), random(height));
        rotate(random(2 * PI));
        text(text, 0, 0);
        pop();
    }
}
function preload() {
    titlefont = loadFont('./fonts/Pacifico-Regular.ttf');
    textfont = loadFont('./fonts/Montserrat-Medium.ttf');
    img = loadImage('./img/cloud.png');
}
function setup() {
    p6_CreateCanvas();
    Usertext = createInput('Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.');
    Usertext.position(0, windowHeight / 5 + 20);
    Usertext.style('background', 'transparent');
    Usertext.style('border', 'none');
    Usertext.style('outline', 'none');
    Usertext.style('color', '#2a3d66');
    Usertext.style('textAlign', 'center');
    Usertext.size(windowWidth);
    button = createButton('Play');
    button.position(windowWidth / 2 - 50, windowHeight / 3.5);
    button.mousePressed(start);
    button.style('font-size', '30px');
    button.style('color', '#ffffff');
    button.style('border', 'none');
    button.style('font-family', 'Helvetica');
    button.style('background-color', '#2a3d66');
    button.size(100);
}
function draw() {
    background('#DA9FF8');
    fill('#2a3d66');
    textSize(80);
    textStyle(BOLDITALIC);
    textFont(titlefont);
    textAlign(CENTER, CENTER);
    text('Muse', windowWidth / 2, windowHeight / 10);
    textSize(30);
    textStyle(NORMAL);
    textFont(textfont);
    text('Type your text here:', windowWidth / 2, windowHeight / 5.5);
    image(img, 0, windowHeight / 4, img.width / 2, img.height / 2);
    fill('#B088F9');
    noStroke();
    rect(0, windowHeight / 3, windowWidth, 2 * windowHeight / 3);
    fill('#ffffff');
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text('Fabian Santiago, Cindy Hartmann', 20, windowHeight - 20);
    textAlign(RIGHT, BOTTOM);
    text('Algortihmic Aesthetic Project ~ 2021', windowWidth - 20, windowHeight - 20);
    textSize(35);
    fill('#2a3d66');
    textFont(titlefont);
    textAlign(CENTER, CENTER);
    text("\" " + Usertext.value() + " \"", windowWidth / 2, windowHeight / 2);
    h1.html(Usertext.value());
}
function windowResized() {
    p6_ResizeCanvas();
}
var __MARGIN_SIZE = 0;
function __desiredCanvasWidth() {
    return windowWidth - __MARGIN_SIZE * 2;
}
function __desiredCanvasHeight() {
    return windowHeight - __MARGIN_SIZE * 2;
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map