import subprocess
import os
import trimesh

COLMAP_EXE = r"C:/Program Files/Colmap/bin/colmap.exe"

class AutomaticModelGenerator:
    def __init__(self, image_Path, workspace_Path):
        self.IMAGE_PATH = image_Path
        self.BASE_DIR = workspace_Path
        
        self.OUTPUT_PATH = os.path.join(self.BASE_DIR, "models")
        
        self.DB_PATH = os.path.join(self.OUTPUT_PATH, "database.db")
        self.SPARSE_PATH = os.path.join(self.OUTPUT_PATH, "sparse")
        self.DENSE_PATH = os.path.join(self.OUTPUT_PATH, "dense")
        self.UNDISTORTED_PATH = os.path.join(self.OUTPUT_PATH, "undistorted")
        self.FUSED_PATH = os.path.join(self.DENSE_PATH, "fused.ply")
        self.MESH_PATH = os.path.join(self.DENSE_PATH, "mesh.ply")
        
        self.initialize_paths()
        
    def run_colmap(self, command):
        """Helper function to run COLMAP commands with error handling."""
        
        print(f"Running: {' '.join(command)}")
        try:
            result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print(result.stdout.decode())
        except subprocess.CalledProcessError as e:
            print(f"Error executing: {' '.join(command)}")
            print(f"Error message: {e.stderr.decode()}")
            exit(1)
            
    def initialize_paths(self):
        "Makes sure that all the Colmap working directories exist, if not then creates the necessary missing directories"
        
        paths = [ self.OUTPUT_PATH, self.DENSE_PATH, self.SPARSE_PATH, self.UNDISTORTED_PATH ]
    
        for path in paths:
            os.makedirs(path, exist_ok=True)
        
    def generate_3d_model(self):
        """Runs the COLMAP pipeline for 3D reconstruction."""
        
        self.run_colmap([
            COLMAP_EXE, "feature_extractor",
            "--database_path", self.DB_PATH,
            "--image_path", self.IMAGE_PATH,
            "--ImageReader.single_camera", "1"
        ])

        self.run_colmap([
            COLMAP_EXE, "sequential_matcher",
            "--database_path", self.DB_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "mapper",
            "--database_path", self.DB_PATH,
            "--image_path", self.IMAGE_PATH,
            "--output_path", self.SPARSE_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "image_undistorter",
            "--image_path", self.IMAGE_PATH,
            "--input_path", os.path.join(self.SPARSE_PATH, "0").replace("\\", "/"),
            "--output_path", self.UNDISTORTED_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "patch_match_stereo",
            "--workspace_path", self.UNDISTORTED_PATH,
            "--workspace_format", "COLMAP",
            "--PatchMatchStereo.window_radius", "3",
            "--PatchMatchStereo.num_iterations", "3",
            "--PatchMatchStereo.gpu_index", "1"
        ])

        self.run_colmap([
            COLMAP_EXE, "stereo_fusion",
            "--workspace_path", self.UNDISTORTED_PATH,
            "--workspace_format", "COLMAP",
            "--input_type", "geometric",
            "--output_path", self.FUSED_PATH
        ])

        self.run_colmap([
            COLMAP_EXE, "poisson_mesher",
            "--input_path", self.FUSED_PATH,
            "--output_path", self.MESH_PATH
        ])
        
    def convert_model(self):
        "Converts the .ply files into .glb file format for efficiency"
        
        if os.path.exists(self.MESH_PATH):
            try:
                model_path = os.path.join(self.OUTPUT_PATH, 'model.glb')
                
                mesh = trimesh.load(self.MESH_PATH)
                mesh.export(model_path)
            except Exception as e:
                print(e)
        else:
            print("Model not found")