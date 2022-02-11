
var arr = Array(0);
const width = window.innerWidth;
const height = window.innerHeight - 200;
var thick = 20;
var len_arr = Math.floor(width / thick);
var sorted_arr = Array(0);
var start_sorting = false;
var frame_rate_val = 40;
var timer_arr = [];
var time_taken = 0;
var pause = false;

class Element {
    constructor(val) {
        this.val = val;
        this.compare = false;
        this.swap = false;
        this.sub_arr = false;
    }

    draw(i, color = 255) {
        fill(color);
        if (this.compare == true) {
            fill(0, 0, 255);
        }
        if (this.swap == true) {
            fill(255, 0, 0);
        }
        stroke(0);
        this.swap = false;
        this.compare = false; 
        this.pivot = false; 
        rect(i * thick, height - this.val + 1, thick, this.val);
        if (thick > 5) {
            noStroke(); 
            ellipse(
                i * thick + thick / 2 + 0.5,
                height - this.val + 1,
                thick - 1
            );
            
        }
    }
}

const algo_dict = {
    bubbleSort: bubbleSort,
    selectionSort: selectionSort,
    mergeSort: mergeSort,
    quickSort: quickSortLomuto,
};
const timer_algo = {
    bubbleSort: bubbleSort_t,
    selectionSort: selectionSort_t,
    mergeSort: mergeSort_t,
    quickSort: quickSortLomuto_t,
};


function setup() {
    print_hello();
    createCanvas(width, height);
    var btns = document.querySelectorAll(".clickable"); 
    
    for (btn of btns) {
        btn.addEventListener("click", function () {
            
            if (this.id == "reset") {
                
                arr = [];
                sorted_arr = [];
                start_sorting = false;
                frameRate(frame_rate_val);
                setup_arr();
                document.getElementById("time").innerHTML = "Time: 0us";
                document.getElementById("frm").value = "40";
            } else {
                if (this.id != "") {
                    if (start_sorting == false) {
                        
                        start_sorting = true;
                        start_sort(this.id);
                        time_this_algo(this.id);
                        frameRate(frame_rate_val);
                    } else {
                        
                        arr = [];
                        sorted_arr = [];
                        start_sorting = false;
                        frameRate(frame_rate_val);
                        setup_arr();
                        document.getElementById("time").innerHTML = "Time:0us";
                        start_sorting = true;
                        time_this_algo(this.id);
                        start_sort(this.id);
                    }
                }
            }

            return true;
        });
    }
    slider_control(); 
    setup_arr(); 
}
function time_this_algo(algo) {
    
    var t0 = window.performance.now();
    timer_loop = timer_algo[algo](timer_arr);
    var t1 = window.performance.now();
    console.log(t1 - t0);
    time = (t1 - t0) * 1000;
    time = Math.round(time);
    t1 = 0;
    t0 = 0;
    if (time == 0) {
        time = 0.01;
    }
    if (time < 1000) {
        document.getElementById("time").innerHTML =
            "Time: " + String(time) + "us";
    } else {
        document.getElementById("time").innerHTML =
            "Time: " + String(Math.round(time / 1000)) + "ms";
    }
    
    
}
function slider_control() {
    var size_slider = document.getElementById("data_size");
    size_slider.oninput = function () {
        thick = 62 - size_slider.value;
        
        len_arr = Math.floor(width / thick);
        
        arr = [];
        sorted_arr = [];
        start_sorting = false;
        frameRate(frame_rate_val);
        setup_arr();
        
    };
    var frm_slider = document.getElementById("frm");
    
    frm_slider.oninput = function () {
        
        
        if (this.value == 0) {
            frame_rate_val = 0;
            frameRate(0);
        }
        if (1 < this.value && this.value <= 10) {
            if (frameRate() != 5) {
                frame_rate_val = 5;
                frameRate(5);
            }
        }
        if (11 < this.value && this.value <= 20) {
            if (frameRate() != 20) {
                frame_rate_val = 20;
                frameRate(20);
            }
        }
        if (21 < this.value && this.value <= 30) {
            if (frameRate() != 40) {
                frame_rate_val = 40;
                frameRate(40);
            }
        }
        if (35 < this.value && this.value <= 40) {
            if (frameRate() != 60) {
                frame_rate_val = 60;
                frameRate(60);
            }
        }
    };
}
function setup_arr() {
    for (let i = 0; i < len_arr; i++) {
        push_value = random(thick, height - thick); 
        arr.push(new Element(push_value));
        sorted_arr.push(push_value);
        timer_arr.push(new Element(push_value));
    }
    sort_the_arr(sorted_arr);
}
function start_sort(algo) {
    loop_counter = algo_dict[algo](arr);
}
function draw() {
    background(0);

    if (start_sorting == true) {
        loop_counter.next();
    }
    draw_arr();
}

function draw_arr() {
    for (let i = 0; i < arr.length; i++) {
        arr[i].draw(i);
        if (sorted_arr[i] == arr[i].val) {
            arr[i].draw(i, color(0, 255, 0));
        }
    }
}
function sort_the_arr(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

function print_hello() {
    console.log('Hellooo human!');
}
