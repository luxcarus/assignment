function Ajax (options) {
  var opts = {
    url: null,
    method: "GET",
    async: true,
    success: null,
    error: null,
    dataType: null
  }
  for (var p in options) opts[p] = options[p]
  if(!opts.url) return
  opts.method = opts.method.toUpperCase()

  var req = new XMLHttpRequest()
  req.open(opts.method, opts.url, opts.async)
  req.setRequestHeader("Access-Control-Allow-Origin", "*");
    req.onload = function (e) {
      if (req.readyState == 4) {
        if (req.status == 200 || req.status == 0) {
          if (typeof opts.success === 'function') {
            if (opts.dataType === "json") {
              opts.success(JSON.parse(req.responseText))
            }
          }
        } else {
          if (typeof opts.error === 'function') {
            opts.error(req)
          }
        }
      }
    }
  req.request = function () {
    req.send(null)
  }
  return req
}