import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./ViewBox.css";
import { vec3 } from "../../simulation/util";

export class ViewBox extends React.Component {
  render() {
    let vertices = new Float32Array();
    let count = 0;
    if(this.props.result) {
        let points = this.props.result.pos_g.filter((v) => !!v).map((v) => vec3(v.x, v.y, v.z));
        vertices = new Float32Array(
          points.reduce((a, p) => a.concat([p.x, p.y, p.z]), [])
        );
        count = points.length;
    }

    return (
      <div className="view-box">
        <Canvas>
          <OrbitControls enablePan={false} />

          <line>
              <lineBasicMaterial color="red" linewidth={5} />
            <bufferGeometry>
              <bufferAttribute
                attachObject={["attributes", "position"]}
                array={vertices}
                itemSize={3}
                count={count}
              />
            </bufferGeometry>
          </line>

          <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </Canvas>
      </div>
    );
  }
}
