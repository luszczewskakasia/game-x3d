import * as THREE from 'three';



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


    static second_order_model(object, params, deltaTime) {
        const { damping, frequency, response_factor } = params;
        let setpoint = object.userData.setPosition.clone();
        let setpointPrime = object.userData.setPositionPrime.clone();
        const omega = 2 * Math.PI * frequency;
        const damping_term = damping / (Math.PI * frequency);
        const stiffness_term = 1 / (omega ** 2);

        // Stan początkowy
        let Pos = object.position.clone(); // Początkowe położenie (Vector3)
        let PosPrime = new THREE.Vector3(0, 0, 0); // Prędkość (Vector3)
        let PosDoublePrime = new THREE.Vector3(0, 0, 0); // Przyspieszenie (Vector3)

        const simulate = (time) => {
            requestAnimationFrame(simulate);

            // Ustawienie kroku czasowego (domyślnie 16 ms)
            deltaTime = deltaTime || 0.016;
            setpoint = object.userData.setPosition.clone();
            setpointPrime = object.userData.setPositionPrime.clone();
            Pos = object.position.clone();

            // Prawe strony równania (rhs)
            const rhs = setpoint.clone().add(
                setpointPrime
                    .clone()
                    .multiplyScalar(response_factor * damping / (2 * Math.PI * frequency))
            );

            // Obliczanie przyspieszenia (PosDoublePrime)
            PosDoublePrime = rhs
                .clone()
                .sub(Pos)
                .sub(PosPrime.clone().multiplyScalar(damping_term))
                .multiplyScalar(1 / stiffness_term);

            // Aktualizacja prędkości i pozycji
            PosPrime.add(PosDoublePrime.clone().multiplyScalar(deltaTime)); // Aktualizacja prędkości
            Pos.add(PosPrime.clone().multiplyScalar(deltaTime)); // Aktualizacja pozycji

            object.position.copy(Pos);

            if(!object.userData.active && object.position.clone().sub(setpoint.clone()).length() < 0.01)
            {

                // const snappedX = Math.floor(object.position.x) + 0.5;
                // const snappedZ = Math.floor(object.position.z) + 0.5;
                // object.position.set(snappedX, object.position.y, snappedZ);
            //     return;
            }

        };
        if(object.userData.active || object.position.clone().sub(setpoint.clone()).length() >= 0.001)
        {
            requestAnimationFrame(() => simulate());
        }
    }
}