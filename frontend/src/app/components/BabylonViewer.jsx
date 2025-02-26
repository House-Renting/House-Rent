"use client";
import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export default function BabylonViewer({ modelPath }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);

        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        BABYLON.SceneLoader.ImportMesh( "", "../models/", modelPath, scene,
            function (meshes) {
                meshes.forEach(mesh => {
                    mesh.scaling.set(0.1, 0.1, 0.1);
                });
            }
        );

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => engine.resize());

        return () => {
            engine.dispose();
        };
    }, [modelPath]);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};