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
    
    renderLineManageTab() {
        $(SELECTORS.MAIN).innerHTML = TEMPLATE.LINE_MANAGER_TAB(
            this.subWayManager.stations,
            this.subWayManager.lines,
        );
    }
    
    renderSectionManageTab() {
        $(SELECTORS.MAIN).innerHTML = TEMPLATE.SECTION_MANAGE_TAB(this.subWayManager.lines);
    }
    
    renderSectionManageDetatil() {
        const containedStation = this.subWayManager.lines
        .filter(v => v.name === this.subWayManager.currentManagingLine)[ 0 ].line;
        $(SELECTORS.SECTION_DETAIL).innerHTML = TEMPLATE.SECTION_DETAIL(
            this.subWayManager.currentManagingLine,
            this.subWayManager.stations.filter(station => !containedStation.includes(station)),
            this.subWayManager.lines
            .find(line => line.name === this.subWayManager.currentManagingLine).line
        );
    }
    
    registerHeaderClickEvent() {
        $(SELECTORS.APP).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === SELECTORS.STATION_MANAGER_BUTTON) {
                this.renderStationManageTab();
            }
            if (e.target.id === SELECTORS.LINE_MANAGER_BUTTON) {
                this.renderLineManageTab();
            }
            if (e.target.id === SELECTORS.SECTION_MANAGER_BUTTON) {
                this.renderSectionManageTab();
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
    
    registerLineManageClickEvent(addLine, DeleteLine) {
        $(SELECTORS.MAIN).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === SELECTORS.LINE_ADD_BUTTON) {
                addLine({
                    name: $(SELECTORS.LINE_NAME_INPUT).value,
                    start: $(SELECTORS.LINE_START_STATION_SELECTOR).value,
                    end: $(SELECTORS.LINE_END_STATION_SELECTOR).value,
                });
            }
            if (e.target.className === SELECTORS.LINE_DELETE_BUTTON) {
                DeleteLine(e.target.dataset.idx);
            }
        });
    }
    
    registerSectionManageClickEvent(changeCurrentLine, addSection) {
        $(SELECTORS.MAIN).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.className === SELECTORS.SECTION_LINE_MENU_BUTTON) {
                changeCurrentLine(e.target.innerText)
            }
            if (e.target.id === SELECTORS.SECTION_ADD_BUTTON) {
                addSection(
                    $(SELECTORS.SECTION_STATION_SELECTOR).value,
                    $(SELECTORS.SECTION_ORDER_INPUT).value
                );
            }
        });
    }
    
    alert(msg) {
        alert(msg);
    }
    
    confirm(msg) {
        return confirm(msg);
    }
}