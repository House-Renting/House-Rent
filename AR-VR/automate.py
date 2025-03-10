import subprocess
import os

COLMAP_EXE = r"C:/Program Files/Colmap/bin/colmap.exe"

class AutomaticModelGenerator:
    def __init__(self, image_Path, workspace_Path):
        self.IMAGE_PATH = image_Path
        self.BASE_DIR = workspace_Path

    def run_colmap(command):
        """Helper function to run COLMAP commands with error handling."""
        
        print(f"Running: {' '.join(command)}")
        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error executing: {' '.join(command)}")
            print(f"Error message: {e}")
            exit(1)

    def generate_3d_model(self):
        """Runs the COLMAP pipeline for 3D reconstruction."""
        
        OUTPUT_PATH = os.path.join(self.BASE_DIR, "models")

        DB_PATH = os.path.join(OUTPUT_PATH, "database.db")
        SPARSE_PATH = os.path.join(OUTPUT_PATH, "sparse")
        DENSE_PATH = os.path.join(OUTPUT_PATH, "dense")
        UNDISTORTED_PATH = os.path.join(OUTPUT_PATH, "undistorted")
        FUSED_PATH = os.path.join(DENSE_PATH, "fused.ply")
        MESH_PATH = os.path.join(DENSE_PATH, "mesh.ply")

        self.run_colmap([
            COLMAP_EXE, "feature_extractor",
            "--database_path", DB_PATH,
            "--image_path", self.IMAGE_PATH,
            "--ImageReader.single_camera", "1"
        ])

        self.run_colmap([
            COLMAP_EXE, "sequential_matcher",
            "--database_path", DB_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "mapper",
            "--database_path", DB_PATH,
            "--image_path", self.IMAGE_PATH,
            "--output_path", SPARSE_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "image_undistorter",
            "--image_path", self.IMAGE_PATH,
            "--input_path", os.path.join(SPARSE_PATH, "0").replace("\\", "/"),
            "--output_path", UNDISTORTED_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "patch_match_stereo",
            "--workspace_path", UNDISTORTED_PATH,
            "--workspace_format", "COLMAP",
            "--PatchMatchStereo.window_radius", "3",
            "--PatchMatchStereo.num_iterations", "3",
            "--PatchMatchStereo.gpu_index", "1"
        ])

        self.run_colmap([
            COLMAP_EXE, "stereo_fusion",
            "--workspace_path", UNDISTORTED_PATH,
            "--workspace_format", "COLMAP",
            "--input_type", "geometric",
            "--output_path", FUSED_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "poisson_mesher",
            "--input_path", FUSED_PATH,
            "--output_path", MESH_PATH
        ])