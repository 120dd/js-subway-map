export class Station {
    constructor(_name, _isInlined) {
        this.name = _name;
        this.isInlined = _isInlined;
    }
    
    changeIsInlinedToTrue() {
        this.isInlined = true;
    }
}