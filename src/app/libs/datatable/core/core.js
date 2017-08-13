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

  this.initSelect()
  this.initSearch()

  // to create table-foundation
  var ttTable
      targetEl = document.querySelector(this.opts.selector)
  ttTable = document.createElement('div')
  ttTable.setAttribute('id', 'ttTable')
  ttTable.setAttribute('class', 'tt-layer-2')
  targetEl.appendChild(ttTable)
  
  // to create a tt table
  var tbl, 
      thead, tbody, trIn
  tbl  = document.createElement('table')
  tbl.setAttribute('class','tt-table')
  // tbl.style.width  = '100%'
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
  ttTable.appendChild(tbl)




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

// search
Datatable.prototype.initSearch = function () {
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
  targetEl.appendChild(div_search)

  // to add events
  input.addEventListener('keyup', function (e) {
    $this.renderContent()
  })
}

// select
Datatable.prototype.initSelect = function () {

  // variables
  var $this = this,
      options = [10,25,50,100],
      div_panel, div_show, select,
      targetEl = document.querySelector(this.opts.selector)

  // to create div#panel.layer-1
  div_panel = document.createElement('div')
  div_panel.setAttribute('id', 'ttPanel')
  div_panel.setAttribute('class', 'tt-layer-1')

  // to create div.show
  div_show = document.createElement('div')
  div_show.setAttribute('id', 'ttShow')
  div_show.setAttribute('class', 'tt-show')

  // to create select#show
  select = document.createElement('select')

  // to crate options and to append
  var size = options.length
  for (var i = 0; i < size; i++) {
    var option = document.createElement("option")
    option.value = options[i]
    option.text = options[i]
    select.appendChild(option)
  }

  // to append
  div_panel.appendChild(div_show)
  div_show.appendChild(select)
  targetEl.appendChild(div_panel)

  // to add events
  select.addEventListener('change', function (e) {
    $this.renderContent()
  })
}

// responsive
Datatable.prototype.renderContent = function (reqPage, start, end) {

  console.log('rc')
    
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

  // debugger
  // to draw content
  //row
  // var size = showNumber
  // for(var i = 0; i < size; i++){
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
      var tr = e.target,
          input = document.createElement('input')

      // foucsout event 걸어주기


      input.setAttribute('value',tr.textContent)
      input.addEventListener('change', function (e) {
        var index = e.target.parentNode.parentNode.dataset.index

        console.log(index)
        // to change data 

        tr.innerText = e.target.value
      })
      tr.innerText = ''
      tr.appendChild(input)
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

// search 할 때 paging 해야함

Datatable.prototype.pagination = function (total, show, reqPage) {

  show = Number(show)

  var $this = this,
      pages = Math.ceil(total / show),
      start = (reqPage * show) - show,
      end = start + show - 1
      // end = start - (show - 1),
      // end = end > 0 ? end : end * -1

// debugger

  var base = document.getElementById('ttPagination'), 
      prev, prevInner, btns, next, nextInner, span

  if (base) {
    base.innerHTML = ''
  } else {
    // to create base-pagination
    base = document.createElement('div')
    base.setAttribute('id','ttPagination')
    base.setAttribute('class','tt-pagination')
  }
  
  // to create prev and next
  prev = document.createElement('div')
  prevInner = document.createElement('div')
  prevInner.innerText = 'Prev'
  next = document.createElement('div')
  nextInner = document.createElement('div')
  nextInner.innerText = 'Next'

  //  버튼 이벤트가 원활하지 않음

  // to create paging buttons
  btns = document.createElement('div')
  // var size = page.length
  for (var i = 0; i < pages; i++) {
    span = document.createElement("span")
    span.innerText = i+1

    //
    span.addEventListener('click', function (e) {
      console.log(e.target.textContent)
      $this.renderContent(Number(e.target.textContent), start, end)
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


