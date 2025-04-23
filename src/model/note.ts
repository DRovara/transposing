export default class Note {
    id: number;

    constructor(
        id: number,
    ) {
        this.id = id;
    }

    transpose(from: number, to: number): Note {
        return new Note((this.id + from - to + 12) % 12);
    }

    equal(other: Note): boolean {
        return this.id === other.id;
    }

    possibleMistakes(from: number, to: number): Note[] {
        const mistakes: Note[] = [];

        const correct = this.transpose(from, to);
        mistakes.push(new Note((correct.id + 1) % 12));
        mistakes.push(new Note((correct.id - 1 + 12) % 12));
        const opposite = this.transpose(to, from);
        mistakes.push(new Note((opposite.id + 1) % 12));
        mistakes.push(new Note((opposite.id - 1 + 12) % 12));
        mistakes.push(opposite);

        const uniqueMistakes = new Map<number, Note>();
        mistakes.forEach((mistake) => {
            if (!uniqueMistakes.has(mistake.id)) {
                uniqueMistakes.set(mistake.id, mistake);
            }
        });
        return Array.from(uniqueMistakes.values()).filter((mistake) => !mistake.equal(this) && !mistake.equal(correct));
    }

}