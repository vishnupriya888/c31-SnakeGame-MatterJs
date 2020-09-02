class snakeBit{
    constructor(x, y){
        this.body = Bodies.rectangle(x, y, 20, 20);

        this.width = 20;
        this.height = 20;
        this.color = 200 - window.size * 2;
        if(this.color < 0){
            this.color *= -1;
        }
        if(this.color > 255){
            this.color /= 2;
        }

        console.log(window.colorScheme);

        World.add(world, this.body);
    }

    display(){
        push();

        translate(this.body.position.x, this.body.position.y);
        if(window.colorScheme === 0){
            fill(this.color, 250, this.color/2);
        }else if(window.colorScheme === 1){
            fill(50, this.color, this.color/2);
        }else if(window.colorScheme === 2){
            fill(this.color * 3, this.color, this.color/5);
        }else{
            fill(this.color/2, this.color/8, this.color);
        }

        rect(0, 0, this.width, this.height);

        pop();
    }
}