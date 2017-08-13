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
  this.targetEl = null
  Object.assign(this.opts,options)
  if (this.opts.data) {
    var size = this.opts.data.length
    for (var i = 0; i < size; i++) {
      this.opts.cData.push(this.opts.data[i])
      this.opts.cData[i].ttIndex = i
    }
  }
}

/* Commons */
Datatable.prototype.createLayer = function (index) {
  var layer = null
  layer = document.createElement('div')
  layer.setAttribute('class', 'layer')
  layer.classList.add('tt-layer-' + index)
  return layer
}
Datatable.prototype.createContainer = function (name) {
  var container = null
  container = document.createElement('div')
  container.setAttribute('class', 'container')
  container.classList.add('tt-' + name.toLowerCase())
  return container
}

/* Init */
Datatable.prototype.init = function () {

  this.targetEl = document.querySelector(this.opts.selector)

  /* layer-1 ... [Show, Search] */
  var layer1, panel, select, search
  layer1 = this.createLayer(1)
  panel = this.createContainer('Panel')
  select = this.createSelect({
    options: [10,25,50,100]
  })
  search = this.createSearch()
  layer1.appendChild(panel)
  panel.appendChild(select)
  panel.appendChild(search)
  
  /* layer-2 ... [Table] */
  var layer2, content, table
  layer2 = this.createLayer(2)
  content = this.createContainer('Content')
  table = this.createTable()
  layer2.appendChild(content)
  content.appendChild(table)
  
  /* layer-3 ... [Pagination] */
  layer3 = this.createLayer(3)
  paging = this.createContainer('Paging')
  layer3.appendChild(paging)
  
  this.targetEl.appendChild(layer1)
  this.targetEl.appendChild(layer2)
  this.targetEl.appendChild(layer3)

  this.renderContent()
}

/* Select Component */
Datatable.prototype.createSelect = function (args) {
  
  var $this = this,
      options = args.options, layer, show, select

  /* to create div.tt-show */
  show = document.createElement('div')
  show.setAttribute('id', 'ttShow')
  show.setAttribute('class', 'tt-show')
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
  
  /* to append */
  show.appendChild(select)

  return show
}

/* Search Component */
Datatable.prototype.createSearch = function () {

  var $this = this, search, input

  /* to crate a component of Search */
  search = document.createElement('div')
  search.setAttribute('id', 'ttSearch')
  search.setAttribute('class', 'tt-search')
  /** to create a input */
  input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'search')

  /* to add event(s) on input */
  input.addEventListener('keyup', function (e) {
    $this.renderContent()
  })

  /* to append */
  search.appendChild(input)

  return search
}

/* Table Component */
Datatable.prototype.createTable = function () {

  var tbl, thead, tbody, trInThead

  /* table */
  tbl  = document.createElement('table')
  tbl.setAttribute('id', 'ttTable')
  tbl.setAttribute('class','tt-table')
  /** thead */
  thead = tbl.createTHead()
  thead.setAttribute('class','tt-thead')
  /** tbody */
  tbody = tbl.createTBody()
  tbody.setAttribute('class','tt-tbody')

  trInThead = thead.insertRow()
  var size = Object.keys(this.opts.data[0])
  for (var key in this.opts.data[0]) {
    var th = document.createElement('th')
    th.setAttribute('class','sorting')
    th.setAttribute('tt-label',key)
    if (key !== 'ttIndex') {
      th.innerHTML = key
      trInThead.appendChild(th)
    }
  }

  // to add event(s) on <th> //sorting
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

  return tbl
}

// responsive
Datatable.prototype.renderContent = function (reqPage, start, end) {
  
  var $this = this, 
      show, showNumber, 
      search, serachWord, searchWordBlankDeleted,
      tbody = document.querySelector('.tt-tbody')
  
  /* for checking condition */
  show = document.querySelector('#ttShow')
  showNumber = Number(show.firstChild.value)
  search = document.querySelector('#ttSearch')
  searchWord = search.firstChild.value
  searchWordBlankDeleted = searchWord.replace(/ /gi, '')

  if (!reqPage) reqPage = 1
  if (!start) start = 0
  if (!end) end = showNumber - 1

  /* to get data searched */
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

  /* to render pagination */
  var paginatation = this.pagination(data.length, showNumber, reqPage)
  document.querySelector('.tt-paging').appendChild(paginatation)

  // to add events
  // for editing
  function setEventToEdit () {
    tbody.children[i].children[j].addEventListener('dblclick', function (e) {
      
      var td = e.target
      var input = document.createElement('input')
      input.setAttribute('value',td.textContent)
      
      input.addEventListener('focusout', function (e) {
        td.innerText = ''
        td.appendChild(document.createTextNode(e.target.value))
      })
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
