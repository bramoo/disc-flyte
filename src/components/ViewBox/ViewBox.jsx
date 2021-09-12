import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import "./ViewBox.css";

export class ViewBox extends React.Component {
    render() {

        return (<div className="view-box">
            <Canvas>
                <OrbitControls enablePan={false} />

                <mesh>
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Canvas>
        </div>)
    }
}
