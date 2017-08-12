var Datatable = function (options) {
  this.opts = {
    selector: null,
    style: 'basic',
    show: true,
    sort: true,
    search: true,
    pagination: true,
    responsive: false,
    editable: false,
    data: null
  }
  Object.assign(this.opts,options)
}

// init
Datatable.prototype.init = function () {

  if (this.opts.show) {
    this.renderSelect()
  }
  if (this.opts.search) {
    this.renderSearch()
  }

  // table-foundation
  var ttTable
      targetEl = document.querySelector(this.opts.selector)
  ttTable = document.createElement('div')
  ttTable.setAttribute('id','ttTable')
  ttTable.setAttribute('class','tt-layer-2')
  targetEl.appendChild(ttTable)

  // to create a tt table
  var tbl, 
      thead, tbody, trInThead
  tbl  = document.createElement('table')
  tbl.setAttribute('class','tt-table')
  tbl.style.width  = '100%'
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
    th.innerHTML = key
    trInThead.appendChild(th)
  }
  targetEl.appendChild(tbl)
  this.renderContent()
}

// search
Datatable.prototype.renderSearch = function () {

  // variables
  var div_search, input,
      targetEl = document.querySelector('#ttPanel')

  // to crate div.search
  div_search = document.createElement('div')
  div_search.setAttribute('id','ttSearch')
  div_search.setAttribute('class','tt-search')
  
  // to create input#search
  input = document.createElement('input')
  input.setAttribute('type','text')
  input.setAttribute('placeholder','search')

  // to append
  div_search.appendChild(input)
  targetEl.appendChild(div_search)

}

// select
Datatable.prototype.renderSelect = function () {

  // variables
  var options = [10,25,50,100],
      div_panel, div_show, select,
      targetEl = document.querySelector(this.opts.selector)

  // to create div#panel.layer-1
  div_panel = document.createElement('div')
  div_panel.setAttribute('id','ttPanel')
  div_panel.setAttribute('class','tt-layer-1')

  // to create div.show
  div_show = document.createElement('div')
  div_show.setAttribute('id','ttShow')
  div_show.setAttribute('class','tt-show')

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

}

// responsive
Datatable.prototype.renderContent = function (start, end) {
  
  // to check condition
  var show, 
      showNumber, search, serachWord
  show = document.querySelector('#ttShow')
  showNumber = show.firstChild.value
  search = document.querySelector('#ttSearch')
  serachWord = search.firstChild.value

  // to draw content
  var tbody = document.querySelector('.tt-tbody')
  //row
  var size = showNumber
  for(var i = 0; i < size; i++){
    var tr = tbody.insertRow()
    for (var key in this.opts.data[i]) {
      var value = this.opts.data[i][key]
      var td = tr.insertCell()
      td.appendChild(document.createTextNode(value))
      td.style.border = '1px solid black'
    }
  }

  if (this.opts.pagination) {
    new Pagination()
  }

}


// Datatable.prototype.pagination = function () {}
Datatable.prototype.edit = function () {

}