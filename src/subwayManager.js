import { Line } from "./line.js";
import { Station } from "./station.js";

export default class SubwayManager {
    constructor() {
        if (SubwayManager.instance) {
            return SubwayManager.instance;
        }
        SubwayManager.instance = this;
        this.stations = [new Station("역삼"), new Station("강남"), new Station("상봉"),];
        this.lines = [];
        this.currentManagingLine = "";
    }
    
    addStation(name) {
        this.stations.push(new Station(name));
    }
    
    deleteStation(idx) {
        this.stations.splice(idx, 1);
    }
    
    addLine({ name, start, end }) {
        const startStation = this.stations.find(v => v.name === start);
        const endStation = this.stations.find(v => v.name === end);
        this.lines.push(new Line({
            name,
            start: startStation,
            end: endStation,
        }));
        startStation.changeIsInlinedToTrue();
        endStation.changeIsInlinedToTrue();
    }
    
    deleteLine(idx) {
        this.lines.splice(idx, 1);
    }
    
    getStations() {
        return this.stations;
    }
    
    changeCurrentLine = (lineName) => {
        this.currentManagingLine = lineName;
        return this.currentManagingLine;
    }
}