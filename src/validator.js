export function isInValidNameLength(name) {
    return name.length < 2;
}

export function isNotDuplicatedName(_name, targetList) {
    const sameNames = targetList.filter(target => target.name === _name);
    return sameNames.length !== 0;
}

// export function isNotDuplicateLine(lineInfo, targetList) {
//     console.log(lineInfo, targetList);
//     console.log(sameNames);
//     // if (lineInfo.start===targetList.find(line=>line.line))
//
//     // return sameNames.length !== 0;
// }