import { $ } from "../utils/dom.js";
import { TEMPLATE } from "./templates.js";
import { SELECTORS } from "../constants.js";
import SubwayManager from "../subwayManager.js";

export default class {
    constructor() {
        this.subWayManager = new SubwayManager();
        this.renderHeader();
        this.renderMain();
        this.registerHeaderClickEvent();
    }
    
    renderHeader() {
        $(SELECTORS.APP).insertAdjacentHTML("beforeend", TEMPLATE.HEADER);
    }
    
    renderMain() {
        $(SELECTORS.APP).insertAdjacentHTML("beforeend", TEMPLATE.MAIN);
    }
    
    renderStationManageTab() {
        $(SELECTORS.MAIN).innerHTML = TEMPLATE.STATION_MANAGER_TAB;
        $(SELECTORS.STATION_TABLE_AREA).innerHTML =
            TEMPLATE.STATION_TABLE(this.subWayManager.getStations());
    }
    
    registerHeaderClickEvent() {
        $(SELECTORS.APP).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === SELECTORS.STATION_MANAGER_BUTTON) {
                this.renderStationManageTab();
            }
        });
    }
    
    registerStationManageClickEvent(addStation, deleteStation) {
        $(SELECTORS.MAIN).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === SELECTORS.STATION_ADD_BUTTON) {
                addStation($(SELECTORS.STATION_NAME_INPUT).value);
            }
            if (e.target.className === SELECTORS.STATION_DELETE_BUTTON) {
                deleteStation(e.target.dataset.idx);
            }
        });
    }
    
    alert(msg) {
        alert(msg);
    }
}