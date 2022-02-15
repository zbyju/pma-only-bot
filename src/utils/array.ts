export function removeDuplicates<T>(array: Array<T>): Array<T> {
    return [...new Set(array)]
}

export function countElementInArray<T>(array: Array<T>, e: T): number {
    return array.filter((x) => x === e).length
}
