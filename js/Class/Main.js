class Main {
    constructor() {
        this.loop = new GameLoop(120);
        this.view = new View(document.getElementById('renderElement'), this);
        this.input = new Input(this.loop);
    }
    
    startGame(){
        this.game = new Game();
    }
}
