import Note from "./note";

export class GameState {
    currentNote: Note;
    currentFrom: number;
    currentTo: number;
    startTime: Date;
    alternativeNotes: Note[];
    running: boolean = false;
    score: number = 0;
    streak: number = 0;

    last_bases: number[][] = [];

    constructor() {
        this.currentNote = new Note(0);
        this.currentFrom = 0;
        this.currentTo = 0;
        this.startTime = new Date();
        this.alternativeNotes = [];
        this.score = -1;
    }

    populateAlternatives() {
        this.alternativeNotes = [];
        this.alternativeNotes.push(this.currentNote.transpose(this.currentFrom, this.currentTo));
        const possibleMistakes = this.currentNote.possibleMistakes(this.currentFrom, this.currentTo);
        const shuffled = possibleMistakes.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        this.alternativeNotes.push(...selected);
        this.alternativeNotes = this.alternativeNotes.sort(() => 0.5 - Math.random());
    }

    randomise(possible_bases?: number[][]) {
        if (possible_bases === undefined) {
            possible_bases = this.last_bases;
        }
        this.last_bases = possible_bases;
        const randomNote = new Note(Math.floor(Math.random() * 12));
        const randomFrom = possible_bases[0][Math.floor(Math.random() * possible_bases[0].length)];
        let randomTo;
        do {
            randomTo = possible_bases[1][Math.floor(Math.random() * possible_bases[1].length)];
        } while (randomTo === randomFrom);

        this.currentNote = randomNote;
        this.currentFrom = randomFrom;
        this.currentTo = randomTo;
        this.populateAlternatives();
    }

    start() {
        this.score = 0;
        this.running = true;
        this.startTime = new Date();
    }

    check(note: Note): boolean {
        const correct = this.currentNote.transpose(this.currentFrom, this.currentTo);
        this.randomise();
        if (note.equal(correct)) {
            this.streak += 1;
            if (this.streak > 5) {
                this.score += 1;
            }
            this.score += 1;
            return true;
        } else {
            this.streak = 0;
            this.running = false;
            return false;
        }
    }
}