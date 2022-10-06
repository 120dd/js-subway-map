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
    }
    
    requestAddStation = (stationName) => {
        if (this.validName(stationName)) {
            return;
        }
        this.subwayManager.addStation(stationName);
        this.view.renderStationManageTab();
    }
    
    requestDeleteStation = (idx) => {
        this.subwayManager.deleteStation(idx);
        this.view.renderStationManageTab();
    }
    
    validName(name) {
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
}

new App();