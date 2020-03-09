class Prototipo{
    constructor(x, y, dx, dy, radius, color){
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.color = color
        this.radius = radius
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
}
class Particula extends Prototipo{
    constructor(x, y, dx, dy, radius, color, ttl){
        super(x, y, dx, dy, radius, color)
        this.ttl = ttl
    }
    move(){
        this.x += this.dx
        this.y += this.dy
    }
    action(){
        this.move()
        this.draw()
        this.ttl--
    }
}
class Bala extends Prototipo{
    constructor(x, y, dx, dy, radius, mass, color){
        super(x, y, dx, dy, radius, color)
        this.finish = false
        this.mass = mass
    }
    move(){
        this.x += this.dx
        this.y += this.dy
        this.dy += this.mass * 0.2
        if(this.y - this.radius > canvas.height) {this.finish = true}
        if(this.x -this.radius < 0 || this.x + this.radius > canvas.width) {this.finish = true}
    }
    action(){
        if(!this.finish){
            this.move()
            this.draw()
        }
    }
}
class Meteoro extends Prototipo{
    constructor(x, y, dx, dy, radius, mass, color){
        super(x, y, dx, dy, radius, color)
        this.finish = false
        this.mass = mass
    }
    move(){
        this.dy += 0.02 * this.mass
        this.x += this.dx
        this.y += this.dy
    }
    action(){
        if(!this.finish){
            this.move()
            this.draw()
        }
    }
}
class Canhao{
    constructor(x, y, dx, width, height, corBase, corCano) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.colorBase = corBase
        this.colorCano = corCano
        this.dx = dx
        this.dy = dx
        this.radius = 10
    }
    shoot(){
        if(clicks > 0){
            let ang = Math.atan2(mouse.y - this.y, mouse.x - this.x)
            let dx = Math.cos(ang) * 22
            let dy = Math.sin(ang) * 22
            balas.push(new Bala(this.x, this.y, dx, dy, 8, 1, corBala))
            clicks--
        }
    }
    walk(){
        if(teclas['KeyA'] && (this.x - this.dx) > 0) {
            this.x -= this.dx 
        }
        if(teclas['KeyD'] && (this.x + this.dx) < canvas.width) {
            this.x += this.dx
        }    

        if(getDistance(this.x, this.y, canvas.width/2, canvas.height * 3 /2) > (this.radius + canvas.height * 3 / 4)){
            this.y += this.dy
        }
        if(getDistance(this.x, this.y, canvas.width/2, canvas.height * 3 /2) < (this.radius + canvas.height * 3 / 4)){
            this.y -= this.dy
        }
    }
    draw(){
        c.beginPath()
        c.setTransform(1, 0, 0, 1, this.x, this.y)    
        c.rotate(Math.atan2(mouse.y - this.y, mouse.x - this.x) - 90 * Math.PI / 180)
        c.fillStyle = this.colorBase
        c.arc(0, 0, this.radius, 0, Math.PI * 2, false)
        c.fill()
        c.fillStyle = this.colorCano
        c.fillRect(-this.width/2, this.height/2 - 1, this.width, this.height)
        c.setTransform(1, 0, 0, 1, 0, 0) 
        c.closePath()
    }
    action(){
        this.walk()
        this.draw()
        this.shoot()
    }
}