var Cell=function(a,b){this.index=a;this.control=new ElementControl("cell-"+a,b,CellFomatter)};Cell.prototype.setData=function(a){this.control.setData(a)};Cell.prototype.getData=function(a){return this.control.getData()};Cell.prototype.getElement=function(a){return this.control.element};
var Grid=function(a,b){this.xSize=a;this.ySize=b;this.length=a*b;this.cells=[];a=0;b=document.getElementById("grid-container");for(var c=0;c<this.xSize;c++){var d=createElement("div",{class:"grid-row flex-row"});b.appendChild(d);for(var e=0;e<this.ySize;e++)d.appendChild(createElement("div",{id:"cell-"+a,class:"grid-cell"})),this.cells[a]=new Cell(a,0),a++}};Grid.prototype.getCells=function(){return this.cells};Grid.prototype.getCell=function(a){return this.cells[a]};
