(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t,a){e.exports=a(327)},119:function(e,t,a){},327:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(62),i=a.n(s),l=(a(119),a(43)),o=a(44),c=a(49),u=a(45),d=a(10),h=a(48),m=a(47),p=a(113),v=a(105);function f(e,t){for(var a=0,n=0;n<t.length;n++){var r=t[n].weights,s=0;for(var i in r)s+=r[i],s+=Math.abs(Math.round(100*r[i])/100);a=Math.max(a,s)}var l={scales:{xAxes:[{stacked:!0,ticks:{beginAtZero:!0,max:Math.ceil(a),display:!1},gridLines:{display:!1,show:!1,color:"transparent"}}],yAxes:[{stacked:!0,gridLines:{display:!1,show:!1,color:"transparent"}}]},maintainAspectRatio:!1,legend:{display:!1,onClick:function(e){return e.stopPropagation()}},tooltips:{enabled:!0,mode:"nearest"}};return 0===e&&(l.legend.display=!0),l}function b(e,t,a){var n=[],r=e.replace(/\b[-.,()&$#?!\]{}"']+\B|\B[-.,()&$#!?\]{}"']+\b/g,"").trim().split(" ");r=Object(m.a)(new Set(r));for(var s=0;s<r.length;s++)if(" "!==r[s]&&""!==r[s]){var i=r[s].toLowerCase();n.push({label:i,data:[Math.abs(Math.round(100*t[r[s]])/100)],backgroundColor:[a[i]],borderColor:["rgba(0,0,0,0)"],borderWidth:2})}return{datasets:n}}var g=a(27),k=a.n(g),y=(a(92),a(330)),E=a(329),w=a(107),C=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleDescription=function(e){return function(t){var n=e.split(" . "),r=function(e){return e.toLowerCase().split(" ").map(function(e){return e.charAt(0).toUpperCase()+e.substring(1)}).join(" ")}(n[0]),s=function(e){for(var t=[],a=0;a<e.length;a++){var n=e[a].trim();t.push(n.charAt(0).toUpperCase()+n.slice(1))}return t}(n.slice(2,-1)).join(". ")+".";a.setState({isResults:!1,title:r,text:s}),t.preventDefault()}},a.handleFavorites=function(e,t){return function(n){var r=a.state.links;r.has(e)?r.delete(e):r.set(e,t),a.setState({links:r}),n.preventDefault()}},a.state={value:"",colors:a.getRandomColor(""),submitted:!1,data:[],lastQuery:"",isResults:!0,title:"",text:"",links:new Map,bars:!0},a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a.handleDescription=a.handleDescription.bind(Object(d.a)(a)),a.handleBack=a.handleBack.bind(Object(d.a)(a)),a.handleFavorites=a.handleFavorites.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=window.location.href.split("/");console.log(e);for(var t=0;t<e.length;t++)"experiment"===e[t]&&this.setState({bars:!1})}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state.value,n=this.getRandomColor(a);k.a.get("https://ir-sim-api.herokuapp.com/search?name=".concat(this.state.value)).then(function(e){var r=e.data.data,s=e.data.descriptions;t.setState({data:t.updateJson(r,s),submitted:!0,colors:n,lastQuery:a,isResults:!0,desc:""}),r==={}&&t.setState({submitted:!1})}),e.preventDefault()}},{key:"handleBack",value:function(e){this.setState({isResults:!0,title:"",text:""}),e.preventDefault()}},{key:"getStarStyles",value:function(e){return this.state.links.has(e)?"warning":"primary"}},{key:"renderButton",value:function(e,t){if(""!==e)return r.a.createElement(y.a,{onClick:this.handleFavorites(e,t),bsStyle:this.getStarStyles(e),bsSize:"xsmall"},r.a.createElement(E.a,{glyph:"star"}))}},{key:"renderSideBar",value:function(){var e=this,t=this.state.links,a=[],n=!0,s=!1,i=void 0;try{for(var l,o=t[Symbol.iterator]();!(n=(l=o.next()).done);n=!0){var c=l.value,u=Object(p.a)(c,2),d=u[0],h=u[1];a.push({title:d,description:h})}}catch(v){s=!0,i=v}finally{try{n||null==o.return||o.return()}finally{if(s)throw i}}var m=0;return r.a.createElement("div",{className:"sidebar"},r.a.createElement(w.slide,{width:"75%"},r.a.createElement("ul",{className:"search-results"},a.map(function(t){return r.a.createElement("li",{key:m++},r.a.createElement("div",{className:"star"},e.renderButton(t.title,t.description)),r.a.createElement("div",{className:"one-sidebar"},r.a.createElement("p",{className:"results",onClick:e.handleDescription(t.description)},t.title),r.a.createElement("p",null,t.description.replace(/(([^\s]+\s\s*){40})(.*)/,"$1\u2026"))),r.a.createElement("div",{className:"clear"}))}))))}},{key:"renderResults",value:function(){var e=this;return 1===this.state.data.length?r.a.createElement("ul",{className:"search-results"},r.a.createElement("li",{key:0},r.a.createElement("section",{className:"container"},r.a.createElement("div",{className:"noResult"},r.a.createElement("p",null,"No results found"))))):this.state.isResults&&this.state.bars?r.a.createElement("ul",{className:"search-results"},this.state.data.map(function(t){return r.a.createElement("li",{key:t.id},r.a.createElement("section",{className:"container"},r.a.createElement("div",{className:"star"},e.renderButton(t.title,t.description)),r.a.createElement("div",{className:"one"},r.a.createElement("p",{className:"results",onClick:e.handleDescription(t.description)},t.title),r.a.createElement("p",null,t.description.replace(/(([^\s]+\s\s*){40})(.*)/,"$1\u2026"))),r.a.createElement("div",{className:"two"},r.a.createElement(v.a,{data:b(e.state.lastQuery,t.weights,e.state.colors),options:f(t.id,e.state.data),width:.1,height:(a=t.id,0===a?100:55)})),r.a.createElement("div",{className:"clear"})));var a})):this.state.isResults&&!this.state.bars?r.a.createElement("ul",{className:"search-results"},this.state.data.map(function(t){return r.a.createElement("li",{key:t.id},r.a.createElement("section",{className:"container"},r.a.createElement("div",{className:"star"},e.renderButton(t.title,t.description)),r.a.createElement("div",{className:"one"},r.a.createElement("p",{className:"results",onClick:e.handleDescription(t.description)},t.title),r.a.createElement("p",null,t.description.replace(/(([^\s]+\s\s*){40})(.*)/,"$1\u2026"))),r.a.createElement("div",{className:"clear"})))})):r.a.createElement("div",{className:"text-container"},r.a.createElement("button",{onClick:this.handleBack},"Back"),r.a.createElement("h3",null,this.state.title),r.a.createElement("p",null,this.state.text))}},{key:"updateJson",value:function(e,t){var a=e,n=[],r=1,s=[],i=0;for(var l in a){var o=a[l],c=0;for(var u in o)o[u]=Math.abs(Math.round(100*o[u])/100),c+=o[u];s.push([l,c,t[i]]),i++}s.sort(function(e,t){return t[1]-e[1]});for(var d=0;d<s.length;d++)n.push({id:r++,title:s[d][0],description:s[d][2],weights:a[s[d][0]]});return n.unshift({id:0,title:"",description:"",weights:{}}),n}},{key:"getRandomColor",value:function(e){var t={},a=e.toLowerCase().split(" ");a=Object(m.a)(new Set(a));for(var n=0;n<a.length;n++){var r=Math.round(255*Math.random()),s=Math.round(255*Math.random()),i=Math.round(255*Math.random());t[a[n]]="rgba("+r+","+s+","+i+",1)"}return t}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"search"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,r.a.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange,style:{width:"400px",height:"25px"}})),r.a.createElement("input",{type:"submit",value:"Search",style:{width:"75px",height:"25px"}}))),this.renderSideBar(),console.log("BARS",this.state.bars),this.state.submitted&&this.renderResults())}}]),t}(r.a.Component);var N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleClick=a.handleClick.bind(Object(d.a)(a)),a.startTime=null,a.ref=r.a.createRef(),a.id=null,a.session=null,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}("correct",window.location.href);null!=e&&alert("You got "+e+" question(s) correct")}},{key:"componentWillMount",value:function(){var e=this,t=new Date,a="none",n=this.getParameterByName("session");k.a.get("https://ir-sim.herokuapp.com/id").then(function(r){a=r.data,e.setState({startTime:t,id:a,session:n})})}},{key:"getParameterByName",value:function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}},{key:"handleClick",value:function(e){if(window.confirm("Are you finished with the study? (After you hit confirm, you are not allowed to return back to this page)")){var t=this.state.id,a=new Date,n=Math.abs(a-this.state.startTime),r=Array.from(this.ref.current.state.links),s=this.state.session,i={id:t,links:r};k.a.post("https://ir-sim.herokuapp.com/links",i).then(function(e){window.location="/verify?id=".concat(t,"&time=").concat(n,"&session=").concat(s)})}e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement("h1",{className:"title"},"Search Engine"),r.a.createElement("button",{onClick:this.handleClick},"Finished with Study"),r.a.createElement(C,{ref:this.ref}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},92:function(e,t,a){}},[[114,1,2]]]);
//# sourceMappingURL=main.e5b25ca8.chunk.js.map