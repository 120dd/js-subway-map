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
    LINE_MANAGER_TAB: (stations, lines) => `
<br/>
<form>
    <label for=${SELECTORS.LINE_NAME_INPUT}>노선이름</label>
    <br/>
    <input type="text" id=${SELECTORS.LINE_NAME_INPUT} PLACEHOLDER="노선 이름을 입력해주세요">
    <br/>
    <br/>
    <label for=${SELECTORS.LINE_START_STATION_SELECTOR}>상행종점</label>
    <select id=${SELECTORS.LINE_START_STATION_SELECTOR}>
    ${TEMPLATE.STATION_SELECT_OPTION(stations)}
    </select>
    <br/>
    <label for=${SELECTORS.LINE_END_STATION_SELECTOR}>하행종점</label>
    <select id=${SELECTORS.LINE_END_STATION_SELECTOR}>
    ${TEMPLATE.STATION_SELECT_OPTION(stations)}
    </select>
    <br/>
    <br/>
    <button id=${SELECTORS.LINE_ADD_BUTTON}>노선 추가</button>
</form>
<div>
<h2>지하철 노선 목록</h2>
<table border="1">
    <thead>
        <td>노선 이름</td>
        <td>상행 종점역</td>
        <td>하행 종점역</td>
        <td>설정</td>
    </thead>
    ${TEMPLATE.LINE_TABLE_ITEM(lines)}
</table>
</div>
    `,
    STATION_SELECT_OPTION: (stations) => stations.map(station => `
<option value=${station.name}>${station.name}</option>
    `).join(""),
    LINE_TABLE_ITEM: (lines) => lines.map((line, idx) => `
<tr>
    <td>${line.name}</td>
    <td>${line.line[ 0 ].name}</td>
    <td>${line.line[ lines.length ].name}</td>
    <td>
    <button class=${SELECTORS.LINE_DELETE_BUTTON} data-idx=${idx}>삭제</button>
    </td>
</tr>
    `).join(""),
}