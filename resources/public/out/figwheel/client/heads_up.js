// Compiled by ClojureScript 0.0-2371
goog.provide('figwheel.client.heads_up');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.socket');
goog.require('clojure.string');
goog.require('clojure.string');
/**
* @param {...*} var_args
*/
figwheel.client.heads_up.node = (function() { 
var node__delegate = function (t,attrs,children){var e = document.createElement(cljs.core.name.call(null,t));var seq__21554_21562 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));var chunk__21555_21563 = null;var count__21556_21564 = (0);var i__21557_21565 = (0);while(true){
if((i__21557_21565 < count__21556_21564))
{var k_21566 = cljs.core._nth.call(null,chunk__21555_21563,i__21557_21565);e.setAttribute(cljs.core.name.call(null,k_21566),cljs.core.get.call(null,attrs,k_21566));
{
var G__21567 = seq__21554_21562;
var G__21568 = chunk__21555_21563;
var G__21569 = count__21556_21564;
var G__21570 = (i__21557_21565 + (1));
seq__21554_21562 = G__21567;
chunk__21555_21563 = G__21568;
count__21556_21564 = G__21569;
i__21557_21565 = G__21570;
continue;
}
} else
{var temp__4126__auto___21571 = cljs.core.seq.call(null,seq__21554_21562);if(temp__4126__auto___21571)
{var seq__21554_21572__$1 = temp__4126__auto___21571;if(cljs.core.chunked_seq_QMARK_.call(null,seq__21554_21572__$1))
{var c__13333__auto___21573 = cljs.core.chunk_first.call(null,seq__21554_21572__$1);{
var G__21574 = cljs.core.chunk_rest.call(null,seq__21554_21572__$1);
var G__21575 = c__13333__auto___21573;
var G__21576 = cljs.core.count.call(null,c__13333__auto___21573);
var G__21577 = (0);
seq__21554_21562 = G__21574;
chunk__21555_21563 = G__21575;
count__21556_21564 = G__21576;
i__21557_21565 = G__21577;
continue;
}
} else
{var k_21578 = cljs.core.first.call(null,seq__21554_21572__$1);e.setAttribute(cljs.core.name.call(null,k_21578),cljs.core.get.call(null,attrs,k_21578));
{
var G__21579 = cljs.core.next.call(null,seq__21554_21572__$1);
var G__21580 = null;
var G__21581 = (0);
var G__21582 = (0);
seq__21554_21562 = G__21579;
chunk__21555_21563 = G__21580;
count__21556_21564 = G__21581;
i__21557_21565 = G__21582;
continue;
}
}
} else
{}
}
break;
}
var seq__21558_21583 = cljs.core.seq.call(null,children);var chunk__21559_21584 = null;var count__21560_21585 = (0);var i__21561_21586 = (0);while(true){
if((i__21561_21586 < count__21560_21585))
{var ch_21587 = cljs.core._nth.call(null,chunk__21559_21584,i__21561_21586);e.appendChild(ch_21587);
{
var G__21588 = seq__21558_21583;
var G__21589 = chunk__21559_21584;
var G__21590 = count__21560_21585;
var G__21591 = (i__21561_21586 + (1));
seq__21558_21583 = G__21588;
chunk__21559_21584 = G__21589;
count__21560_21585 = G__21590;
i__21561_21586 = G__21591;
continue;
}
} else
{var temp__4126__auto___21592 = cljs.core.seq.call(null,seq__21558_21583);if(temp__4126__auto___21592)
{var seq__21558_21593__$1 = temp__4126__auto___21592;if(cljs.core.chunked_seq_QMARK_.call(null,seq__21558_21593__$1))
{var c__13333__auto___21594 = cljs.core.chunk_first.call(null,seq__21558_21593__$1);{
var G__21595 = cljs.core.chunk_rest.call(null,seq__21558_21593__$1);
var G__21596 = c__13333__auto___21594;
var G__21597 = cljs.core.count.call(null,c__13333__auto___21594);
var G__21598 = (0);
seq__21558_21583 = G__21595;
chunk__21559_21584 = G__21596;
count__21560_21585 = G__21597;
i__21561_21586 = G__21598;
continue;
}
} else
{var ch_21599 = cljs.core.first.call(null,seq__21558_21593__$1);e.appendChild(ch_21599);
{
var G__21600 = cljs.core.next.call(null,seq__21558_21593__$1);
var G__21601 = null;
var G__21602 = (0);
var G__21603 = (0);
seq__21558_21583 = G__21600;
chunk__21559_21584 = G__21601;
count__21560_21585 = G__21602;
i__21561_21586 = G__21603;
continue;
}
}
} else
{}
}
break;
}
return e;
};
var node = function (t,attrs,var_args){
var children = null;if (arguments.length > 2) {
  children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return node__delegate.call(this,t,attrs,children);};
node.cljs$lang$maxFixedArity = 2;
node.cljs$lang$applyTo = (function (arglist__21604){
var t = cljs.core.first(arglist__21604);
arglist__21604 = cljs.core.next(arglist__21604);
var attrs = cljs.core.first(arglist__21604);
var children = cljs.core.rest(arglist__21604);
return node__delegate(t,attrs,children);
});
node.cljs$core$IFn$_invoke$arity$variadic = node__delegate;
return node;
})()
;
figwheel.client.heads_up.heads_up_event_dispatch = (function (){var method_table__13443__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__13444__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__13445__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__13446__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__13447__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("heads-up-event-dispatch",((function (method_table__13443__auto__,prefer_table__13444__auto__,method_cache__13445__auto__,cached_hierarchy__13446__auto__,hierarchy__13447__auto__){
return (function (dataset){return dataset.figwheelEvent;
});})(method_table__13443__auto__,prefer_table__13444__auto__,method_cache__13445__auto__,cached_hierarchy__13446__auto__,hierarchy__13447__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__13447__auto__,method_table__13443__auto__,prefer_table__13444__auto__,method_cache__13445__auto__,cached_hierarchy__13446__auto__));
})();
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){return cljs.core.PersistentArrayMap.EMPTY;
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"file-selected",(function (dataset){return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),dataset.fileName,new cljs.core.Keyword(null,"file-line","file-line",-1228823138),dataset.fileLine], null));
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"close-heads-up",(function (dataset){return figwheel.client.heads_up.clear.call(null);
}));
figwheel.client.heads_up.ancestor_nodes = (function ancestor_nodes(el){return cljs.core.iterate.call(null,(function (e){return e.parentNode;
}),el);
});
figwheel.client.heads_up.get_dataset = (function get_dataset(el){return cljs.core.first.call(null,cljs.core.keep.call(null,(function (x){if(cljs.core.truth_(x.dataset.figwheelEvent))
{return x.dataset;
} else
{return null;
}
}),cljs.core.take.call(null,(4),figwheel.client.heads_up.ancestor_nodes.call(null,el))));
});
figwheel.client.heads_up.heads_up_onclick_handler = (function heads_up_onclick_handler(event){var dataset = figwheel.client.heads_up.get_dataset.call(null,event.target);event.preventDefault();
if(cljs.core.truth_(dataset))
{return figwheel.client.heads_up.heads_up_event_dispatch.call(null,dataset);
} else
{return null;
}
});
figwheel.client.heads_up.ensure_container = (function ensure_container(){var cont_id = "figwheel-heads-up-container";var content_id = "figwheel-heads-up-content-area";if(cljs.core.not.call(null,document.querySelector(("#"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cont_id)))))
{var el = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),("-webkit-transition: all 0.2s ease-in-out;-moz-transition: all 0.2s ease-in-out;-o-transition: all 0.2s ease-in-out;transition: all 0.2s ease-in-out;font-size: 13px;border-top: 1px solid #f5f5f5;box-shadow: 0px 0px 1px #aaaaaa;line-height: 18px;color: #333;font-family: monospace;padding: 0px 10px 0px 70px;position: fixed;bottom: 0px;left: 0px;height: 0px;opacity: 0.0;box-sizing: border-box;z-index: 10000;")], null));el.onclick = figwheel.client.heads_up.heads_up_onclick_handler;
el.innerHTML = (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.clojure_symbol_svg));
el.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));
return document.body.appendChild(el);
} else
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
}
});
figwheel.client.heads_up.set_style_BANG_ = (function set_style_BANG_(p__21605,st_map){var map__21609 = p__21605;var map__21609__$1 = ((cljs.core.seq_QMARK_.call(null,map__21609))?cljs.core.apply.call(null,cljs.core.hash_map,map__21609):map__21609);var container_el = cljs.core.get.call(null,map__21609__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));return cljs.core.mapv.call(null,((function (map__21609,map__21609__$1,container_el){
return (function (p__21610){var vec__21611 = p__21610;var k = cljs.core.nth.call(null,vec__21611,(0),null);var v = cljs.core.nth.call(null,vec__21611,(1),null);return (container_el.style[cljs.core.name.call(null,k)] = v);
});})(map__21609,map__21609__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function set_content_BANG_(p__21612,dom_str){var map__21614 = p__21612;var map__21614__$1 = ((cljs.core.seq_QMARK_.call(null,map__21614))?cljs.core.apply.call(null,cljs.core.hash_map,map__21614):map__21614);var c = map__21614__$1;var content_area_el = cljs.core.get.call(null,map__21614__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function get_content(p__21615){var map__21617 = p__21615;var map__21617__$1 = ((cljs.core.seq_QMARK_.call(null,map__21617))?cljs.core.apply.call(null,cljs.core.hash_map,map__21617):map__21617);var content_area_el = cljs.core.get.call(null,map__21617__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function close_link(){return ("<a style=\"float: right;font-size: 18px;text-decoration: none;text-align: right;width: 30px;height: 30px;color: rgba(84,84,84, 0.5);\" href=\"#\"  data-figwheel-event=\"close-heads-up\">x</a>");
});
figwheel.client.heads_up.display_heads_up = (function display_heads_up(style,msg){var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_21659){var state_val_21660 = (state_21659[(1)]);if((state_val_21660 === (2)))
{var inst_21644 = (state_21659[(7)]);var inst_21653 = (state_21659[(2)]);var inst_21654 = [new cljs.core.Keyword(null,"height","height",1025178622)];var inst_21655 = ["auto"];var inst_21656 = cljs.core.PersistentHashMap.fromArrays(inst_21654,inst_21655);var inst_21657 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_21644,inst_21656);var state_21659__$1 = (function (){var statearr_21661 = state_21659;(statearr_21661[(8)] = inst_21653);
return statearr_21661;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21659__$1,inst_21657);
} else
{if((state_val_21660 === (1)))
{var inst_21644 = (state_21659[(7)]);var inst_21644__$1 = figwheel.client.heads_up.ensure_container.call(null);var inst_21645 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];var inst_21646 = ["10px","10px","100%","68px","1.0"];var inst_21647 = cljs.core.PersistentHashMap.fromArrays(inst_21645,inst_21646);var inst_21648 = cljs.core.merge.call(null,inst_21647,style);var inst_21649 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_21644__$1,inst_21648);var inst_21650 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_21644__$1,msg);var inst_21651 = cljs.core.async.timeout.call(null,(300));var state_21659__$1 = (function (){var statearr_21662 = state_21659;(statearr_21662[(7)] = inst_21644__$1);
(statearr_21662[(9)] = inst_21649);
(statearr_21662[(10)] = inst_21650);
return statearr_21662;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21659__$1,(2),inst_21651);
} else
{return null;
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21666 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_21666[(0)] = state_machine__15890__auto__);
(statearr_21666[(1)] = (1));
return statearr_21666;
});
var state_machine__15890__auto____1 = (function (state_21659){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21659);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21667){if((e21667 instanceof Object))
{var ex__15893__auto__ = e21667;var statearr_21668_21670 = state_21659;(statearr_21668_21670[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21659);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21667;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21671 = state_21659;
state_21659 = G__21671;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21659){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21659);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_21669 = f__15946__auto__.call(null);(statearr_21669[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21669;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
});
figwheel.client.heads_up.heading = (function heading(s){return ("<div style=\"font-size: 26px;line-height: 26px;margin-bottom: 2px;padding-top: 1px;\">"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)+"</div>");
});
figwheel.client.heads_up.file_and_line_number = (function file_and_line_number(msg){if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*at\sline.*/,msg)))
{return cljs.core.take.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,msg," ")));
} else
{return null;
}
});
figwheel.client.heads_up.file_selector_div = (function file_selector_div(file_name,line_number,msg){return ("<div data-figwheel-event=\"file-selected\" data-file-name=\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(file_name)+"\" data-file-line=\""+cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_number)+"\">"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+"</div>");
});
figwheel.client.heads_up.format_line = (function format_line(msg){var temp__4124__auto__ = figwheel.client.heads_up.file_and_line_number.call(null,msg);if(cljs.core.truth_(temp__4124__auto__))
{var vec__21673 = temp__4124__auto__;var f = cljs.core.nth.call(null,vec__21673,(0),null);var ln = cljs.core.nth.call(null,vec__21673,(1),null);return figwheel.client.heads_up.file_selector_div.call(null,f,ln,msg);
} else
{return ("<div>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)+"</div>");
}
});
figwheel.client.heads_up.display_error = (function display_error(formatted_messages){var vec__21676 = cljs.core.first.call(null,cljs.core.keep.call(null,figwheel.client.heads_up.file_and_line_number,formatted_messages));var file_name = cljs.core.nth.call(null,vec__21676,(0),null);var file_line = cljs.core.nth.call(null,vec__21676,(1),null);var msg = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (vec__21676,file_name,file_line){
return (function (p1__21674_SHARP_){return ("<div>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__21674_SHARP_)+"</div>");
});})(vec__21676,file_name,file_line))
,formatted_messages));return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 161, 161, 0.95)"], null),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.close_link.call(null))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.heading.call(null,"Compile Error"))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.file_selector_div.call(null,file_name,file_line,msg))));
});
figwheel.client.heads_up.display_system_warning = (function display_system_warning(header,msg){return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.close_link.call(null))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.heading.call(null,header))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.format_line.call(null,msg))));
});
figwheel.client.heads_up.display_warning = (function display_warning(msg){return figwheel.client.heads_up.display_system_warning.call(null,"Compile Warning",msg);
});
figwheel.client.heads_up.append_message = (function append_message(message){var map__21678 = figwheel.client.heads_up.ensure_container.call(null);var map__21678__$1 = ((cljs.core.seq_QMARK_.call(null,map__21678))?cljs.core.apply.call(null,cljs.core.hash_map,map__21678):map__21678);var content_area_el = cljs.core.get.call(null,map__21678__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));var el = document.createElement("div");el.innerHTML = figwheel.client.heads_up.format_line.call(null,message);
return content_area_el.appendChild(el);
});
figwheel.client.heads_up.clear = (function clear(){var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_21725){var state_val_21726 = (state_21725[(1)]);if((state_val_21726 === (3)))
{var inst_21708 = (state_21725[(7)]);var inst_21722 = (state_21725[(2)]);var inst_21723 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_21708,"");var state_21725__$1 = (function (){var statearr_21727 = state_21725;(statearr_21727[(8)] = inst_21722);
return statearr_21727;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21725__$1,inst_21723);
} else
{if((state_val_21726 === (2)))
{var inst_21708 = (state_21725[(7)]);var inst_21715 = (state_21725[(2)]);var inst_21716 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];var inst_21717 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];var inst_21718 = cljs.core.PersistentHashMap.fromArrays(inst_21716,inst_21717);var inst_21719 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_21708,inst_21718);var inst_21720 = cljs.core.async.timeout.call(null,(200));var state_21725__$1 = (function (){var statearr_21728 = state_21725;(statearr_21728[(9)] = inst_21715);
(statearr_21728[(10)] = inst_21719);
return statearr_21728;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21725__$1,(3),inst_21720);
} else
{if((state_val_21726 === (1)))
{var inst_21708 = (state_21725[(7)]);var inst_21708__$1 = figwheel.client.heads_up.ensure_container.call(null);var inst_21709 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];var inst_21710 = ["0.0"];var inst_21711 = cljs.core.PersistentHashMap.fromArrays(inst_21709,inst_21710);var inst_21712 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_21708__$1,inst_21711);var inst_21713 = cljs.core.async.timeout.call(null,(300));var state_21725__$1 = (function (){var statearr_21729 = state_21725;(statearr_21729[(11)] = inst_21712);
(statearr_21729[(7)] = inst_21708__$1);
return statearr_21729;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21725__$1,(2),inst_21713);
} else
{return null;
}
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21733 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_21733[(0)] = state_machine__15890__auto__);
(statearr_21733[(1)] = (1));
return statearr_21733;
});
var state_machine__15890__auto____1 = (function (state_21725){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21725);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21734){if((e21734 instanceof Object))
{var ex__15893__auto__ = e21734;var statearr_21735_21737 = state_21725;(statearr_21735_21737[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21725);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21734;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21738 = state_21725;
state_21725 = G__21738;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21725){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21725);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_21736 = f__15946__auto__.call(null);(statearr_21736[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21736;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function display_loaded_start(){return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function flash_loaded(){var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_21770){var state_val_21771 = (state_21770[(1)]);if((state_val_21771 === (4)))
{var inst_21768 = (state_21770[(2)]);var state_21770__$1 = state_21770;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21770__$1,inst_21768);
} else
{if((state_val_21771 === (3)))
{var inst_21765 = (state_21770[(2)]);var inst_21766 = figwheel.client.heads_up.clear.call(null);var state_21770__$1 = (function (){var statearr_21772 = state_21770;(statearr_21772[(7)] = inst_21765);
return statearr_21772;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21770__$1,(4),inst_21766);
} else
{if((state_val_21771 === (2)))
{var inst_21762 = (state_21770[(2)]);var inst_21763 = cljs.core.async.timeout.call(null,(400));var state_21770__$1 = (function (){var statearr_21773 = state_21770;(statearr_21773[(8)] = inst_21762);
return statearr_21773;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21770__$1,(3),inst_21763);
} else
{if((state_val_21771 === (1)))
{var inst_21760 = figwheel.client.heads_up.display_loaded_start.call(null);var state_21770__$1 = state_21770;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21770__$1,(2),inst_21760);
} else
{return null;
}
}
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21777 = [null,null,null,null,null,null,null,null,null];(statearr_21777[(0)] = state_machine__15890__auto__);
(statearr_21777[(1)] = (1));
return statearr_21777;
});
var state_machine__15890__auto____1 = (function (state_21770){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21770);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21778){if((e21778 instanceof Object))
{var ex__15893__auto__ = e21778;var statearr_21779_21781 = state_21770;(statearr_21779_21781[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21770);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21778;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21782 = state_21770;
state_21770 = G__21782;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21770){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_21780 = f__15946__auto__.call(null);(statearr_21780[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21780;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
});
figwheel.client.heads_up.clojure_symbol_svg = "<?xml version='1.0' encoding='UTF-8' ?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' viewBox='0 0 100 99' version='1.1' xmlns='http://www.w3.org/2000/svg' style='position:absolute; top:9px; left: 10px;'>\n<circle fill='rgba(255,255,255,0.5)' cx='49.75' cy='49.5' r='48.5'/>\n<path fill='#5881d8' d=' M 39.30 6.22 C 51.71 3.11 65.45 5.64 75.83 13.16 C 88.68 22.10 96.12 38.22 94.43 53.80 C 93.66 60.11 89.40 66.01 83.37 68.24 C 79.21 69.97 74.64 69.78 70.23 69.80 C 80.77 59.67 81.41 41.33 71.45 30.60 C 63.60 21.32 49.75 18.52 38.65 23.16 C 31.27 18.80 21.83 18.68 14.27 22.69 C 20.65 14.79 29.32 8.56 39.30 6.22 Z' />\n<path fill='#90b4fe' d=' M 42.93 26.99 C 48.49 25.50 54.55 25.62 59.79 28.14 C 68.71 32.19 74.61 42.14 73.41 51.94 C 72.85 58.64 68.92 64.53 63.81 68.69 C 59.57 66.71 57.53 62.30 55.66 58.30 C 50.76 48.12 50.23 36.02 42.93 26.99 Z' />\n<path fill='#63b132' d=' M 12.30 33.30 C 17.11 28.49 24.33 26.90 30.91 28.06 C 25.22 33.49 21.44 41.03 21.46 48.99 C 21.11 58.97 26.58 68.76 35.08 73.92 C 43.28 79.06 53.95 79.28 62.66 75.29 C 70.37 77.57 78.52 77.36 86.31 75.57 C 80.05 84.00 70.94 90.35 60.69 92.84 C 48.02 96.03 34.00 93.24 23.56 85.37 C 12.16 77.09 5.12 63.11 5.44 49.00 C 5.15 43.06 8.22 37.42 12.30 33.30 Z' />\n<path fill='#91dc47' d=' M 26.94 54.00 C 24.97 45.06 29.20 35.59 36.45 30.24 C 41.99 33.71 44.23 40.14 46.55 45.91 C 43.00 53.40 38.44 60.46 35.94 68.42 C 31.50 64.74 27.96 59.77 26.94 54.00 Z' />\n<path fill='#91dc47' d=' M 41.97 71.80 C 41.46 64.27 45.31 57.52 48.11 50.80 C 50.40 58.13 51.84 66.19 57.18 72.06 C 52.17 73.37 46.93 73.26 41.97 71.80 Z' />\n</svg>";

//# sourceMappingURL=heads_up.js.map