let canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let c = canvas.getContext('2d')
canvas.style.backgroundImage = 'url('+createBackground()+')'

let frame = 0
let teclas = {}
let balas = []
let meteoros = []
let particulas = []
let clicks = 0
let taxaMeteoros = 90
let score = 0 
let mouse = {
    x: undefined,
    y: undefined
}

let corBase = '#8A6500'
let corCano = '#A2A2A2'
let corMeteoro = '#606060'
let corBala = '#404040'
let corChao = '#0D7F15'
let alturaChao = 770
let canhao = new Canhao(0, 740, 3, 10, 20, corBase, corCano)
let redefineCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let mouseMove = (event) => {
    mouse.x = event.x
    mouse.y = event.y
}

let teclaPressionada = (event) => {
    teclas[event.code] = event.type === 'keydown'
}

let teclaLevantada = (event) => {
    teclas[event.code] = event.type === 'keydown'
}

let atirouBala = () => {
    clicks++
}

addEventListener('resize', redefineCanvas)
addEventListener('mousemove', mouseMove)
addEventListener('keydown', teclaPressionada)
addEventListener('keyup', teclaLevantada)
addEventListener('click', atirouBala)

let drawAmbiente = () => {
    c.beginPath()
    c.fillStyle = corChao
    c.arc(canvas.width/2, canvas.height * 3 / 2, canvas.height * 3 / 4, 0, Math.PI * 2, false)
    c.fill()
    c.closePath()

}

let geraMeteoro = () =>{
    let radius = randomIntFromRange(20, 25)
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = -radius*2
    let dx = x < canvas.width/2 ? randomFloatFromRange(0, 2) : randomFloatFromRange(-2, 0)
    let dy = randomFloatFromRange(6, 8)
    let mass = radius/9
    meteoros.push(new Meteoro(x, y, dx, dy, radius, mass, corMeteoro))
}

let meteoroEliminado = (meteoro, quantidade = 10) => {
    for(let i = 0; i < quantidade; i++){
        let x = randomIntFromRange(meteoro.x - meteoro.radius, meteoro.x + meteoro.radius)
        let y = randomIntFromRange(meteoro.y - meteoro.radius, meteoro.y + meteoro.radius)
        let dx = randomFloatFromRange(-8, 8)
        let dy = randomFloatFromRange(-8, 8)
        let radius = randomIntFromRange(meteoro.radius/10, meteoro.radius/6)
        let ttl = radius * 50
        particulas.push(new Particula(x, y, dx, dy, radius, corMeteoro, ttl))
    }
}

let mostraScore = () => {
    c.font = '22px Comic Sans MS'
    c.fillStyle = '#e8e9e9'
    c.fillRect(10, 10, 60, 50)
    c.fillStyle = '#f8f9f9'
    c.fillRect(10, 10, 55, 45)
    c.fillStyle = 'grey'
    c.fillText(score, 22, 40)
}

let update = () =>{

    requestAnimationFrame(update)
    
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    drawAmbiente()
    canhao.action()

    for(let i = 0; i < balas.length; i++){
        if(balas[i] !== undefined){
            if(balas[i].y + balas[i].radius > canvas.height || balas[i].y - balas[i].radius < 0 || balas[i].x - balas[i].radius < 0 || balas[i].x + balas[i].radius > canvas.width){
                balas[i].finish = true
                score = 0
            }
            if(balas[i].finish){
                balas.splice(i, 1)
            }
            else {balas[i].action()}
        }
    }

    for(let i = 0; i < meteoros.length; i++){
        if(meteoros[i] === undefined){
            continue
        }
        for(let j = 0; j < balas.length; j++){
            if(balas[j] !== undefined && getDistance(balas[j].x, balas[j].y, meteoros[i].x, meteoros[i].y) < meteoros[i].radius + balas[j].radius){
                meteoroEliminado(meteoros[i], 21)
                score++
                balas[j].finish = true
                meteoros[i].finish = true
            }
        }
        if(meteoros[i].finish){meteoros.splice(i, 1)}
        else if(getDistance(meteoros[i].x, meteoros[i].y, canvas.width/2, canvas.height * 3 / 2) < (meteoros[i].radius + canvas.height * 3 / 4)){
            meteoros[i].finish = true
            score = 0
        }
        else{meteoros[i].action()}
    }

    for(let i = 0; i < particulas.length; i++){
        if(particulas[i] !== undefined){
            if(particulas[i].finish){particulas.splice(i, 1)}
            else if(particulas[i].ttl <= 0){particulas.finish = true}
            else particulas[i].action()
        }
    }    

    if(frame % taxaMeteoros === 0){
        geraMeteoro()
    }

    mostraScore()

    frame++
}

update()