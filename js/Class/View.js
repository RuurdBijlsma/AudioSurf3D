class View extends Scene {
    constructor(renderElement, main) {
        super(renderElement, main);

        this.controls = new THREE.OrbitControls(this.camera, this.renderElement);

        this.skyBox = new SkyBox(this, 'img/skybox/clouds/');

        this.cube = new Cube(this);
        this.sphere = new Sphere(this, 0, 0, 3, 0.5, 0x0022d2);
        this.floor = new Cube(this, 0, -1, 0, 20, 1, 20, 0xF0F0F0);

        this.track = new RandomTrack(this, 500, 3, 100, 0.5, 0.01);

        this.lights = {
            ambient: new AmbientLight(this),
            directional: new DirectionalLight(this, 10, 6, 4, this.cube.position)
        };
    }
}
