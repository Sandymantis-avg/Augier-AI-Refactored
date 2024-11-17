export class Proposal {
    constructor(text, name) {
        this.text = text;
        this.name = name;
    }

    getProposalText() {
        return this.text;
    }

    getProposalName() {
        return this.name;
    }
}