export class Config {
    allowBack: boolean;
    allowReview: boolean;
    autoMove: boolean;  // if true, it will move to next question automatically when answered.
    duration: number;  // indicates the time in which the question must be answered. 0 means unlimited.
    mistakesAllowed: number; // the number of mistakes allowed or the numbers of lives
    requiredAll: boolean;  // indicates if you must answer all the questions before submitting.
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    showClock: boolean;
    showPager: boolean;
    theme: string;

    constructor(data: any) {
        data = data || {};
        this.allowBack = data.allowBack ? data.allowBack : false;
        this.allowReview = data.allowReview ? data.allowReview : false;
        this.autoMove = data.autoMove ? data.autoMove : true;
        this.duration = data.duration ? data.duration : (30 * 1000); // 30 seconds is default
        this.mistakesAllowed = data.mistakesAllowed ? data.mistakesAllowed : 3;
        this.requiredAll = data.requiredAll ? data.requiredAll : false;
        this.shuffleQuestions = data.shuffleQuestions ? data.shuffleQuestions : false;
        this.shuffleOptions = data.shuffleOptions ? data.shuffleOptions : true;
        this.showClock = data.showClock ? data.showClock : true;
        this.showPager = data.showPager ? data.showPager : true;
    }
}
