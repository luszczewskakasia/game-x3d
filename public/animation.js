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


    // static second_order_model(object, params, deltaTime, is_Animating) {
    //     is_Animating = true;
    //     const { damping, frequency, response_factor } = params;
    //     let setpoint = object.userData.setPosition.clone();
    //     let setpointPrime = object.userData.setPositionPrime.clone();
    //     const omega = 2 * Math.PI * frequency;
    //     const damping_term = damping / (Math.PI * frequency);
    //     const stiffness_term = 1 / (omega ** 2);
    //
    //     // Stan początkowy
    //     let Pos = object.position.clone(); // Początkowe położenie (Vector3)
    //     let PosPrime = new THREE.Vector3(0, 0, 0); // Prędkość (Vector3)
    //     let PosDoublePrime = new THREE.Vector3(0, 0, 0); // Przyspieszenie (Vector3)

    //     const simulate = (time) => {
    //         requestAnimationFrame(simulate);
    //
    //         // Ustawienie kroku czasowego (domyślnie 16 ms)
    //         deltaTime = deltaTime || 0.016;
    //         setpoint = object.userData.setPosition.clone();
    //         setpointPrime = object.userData.setPositionPrime.clone();
    //         Pos = object.position.clone();
    //
    //         // Prawe strony równania (rhs)
    //         const rhs = setpoint.clone().add(
    //             setpointPrime
    //                 .clone()
    //                 .multiplyScalar(response_factor * damping / (2 * Math.PI * frequency))
    //         );
    //
    //         // Obliczanie przyspieszenia (PosDoublePrime)
    //         PosDoublePrime = rhs
    //             .clone()
    //             .sub(Pos)
    //             .sub(PosPrime.clone().multiplyScalar(damping_term))
    //             .multiplyScalar(1 / stiffness_term);
    //
    //         // Aktualizacja prędkości i pozycji
    //         PosPrime.add(PosDoublePrime.clone().multiplyScalar(deltaTime)); // Aktualizacja prędkości
    //         Pos.add(PosPrime.clone().multiplyScalar(deltaTime)); // Aktualizacja pozycji
    //
    //         object.position.copy(Pos);
    //
    //         if(!object.userData.active && object.position.clone().sub(setpoint.clone()).length() < 0.01)
    //         {
    //
    //             // const snappedX = Math.floor(object.position.x) + 0.5;
    //             // const snappedZ = Math.floor(object.position.z) + 0.5;
    //             // object.position.set(snappedX, object.position.y, snappedZ);
    //         //     return;
    //         }
    //
    //     };
    //     if(object.userData.active || object.position.clone().sub(setpoint.clone()).length() >= 0.001)
    //     {
    //         requestAnimationFrame(() => simulate());
    //     }
    //     else
    //     {
    //        is_Animating = false;
    //     }
    // }

    static second_order_model(object, params, deltaTime, is_Animating) {
        is_Animating = true;
        const { damping, frequency, response_factor } = params;
        let setpoint = object.userData.setPosition.clone();
        let setpointPrime = object.userData.setPositionPrime.clone();
        const omega = 2 * Math.PI * frequency;
        const damping_term = damping / (Math.PI * frequency);
        const stiffness_term = 1 / (omega ** 2);

        let Pos = object.position.clone();
        let PosPrime = new THREE.Vector3(0, 0, 0);
        let PosDoublePrime = new THREE.Vector3(0, 0, 0);
        const simulate = (time) => {
            requestAnimationFrame(simulate);

            deltaTime = deltaTime || 0.016;
            setpoint = object.userData.setPosition.clone();
            setpointPrime = object.userData.setPositionPrime.clone();

            Pos.x = object.position.x;
            Pos.z = object.position.z;

            const rhs = setpoint.clone().add(
                setpointPrime
                    .clone()
                    .multiplyScalar(response_factor * damping / (2 * Math.PI * frequency))
            );

            PosDoublePrime = rhs
                .clone()
                .sub(Pos)
                .sub(PosPrime.clone().multiplyScalar(damping_term))
                .multiplyScalar(1 / stiffness_term);

            PosPrime.x += PosDoublePrime.x * deltaTime;
            PosPrime.z += PosDoublePrime.z * deltaTime;
            Pos.x += PosPrime.x * deltaTime;
            Pos.z += PosPrime.z * deltaTime;
            object.position.set(Pos.x, object.position.y, Pos.z);

            if (!object.userData.active && object.position.clone().sub(setpoint.clone()).length() < 0.01) {
                return;
            }
        };

        if (object.userData.active || object.position.clone().sub(setpoint.clone()).length() >= 0.001) {
            requestAnimationFrame(() => simulate());
        } else {
            is_Animating = false;
        }
    }
    static Piece_up(object, is_Animating) {
        const animation_duration = 1.0;
        const starting_position = 0.5;
        const target_position = 2.4;
        const animate_up = (time) => {
            is_Animating = true;
            requestAnimationFrame(animate_up);
            if (!this.startTime) {
                this.startTime = time;
            }
            const elapsed = (time - this.startTime) / 1000;

            if (elapsed >= animation_duration) {
                object.position.y = target_position;
                is_Animating = false;
                return;
            }
            const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
            object.position.y = starting_position + (target_position - starting_position) * easing_factor;

            requestAnimationFrame(() => animate_up);
        }
        requestAnimationFrame(animate_up);
    }


    static Piece_down(object, is_Animating)
    {
        const animation_duration = 1.0;
        const starting_position = 3.0;
        const target_position = 0.5;
        const animate_down = (time) => {
            is_Animating = true;
            requestAnimationFrame(animate_down);
            console.log(object)
            if (!this.startTime) {
                this.startTime = time;
            }
            const elapsed = (time - this.startTime) / 1000;

            if (elapsed >= animation_duration) {
                object.position.y = target_position;
                is_Animating = false;
                console.log(object)
                return;
            }
            const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
            object.position.y = starting_position + (target_position - starting_position) * easing_factor;

            requestAnimationFrame(() => animate_down);
        }
        requestAnimationFrame(animate_down);
    }

}