var Pagination = function (options) {
  // this.opts = {
  // }
  // Object.assign(this.opts,options)
}
Pagination.prototype = new Datatable
Pagination.prototype.pagination = function (total, show, reqPage) {

  show = Number(show)
  var $this = this,
      pages = Math.ceil(total / show),
      start = getStart(reqPage, show),
      end = getEnd(start, show),
      base = document.getElementById('ttPagination'), 
      prev, prevInner, btns, next, nextInner, span

  function getStart(reqPage, show) {
    return (reqPage * show) - show
  }
  function getEnd (start, show) {
    return start + show - 1
  }

  /* to create base */
  if (base) {
    base.innerHTML = ''
  } else {
    base = document.createElement('div')
    base.setAttribute('id','ttPagination')
    base.setAttribute('class','tt-pagination')
  }
  
  /* to create prev & next */
  prev = document.createElement('div')
  prevInner = document.createElement('div')
  prevInner.innerText = 'Prev'
  next = document.createElement('div')
  nextInner = document.createElement('div')
  nextInner.innerText = 'Next'
  /** to add event on prev & next */
  prev.addEventListener('click', function (e) {
    var base = document.getElementById('ttPagination')
    var tested = null
    var size = base.children[1].children.length
    for (var i = 0; i < size; i++) {
      tested = base.children[1].children[i]
      if (tested.className === 'current') {
        var reqPage = Number(tested.textContent)
        if (reqPage > 1) {
          var start = getStart(reqPage - 1, show)
          var end = getEnd(start, show)
          $this.renderContent(reqPage - 1, start, end)
        }
        break
      }
    }
  })
  next.addEventListener('click', function (e) {
    var base = document.getElementById('ttPagination')
    var tested = null
    var size = base.children[1].children.length
    for (var i = 0; i < size; i++) {
      tested = base.children[1].children[i]
      if (tested.className === 'current') {
        var reqPage = Number(tested.textContent)
        if (reqPage < size) {
          var start = getStart(reqPage + 1, show)
          var end = getEnd(start, show)
          $this.renderContent(reqPage + 1, start, end)
        }
        break
      }
    }
  })

  /* to create buttons */
  btns = document.createElement('div')
  for (var i = 0; i < pages; i++) {
    span = document.createElement("span")
    span.innerText = i + 1
    if ( (i + 1) === reqPage) {
      span.setAttribute('class', 'current')
    }
    /** to add event on buttons */
    span.addEventListener('click', function (e) {
      var reqPage = Number(e.target.textContent)
      var start = getStart(reqPage, show)
      var end = getEnd(start, show)
      $this.renderContent(reqPage, start, end)
    })
    btns.appendChild(span)
  }
  
  /* to append */
  prev.appendChild(prevInner)
  next.appendChild(nextInner)
  base.appendChild(prev)
  base.appendChild(btns)
  base.appendChild(next)

  return base
}