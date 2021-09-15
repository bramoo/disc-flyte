import { interp } from './util';

export default class Disc {
    constructor(name) {
      this.name = name;
      this.aoarange = [0]; // Angle of Attact at which the aerodynamic coefficients have been measured. Must be sorted in ascending order
      this.cl = [0]; // Coefficients of lift for each AoA
      this.cd = [0]; // Coefficients of drag for each AoA
      this.cm = [0]; // Coefficients of pitching moment for each AoA
      this.jxy = 0; // Normalized mass moment of inertia about the roll/pitch axis in m^2
      this.jz = 0; // Normalized mass moment of inertia about the spin axis in m^2
      this.diam = 0; // Disc diameter in m
    }
    
    getCl(aoa) {
      return interp(aoa, this.aoarange, this.cl);
    }
    
    getCd(aoa) {
      return interp(aoa, this.aoarange, this.cd);
    }
    
    getCm(aoa) {
      return interp(aoa, this.aoarange, this.cm);
    }
  }