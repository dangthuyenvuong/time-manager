export const currency = (num: number) => {
    return num.toLocaleString('en-US')
}

export const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}