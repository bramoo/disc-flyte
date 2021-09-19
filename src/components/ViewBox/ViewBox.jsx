import React, { useMemo } from "react";
import * as THREE from "three";
import { interpolateSpectral } from "d3-scale-chromatic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { vec3 } from "../../simulation/util";
import "./ViewBox.css";

export function ViewBox(props) {
    const radius = 0.1;
    const aspect = 0.1;

    // fix coordinate system
    const points = props.result.pos_g.map((v) => vec3(v.y, v.z, v.x));
    // ori_g: x=roll y=pitch z=yaw, applied in that order
    const eulers = props.result.ori_g.map(orientation => new THREE.Euler(-orientation.y, orientation.z, -orientation.x, 'ZXY'));
    const hyzer = props.result.ori_g.map(orientation => (orientation.x + Math.PI / 2) / Math.PI);
    const intensity = 30;
    const intensify = x => 1/(1+Math.exp(intensity*(x-0.5)));

    const lefts = eulers.map((e, i) => vec3(-radius, 0, 0).applyEuler(e).add(points[i]));
    const rights = eulers.map((e, i) => vec3(radius, 0, 0).applyEuler(e).add(points[i]));
    const normals = eulers.map(e => vec3(0, -1, 0).applyEuler(e));

    const ribbonGeometry = useMemo(() => {

        let vertices = [];
        let norms = [];
        let colours = [];
        for (let i = 0; i < lefts.length; i++) {
            let c = new THREE.Color(interpolateSpectral(intensify(hyzer[i]))).toArray();

            vertices.push(lefts[i].toArray());
            norms.push(normals[i].toArray());
            colours.push(c);

            vertices.push(rights[i].toArray());
            norms.push(normals[i].toArray());
            colours.push(c);
        }

        let indices = [];
        for (let i = 0; i < lefts.length - 1; i++) {
            indices.push(i * 2, i * 2 + 1, i * 2 + 2); // triangle 1
            indices.push(i * 2 + 1, i * 2 + 3, i * 2 + 2); // triangle 2
        }

        let geom = new THREE.BufferGeometry();
        geom.setIndex(indices);
        geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flat(), 3));
        geom.setAttribute('normal', new THREE.Float32BufferAttribute(norms.flat(), 3));
        geom.setAttribute('color', new THREE.Float32BufferAttribute(colours.flat(), 3));
        return geom;
    }, [lefts, rights, normals, hyzer])


    const width = 10;
    const length = 70;

    return (
        <Canvas camera={{ position: [0, 0, -5] }}>
            <OrbitControls />

            <ambientLight color={0x404040} />
            <pointLight position={[0, 20, 25]} decay={2} />

            <mesh scale={[radius, radius*aspect, radius]} position={points[0]} rotation={eulers[0]}>
                <sphereGeometry />
                <meshStandardMaterial color="#ffa500" />
            </mesh>

            <mesh>
                <primitive object={ribbonGeometry} attach="geometry" />
                <meshBasicMaterial toneMapped={false} vertexColors side={THREE.DoubleSide} />
            </mesh>

            <mesh position={[0, 0, length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width, length]} />
                <meshStandardMaterial color="#00aa00" />
            </mesh>
        </Canvas>
    );
}
