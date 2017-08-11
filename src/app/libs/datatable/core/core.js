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
    var tbody = tbl.createTBody()
    tbody.setAttribute('class','tbody')

    var trInThead = thead.insertRow()
    for (var i = 0; i < 3; i++) {
      var th = document.createElement('th')
      th.innerHTML = 'aa'
      trInThead.appendChild(th)
    }
    this.draw(tbody)
    targetEl.appendChild(tbl);
  }
  
  this.draw = function (_tbody, data, condition) {
    
    var tbody = _tbody
    if (typeof tbody === 'undefined') {
      tbody = document.querySelector('.tbody')
    }
    //row
    for(var i = 0; i < 3; i++){
      var tr = tbody.insertRow()
      //column
      for(var j = 0; j < 3; j++){
        var td = tr.insertCell()
        td.appendChild(document.createTextNode('Cell'))
        td.style.border = '1px solid black'
      }
    }

  }

}


(function(){

  var a = [{x:'cz',y:5},{x:'bcz',y:3},{x:'acz',y:1},{x:'abz',y:10},{x:'a',y:100}]
  var total = a.length
  var show = 2
  var page = Math.ceil(a.length / 2)

  console.log('total : ' + total)
  console.log('show : ' + show)
  console.log('page : ' + page)

  // var left = page - show  // if x < 0 then * -1
  var start = (page * show) - show
  var end = start - (show - 1) // if minus then * -1

  console.log('start : ' + start)
  console.log('end : ' + end)

  function paging () {
  }

  var btn = document.createElement("button")
  btn.setAttribute('class','page-btn')
  btn.setAttribute('content', 'test content')
  btn.innerHTML = '1'
  btn.addEventListener('click',function(){
    alert(1)
  })

  var paging = document.querySelector('#paging')
  paging.appendChild(btn)

  console.log(document.querySelector('.page-btn'))
  console.log(btn.data)

  function makePageBtn () {

  }

  /*

  case1)
  2
  1 2 3

     show
-1  1:  0    to   1
 0  2:  2    to   3
 1  3:  4    to   5 
 맨 왼쪽은 값은 show - 현재-데이터-시작-인덱스 값이다

  case2)
  4
  1 2

     show
-1  1:  0    to   3
 2  2:  4    to   7

  case3 ** 21ea )
  10
  1 2 3

     show
-1  1:  0    to   9
 8  2:  10   to   19
17  3:  20   to   29  
  */

})()