window.addEventListener('resize',function(event){
    sliderInit();
})
var sliderContainer = document.getElementById('slider');
var slides = document.querySelectorAll('.slider>li');
var slideNav = document.getElementsByClassName('slider-nav')[0];
var btnTemplate = `<button class="nav-btn"></button>`
var maxHeight = 0;
//Nav buttons
for(var i=0;i<slides.length;i++){
    slideNav.innerHTML += btnTemplate;
}
//Clone first and last slide
clone(slides[0],'end','last');
clone(slides[1],'end','last');
clone(slides[slides.length-1],'start','begin');
var sliderNavBtn = document.querySelectorAll('.nav-btn');

var totalSlides = document.querySelectorAll('.slider>li');



//Add data attribute
for(var i=0;i<slides.length;i++){
    sliderNavBtn[i].setAttribute('data-slide-to',i);
}


function clone(slide,pos,refPos){
    var cloneSlide = slide.cloneNode(true);
    var totalSlides = document.querySelectorAll('.slider>li');
    cloneSlide.classList.add('clone-slide');
    if(pos=='start'&&refPos=='begin'){
        totalSlides[0].insertAdjacentElement('beforebegin',cloneSlide);
    }else if(pos=='start'&&refPos=='last'){
        totalSlides[totalSlides-1].insertAdjacentElement('afterend',cloneSlide);
    }else if(pos=='end'&&refPos=='begin'){
        totalSlides[0].insertAdjacentElement('beforebegin',cloneSlide);
    }else if(pos=='end'&&refPos=='last'){
        totalSlides[totalSlides.length-1].insertAdjacentElement('afterend',cloneSlide);
    }
}


function currentSlide(n){
    for(var i=0; i<slides.length;i++){
        if(slides[i].classList.contains('current-slide') && i!=n){
            slides[i].classList.remove('current-slide');
            sliderNavBtn[i].classList.remove('active')
        }else if(i==n){
            slides[i].classList.add('current-slide');
            sliderNavBtn[i].classList.add('active');
        }
    }
}

function hideSlide(){
    for(var i=0;i<totalSlides.length;i++){
        if(totalSlides[i].classList.contains('current-slide')){
           for(var x=0;x<totalSlides.length;x++){
                if(x<i){
                    totalSlides[x].classList.add('hide-slide');
                }else{
                    totalSlides[x].classList.remove('hide-slide');
                }
           }
        }
    }  
}

function sliderInit(){
    var sliderContainer = document.getElementById('slider');
    var sliderNavBtn = document.querySelectorAll('.slider-nav>button');
    var totalSlides = document.querySelectorAll('.slider>li');
    //translateDistance
    var translateDist = slides[1].offsetWidth+40;

    //Initailize
    totalSlides[0].classList.add('hide-slide');
    slides[0].classList.add('current-slide');
    sliderNavBtn[0].classList.add('active');

    //Set width for slidercontainer
    sliderContainer.style.width = `${(totalSlides.length) * translateDist}px`;
    console.log(`${(totalSlides.length) * translateDist}px`,translateDist,totalSlides.length);
    maxHeight = 0;
    sliderContainer.style.height = 'unset';
    for (var i = 0; i < slides.length; i++) {
        maxHeight<slides[i].offsetHeight?maxHeight=slides[i].offsetHeight:maxHeight=maxHeight;
    }
    sliderContainer.style.height = `${maxHeight}px`;
    
    

    //SliderBtn 
    sliderNavBtn.forEach(btn => {
        btn.addEventListener('click',function(event){
            var n = btn.getAttribute('data-slide-to');
            sliderContainer.style.transform = `translateX(-${translateDist*n}px)`;
            currentSlide(n);
            hideSlide();
        });
    });

}


//Sticky Nav
var header = document.getElementsByTagName('header')[0];
window.addEventListener('scroll',function(event){
    if(window.pageYOffset>962){
        header.classList.add('sticky-nav');
    }else{
        header.classList.remove('sticky-nav');
    }
})

//Nav Expanded
var navBtn = document.getElementsByClassName('navbar-btn')[0];
navBtn.addEventListener('click',function(event){
    event.preventDefault();
    header.classList.toggle('nav-open');
})

//Fadein on scroll
var animate = document.querySelectorAll('[data-animate]');
window.addEventListener('load',function(event){

    animateOnScroll();
    sliderInit();

})
window.addEventListener('scroll',function(event){
    animateOnScroll();
})

//OnScroll Detect elements 
function inViewport(element){
    var pos = element.getBoundingClientRect();
    // pos.top>=0 && pos.left>=0&&pos.bottom<=window.innerHeight*1.1
    return pos.top<window.innerHeight/1.1;
}

function animateOnScroll(){
    for(var i=0;i<animate.length;i++){
        if(inViewport(animate[i])&&!animate[i].classList.contains('fade-in')){
            animate[i].classList.add('fade-in');
        }
    }
}