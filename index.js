var 
img_ele = null,
x_cursor = 0,
y_cursor = 0,
x_img_ele = 0,
y_img_ele = 0,
w_container = document.getElementById("container").getBoundingClientRect().width;
h_container = document.getElementById("container").getBoundingClientRect().height;

function zoom(zoomincrement) {
    img_ele = document.getElementById('drag-img');

    var 
    pre_width = img_ele.getBoundingClientRect().width, 
    pre_height = img_ele.getBoundingClientRect().height,    
    zoom_w = Math.round(pre_width * zoomincrement),
    zoom_h = Math.round(pre_height * zoomincrement);

    if (zoom_w >= w_container && zoom_w < 2000) {
        img_ele.style.width = zoom_w + 'px';
        img_ele.style.height = zoom_h + 'px';
    }

    var
    x_cursor = window.event.clientX,
    y_cursor = window.event.clientY,
    x_pos = x_cursor - x_img_ele,
    y_pos = y_cursor - y_img_ele,        
    w_map = img_ele.getBoundingClientRect().width,
    h_map = img_ele.getBoundingClientRect().height;

    img_ele.style.left = x_pos + 'px';
    img_ele.style.top = y_pos + 'px';        

    if (x_pos <= Math.round(w_container - w_map)) {            
        img_ele.style.left = Math.round(w_container - w_map) +'px';
    }
    
    if (y_pos <= Math.round(h_container - h_map)) {
        img_ele.style.top = Math.round(h_container - h_map) +'px';            
    }

    if (x_pos >=0) {
        img_ele.style.left = '0px';
    }

    if (y_pos >=0) {
        img_ele.style.top = '0px';
    }

    
    img_ele = null;    
}

document.getElementById('zoomout').addEventListener('click', function() {
    zoom(0.834);
});
document.getElementById('zoomin').addEventListener('click', function() {
    zoom(1.2);
});

function start_drag(e) {
    e.preventDefault();
    img_ele = this;    
    x_img_ele = window.event.clientX - document.getElementById('drag-img').offsetLeft;
    y_img_ele = window.event.clientY - document.getElementById('drag-img').offsetTop;        
}

function stop_drag() {    
    img_ele = null;
}

function zoom_wheel(e) {    
    if (e.deltaY == 100) {
        zoom(0.834);        
    } else {
        zoom(1.2);        
    }
}

function while_drag() {
    
    if (img_ele !== null) {
        var
        x_cursor = window.event.clientX,
        y_cursor = window.event.clientY,
        x_pos = x_cursor - x_img_ele,
        y_pos = y_cursor - y_img_ele,        
        w_map = img_ele.getBoundingClientRect().width,
        h_map = img_ele.getBoundingClientRect().height;

        img_ele.style.left = x_pos + 'px';
        img_ele.style.top = y_pos + 'px';        

        if (x_pos <= Math.round(w_container - w_map)) {            
            img_ele.style.left = Math.round(w_container - w_map) +'px';
        }
        
        if (y_pos <= Math.round(h_container - h_map)) {
            img_ele.style.top = Math.round(h_container - h_map) +'px';            
        }

        if (x_pos >=0) {
            img_ele.style.left = '0px';
        }

        if (y_pos >=0) {
            img_ele.style.top = '0px';
        }



    }
}

document.getElementById('drag-img').addEventListener('mousedown', start_drag);
document.getElementById('container').addEventListener('mousemove', while_drag);
document.getElementById('container').addEventListener('mouseup', stop_drag);
document.getElementById('container').addEventListener('wheel', zoom_wheel);