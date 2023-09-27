import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        fr: {
            win: "Vous avez gagné",
            lose: "Vous avez perdu",
            draw: "Egalité",
            xTurn: "À vous de jouer",
            oTurn: "Au tour des ",
            youAre: "Vous êtes",
            matchHistory: "Historique",
            playAgain: "Refaire une partie"
        },
        en: {
            win: "You won",
            lose: "You lost",
            draw: "Draw",
            xTurn: "Your turn",
            oTurn: "It's the turn of ",
            youAre: "You are",
            matchHistory: "Match History",
            playAgain: "Play again"
        }
    },
})

export { i18n }