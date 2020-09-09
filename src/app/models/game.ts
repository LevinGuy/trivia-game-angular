import { Config } from './config';
import { Question } from './question';

export class Game {
    name: string;
    description: string;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.name = data.name;
            this.description = data.description;
            this.questions = [];
            data.results.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}