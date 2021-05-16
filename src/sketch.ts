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
//    Initialization
// -------------------

// Variables
const music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
const rnnPlayer = new mm.Player();
music_rnn.initialize();
let Usertext;
let output;
let Tabmot;
let Partition;
let button;
const chant;
const player;

function setup() {

    // création de l'espace
    p6_CreateCanvas();

    // boite pour rentrer le texte
    Usertext = createInput('Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.');
    Usertext.position(20,75);
    Usertext.style('background','transparent');
    Usertext.style('border','#ffffff');
    Usertext.style('outline','none');

    // affichage bouton
    button = createButton('Play');
    button.position(windowWidth/2, windowHeight/3);
    button.mousePressed(start);
    button.style('font-size', '30px');
    button.style('color', '#ffffff');
    button.style('border','none');
    button.style('font-family', 'Helvetica');
    button.style('background-color', '#260E63');
}

// fonction pour commencer le programme
function start() {
  //Usertext.hide();
  //button.hide();
  startPlaying();
  backgroundWords();
}


// fonction pour jouer la partition
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
    const qns = mm.sequences.quantizeNoteSequence(chant, 4);
    music_rnn
    .continueSequence(qns, params.steps,params.temperature)
    .then((sample) => rnnPlayer.start(sample));
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

// fonction pour afficher le texte en arrière plan
function backgroundWords() {
  const text = Usertext.value();
  //affichage random
  for (let i = 0; i < 100; i++) {
    push();
      fill(random(255), 255, 255);
      translate(random(width), random(height));
      rotate(random(2 * PI));
      text(text, 0, 0);
    pop();
    }
}  

// Décor
function draw() {
  background('#DA9FF8');

  //titre
  //strokeWeight(0);
  fill('#6751C4');
  textSize(50);
  textStyle(BOLDITALIC);
  textAlign(CENTER, CENTER);
  text('Muse', windowWidth/2, 60);
  
  //texte info


  //rectangle bas
  fill('#B088F9');
  noStroke();
  rect(0, windowHeight/3, windowWidth, 2*windowHeight/3);

  //texte utilisateur

  fill('#000000');
  textSize(20);
  text(Usertext.value(), 50,700);
  
  h1.html(Usertext.value() );
}

// fonction pour resize
function windowResized() {
    p6_ResizeCanvas()
}


