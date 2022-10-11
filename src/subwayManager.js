import { Line } from "./line.js";
import { Station } from "./station.js";
import { getLocalStorage, setLocalStorage } from "./store/localStorageStore.js";

export default class SubwayManager {
    constructor() {
        if (SubwayManager.instance) {
            return SubwayManager.instance;
        }
        SubwayManager.instance = this;
        this.stations = [];
        this.lines = [];
        this.currentManagingLine = "";
        this.initStation();
        this.initLine();
    }
    
    initStation() {
        const stationData = getLocalStorage("stations");
        stationData?.forEach(station => {
            this.addStation(station.name, station.isInlined);
        });
    }
    
    initLine() {
        const linesData = getLocalStorage("lines");
        linesData?.forEach((line) => {
            this.addLine({
                    name: line.name,
                    start: line.line[ 0 ].name,
                    end: line.line.at(- 1).name,
                }
            );
            if (line.line.length > 2) {
                this.initSection(line);
            }
        });
    }
    
    initSection(lineData) {
        const targetLine = this.lines.find(line => line.name === lineData.name);
        lineData.line.forEach((lineInfo, idx) => {
            const targetStation = this.stations.find(station => station.name === lineInfo.name);
            targetLine?.line.splice(idx, 1, targetStation);
        })
        setLocalStorage("lines", this.lines);
    }
    
    addStation(name, isInlined) {
        this.stations.push(new Station(name, isInlined));
        setLocalStorage("stations", this.stations);
    }
    
    deleteStation(idx) {
        this.stations.splice(idx, 1);
        setLocalStorage("stations", this.stations);
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
        setLocalStorage("lines", this.lines);
    }
    
    deleteLine(idx) {
        this.lines.splice(idx, 1);
        setLocalStorage("lines", this.lines);
    }
    
    addSection(name, idx) {
        const targetLine = this.lines.find(line => line.name === this.currentManagingLine);
        const targetStation = this.stations.find(station => station.name === name);
        targetLine?.line.splice(idx, 0, targetStation);
        setLocalStorage("lines", this.lines);
    }
    
    deleteSection(idx) {
        const targetLine = this.lines.find(line => line.name === this.currentManagingLine);
        targetLine.line.splice(idx, 1);
    }
    
    getStations() {
        return this.stations;
    }
    
    changeCurrentLine(lineName) {
        this.currentManagingLine = lineName;
        return this.currentManagingLine;
    }
}