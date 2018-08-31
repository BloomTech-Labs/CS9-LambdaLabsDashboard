'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray'),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_classCallCheck2=require('babel-runtime/helpers/classCallCheck'),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require('babel-runtime/helpers/createClass'),_createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Trello=function(){function a(b,c,d,e,f){return(0,_classCallCheck3.default)(this,a),this.teamStats=b,this.team=c,this.lists=this.parseLists(e),this.rebuild=f,this.parseCards(d)}return(0,_createClass3.default)(a,[{key:'parseLists',value:function g(a){for(var b={members:this.team},c=a.length-1;0<=c;c--){var d=a[c],e=d.id,f=d.name;!1==f in b&&(b[f]={id:e,cards:[]})}return b}},{key:'loopLists',value:function d(a){var b=!1;for(var e in this.lists)if(this.lists.hasOwnProperty(e)){var c=this.lists[e].id;if(c===a){b=e;break}}return b}},{key:'loopTeam',value:function h(a){for(var b=a.length,c=0,d=this.team.length-1;0<=d;d--){var e=this.team[d],f=e.id,g=e.fullName;if(a.includes(f)&&(c++,this.rebuild&&g in this.teamStats&&(this.teamStats[g].trellos+=1),c===b))break}}},{key:'parseCards',value:function o(a){for(var b=0,c=0,d=0,e=a.length-1;0<=e;e--){var f=a[e],g=f.idList,h=f.idMembers,j=f.name,k=this.loopLists(g);k&&(this.lists[k].cards.push({name:j,idMembers:h}),'Done'===k?(d++,this.loopTeam(h)):'In Progress'===k||'Testing'===k?c++:'To Do'===k&&b++)}var l=d+c+b,m=100*(d/l),n=Math.PI*(2*(200-200*m/100));return this.rebuild?{updatedTeamStats:this.rebuildTeamObject(),totalCards:l,inProgress:this.getInProgress(),trello:this.lists,completeness:n}:{completeness:m,circ:n}}},{key:'rebuildTeamObject',value:function b(){var a=[];for(var c in this.teamStats){var d={};d.name=c,d.github=this.teamStats[c].github,d.merges=this.teamStats[c].merges,d.trellos=this.teamStats[c].trellos,a.push(d)}return a}},{key:'getInProgress',value:function a(){return'In Progress'in this.lists&&'Testing'in this.lists?[].concat((0,_toConsumableArray3.default)(this.lists['In Progress'].cards),(0,_toConsumableArray3.default)(this.lists.Testing.cards)):[]}}]),a}();exports.default=Trello;