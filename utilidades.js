let toggle = (bool) =>{
    bool = (bool !== true)
    return bool
}

let getDistance = (x1, y1, x2, y2) => {
    return Math.hypot(x2-x1, y2-y1)
}

let randomIntFromRange = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

let randomFloatFromRange = (min, max) => {
    return Math.random() * (max - min) + min
}