import {h, makeDOMDriver} from '@cycle/dom'
var MG = require('metrics-graphics')
require("metrics-graphics/dist/metricsgraphics.css")
//var d3 = require('metrics-graphics/node_modules/d3')

//require("mg-line-brushing/dist/mg-line-brushing.css")
//var bla = require('mg-line-brushing')


function GraphWidget(data, settings, id) {
    //console.log("CREATING GraphWidget")

    this.type       = 'Widget'
    this.classNames = ''
    this.id         = id
    this.key        = id

    const defaults = {
        title: undefined,
        description:undefined,

        x_accessor: 'time',
        y_accessor: 'value',

        show_tooltips:false,//no jquery please

        //height:150,

        max_x:undefined,

        markers: [],
        animate_on_load:false,
        baselines: undefined,
        legend:undefined,
        interpolate: 'linear',
        missing_is_zero: true,
        transition_on_update:false,//disable for very high frequency data updates (no time for transition)

        axes_not_compact:false

        //linked_format: "%Y-%m-%d-%H-%M-%S",
    }

    this.data = data

    this.settings  = Object.assign(defaults,settings,{data})

   
}

GraphWidget.prototype.init = function () {
  //console.log("INIT GraphWidget")
  let elem = document.createElement('div')
  elem.className = "graph " + this.classNames
  elem.id = this.id
  this.elem = elem 
  this.settings = Object.assign(this.settings,{target:elem})
  this.draw()
  return elem
}

GraphWidget.prototype.updateData = function (data) {
  
  if(data && data.length >0){
    console.log("updateData GraphWidget",data)
    //data = MG.convert.date(data, 'time', '%Y-%m-%dT%H:%M:%S');
    this.settings = Object.assign(this.settings,{data})
  }
  this.draw()
}

GraphWidget.prototype.updateSettings = function (settings) {
  //console.log("updateSettings GraphWidget")
  if(settings){
    this.settings  = Object.assign(defaults,settings)
  }
  this.draw()
}

GraphWidget.prototype.update = function (prev, elem) {
  console.log("UPDATING GraphWidget",prev,elem)
  this.elem = elem || prev.elem
  
  this.graph = this.graph || prev.graph
  this.settings = this.settings || prev.settings
  let settings = Object.assign(this.settings,{target:this.elem})
  
  this.graph = MG.data_graphic(settings)
}

GraphWidget.prototype.draw = function(){
  if(this.settings && this.settings.data && this.settings.data.length >0){
    this.graph = MG.data_graphic(this.settings)
  }
  
}

export {GraphWidget}
