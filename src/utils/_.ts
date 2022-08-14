const findReverse = <T>(array: T[], callback: (item: T) => any) => {
    for (let i = array.length - 1; i >= 0; i--) {
        if (callback(array[i])) return array[i]
    }
    return null
}


const until = <T>(array: T[], callback: (item: T) => any) => {
    let res : T[] = []
    for (let i = array.length - 1; i >= 0; i--) {
        if (callback(array[i])) res.push(array[i])
    }
    return res
}


const _ = {
    array: {
        until,
        findReverse
    }
}

export default _