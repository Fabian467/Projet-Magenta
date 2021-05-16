// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Download_Image: () => save(),
    Nombre : 0,
    steps: 30,
    temperature : 1,
}
gui.add(params, "steps",30,100,5)
gui.add(params,"temperature",1,10,0.5)

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
const music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize();
const rnnPlayer = new mm.Player();

function setup() {
    p6_CreateCanvas();
    Usertext = createInput();
    Usertext.input(newTyping);
    output = select('#output');
    document.getElementById('demarrer').onclick = (event) => {
    Partition = separer(Usertext);
    const chant = createPartition(Partition);
    document.getElementById('chanson').onclick = (event) => {
      if (rnnPlayer.isPlaying()) {
      rnnPlayer.stop();
      return;
    }
    const qns = mm.sequences.quantizeNoteSequence(chant, 4);
    music_rnn
    .continueSequence(qns, params.steps,params.temperature)
    .then((sample) => rnnPlayer.start(sample));
    };
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
    let mot = 0;
    const chanson = {
      notes:[],
      totalTime : 0
    };
    let x = Partition.length;
    for(let i=0; i<x;i++){
      let y = Partition[i].length;
      for(let j=0; j<y; j++){
        mot = ((mot + unchar(Partition[i][j]) - 20)/y | 0);
      }
      if(mot>80){
        mot = (random(70,80) | 0);
      }
      if(mot<50){
        mot = (random(50,60) | 0);
      }
      note = {pitch: mot, startTime: debut, endTime: fin};
      chanson.notes.push(note);
      debut = debut + 0.5;
      fin = fin + 0.5;
      chanson.totalTime = chanson.totalTime + 0.5;
    }
    return chanson;
  }

function windowResized() {
    p6_ResizeCanvas()
}


