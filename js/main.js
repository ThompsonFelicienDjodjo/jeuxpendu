const els ={
    score: null,
    answer: null,
    choices: null,
};

const words = [
    'JAVASCRIPT', // words [0]
    'LANGUAGE', // words [1]
    'BOOTSTRAP', // words[2]
];

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 7;

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
    displayScore();

    // Ecouter les événements
    els.choices.addEventListener('click', ({target}) => {
       if (target.matches('li')) {
           checkLetter(target.innerHTML);

       }
    });

   document.addEventListener('keydown', ({keyCode}) =>{
       //evt:KeyboardEvent evt.keyCode => { keyCode}
       console.log('keyCode', keyCode);
       const letter = String.fromCharCode(keyCode);
       console.log('letter', letter);
       checkLetter(letter);
       if (keyCode >= 65 && keyCode <= 90) {
           checkLetter(letter);
       }
   });

    // Vérifier la lettre: si elle ne fait pas partis des mots ajouter aux erreurs dans le cas contraire on affiche la lettre du mot
};

const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;
    console.log('isLetterWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });
    displayChoices(choicesMapping);
    if(isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
    console.log('isLetterWord after loop', isLetterInWord);
};
const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
  document.querySelector('body').style.backgroundColor = 'red';
  els.choices.innerHTML = `<h1> you dead, bro!</h1>`;
};
const winGame = () => {
    els.choices.innerHTML = `<h1>You live!</h1>`;
}

const displayScore = () => {
    els.score.innerHTML = `${scoreCount} / ${maxScore}`;
};

const displayChoices = (choicesMapping) => {
    const choicesHTML = choicesMapping.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li class="disabled">${letterMapping.letter}</li>`;
        }
    });
    els.choices.querySelector('ul').innerHTML = choicesHTML.join('');
};

const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        if (letterMapping.isVisible === true) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li>_</li>`;
        }
    });
    els.answer.querySelector('ul').innerHTML = wordHtml;
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
    const wordMapping = wordArr.map((letter, index) =>{
        let isVisible = false;
        if (index === 0 || index === word.length -1 ) {
            isVisible = true;
        }

        return{
            letter,
            isVisible
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