class Food{
    constructor(x, y){
        this.body = Bodies.rectangle(x, y, 20, 20);

        this.width = 20;
        this.height = 20;

        World.add(world, this.body);
    }

    display(){
        push();

        translate(this.body.position.x, this.body.position.y);
        fill(0, 200, 250);

        rect(0, 0, this.width, this.height);

        pop();
    }
}