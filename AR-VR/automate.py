import subprocess
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COLMAP_EXE = r"C:/Program Files/Colmap/bin/colmap.exe"

IMAGE_PATH = os.path.join(BASE_DIR, "datasets", "eagle")
OUTPUT_PATH = os.path.join(BASE_DIR, "models")

DB_PATH = os.path.join(OUTPUT_PATH, "database.db")
SPARSE_PATH = os.path.join(OUTPUT_PATH, "sparse")
DENSE_PATH = os.path.join(OUTPUT_PATH, "dense")
UNDISTORTED_PATH = os.path.join(OUTPUT_PATH, "undistorted")
FUSED_PATH = os.path.join(DENSE_PATH, "fused.ply")
MESH_PATH = os.path.join(DENSE_PATH, "mesh.ply")

def run_colmap(command):
    """Helper function to run COLMAP commands with error handling."""
    print(f"Running: {' '.join(command)}")
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing: {' '.join(command)}")
        print(f"Error message: {e}")
        exit(1)

def generate_3d_model():
    """Runs the COLMAP pipeline for 3D reconstruction."""

    run_colmap([
        COLMAP_EXE, "feature_extractor",
        "--database_path", DB_PATH,
        "--image_path", IMAGE_PATH,
        "--ImageReader.single_camera", "1"
    ])

    run_colmap([
        COLMAP_EXE, "sequential_matcher",
        "--database_path", DB_PATH
    ])

    run_colmap([
        COLMAP_EXE, "mapper",
        "--database_path", DB_PATH,
        "--image_path", IMAGE_PATH,
        "--output_path", SPARSE_PATH
    ])

    run_colmap([
        COLMAP_EXE, "image_undistorter",
        "--image_path", IMAGE_PATH,
        "--input_path", os.path.join(SPARSE_PATH, "0").replace("\\", "/"),
        "--output_path", UNDISTORTED_PATH
    ])

    run_colmap([
        COLMAP_EXE, "patch_match_stereo",
        "--workspace_path", UNDISTORTED_PATH,
        "--workspace_format", "COLMAP",
        "--PatchMatchStereo.window_radius", "3",
        "--PatchMatchStereo.num_iterations", "3",
        "--PatchMatchStereo.gpu_index", "1"
    ])

    run_colmap([
        COLMAP_EXE, "stereo_fusion",
        "--workspace_path", UNDISTORTED_PATH,
        "--workspace_format", "COLMAP",
        "--input_type", "geometric",
        "--output_path", FUSED_PATH
    ])

    run_colmap([
        COLMAP_EXE, "poisson_mesher",
        "--input_path", FUSED_PATH,
        "--output_path", MESH_PATH
    ])

if __name__ == "__main__":
    generate_3d_model()
