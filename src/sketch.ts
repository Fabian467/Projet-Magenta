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



// Déclaration des variables utilisées
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
var textfont;
var titlefont;
var img;
var img2;



// Fonction pour lancer le lecteur audio
function start() {
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



// Séparation des mots du texte
function separer(Usertext) {
  let Tabmot = splitTokens(Usertext.elt.value);
  print (Tabmot);
  return Tabmot;
}



// Création de la Partition
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



// Chargement des polices et des images
function preload() {
  titlefont = loadFont('./fonts/Pacifico-Regular.ttf');
  textfont = loadFont('./fonts/Montserrat-Medium.ttf');
  img = loadImage('./img/cloudreversed.png');
  img2 = loadImage('./img/cloud.png');
}



function setup() {

  // création de l'espace
  p6_CreateCanvas();

  // boite pour rentrer le texte
  Usertext = createInput('\"Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.\" ~ Kahlil Gibran');
  Usertext.position(0,windowHeight/5+20);
  Usertext.style('background','transparent');
  Usertext.style('border','none');
  Usertext.style('outline','none');
  Usertext.style('color', '#2a3366');
  Usertext.style('textAlign', 'center');
  Usertext.size(windowWidth);

  // affichage bouton
  button = createButton('Play');
  button.position(windowWidth/2-50, windowHeight/3.5);
  button.mousePressed(start);
  button.style('font-size', '30px');
  button.style('color', '#F6F7FD');
  button.style('border','none');
  button.style('background-color', '#2a3366');
  button.size(100);
}



// Fonction pour retaper le texte en html
function newTyping(){
  output.html(Usertext.value());
}



// Dessin de la page
function draw() {

  background('#98ACF8');

  // Titre "Muse"
  fill('#2a3366');
  textSize(80);
  textStyle(BOLDITALIC);
  textFont(titlefont);
  textAlign(CENTER, CENTER);
  text('Muse', windowWidth/2-5, windowHeight/10);
  
  // Texte informatif "type your text here:"
  textSize(30);
  textStyle(NORMAL);
  textFont(textfont);
  text('Type your text here:', windowWidth/2, windowHeight/5.5);

  // Nuages ~
  image(img, 0, windowHeight/3-img.height/2, img.width/2, img.height/2);
  image(img2, windowWidth-img.width/2, windowHeight/3-img.height/2, img.width/2, img.height/2);

  // Rectangle page (bleu)
  fill('#6677B9');
  noStroke();
  rect(0, windowHeight/3, windowWidth, 2*windowHeight/3);

  // Rectangle texte (blanc)
  /*fill('#F6F7FD');
  noStroke();
  rect(windowWidth/5, 2*windowHeight/5, 3*windowWidth/5, 2.5*windowHeight/5);*/

  // Crédits de bas de page
  fill('#F6F7FD');
  textSize(15);
  textAlign(LEFT, BOTTOM);
  text('Fabian Santiago, Cindy Hartmann', 20, windowHeight-20);
  textAlign(RIGHT, BOTTOM);
  text('Algortihmic Aesthetic Project ~ 2021', windowWidth-20, windowHeight-20);

  // Texte rentré par l'utilisateur
  Usertext.input(newTyping);
  output = select('#output');
}



// Fonction pour resize la toile
function windowResized() {
    p6_ResizeCanvas()
}


