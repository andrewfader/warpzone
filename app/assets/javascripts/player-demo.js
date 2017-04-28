var demo = document.getElementById('demo');
var canvas = document.getElementById('canvas');
var metrics = document.getElementById('metrics');
var frameSink;
var frameSink_w;
var frameSink_h;

var Module = (function(a){
    a.doNotCaptureKeyboard = true;
    a.preRun = [];
    a.postRun = [];
    
    a.canvas = (function() {
        var canvas = document.getElementById('canvas');
	
        // As a default initial behavior, pop up an alert when webgl
        // context is lost. To make your application robust, you may
        // want to override this behavior before shipping!  See
        // http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
        canvas.addEventListener("webglcontextlost", function(e) { 
	    alert('WebGL context lost. You will need to reload the page.');
	    e.preventDefault();
	}, false);
	
        return canvas;
    })();

    return a;
}(Module || {}));

function detectWebGL() { 
    try {
        if(!!window.WebGLRenderingContext &&
	   (canvas.getContext("webgl") ||
	    canvas.getContext("experimental-webgl"))) {
	    return true;
        }
    } catch(e) {} 
    return false;
};

function yuv_display(yuv){
    var w = yuv.width;
    var h = yuv.height;

    if(w != frameSink_w || h != frameSink_h)
	frameSink=null;
    if(!frameSink){

	canvas.width = w;
	canvas.height = h;
	canvas.style.width = w+"px";
	canvas.style.height = h+"px";
	demo.style.marginLeft = "-"+(w/2)+"px";
	demo.style.marginTop = "-"+(h/2)+"px";

	frameSink = new YCbCrFrameSink(canvas, {picX: 0, 
						    picY: 0, 
						    picWidth: w, 
						    picHeight: h});
	frameSink_w = w;
	frameSink_h = h;
    }
    frameSink.drawFrame(yuv);
}

var daala_time;
var last_time;
var update;
var daala_ptr;
var daala_pos;
var daala_bytes;
var interval = 1000/23.97;

function decode_callback(dataptr, pos, bytes){
    var daala_decode = Module.cwrap('daala_decode', 'number',
				    ['number', 'number', 'number']);
    var get_bitsperframe = Module.cwrap('get_bitsperframe', 'number', []);
    var get_decode_fps = Module.cwrap('get_decode_fps', 'number', []);
    var get_fps = Module.cwrap('get_fps', 'number', []);

    var time=new Date().getTime();
    if(daala_time+interval<=time && last_time+(interval*9/10)<=time){
	if(daala_pos<daala_bytes){
	    var status = daala_decode(daala_ptr, daala_pos, daala_bytes);
	    update++;
	    if(update>=5){
		var fps = get_fps();
		var Mbps = get_bitsperframe()*fps/1000000;
		var Mbps_i = Math.floor(Mbps);
		var Mbps_t = Math.floor((Mbps-Math.floor(Mbps))*10);
		var Mbps_h = Math.floor((Mbps-Math.floor(Mbps)-Mbps_t/10)*100);
		update=0;
		
		metrics.innerHTML = "Daala JS decode: "+
		    canvas.width+"x"+canvas.height+" @ "+
		    Math.round(fps*100)/100.+"fps ("+
		    Math.round(get_decode_fps())+" actual), "+
		    Mbps_i+"."+Mbps_t+""+Mbps_h+"Mbps";

	    }
	    if(status>=0){
		daala_pos=status;
		daala_time+=interval;
		last_time=time;
		requestAnimationFrame(decode_callback);
	    }else{
		alert("Decode status: "+status);
	    }
	}
    }else{
	requestAnimationFrame(decode_callback);
    }
}

function decode_loop(dataptr, bytes){
    var useWebGL = detectWebGL();
    if (!useWebGL) {
	alert("WebGL unavailable");
    }else{
	daala_pos=0;
	daala_ptr=dataptr;
	daala_bytes=bytes;
	update=100;
	last_time=daala_time=new Date().getTime();
	requestAnimationFrame(decode_callback);
    }
}

function load_link(f){
    // for the most part, none of this can work because of CORS.  But
    // at least if we use xhr, there's the opportunity to return an error
    // as opposed to the request just vanishing silently.
    if (f) {
        var xhr = new XMLHttpRequest();
        imagename = f.split('/').pop();

        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                if (xhr.response && xhr.status==200) {
                    var array = xhr.response;
		    var source = new Uint8Array(array);

		    var nDataBytes = array.byteLength;
		    var dataPtr = Module._malloc(nDataBytes);
		    var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
		    dataHeap.set(source);

		    decode_loop(dataPtr, nDataBytes);
                } else {
                    alert("Couldn't load "+imagename+" :-(");
                }
            }
        };

        xhr.open("GET", f, true);
        xhr.responseType = "arraybuffer";

        xhr.send();

    }
}    

load_link("daala-test.ogv");
