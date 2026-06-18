// filters object to store the filter values and their min, max, and unit
let filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    huerotate:{
        value:0,
        min:0,
        max:360,
        unit:"deg",
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px",
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%",
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    }
}

const imageCanvas=document.querySelector("#image-canvas");
const imageInput=document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton=document.querySelector("#reset-btn");
const downloadButton=document.querySelector("#download-btn");
const presetsContainer=document.querySelector(".presets");
// file and image variables to store the uploaded file and the image object
let file = null;
let image = null;

const filtersContainer=document.querySelector(".filters");

// createFilterElement function to create a filter element with a range input and a label and add it to the filters container
// this function is not called yet
function createFilterElement(name,unit="%",value,min,max){
    const div=document.createElement("div");
    div.classList.add("filter");

    const input=document.createElement("input");
    input.type="range";
    input.min=min;
    input.max=max;
    input.value=value;
    input.id=name;

    const p=document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    //                  <div class="filter">
    //                     <p>brightness</p>
    //                     <input type="range" min="0" max="200" id="brightness">
    //                  </div>

        input.addEventListener("input",(event)=>{
            filters[name].value=input.value;
        //filters[brightness].value=150; this is what we are doing in the above line 
            applyFilters();
        })

    return div;
}

function createFilters(){
// here Object.keys(filters) is doing
// ['brightness', 'contrast', 'saturation', 'huerotate', 'blur', 'grayscale', 'sepia', 'opacity', 'invert']
Object.keys(filters).forEach(key => {

    // createFilterElement function is returning a div element which has p and input elements inside it.
    // so bascically it is returning a like brightness container  
    const filterElement=createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
    // console.log(filterElement);
    
    // now that is appended to the filters container which is in the html file
    filtersContainer.appendChild(filterElement);
    
    
});
}
createFilters();
//by calling this function we are creating the filters and appending them to the filters container in the html file

imageInput.addEventListener("change",(event)=>{
    
    // before this we aready set the value of file and image to null 
    const file=event.target.files[0];
    // file=event.target.files[0] this saves the first selected file in the file variable
    const imagePlaceholder=document.querySelector(".placeholder");
    imageCanvas.style.display="block";
    // imageCanvas.style.display="block"; that canvas element is hidden by default but when we select an image it will be displayed
    imagePlaceholder.style.display="none";
    // and that placeholder which is in the html file will be hidden when we select an image


    //just like we create a imag tag in html we can also create it in js using new Image() constructor and then we can set the src of that image to the selected file using URL.createObjectURL(file) method
    const img = new Image();
    img.src = URL.createObjectURL(file);
    //createObjectURL(file) is converting the selected file into a url which can be used as the src of the image

    //const img = new Image();
    //img.src = URL.createObjectURL(file); from this the image is loaded but we can not call canvasCtx.drawImage(img, 0, 0); immediately because the image is not loaded yet so we have to wait for the image to load and then we can call the drawImage method to draw the image on the canvas and for that we can use the onload event of the image object
    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
})
// by this on click we are outputing the image to the screen

function applyFilters(){

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    //canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height); this will cleare the drawing that are done before this is specially helps for opacity

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit}) 
    contrast(${filters.contrast.value}${filters.contrast.unit}) 
    saturate(${filters.saturation.value}${filters.saturation.unit}) 
    hue-rotate(${filters.huerotate.value}${filters.huerotate.unit})
    blur(${filters.blur.value}${filters.blur.unit}) 
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit}) 
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})     `.trim();
    canvasCtx.drawImage(image, 0, 0);
    // this will draw the image with the new changed output
}
// the filters are applied on image

resetButton.addEventListener("click",()=>{
filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    huerotate:{
        value:0,
        min:0,
        max:360,
        unit:"deg",
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px",
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%",
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    }
}

applyFilters();

filtersContainer.innerHTML="";
createFilters();
})
// this will just reset the values

downloadButton.addEventListener("click",()=>{
    const link=document.createElement("a");
    // inside link we created the anchor element
    link.download="edited-image.png";
    // this wills says that download the link and dont open it this just gives file name
    link.href=imageCanvas.toDataURL();
    //canvas image is converted into href
    link.click();
    // instead of clicking anchor tag this clicks the link automatically
})


const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        huerotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    drama: {
        brightness: 90,
        contrast: 160,
        saturation: 120,
        huerotate: 0,
        blur: 0,
        grayscale: 10,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 80,
        huerotate: -10,
        blur: 0,
        grayscale: 15,
        sepia: 45,
        opacity: 100,
        invert: 0,
    },

    oldSchool: {
        brightness: 95,
        contrast: 120,
        saturation: 70,
        huerotate: 5,
        blur: 1,
        grayscale: 30,
        sepia: 65,
        opacity: 100,
        invert: 0,
    },

    noir: {
        brightness: 95,
        contrast: 180,
        saturation: 0,
        huerotate: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 105,
        contrast: 110,
        saturation: 125,
        huerotate: -15,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 115,
        huerotate: 20,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    faded: {
        brightness: 110,
        contrast: 75,
        saturation: 70,
        huerotate: 0,
        blur: 0,
        grayscale: 15,
        sepia: 20,
        opacity: 90,
        invert: 0,
    },

    vivid: {
        brightness: 110,
        contrast: 130,
        saturation: 170,
        huerotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    cinematic: {
        brightness: 90,
        contrast: 140,
        saturation: 85,
        huerotate: -12,
        blur: 0,
        grayscale: 5,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    dreamy: {
        brightness: 115,
        contrast: 90,
        saturation: 115,
        huerotate: 10,
        blur: 2,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    moody: {
        brightness: 80,
        contrast: 150,
        saturation: 70,
        huerotate: -5,
        blur: 0,
        grayscale: 20,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    sunset: {
        brightness: 110,
        contrast: 115,
        saturation: 140,
        huerotate: -20,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0,
    },

    icy: {
        brightness: 105,
        contrast: 115,
        saturation: 110,
        huerotate: 35,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    inverted: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        huerotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 100,
    }
};
//['original', 'drama', 'vintage', 'oldSchool', 'noir', 'warm', 'cool', 'faded', 'vivid', 'cinematic', 'dreamy', 'moody', 'sunset', 'icy', 'inverted']
Object.keys(presets).forEach(presetName => {
    const presetButton=document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText=presetName;
    presetsContainer.appendChild(presetButton);


    presetButton.addEventListener("click",()=>{
        const presetFilters=presets[presetName];

        Object.keys(presetFilters).forEach(filterName => {
        // all the element of the brightness before = all the elements of the brightness for the preset filter name
            filters[filterName].value=presetFilters[filterName];
        });
        applyFilters();
            filtersContainer.innerHTML="";
            createFilters();
    });
});