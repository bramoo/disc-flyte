import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./ViewBox.css";

export class ViewBox extends React.Component {
    render() {

        return (<div className="view-box">
            <Canvas>
                <mesh>
                    <ambientLight intensity={0.1} />
                    <directionalLight color="red" position={[0, 0, 5]} />
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </Canvas>
        </div>)
    }
}
