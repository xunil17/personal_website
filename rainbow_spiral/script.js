
var enable_interaction = true;

var t = 0;
var t_rate = 1;

//animation settings
var animation_speed = 30; //can't change
var animation_rate = 0.1; // keyboard 3
var animation_switch = true;
var animation_direction = true;

var lightness_base = 30;

//spiral settings

var num_spirals = 4; //scroll wheel
var a = 1; // keyboard 1
var k = 0.44; //keyboard 1
var spacer = 110; //keyboard 2
var total_increments = 100; //keyboard 2
var exponential_size_factor = 1.3;

var stop_animation = false;
var fps, fpsInterval, startTime, now, then, elapsed;

var get_mouse_pos = false;
var get_touch_pos = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(animation_speed);

var ticking = false;

var mouse_setting = 'none';

if(enable_interaction) {

    document.addEventListener('keydown', keyDownFunction, false );

    window.addEventListener('wheel', function(event)
        {
        if (event.deltaY < 0) {
            // console.log('scrolling up');
            num_spirals += 1;
        } else if (event.deltaY > 0) {
            // console.log('scrolling down');

            if (num_spirals >= 2) {
                num_spirals -= 1;
            }
        }
    });
      
 
    canvas.addEventListener('mousedown', e => {
    get_mouse_pos = true;
    getMousePosition(canvas, e)
    });
      
    canvas.addEventListener('mouseup', e => {
    get_mouse_pos = false;
    });

    canvas.addEventListener('mousemove', function(e) {
      if(get_mouse_pos) {
        getMousePosition(canvas, e)
      }
    })
    
    canvas.addEventListener('touchstart', function(e) {
        getTouchPosition(canvas,e);
        event.preventDefault();
    }, false);
      
    // canvas.addEventListener('touchend', function(e) {
 
    // }, false);
      
    // canvas.addEventListener('touchmove', function(e) {
    //     getTouchPosition(canvas,e);
    //     event.preventDefault();
    // }, false);
}


function draw() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    
    // ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, W, H);

    for(i = 0; i<num_spirals; i++) {
        // drawSpiral(i*(2*Math.PI)/num_spirals, `rgba(0, 0, 255, 255)`);
        let theta_offset = i*(2*Math.PI)/num_spirals;
        let hue =  360-i*(360/num_spirals);
        drawSpiral(theta_offset, hue, t); 
    }

    t += t_rate;


 
}

function drawSpiral(theta_offset, hue, t) {
    let theta_low_range =  -3*Math.PI;
    let theta_high_range = 1.5*Math.PI;
    
    let increments = Math.abs(theta_high_range - theta_low_range) / total_increments;

    let theta = theta_low_range - theta_offset;
    // console.log(theta);
    for(j = 0; j<total_increments; j++) {

        let x = a*Math.exp(k*(theta+theta_offset))*Math.cos(theta);
        let y = a*Math.exp(k*(theta+theta_offset))*Math.sin(theta);

        let r = a*Math.exp(k*(theta+theta_offset))

        theta = theta + increments;

        if (animation_switch) {
            if (animation_direction) {
                lightness = 30*Math.cos(animation_rate*(j+t+10)) + lightness_base;
            } else {
                lightness = 30*Math.cos(animation_rate*(t-j+10)) + lightness_base;
            }
            
        } else {
            lightness = lightness_base * 2;
        }
        

        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
        ctx.arc(W/2 + spacer*x,
                H/2 + spacer*y,
                8*r**exponential_size_factor,
        0, 2*Math.PI)
        ctx.fill()
    }
}



function getTouchPosition(canvas, e) {
    num_spirals += 1;
}

function keyDownFunction(e) {
    console.log(e.code);
    switch(e.code) {
        
        case 'Space' : animation_direction = !animation_direction; break;
        case 'Digit1':  bendyActivated(); break;
        case 'Digit2':  spacingActivated(); break;
        case 'Digit3':  animationActivated(); break;
    }
}



function bendyActivated() {
    alert('Bendy Activated (click and/or drag mouse) \n x-axis: curvature \n y-axis: zoom');
    mouse_setting = 'bendy';
}

function spacingActivated() {
    alert('Spacing Activated (click and/or drag mouse) \n x-axis: circle size \n y-axis: circle increments');
    mouse_setting = 'spacing';
}

function animationActivated() {
    alert('Animation Speeds Activated (click and/or drag mouse) \n x-axis: animation rate');
    mouse_setting = 'animation';
}


function getMousePosition(canvas, event) {

    x = (event.clientX/canvas.width - 0.5);
    y = (event.clientY/canvas.height - 0.5);
    // console.log(mouse_setting);
    switch(mouse_setting) {
        case 'bendy': changeSpiralBendy(x,y); break;
        case 'spacing': changeSpiralSpacing(x,y); break;
        case 'animation': changeAnimation(x,y); break;
    }

    // r = Math.sqrt(x*x+y*y) + 0.001;
    // f = .5*r;
    // f_base = 1-.75*r**2
    // f_amp = 5*(1-r)**4 + .25*r**4;
}

function changeSpiralBendy(x,y) {
    // console.log(x);
    k = 0.44 + x/0.5;
    a = (y+1) * 20;
}

function changeSpiralSpacing(x,y) {
    spacer = 110 - x*100;
    total_increments = 100 + y*100;
}

function changeAnimation(x,y) {
    
    // animation_speed = 30 + y*60;
    // animation_rate = (x+0.5)*3;
    animation_rate = Math.abs(x)*3;
    // console.log(animation_speed);
    // console.log(animation_rate);

    // startAnimating(animation_speed);
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
  
     if (stop_animation) {
         return;
     }
 
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
         then = now - (elapsed % fpsInterval);
     
         draw();  
     }
 }