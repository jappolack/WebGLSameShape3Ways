# Same Shape Three Ways

A small Three.js/WebGL demonstration that renders the same square in three different ways:

- **Two triangles:** uses six vertices, with separate triangles sharing the same visual shape.
- **Indexed geometry:** uses four vertices and an index buffer to draw two triangles.
- **PlaneGeometry:** uses Three.js's built-in `PlaneGeometry` helper.

Each square has a white outline and rotates in the scene. The first two squares use vertex colors, while the `PlaneGeometry` square uses a cyan material.

## Run Locally

The project uses ES modules loaded from the Three.js CDN, so serve the files over HTTP instead of opening the HTML file directly.

From the project directory, run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000/SameShape3Ways.html](http://localhost:8000/SameShape3Ways.html) in a browser.

## Controls

Drag with the mouse to orbit the camera. OrbitControls also supports touch gestures on compatible devices.

## Files

- `SameShape3Ways.html` contains the page shell, import map, and on-screen labels.
- `SameShape3Ways.js` creates the scene, camera, geometries, materials, animation loop, and resize handling.