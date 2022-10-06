export function isInValidNameLength(name) {
    return name.length < 2;
}

export function isNotDuplicatedName(name, stations) {
    const sameNames = stations.filter(station => station.name === name);
    return sameNames.length !== 0;
}