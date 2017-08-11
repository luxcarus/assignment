@@ -0,0 +1,212 @@

function _encodeFormData(data) {
    var pairs = [];
    var regexp = /%20/g;
    for(var name in data) {
        if(data.hasOwnProperty(name)) {
            var val = data[name].toString();
            var pair = encodeURIComponent(name).replace(regexp, "+")+"="+
                    encodeURIComponent(val).replace(regexp, "+");
            pairs.push(pair);
        }
    }
    return pairs.join("&");
}

function httpReq(options){
    var opts = {
        url: null,
        method: "GET",
        data: null,
        async: true,
        timeout: 5000,
        dataType: "text",
        success: null,
        error: null,
        complete: null,
        requestHeader: null,
    };

    for (var p in options) opts[p] = options[p];
    if(!opts.url) return;
    var xmlhttp = null;

    xmlhttp = new XMLHttpRequest();
    opts.method = opts.method.toUpperCase();
    if(opts.async) {
        xmlhttp.timeout = opts.timeout;
    }

    xmlhttp.onload = function(evt) {
        var xmlObj, jsonObj;
        if (xmlhttp.status === 200 || xmlhttp.status === 0) {
            if(typeof opts.success === "function") {
                if(opts.dataType === "json") {
                    if(xmlhttp.responseText) {
                        try {
                            jsonObj = JSON.parse(xmlhttp.responseText);
                        } catch (err) {
                            //xmlhttp.onerror = null;
                            opts.error(xmlhttp, 'json parsererror', err);
                            return;
                        }
                        opts.success(jsonObj, xmlhttp.statusText, xmlhttp);
                    } else {
                        opts.error(xmlhttp, 'empty json', xmlhttp.statusText);
                    }
                } else if(opts.dataType === "xml") {
                    if(xmlhttp.responseXML) {
                        opts.success(xmlhttp.responseXML, xmlhttp.statusText, xmlhttp);
                    } else if (xmlhttp.responseText) {
                        try {
                            //xmlObj = obigo.parseXML(xmlhttp.responseText);
                            xmlObj = xmlhttp.responseText;
                        } catch (err) {
                            //xmlhttp.onerror = null;
                            opts.error(xmlhttp, 'xml parsererror', err);
                            return;
                        }
                        opts.success(xmlObj, xmlhttp.statusText, xmlhttp);
                    } else {
                        opts.error(xmlhttp, 'empty xml', xmlhttp.statusText);
                    }
                } else {
                    opts.success(xmlhttp.responseText, xmlhttp.statusText, xmlhttp);
                }
            }
        //500 internal error , Not found(server)
        } else if (xmlhttp.status !== 0) {
            opts.error(xmlhttp, "error", xmlhttp.statusText);
        }
    };
    xmlhttp.ontimeout = function(evt) {
        if(typeof opts.error == "function") {
            opts.error(xmlhttp, "timeout", "timeout");
        }
    };
    //Not found (local), cross-domain (local, server)
    xmlhttp.onerror = function(evt) {
        if(typeof opts.error == "function") {
            if(typeof evt == "string" && (evt == "timeerror" || evt == "nonetwork")){
                opts.error(xmlhttp, evt, xmlhttp.statusText);
            }else{
                opts.error(xmlhttp, "error", xmlhttp.statusText);
            }
        }
    };
    xmlhttp.onloadend = function(evt) {
        if(typeof opts.complete == "function") {
            opts.complete(xmlhttp, xmlhttp.statusText);
        }
    };

    if(!navigator.onLine){

        xmlhttp.onerror("nonetwork");
        return;
    }

    function request(){
        if(opts.method === "GET" && opts.data) {
            opts.data = _encodeFormData(opts.data);
            opts.url = opts.url +"?"+ opts.data;
            opts.data = null;
        }
        xmlhttp.open(opts.method, opts.url, opts.async);

        if(opts.method === "POST" && !JSON.stringify(opts.requestHeader).match(/content-type/ig)) {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        }
        if(opts.requestHeader) {
            var headers = opts.requestHeader;
            for(var key in headers) {
                if(headers.hasOwnProperty(key)) {
                    xmlhttp.setRequestHeader(key, headers[key]);
                }
            }
        }
        if(typeof opts.data === "object") opts.data = _encodeFormData(opts.data);


        xmlhttp.send(opts.data);
    }

    request();

    return xmlhttp;

}




/**
 * Ajax library
 *
 * @param {object} opt                  - http request parameters
 * @param {string} opt.url              - Request url
 * @param {string} opt.method           - Request http method
 * @param {object} opt.data             - Request parameter
 * @param {bool}   opt.async            - Async request or not
 * @param {number} opt.timeout          - Response timeout. millisecond
 * @param {string} opt.dataType         - Response data type
 * @param {func}   opt.success          - Success callback
 * @param {func}   opt.error            - Error callback
 * @param {func}   opt.complete         - Complete callback
 * @param {object} opt.requestHeader    - Http request header
 */

module.exports = {
    /**
     * Request that GET method type
     * @function get
     * @returns {object}    - http request object
     */
    get : (opt)=>{
        opt.method ="GET";
        return httpReq(opt);
    },

    /**
     * Request that POST method type
     * @function post 
     * @returns {object}    - http request object
     */
    post : (opt)=>{
        opt.method ="POST";
        return httpReq(opt);
    },


    /**
     * Request that DELETE method type
     * @function delete 
     * @returns {object}    - http request object
     */
    delete : (opt)=>{
        opt.method ="DELETE";
        return httpReq(opt);
    },


    /**
     * Request that PUT method type
     * @function put 
     * @returns {object}    - http request object
     */
    put: (opt)=>{
        opt.method ="PUT";
        return httpReq(opt);
    },



    /**
     * Request for general purpose
     * @function request
     * @returns {object}    - http request object
     */
    request : (opt)=>{
        return httpReq(opt);
    }
};