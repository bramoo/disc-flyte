import Disc from './disc';
import Throw from './throw';
import T  from './transform';
import { vec3 } from './util';

/**
 * Simulates a disc and throw based on the method in _Simulation of a 
 * spin stabilized sports disc_, Crowther and Potts (2007)
 * and [HuckIt](https://colab.research.google.com/drive/1fwoivf9S6tro1A23yEetisPgexmhfjIK?usp=sharing#scrollTo=PwVmextgTsy7)
 * @param {Disc} disc disc parameters
 * @param {Throw} thrw throw parameters
 */
export default function huckit(disc, thrw) {
    // Simulation controls
    const dt = 0.01; // Timestep in seconds
    let step = 0; // Current step
    const maxSteps = 1000;
    const arraySize = maxSteps + 1;
    let t = new Array(arraySize);

    // Ground coordinate system
    let pos_g = new Array(arraySize); // Disc position in m
    let vel_g = new Array(arraySize); // Disc velocity in m/s
    let acl_g = new Array(arraySize); // Disc acceleration in m/s^2
    let ori_g = new Array(arraySize); // Disc roll, pitch, and yaw in rad
    let rot_g = new Array(arraySize); // Disc roll, pitch, and yaw rate in rad/s

    // Disc coordinate system
    let acl_d = new Array(arraySize);
    let vel_d = new Array(arraySize);
    let rot_d = new Array(arraySize);

    // Side-slip coordinate system
    let acl_s = new Array(arraySize);
    let vel_s = new Array(arraySize);
    let rot_s = new Array(arraySize);
    let beta = new Array(arraySize);

    // Wind coordinate system
    let acl_w = new Array(arraySize);
    let vel_w = new Array(arraySize);
    let alpha = new Array(arraySize);

    // Aerodynamic forces
    let drag = new Array(arraySize);
    let lift = new Array(arraySize);
    let mom = new Array(arraySize);

    debugger;

    // Define disc orientation and velocity from inputs
    ori_g[step] = vec3(thrw.roll_angle, thrw.nose_angle, 0);
    vel_g[step] = vec3(thrw.speed * Math.cos(thrw.launch_angle), 0, thrw.speed * Math.sin(thrw.launch_angle));
    let launch_angle_d = vec3(0, thrw.launch_angle, 0).applyMatrix3(T.groundDisc(ori_g[step]));
    ori_g[step].add(launch_angle_d);

    // Define environmental constants
    const rho = 1.18; // Air density in kg/m^3
    const g = 9.81; // Gravitational acceleration in m/s^2
    thrw.launch_height = launch_height; // Initial height of throw in m
    pos_g[step] = vec3(0, 0, thrw.launch_height);

    // Define derived constants
    const mass = disc.mass;
    const diam = disc.diam;
    const ixy = disc.jxy * mass; // Moment of inertia of disc about roll axis in kg-m^2
    const iz = disc.jz * mass; // Moment of inertia of disc about spin agis in kg-m^2
    const area = Math.PI * (0.5 * diam) ** 2; // Area of disc in m^2
    const omega = thrw.spin * thrw.spindir; // Convert rev/s to rad/s
    const weight = g * mass; // Gravitational force acting on the disc centre of mass in N

    // Loop until disc hits the ground, z-position=0
    while (pos_g[step].z > 0) {
        if (step >= maxSteps) break;

        let ii = 0;
        while (true) {
            // Transform ground velocity to wind coordinate system
            vel_d[step] = vel_g[step].clone().applyMatrix3(T.groundDisc(ori_g[step])); // Transform ground velocity to disc coordinate system
            beta[step] = -Math.atan2(vel_d[step].y, vel_d[step].x); // Calculate side slip angle
            vel_s[step] = vel_d[step].clone().applyMatrix3(T.discSlip(beta[step])); // Transform velocity to zero side slip coordinate system
            alpha[step] = -Math.atan2(vel_s[step].z, vel_s[step].x); // Calculate angle of attack
            vel_w[step] = vel_s[step].clone().applyMatrix3(T.slipWind(alpha[step])); // Transform velocity to wind coordinate system where aerodynamic calculations can be made

            // Transform gravity loads to wind coordinate system
            const grav_d = vec3(0, 0, -weight).applyMatrix3(T.groundDisc(ori_g[step]));
            const grav_s = grav_d.clone().applyMatrix3(T.discSlip(beta[step]));
            const grav_w = grav_s.clone().applyMatrix3(T.slipWind(alpha[step]));

            // Calculate aerodynamic forces on the disc
            drag[step] = 0.5 * rho * vel_w[step].x ** 2 * area * disc.getCd(alpha[step]); // Drag force in N
            lift[step] = 0.5 * rho * vel_w[step].x ** 2 * area * disc.getCl(alpha[step]); // Lift force in N
            mom[step] = 0.5 * rho * vel_w[step].x ** 2 * area * diam * disc.getCm(alpha[step]); // Calculate pitching moment in N-m

            // Calculate body accelerations from second law and force balances
            acl_w[step] = vec3();
            rot_s[step] = vec3();
            acl_w[step].x = (grav_w.x - drag[step]) / mass; // Acceleration due to drag
            acl_w[step].z = (grav_w.z + lift[step]) / mass; // Acceleration due to lift
            acl_w[step].y = grav_w.y / mass; // Acceleration due to side loading
            rot_s[step].x = -mom[step] / (omega * (ixy - iz)); // Roll rate from pitching moment

            // Transform disc acceleration to ground coordinate system
            acl_s[step] = acl_w[step].clone().applyMatrix3(T.windSlip(alpha[step]));
            acl_d[step] = acl_s[step].clone().applyMatrix3(T.slipDisc(beta[step]));
            acl_g[step] = acl_d[step].clone().applyMatrix3(T.discGround(ori_g[step]));

            // Transform roll rate from zero side-slip to ground coordinate system
            rot_d[step] = rot_s[step].clone().applyMatrix3(T.slipDisc(beta[step]));
            rot_g[step] = rot_d[step].clone().applyMatrix3(T.discGround(ori_g[step]));

            // Perform one inner iteration to refine speed and position vectors
            if (step == 0) break; // Do not run inner iterations for initial time step
            if (ii >= 1) break; // Only run one inner iteration

            // Calculate average accelerations and rotation rates between current and previous time steps
            const avg_acl_g = acl_g[step - 1].clone().add(acl_g[step]).multiplyScalar(0.5);
            const avg_rot_g = rot_g[step - 1].clone().add(rot_g[step]).multiplyScalar(0.5);

            // Calculate new velocity, position, and orientation for current time step
            vel_g[step] = vel_g[step - 1].clone().add(avg_acl_g.clone().multiplyScalar(dt));
            pos_g[step] = pos_g[step - 1].clone().add(vel_g[step - 1].clone().multiplyScalar(dt)).add(avg_acl_g.clone().multiplyScalar(0.5 * dt ** 2));
            ori_g[step] = ori_g[step - 1].clone().add(avg_rot_g.clone().multiplyScalar(dt));

            ii++;
        }

        // Estimate disc velocity, position, and orientation at next time step
        vel_g[step + 1] = vel_g[step].clone().add(acl_g[step].clone().multiplyScalar(dt));
        pos_g[step + 1] = pos_g[step].clone().add(vel_g[step].clone().multiplyScalar(dt)).add(acl_g[step].clone().multiplyScalar(0.5 * dt ** 2));
        ori_g[step + 1] = ori_g[step].clone().add(rot_g[step].clone().multiplyScalar(dt));

        // Update simulation variables
        t[step + 1] = t[step] + dt;
        step++;
    }

    thrw.t = t;
    thrw.lift = lift;
    thrw.drag = drag;
    thrw.mom = mom;
    thrw.alpha = alpha;
    thrw.beta = beta;
    thrw.pos_g = pos_g;
    thrw.vel_g = vel_g;
    thrw.acl_g = acl_g;
    thrw.ori_g = ori_g;
    thrw.rot_g = rot_g;
    thrw.vel_d = vel_d;
    thrw.vel_w = vel_w;
    thrw.acl_w = acl_w;
    thrw.rot_s = rot_s;

    return thrw;
}