
var enable_interaction = true;

var t = 0;
var t_rate = 1;

//animation settings
var animation_speed = 30;
var animation_rate = 1/10;
var animation_switch = true;
var animation_direction = false;

var lightness_base = 30;

//spiral settings
var a = 1;
var k = 0.44;
var spacer = 110;
var num_spirals = 1;
var total_increments = 100;
var exponential_size_factor = 1.3;

var stop_animation = false;
var fps, fpsInterval, startTime, now, then, elapsed;

var get_mouse_pos = false;
var get_touch_pos = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(animation_speed);

if(enable_interaction) {

    

    // canvas.addEventListener('keydown', e => {
    // // get_mouse_pos = true;
    // // getMousePosition(canvas, e)
    // num_spirals = num_spirals + 1
    // // check(canvas, e)
    // });
  
    canvas.addEventListener('click', e => {
    getMouseDown(canvas, e)
    });

    document.addEventListener('keydown', dokeydown, false );
      
    // canvas.addEventListener('mouseup', e => {
    // get_mouse_pos = false;
    // });
  
    // canvas.addEventListener('mousemove', function(e) {
    //   if(get_mouse_pos) {
    //     getMousePosition(canvas, e);
    //   }
    // })
    
    // canvas.addEventListener('touchstart', function(e) {
    //     getTouchPosition(canvas,e);
    //     event.preventDefault();
    // }, false);
      
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
    let theta_high_range = 3*Math.PI;
    
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


function dokeydown(e) {
    num_spirals += 1;
    // alert( e.keyCode );

}

// function getMousePosition(canvas, event) {
//     x = (event.clientX/canvas.width - 0.5);
//     y = 1*(event.clientY/canvas.height - 0.5);
//     r = Math.sqrt(x*x+y*y) + 0.001;
//     f = .5*r;
//     f_base = 1-.75*r**2
//     f_amp = 5*(1-r)**4 + .25*r**4;
// }

function check(canvas, e) {
    num_spirals = num_spirals + 1;
    // var code = e.keyCode;
    // switch (code) {
    //     case 37: alert("Left"); break; //Left key
    //     case 38: alert("Up"); break; //Up key
    //     case 39: alert("Right"); break; //Right key
    //     case 40: alert("Down"); break; //Down key
    //     default: alert(code); //Everything else
    // }
}

function getMouseDown(canvas, event) {
    num_spirals = num_spirals + 1;
    // canvas.off();
    canvas.removeEventListener('click',
        getMouseDown,
        false
    );
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