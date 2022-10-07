export class Station {
    constructor(_name) {
        this.name = _name;
        this.isInlined = false;
    }
    
    changeIsInlinedToTrue() {
        this.isInlined = true;
    }
}