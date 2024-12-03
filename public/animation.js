
export class Animation {
    constructor() {
        this.startTime = 10000;
    }

    static bounce(object, amplitude, frequency, damping, starting_position) {
        const animate = (time) => {
            requestAnimationFrame(animate);
            if (!this.startTime) {
                this.startTime = time;
            } 

            const elapsed = (time - this.startTime) / 1000;

            const current_amplitude = amplitude * Math.exp(-damping * elapsed);

            if (current_amplitude < 0.05) {
                object.position.y = starting_position;
                return;
            }

            object.position.y = starting_position + current_amplitude * Math.sin(2 * Math.PI * frequency * elapsed);

            
        };

        requestAnimationFrame(animate);
    }
}