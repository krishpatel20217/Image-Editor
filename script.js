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
let file = null;
let image = null;

const filtersContainer=document.querySelector(".filters");

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
    
    
    

        input.addEventListener("input",(event)=>{
            filters[name].value=input.value;
            applyFilters();
        })

    return div;
}

function createFilters(){
Object.keys(filters).forEach(key => {

    const filterElement=createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
    // console.log(filterElement);
    
    filtersContainer.appendChild(filterElement);
    
    
});
}
createFilters();

imageInput.addEventListener("change",(event)=>{
    
    const file=event.target.files[0];
    const imagePlaceholder=document.querySelector(".placeholder");
    imageCanvas.style.display="block";
    imagePlaceholder.style.display="none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
})

function applyFilters(){

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

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
}

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

downloadButton.addEventListener("click",()=>{
    const link=document.createElement("a");
    link.download="edited-image.png";
    link.href=imageCanvas.toDataURL();
    link.click();
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

Object.keys(presets).forEach(presetName => {
    const presetButton=document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText=presetName;
    presetsContainer.appendChild(presetButton);


    presetButton.addEventListener("click",()=>{
        const presetFilters=presets[presetName];

        Object.keys(presetFilters).forEach(filterName => {
            filters[filterName].value=presetFilters[filterName];
        });
        applyFilters();
            filtersContainer.innerHTML="";
            createFilters();
    });
});