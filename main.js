// Select the image input and containers for displaying the original and compressed images
const myImage = document.querySelector("#my_image");
const originalImageContainer = document.querySelector("#original_image_container");
const compressedImageContainer = document.querySelector("#compressed_image_container");

// Add an event listener that triggers when the user selects an image file
myImage.addEventListener("change", (evt) => {
    // Get the selected image file
    const image = evt.target.files[0];

    // Create a FileReader to read the image file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
        // Create a new Image object to display and process the image
        const newImage = new Image();
        newImage.src = reader.result;  // Set the image source to the file's data URL
        newImage.onload = () => {
            // Create a canvas element to draw the image and compress it
            const canvas = document.createElement('canvas');
            canvas.height = newImage.height;  // Set the canvas height equal to the original image
            canvas.width = newImage.width;    // Set the canvas width equal to the original image
            const ctx = canvas.getContext('2d');  // Get the 2D drawing context for the canvas

            // Set the original image display size to 150px and display it in the original image container
            newImage.width = 150;
            originalImageContainer.appendChild(newImage);

            // Draw the image on the canvas
            ctx.drawImage(newImage, 0, 0);

            // Convert the canvas image to a JPEG with 50% quality (compressing it)
            const newUrl = canvas.toDataURL('image/jpeg', 0.5);

            // Display the compressed image in the compressed image container
            compressedImageContainer.innerHTML = `<img src="${newUrl}" width="150" onclick="downloadImage(event)">`;
        };

    };
    // Read the selected image file as a Data URL
    reader.readAsDataURL(image);
});

// Function to download the compressed image when clicked
const downloadImage = (evt) => {
    const a = document.createElement('a');  // Create a new <a> element
    a.download = 'compressed_image.jpeg';   // Set the download attribute with a file name
    a.href = evt.target.src;  // Set the href to the source of the clicked image
    a.target = '_blank';      // Open the download in a new tab
    a.click();  // Simulate a click to trigger the download
};
