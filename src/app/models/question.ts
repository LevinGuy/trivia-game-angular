import { Option } from './option';

//   {
//     "category": "Science: Computers",
//     "type": "multiple",
//     "difficulty": "medium",
//     "question": "The name of technology company HP stands for what?",
//     "correct_answer": "Hewlett-Packard",
//     "incorrect_answers": ["Howard Packmann", "Husker-Pollosk", "Hellman-Pohl"]
//   }
export class Question {
    category: string;
    type: string;

    difficulty: string;
    question: string;

    options: Option[];

    constructor(data: any) {
        data = data || {};
        this.category = data.category;
        this.type = data.type;

        this.difficulty = data.difficulty;
        this.question = data.question;

        const opts = [];
        opts.push(new Option( { option: data.correct_answer, isAnswer: true }));
        data.incorrect_answers.forEach(o => {
            opts.push(new Option( { option: o, isAnswer: false }));
        });

        // this.options = this.shuffle(opts);
        // for testing
        this.options = opts;
    }

    private shuffle(array) {
        let currentIndex = array.length;
        let temp;
        let randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }
}

