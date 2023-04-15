class PrivateProgress {
    constructor() {
        this.status = "";
        this.value = 0;
        this.max = 0;
    }
}
class Progress {
    constructor() {
        throw new Error('Use Progress.getInstance()');
    }
    static getInstance() {
        if (!Progress.instance) {
            Progress.instance = new PrivateProgress();
        }
        return Progress.instance;
    }
}

module.exports = Progress;