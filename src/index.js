import View from "./view/view.js";
import SubwayManager from "./subwayManager.js";
import { ERROR_MSG } from "./constants.js";
import { isInValidNameLength, isNotDuplicatedName } from "./validator.js";

class App {
    constructor() {
        this.view = new View();
        this.subwayManager = new SubwayManager();
        this.view.registerStationManageClickEvent(
            this.requestAddStation,
            this.requestDeleteStation,
        );
        this.view.registerLineManageClickEvent(
            this.requestAddLine,
            this.requestDeleteLine,
        )
        this.view.registerSectionManageClickEvent(
            this.requestChangeCurrentManageLine,
            this.requestAddSection,
        );
    }
    
    requestAddStation = (stationName) => {
        if (this.validStationName(stationName)) {
            return;
        }
        this.subwayManager.addStation(stationName);
        this.view.renderStationManageTab();
    }
    
    requestDeleteStation = (idx) => {
        if (this.subwayManager.stations[ idx ].isInlined) {
            this.view.alert(ERROR_MSG.INLINED_STATION);
            return
        }
        if (!this.view.confirm("정말 삭제하시겠습니까?")) {
            return
        }
        this.subwayManager.deleteStation(idx);
        this.view.renderStationManageTab();
    }
    
    requestAddLine = (lineInfo) => {
        if (this.validLineInfo(lineInfo)) {
            return;
        }
        this.subwayManager.addLine(lineInfo);
        this.view.renderLineManageTab();
    }
    
    requestDeleteLine = (idx) => {
        this.subwayManager.deleteLine(idx);
        this.view.renderLineManageTab();
    }
    
    requestAddSection = (station, idx) => {
        this.subwayManager.addSection(station, idx);
        this.view.renderSectionManageDetatil();
    }
    
    requestChangeCurrentManageLine = (newLineName) => {
        this.subwayManager.changeCurrentLine(newLineName);
        this.view.renderSectionManageDetatil();
    }
    
    validStationName(name) {
        if (isInValidNameLength(name)) {
            this.view.alert(ERROR_MSG.INVALID_NAME_LENGTH)
            return true;
        }
        if (isNotDuplicatedName(name, this.subwayManager.getStations())) {
            this.view.alert(ERROR_MSG.DUPLICATED_NAME);
            return true;
        }
        return false;
    }
    
    validLineInfo(lineInfo) {
        if (lineInfo.name.length === 0) {
            this.view.alert(ERROR_MSG.EMPTY_LINE_NAME);
            return true;
        }
        if (this.subwayManager.stations.length < 2) {
            this.view.alert(ERROR_MSG.NOT_ENOUGH_STATION);
            return true;
        }
        if (lineInfo.start === lineInfo.end) {
            this.view.alert(ERROR_MSG.SAME_START_END_STATION);
            return true;
        }
        if (isNotDuplicatedName(lineInfo.name, this.subwayManager.lines)) {
            this.view.alert(ERROR_MSG.DUPLICATED_NAME);
            return true;
        }
        return false;
    }
}

new App();