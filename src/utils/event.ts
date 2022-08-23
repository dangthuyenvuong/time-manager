export const onEnter = (callback: any) => (e: any) => {
    if (e.key === 'Enter') {
        callback(e.currentTarget.value)
    }
}