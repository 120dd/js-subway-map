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
    <td>${line.line.at(- 1).name}</td>
    <td>
    <button class=${SELECTORS.LINE_DELETE_BUTTON} data-idx=${idx}>삭제</button>
    </td>
</tr>
    `).join(""),
    SECTION_MANAGE_LINE_BUTTONS: (lineList) => lineList.map((line, idx) => `
    <button data-idx=${idx} class=${SELECTORS.SECTION_LINE_MENU_BUTTON}>${line.name}</button>
    `).join(""),
    SECTION_MANAGE_TAB: (lineList) => `
    <h3>구간을 수정할 노선을 선택해주세요.</h3>
    ${TEMPLATE.SECTION_MANAGE_LINE_BUTTONS(lineList)}
    <div id=${SELECTORS.SECTION_DETAIL}></div>
    `,
    SECTION_DETAIL: (currentLine, stations, currentStations) => `
    <h3>${currentLine} 관리</h3>
    <h4>구간 등록</h4>
    <form>
        <select id=${SELECTORS.SECTION_STATION_SELECTOR}>
        ${TEMPLATE.STATION_SELECT_OPTION(stations)}
        </select>
        <input type="text" placeholder="순서" id=${SELECTORS.SECTION_ORDER_INPUT}/>
        <button id=${SELECTORS.SECTION_ADD_BUTTON}>등록</button>
    </form>
    <table border="1">
    <br/>
    <thead>
        <td>순서</td>
        <td>이름</td>
        <td>설정</td>
    </thead>
    ${TEMPLATE.SECTION_TABLE_ITEM(currentStations)}
</table>
    `,
    SECTION_TABLE_ITEM: (currentLineStation) => currentLineStation.map((station, idx) => `
    <tr>
        <td>${idx}</td>
        <td><span>${station.name}</span></td>
        <td><button class=${SELECTORS.SECTION_DELETE_BUTTON} data-idx=${idx}>노선에서 제거</button></td>
    </tr>
    `).join(""),
}