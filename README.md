Image Editor

How JavaScript Works in This Project

This project is built entirely with vanilla JavaScript and uses the HTML5 Canvas API to perform real-time image editing directly in the browser.

Dynamic Filter Generation

Instead of manually creating filter controls in HTML, JavaScript generates all filter sliders dynamically from a filters object. Each filter contains its default value, minimum value, maximum value, and unit. This approach makes the application scalable and allows new filters to be added with minimal code changes.

Image Upload and Rendering

When a user selects an image, JavaScript reads the file using URL.createObjectURL() and loads it into an Image object. Once the image is fully loaded, it is drawn onto an HTML5 canvas, which acts as the editing workspace.

Real-Time Filter Application

Every filter slider has an event listener that detects value changes. Whenever a slider is moved:

The corresponding filter value is updated.
The canvas is cleared.
A CSS filter string is dynamically generated.
The image is redrawn on the canvas with the updated filter settings.

This provides instant visual feedback without requiring page refreshes.

Canvas API Usage

The Canvas API is responsible for:

Displaying the uploaded image.
Applying brightness, contrast, saturation, hue rotation, blur, grayscale, sepia, opacity, and invert effects.
Redrawing the image whenever filter values change.
Generating the final edited image for download.
Preset Management

JavaScript manages filter presets by automatically updating multiple filter values at once. Selecting a preset instantly applies a predefined combination of effects, making image enhancement faster and more user-friendly.

Reset Functionality

The reset feature restores all filters to their default values, updates the slider positions, and redraws the original image on the canvas.

Download Feature

After editing, JavaScript converts the canvas content into an image using canvas.toDataURL(). A temporary download link is then created and triggered automatically, allowing users to save the edited image directly to their device.

Key JavaScript Concepts Used
DOM Manipulation
Event Handling
Object-Based Data Management
Dynamic Element Creation
HTML5 Canvas API
Image Processing
Template Literals
File Handling with URL.createObjectURL()
Real-Time UI Updates

This project helped strengthen my understanding of JavaScript by working extensively with DOM manipulation, event-driven programming, dynamic UI generation, file handling, and the Canvas API for browser-based image processing.