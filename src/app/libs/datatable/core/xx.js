var Datatable = function (options) {
  this.opts = {
    selector: null,
    style: 'basic',
    pagination: true,
    responsive: false,
    editable: false,
    data: null,
    cData: []
  }
  Object.assign(this.opts,options)
  if (this.opts.data) {
    var size = this.opts.data.length
    for (var i = 0; i < size; i++) {
      this.opts.cData.push(this.opts.data[i])
      this.opts.cData[i].ttIndex = i
    }
  }
}

// init
Datatable.prototype.init = function () {

  var targetEl = document.querySelector(this.opts.selector)

  var layer1 = this.createLayer(1)
  layer1.

  var select = this.createSelect()
  targetEl.appendChild(select)
  var search = this.createSearch()
  targetEl.appendChild(search)

  // to create layer
  var layer
  layer = this.createLayer(2)
  targetEl.appendChild(layer)
  
  // to create a tt-table
  var tbl, 
      thead, tbody, trIn
  tbl  = document.createElement('table')
  tbl.setAttribute('id', 'ttTable')
  tbl.setAttribute('class','tt-table')
  // thead
  thead = tbl.createTHead()
  thead.setAttribute('class','tt-thead')
  // tbody
  tbody = tbl.createTBody()
  tbody.setAttribute('class','tt-tbody')

  trInThead = thead.insertRow()
  var size = Object.keys(this.opts.data[0])
  for (var key in this.opts.data[0]) {
    var th = document.createElement('th')
    th.setAttribute('class','sorting')
    th.setAttribute('tt-label',key)
    th.innerHTML = key
    trInThead.appendChild(th)
  }

  layer.appendChild(tbl)




  // to add click event on <th> //sorting
  function setClickEvent (i) {
    thead.firstChild.childNodes[i].addEventListener('click', function (e) {
      console.log(e.target.getAttribute('tt-label'))

      // var isAsc = e.target.getAttribute('class').indexOf('asc')
      // if (isAsc > 0) {
        // e.target.classList.toggle('sorting-asc')
        // e.target.classList.toggle('sorting-desc')
      // }

    })
  }
  var size = thead.firstChild.childNodes.length
  for (var i = 0; i < size; i++) {
    setClickEvent(i)
  }
  this.renderContent()
}

Datatable.prototype.createLayer = function (index) {
  var layer = null
  layer = document.createElement('div')
  layer.setAttribute('class', 'tt-layer-' + index)
  return layer
}


// select
Datatable.prototype.createSelect = function () {
  
  // variables
  var $this = this,
  options = [10,25,50,100],
  layer, div_panel, div_show, select
  
  // to create layer
  layer = this.
  layer1.
  
  // to create panel
  div_panel = document.createElement('div')
  div_panel.setAttribute('id', 'ttPanel')
  div_panel.setAttribute('class', 'tt-panel')
  
  /* to create div.tt-show */
  div_show = document.createElement('div')
  div_show.setAttribute('id', 'ttShow')
  div_show.setAttribute('class', 'tt-show')
  select = document.createElement('select')
  /** to add an event on select */
  select.addEventListener('change', function (e) {
    $this.renderContent()
  })
  /*** to create options */
  var size = options.length
  for (var i = 0; i < size; i++) {
    var option = document.createElement("option")
    option.value = options[i]
    option.text = options[i]
    select.appendChild(option)
  }
  
  // to append
  layer.appendChild(div_panel)
  div_panel.appendChild(div_show)
  div_show.appendChild(select)
  return layer
}

// search
Datatable.prototype.createSearch = function () {
  // variables
  var $this = this, div_search, input,
      targetEl = document.querySelector('#ttPanel')

  // to crate div.search
  div_search = document.createElement('div')
  div_search.setAttribute('id', 'ttSearch')
  div_search.setAttribute('class', 'tt-search')
  
  // to create input#search
  input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'search')

  // to append
  div_search.appendChild(input)
  // targetEl.appendChild(div_search)

  // to add events
  input.addEventListener('keyup', function (e) {
    $this.renderContent()
  })
  return div_search
}
// responsive
Datatable.prototype.renderContent = function (reqPage, start, end) {
  
  var $this = this, 
  show, showNumber, search, serachWord,
  tbody = document.querySelector('.tt-tbody')
  
  
  // for checking condition
  show = document.querySelector('#ttShow')
    showNumber = Number(show.firstChild.value)
    search = document.querySelector('#ttSearch')
    searchWord = search.firstChild.value
    searchWordBlankDeleted = searchWord.replace(/ /gi, '')

    if (!reqPage) reqPage = 1
    if (!start) start = 0
    if (!end) end = showNumber - 1

  var data = this.opts.cData
  if (searchWordBlankDeleted.length > 0) {
    data = this.searchWord(searchWord)
  }

  // to init-sorting // 자리 .. 
  var ths = document.querySelectorAll('.sorting')
  ths[0].classList.add('sorting-asc')
  var name = ths[0].getAttribute('tt-label')
  data.sort(this.sortAsc(name))
  // to clear first
  tbody.innerHTML = ''

  //row
  var size = end
  for(var i = start; i < size; i++){
    if (i >= data.length) {
      break
    }
    var tr = tbody.insertRow()
    tr.setAttribute('data-index', data[i].ttIndex)
    for (var key in data[i]) {
      var value = data[i][key]
      var td = tr.insertCell()
      td.innerText = value
    }
  }

  var pagination = this.pagination(data.length, showNumber, reqPage)
  document.querySelector(this.opts.selector).appendChild(pagination)



  // to add events
  // for editing
  function setEventToEdit () {
    tbody.children[i].children[j].addEventListener('dblclick', function (e) {
      
      var td = e.target
      var input = document.createElement('input')
      input.setAttribute('value',td.textContent)
      
      // input.addEventListener('focusout', function (e) {
      //   td.innerText = ''
      //   td.appendChild(document.createTextNode(e.target.value))
      // })
      input.addEventListener('change', function (e) {
        var index = e.target.parentNode.parentNode.dataset.index
        console.log(index)
        // ** to change this.cdata 
        td.innerText = e.target.value
      })
      input.addEventListener('keydown', function (e) {
        if (e.which === 13 || e.which ===27) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("focusout", false, true);
          e.target.dispatchEvent(evt);
        }
      })
      
      td.innerText = ''
      td.appendChild(input)
      input.focus()
    })
  }
  var size = tbody.children.length
  for (var i = 0; i < size; i++) {
    var sizee = tbody.children[i].children.length
    for (var j = 0; j < sizee; j++) {
      setEventToEdit(i, j)
    }
  }

}

Datatable.prototype.pagination = function (total, show, reqPage) {

  show = Number(show)
  var $this = this,
      pages = Math.ceil(total / show),
      // start = (reqPage * show) - show,
      // end = start + show - 1
      start = getStart(reqPage, show),
      end = getEnd(start, show)

  var base = document.getElementById('ttPagination'), 
      prev, prevInner, btns, next, nextInner, span

  function getStart(reqPage, show) {
    return (reqPage * show) - show
  }
  function getEnd (start, show) {
    return start + show - 1
  }

  /* to */
  // var layer = document.createElement('') 

  if (base) {
    base.innerHTML = ''
  } else {
    /* to create base */
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
    // debugger
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
  
  // to append
  prev.appendChild(prevInner)
  next.appendChild(nextInner)
  base.appendChild(prev)
  base.appendChild(btns)
  base.appendChild(next)
  return base
}


Datatable.prototype.searchWord = function (searchWord) {
  var dataFiltered = [], keys, result, sizee
  var size = this.opts.cData.length
  for (var i = 0; i < size; i++) {
    if (!keys) {
      keys = Object.keys(this.opts.cData[i])
    }
    sizee = keys.length
    for (var j = 0; j < sizee; j++) {
      result = (this.opts.cData[i][keys[j]]+'').search(searchWord)
      if (result > -1) {
        dataFiltered.push(this.opts.cData[i])
        break
      }
    }
  }
  return dataFiltered
}

Datatable.prototype.sortAsc = function (key) {
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
Datatable.prototype.sortDesc = function (key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1
    }
    if (a[key] < b[key]) {
      return 1
    }
    return 0
  }
}


