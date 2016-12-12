class View extends Scene {
    constructor(renderElement, main) {
        super(renderElement, main);

        this.skyBox = new SkyBox(this, 'img/skybox/space/');

        this.track = new RandomTrack(this, 500, 3, 100, 0, 0.01);

        this.traversedDistance = 0;
        this.traversalSpeed = 0.0001;
        this.lookAheadDistance = 0.02;
        this.cameraHeight = 10;
        this.loop = main.loop.add(() => this.followPath());

        this.lights = {
            // ambient: new AmbientLight(this),
            // directional: new DirectionalLight(this, 10, 6, 4, this.cube.position),
            point: new PointLight(this)
        };
        this.lights.point.intensity = 1;
        this.lights.point.distance = 50;
    }

    followPath() {
        this.traversedDistance += this.traversalSpeed;

        if (this.traversedDistance > 1 - this.lookAheadDistance)
            this.lookAheadDistance = 1 - this.traversedDistance;

        let cameraPos = this.track.spline.getPoint(this.traversedDistance).add(new THREE.Vector3(0, this.cameraHeight, 0));

        this.camera.position.copy(cameraPos);
        this.camera.lookAt(this.track.spline.getPoint(this.traversedDistance + this.lookAheadDistance));
        // this.camera.lookAt(new THREE.Vector3(0, -this.track.spline.points.length, this.track.spline.points.length * 2));

        this.lights.point.position.copy(cameraPos.add(new THREE.Vector3(0, 3, 1)));
    }
}
