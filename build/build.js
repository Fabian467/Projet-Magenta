var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
    Nombre: 0,
};
var Usertext;
var output;
var Tabmot;
var Partition;
function setup() {
    p6_CreateCanvas();
    Usertext = createInput();
    Usertext.input(newTyping);
    output = select('#output');
    var player = new mm.Player();
    document.getElementById('demarrer').onclick = function (event) {
        Partition =
            separer(Usertext);
        var chant = createPartition(Partition);
        document.getElementById('chanson').onclick = function (event) { return player.start(chant); };
        player.stop();
    };
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
    var chanson = {
        notes: [],
        totalTime: 0
    };
    var x = Partition.length;
    for (var i = 0; i < x; i++) {
        var y = Partition[i].length;
        for (var j = 0; j < y; j++) {
            note = { pitch: (unchar(Partition[i][j]) - 65 + 30), startTime: debut, endTime: fin };
            chanson.notes.push(note);
            debut = debut + 0.5;
            fin = fin + 0.5;
            chanson.totalTime = chanson.totalTime + 0.5;
        }
    }
    return chanson;
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
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