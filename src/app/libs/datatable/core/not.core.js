// (function(){
// })(window)

function Datatable (options) {
  var opts = {
    selector: null
  }
  opts = Object.assign(opts,options)

  this.init = function (data) {

    var targetEl = document.querySelector(opts.selector)
    var tbl  = document.createElement('table')
    tbl.style.width  = '100%';
    // tbl.style.border = '1px solid black';
    
    // thead
    var thead = tbl.createTHead()
    thead.parentNode.setAttribute('class','table')
    thead.setAttribute('class','thead')

    // tbody
    var trInTbody = tbl.createTBody()
    trInTbody.parentNode.setAttribute('class','tbody')

    var trInThead = thead.insertRow()
    for (var i = 0; i < 3; i++) {
      var th = document.createElement('th')
      th.innerHTML = 'aa'
      trInThead.appendChild(th)
    }
    this.draw(tbl)
    targetEl.appendChild(tbl);
  }
  
  this.clear = {

  }

  this.draw = function (tbl) {
    //row
    for(var i = 0; i < 3; i++){
      var tr = tbl.insertRow()
      //column
      for(var j = 0; j < 3; j++){
        var td = tr.insertCell()
        td.appendChild(document.createTextNode('Cell'))
        td.style.border = '1px solid black'
      }
    }
  }

}
// search
(function(){
  // clear once
  function des (d) {
    console.log(d)
  }
  var a = [{x:'cz'},{x:'bcz'},{x:'acz'},{x:'abz'}]
  let size = a.length
  for (var i = 0; i < size; i++) {
    var result = a[i].x.indexOf('z')
    if (result > -1) {
      des(a[i])
    }
  }
})()
  
// sort
(function(){
  // clear once
  var a = [{x:'cz',y:5},{x:'bcz',y:2},{x:'acz',y:1},{x:'abz',y:10}]
  function desc (/* String */key) {
    return function (a, b) {
      if (a[key] < b[key]) {
        return -1
      }
      if (a[key] > b[key]) {
        return 1
      }
      return 0
    }
  }
  var b = a.sort(desc('y'))
  console.log(b)
})()




