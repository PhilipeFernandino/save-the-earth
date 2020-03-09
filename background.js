let createBackground = () => {
    let canvas = document.createElement('canvas')
    canvas.id = 'background'
    canvas.width = innerWidth
    canvas.height = innerHeight
    let c = canvas.getContext('2d')
    
    class Estrela{
        constructor(x, y, radius, color){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
        }
        draw(){
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
            c.closePath()
        }
    }

    c.fillStyle = '#001933'
    c.fillRect(0, 0, canvas.width, canvas.height)
    let estrelas = []
    for(let i = 0; i < 600; i++){
        let x = randomFloatFromRange(0, canvas.width)
        let y = randomFloatFromRange(0, canvas.height)
        let radius = randomIntFromRange(1, 3)
        let opacity = randomFloatFromRange(0.8, 1)
        let color = 'rgba(248, 248, 249,' + opacity + ')'
        estrelas.push(new Estrela(x, y, radius, color))
    }

    for(let i = 0; i < estrelas.length; i++){
        estrelas[i].draw()
    }
    return canvas.toDataURL()
}