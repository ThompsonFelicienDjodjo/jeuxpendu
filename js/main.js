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
let wordMapping = [];
let choicesMapping = [];

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
    //- création d'une carte de mot
    wordMapping = getWordMapping(word);
    console.log('wordMapping', wordMapping);

    //Générer toutes les lettres pour avoir le choix
    choices = generateChoices ();
    console.log(choices);

    //- Création d'une carte de choix
    choicesMapping = getChoicesMapping(choices);
    console.log(choicesMapping);

    //Afficher les mots
    displayWord(wordMapping);

    //Afficher les choix
    displayChoices(choicesMapping);

    //Afficher les erreurs
    // Ecouter les événements

    // Vérifier la lettre: si elle ne fait pas partis des mots ajouter aux erreurs dans le cas contraire on affiche la lettre du mot
};

const displayChoices = (choicesMapping) => {

};

const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        if (letterMapping.isVisible == true) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li>_</li>`
        }
    });
    els.choices.querySelector('ul').innerHTML = wordHtml;
};

const generateChoices = () => {
    const choices = [];
    for (let index = 65; index <= 90; index++) {
        choices.push(String.fromCharCode(index));
    }
    return choices;
};

const getChoicesMapping = (choices) => {
    const choicesMapping = choices.map((letter) => {
        return {
            letter,
            isChosen: false
        };
    });
    return choicesMapping;
}

const getWordMapping = (word) => {
    const wordArr = word.split('');
    console.log('word', word);
    console.log('wordArr', wordArr);
    const wordMapping = wordArr.map((letter) =>{
        return{
            letter,
            isVisible: false
        };
    });
    return wordMapping;
}

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