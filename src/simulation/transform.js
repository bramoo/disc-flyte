import * as THREE from 'three';

export default class Transform {
    static groundDisc(angles) {
      const phi = angles.x;
      const theta = angles.y;
      const psi = angles.z;
      
      const cosPhi = Math.cos(phi);
      const cosTheta = Math.cos(theta);
      const cosPsi = Math.cos(psi);
  
      const sinPhi = Math.sin(phi);
      const sinTheta = Math.sin(theta);
      const sinPsi = Math.sin(psi);
      
      return new THREE.Matrix3().set(
        cosTheta*cosPsi,  sinPhi*sinTheta*cosPsi - cosPhi*sinPsi,   cosPhi*sinTheta*cosPsi + sinPhi*sinPhi,
        cosTheta*sinPsi,  sinPhi*sinTheta*sinPsi + cosPhi*cosPsi,   cosPhi*sinTheta*sinPsi - sinPhi*cosPsi,
        -sinTheta,        sinPhi*cosTheta,                          cosPhi*cosTheta
      );
    }
    
    static discGround(angles) {
      const phi = angles.x;
      const theta = angles.y;
      const psi = angles.z;
  
      const cosPhi = Math.cos(phi);
      const cosTheta = Math.cos(theta);
      const cosPsi = Math.cos(psi);
  
      const sinPhi = Math.sin(phi);
      const sinTheta = Math.sin(theta);
      const sinPsi = Math.sin(psi);
  
      return new THREE.Matrix3().set(
        cosTheta*cosPsi,                         cosTheta*sinPsi,                         -sinTheta,
        sinPhi*sinTheta*cosPsi - cosPhi*sinPsi,  sinPhi*sinTheta*sinPsi + cosPhi*cosPsi,  sinPhi*cosTheta,
        cosPhi*sinTheta*cosPsi + sinPhi*sinPsi,  cosPhi*sinTheta*sinPsi - sinPhi*cosPsi,  cosPhi*cosTheta
      );
    }
    
    static discSlip(beta) {
      const cos = Math.cos(beta);
      const sin = Math.sin(beta);
      
      return new THREE.Matrix3().set(
        cos, -sin, 0,
        sin, cos,  0,
        0,   0,    1
      );
    }
    
    static slipDisc(beta) {
      const cos = Math.cos(beta);
      const sin = Math.sin(beta);
      
      return new THREE.Matrix3().set(
        cos, sin, 0,
        -sin, cos,  0,
        0,   0,    1
      );
    }
    
    static slipWind(alpha) {
      const cos = Math.cos(alpha);
      const sin = Math.sin(alpha);
      
      return new THREE.Matrix3().set(
        cos, 0,  -sin,
        0,   1,  0,
        sin, 0,  cos
      );
    }
    
    static windSlip(alpha) {
      const cos = Math.cos(alpha);
      const sin = Math.sin(alpha);
      
      return new THREE.Matrix3().set(
        cos, 0,  sin,
        0,   1,  0,
        -sin, 0,  cos
      );
    }
  }