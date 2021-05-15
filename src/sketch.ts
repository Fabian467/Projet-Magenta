// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Download_Image: () => save(),
    Nombre : 0,
}

// -------------------
//       Drawing
// -------------------

// -------------------
//    Initialization
// -------------------
let Usertext;
let output;
let Tabmot;
let Partition;


function setup() {
    p6_CreateCanvas();
    Usertext = createInput();
    Usertext.input(newTyping);
    output = select('#output');
    const player = new mm.Player();
    document.getElementById('demarrer').onclick = (event) => {Partition = 
    separer(Usertext);
    const chant = createPartition(Partition);
    document.getElementById('chanson').onclick = (event) => player.start(chant);
    player.stop();
    };
}


function newTyping(){
  output.html(Usertext.value());
}

function separer(Usertext) {
  let Tabmot = splitTokens(Usertext.elt.value);
  print (Tabmot);
  return Tabmot;
}

  function createPartition(Partition){
    let debut = 0.0;
    let fin = 0.5;
    let note;
    const chanson = {
      notes:[],
      totalTime : 0
    };
    let x = Partition.length;
    for(let i=0; i<x;i++){
      let y = Partition[i].length;
      for(let j=0; j<y; j++){
        note = {pitch:(unchar(Partition[i][j]) - 65 + 30), startTime: debut, endTime: fin};
        chanson.notes.push(note);
        debut = debut + 0.5;
        fin = fin + 0.5;
        chanson.totalTime = chanson.totalTime + 0.5;      
      }
    }
    return chanson;
}

function windowResized() {
    p6_ResizeCanvas()
}


