export const uuid = () => {
    return (Math.random() * Math.random() * Date.now()).toString();
}

export const clone = <T>(obj: T): T => {
    return <T>JSON.parse(JSON.stringify(obj))
}