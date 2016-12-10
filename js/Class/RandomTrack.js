class RandomTrack extends THREE.Group {
    constructor(scene, length = 100, width = 3, maxHeight = 10, startIntensity = 0.5, wildness = 0.1) {
        super();

        this.notes = [];
        this.length = length;
        this.width = width;
        this.wildness = wildness / 2;
        this.startIntensity = startIntensity;
        this.maxHeight = maxHeight;

        this.generateTrack();
        this.generateMeshes();

        scene.add(this);
    }

    generateMeshes() {
        let greyMaterial = new THREE.MeshStandardMaterial({
                color: 0x999999
            }),
            noteMaterial = new THREE.MeshStandardMaterial({
                color: 0xFF00FF
            }),
            noteGeometry = new THREE.BoxGeometry(0.5, 0.25, 0.25);

        for (let n = 0; n < this.notes.length; n++) {
            let note = this.notes[n],
                row = new THREE.Group();
            for (let t = 0; t < note.types.length; t++) {
                let type = note.types[t];
                if (type !== NoteType.EMPTY) {
                    let mesh = new THREE.Mesh(noteGeometry, type === NoteType.NOTE ? noteMaterial : greyMaterial);
                    mesh.position.x = t;
                    row.add(mesh);
                }
            }
            row.position.z = n;
            row.position.y = note.intensity * this.maxHeight;
            this.add(row);
        }
    }

    generateTrack() {
        let notes = [];
        for (let i = 0; i < this.length; i++) {
            let intensity = this.startIntensity - (this.wildness - Math.random() * (this.wildness * 2)),
                notePosition = Math.floor(Math.random() * this.width),
                noteType = Math.floor(Math.random() * 3),
                note = new Note(this.width, notePosition, noteType, intensity);
            this.startIntensity = note.intensity;

            this.notes.push(note);
        }
    }
}
