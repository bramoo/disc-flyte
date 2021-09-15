import React from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { vec3 } from "../../simulation/util";
import "./ViewBox.css";

export function ViewBox(props) {
    let vertices = [0, 0, 0];
    let count = 0;
    if (props.result) {
        let points = props.result.pos_g.filter((v) => !!v).map((v) => vec3(v.x, v.y, v.z));
        vertices = points.reduce((a, p) => a.concat([p.y, p.z, p.x]), []);
        count = points.length;
    }

    return (
        <div className="view-box">
            <p>{props.result && props.result.pos_g && props.result.pos_g[2].x}</p>
            <Canvas camera={{ position: [0, 0, -5] }}>
                <OrbitControls enablePan={false} />
                <axesHelper />
                <Line color="red" points={vertices} />
            </Canvas>
        </div>
    );
}
