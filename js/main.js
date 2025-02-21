const els ={
    score: null,
    answer: null,
    choices: null,
};

const words = [
    'JavaScript', // words [0]
    'Language', // words [1]
    'Bootstrap', // words[2]
];

let choices = [];
let word = '';


const init =() => {
    console.log('>> #init');
    // On attache tous les elements
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices= document.querySelector('#choices');

    // Actions définit pour faire le pendu:
    //Choisir un mot
    word = pickWord ();
    console.log('word', word);
    //Générer toutes les lettres pour avoir le choix
    choices = generateChoices ();
    console.log(choices);
    //Afficher les mots
    //Afficher les choix
    //Afficher les erreurs
    // Ecouter les événements

    // Vérifier la lettre: si elle ne fait pas partis des mots ajouter aux erreurs dans le cas contraire on affiche la lettre du mot
};

const generateChoices = () => {
    const choices = [];
    for (let index = 65; index <= 90; index++) {
        choices.push(String.fromCharCode(index));
    }
    return choices;
};

const pickWord = () => {
    const randomIndex = getRandomInt(0, words.length - 1);

    return words[randomIndex];
};

window.addEventListener('load', () => {
    init()
})


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1)) + min;
}