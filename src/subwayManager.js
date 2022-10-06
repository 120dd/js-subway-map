export default class SubwayManager {
    constructor() {
        if (SubwayManager.instance) {
            return SubwayManager.instance;
        }
        SubwayManager.instance = this;
        this.stations = [];
    }
    
    addStation(name) {
        this.stations.push({ name, isInlined: false });
    }
    
    deleteStation(idx) {
        this.stations.splice(idx, 1);
        console.log(this.stations);
    }
    
    getStations() {
        return this.stations;
    }
}