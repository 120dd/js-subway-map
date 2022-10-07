export function isInValidNameLength(name) {
    return name.length < 2;
}

export function isNotDuplicatedName(_name, targetList) {
    const sameNames = targetList.filter(target => target.name === _name);
    return sameNames.length !== 0;
}