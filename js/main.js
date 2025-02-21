const els ={
    score: null,
    answer: null,
    choices: null,
};

const words = [
    'JavaScript',
    'Language',
    'Bootstrap',
];

let words = '';


const init =() => {
    console.log('>> #init');
    // On attache tous les elements
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices= document.querySelector('#choices');

    // Actions définit pour faire le pendu:
    //Choisir un mot
    
    //Générer toutes les lettres pour avoir le choix
    //Afficher les mots
    //Afficher les choix
    //Afficher les erreurs
    // Ecouter les événements

    // Vérifier la lettre: si elle ne fait pas partis des mots ajouter aux erreurs dans le cas contraire on affiche la lettre du mot
};
window.addEventListener('load', () => {
    init()
})