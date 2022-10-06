import { $ } from "../utils/dom.js";
import { TEMPLATE } from "./templates.js";
import { SELECTORS } from "../constants.js";

export default class {
    constructor() {
        this.renderHeader();
        this.registerHeaderClickEvent();
    }
    
    renderHeader() {
        $(SELECTORS.APP).insertAdjacentHTML("beforeend", TEMPLATE.HEADER);
    }
    
    renderStationManageTab() {
        $(SELECTORS.APP).insertAdjacentHTML("beforeend", TEMPLATE.HEADER);
    }
    
    registerHeaderClickEvent() {
        $(SELECTORS.APP).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === SELECTORS.STATION_MANAGER_BUTTON) {
                this.renderStationManageTab();
            }
        });
    }
}