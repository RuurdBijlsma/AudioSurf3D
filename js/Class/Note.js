class Note {
    constructor(time, width = 3, position = 1, type = NoteType.NOTE, intensity = 0.5) {
        this.types = new Array(width);
        this.time = time;

        for (let i = 0; i < width; i++)
            this.types[i] = NoteType.EMPTY;

        this.types[position] = type;
        this.intensity = intensity;
    }

    get intensity() {
        return this._intensity;
    }

    set intensity(v) {
        v = v < 0 ? 0 : v;
        v = v > 1 ? 1 : v;

        this._intensity = v;
    }
}
