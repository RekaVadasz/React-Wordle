import { useState} from 'react';

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0) //max 6
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // each guess is an array
    const [history, setHistory] = useState(['ninja']) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    //format a guess into an array of letter objects
    // eg [{key: 'a', color: 'yellow}]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'} //be default it's grey, will check later
        });

        //find any green letters (leters in right position)
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formatGuess[i].color = 'green';
                solutionArray[i] = null; // not to check it again 
            }
        })

        //find any yellow letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(letter.key)] = null;
            }
        })
    }

    //add a new guess to the guesses state
    //update the isCorrect state is the guess is correct
    //add one to the turn state
    const addNewGuess = () => {

    }

    //handle keyup event & track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ( {key} ) => {
        if (key === 'Enter') {
            //only add guess if turn < 5
            if (turn > 5 ) {
                console.log('you used all your guesses')
                return
            }

            // do not allow duplicate gueesses
            if (history.includes(currentGuess)) {
                console.log('you already tried that word')
                return
            }

            // word must be 5 chars long
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars long')
                return
            }
            formatGuess()
        }

        //is user hits Backspace, delete last character from currentGuess
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        //is user hits a letter and is within 6 guesses, update currentGuess
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
};

export default useWordle;