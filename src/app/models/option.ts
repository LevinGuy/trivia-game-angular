export class Option {
    option: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.option = data.option;
        this.isAnswer = data.isAnswer;
        this.selected = false;
    }
}