const findReverse = <T>(array: T[], callback: (item: T) => any) => {
    for (let i = array.length - 1; i >= 0; i--) {
        if (callback(array[i])) return array[i]
    }
    return null
}


const until = <T>(array: T[], callback: (item: T) => any) => {
    let res: T[] = []
    for (let i = array.length - 1; i >= 0; i--) {
        if (callback(array[i])) res.push(array[i])
    }
    return res
}


const map = <T = any>(object: any, callback: (item: T, i: string) => any) => {
    const res: any[] = []
    for (let i in object) {
        res.push(callback(object[i] as T, i))
    }
    return res
}

const key = <T extends object>(object: T, _key: keyof T) => _key

const _ = {
    array: {
        until,
        findReverse
    },
    object: {
        map, key
    }
}

export default _