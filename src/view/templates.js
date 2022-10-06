import { SELECTORS } from "../constants.js";

export const TEMPLATE = {
    HEADER: `
<header>
    <button id=${SELECTORS.STATION_MANAGER_BUTTON}>1. 역관리</button>
    <button id=${SELECTORS.LINE_MANAGER_BUTTON}>1. 노선관리</button>
    <button id=${SELECTORS.SECTION_MANAGER_BUTTON}>1. 구간관리</button>
    <button id=${SELECTORS.MAP_PRINT_MANAGER_BUTTON}>1. 지하철 노선도 출력</button>
</header>
    `,
    MAIN: `<main id=${SELECTORS.MAIN}></main>`,
    STATION_MANAGER_TAB: `
<br/>
<form>
    <div><strong>역 이름</strong></div>
    <input type="text" id=${SELECTORS.STATION_NAME_INPUT}>
    <button id=${SELECTORS.STATION_ADD_BUTTON}>역 추가</button>
</form>
<div id=${SELECTORS.STATION_TABLE_AREA}></div>
    `,
    STATION_TABLE_ITEM: (stations) => stations.map((station, idx) => `
<tr>
    <td>${station.name}</td>
    <td>
    <button class=${SELECTORS.STATION_DELETE_BUTTON} data-idx=${idx}>삭제</button>
    </td>
</tr>
    `).join(""),
    STATION_TABLE: (stations) => `
<h1>지하철 역 목록</h1>
<table border="1">
    <thead>
        <td>역 이름</td>
        <td>설정</td>
    </thead>
    ${TEMPLATE.STATION_TABLE_ITEM(stations)}
</table>
    `,
}