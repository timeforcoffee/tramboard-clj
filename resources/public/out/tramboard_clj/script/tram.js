// Compiled by ClojureScript 0.0-2371
goog.provide('tramboard_clj.script.tram');
goog.require('cljs.core');
goog.require('ajax.core');
goog.require('ajax.core');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
cljs.core.enable_console_print_BANG_.call(null);
tramboard_clj.script.tram.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected-views","selected-views",923269654),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["hirschi"], null)], null));
tramboard_clj.script.tram.mocks = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arrivals","arrivals",1772544837),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"number","number",1570378438),"14",new cljs.core.Keyword(null,"destination","destination",-253872483),"Triemli",new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298),(0),new cljs.core.Keyword(null,"in-hours","in-hours",347042092),(0),new cljs.core.Keyword(null,"time","time",1385887882),"14:40",new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865),"14:39"], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"number","number",1570378438),"14",new cljs.core.Keyword(null,"destination","destination",-253872483),"Triemli",new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298),(1),new cljs.core.Keyword(null,"in-hours","in-hours",347042092),(0),new cljs.core.Keyword(null,"time","time",1385887882),"14:40",new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865),"14:39"], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"number","number",1570378438),"14",new cljs.core.Keyword(null,"destination","destination",-253872483),"Triemli",new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298),(3),new cljs.core.Keyword(null,"in-hours","in-hours",347042092),(1),new cljs.core.Keyword(null,"time","time",1385887882),"14:40",new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865),"14:39"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"number","number",1570378438),"14",new cljs.core.Keyword(null,"destination","destination",-253872483),"Triemli",new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298),(10),new cljs.core.Keyword(null,"in-hours","in-hours",347042092),(0),new cljs.core.Keyword(null,"time","time",1385887882),"14:40",new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865),"14:39"], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"number","number",1570378438),"14",new cljs.core.Keyword(null,"destination","destination",-253872483),"Triemli",new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298),(1),new cljs.core.Keyword(null,"in-hours","in-hours",347042092),(0),new cljs.core.Keyword(null,"time","time",1385887882),"14:40",new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865),"14:39"], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"number","number",1570378438),"14",new cljs.core.Keyword(null,"destination","destination",-253872483),"Triemli",new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298),(1),new cljs.core.Keyword(null,"in-hours","in-hours",347042092),(1),new cljs.core.Keyword(null,"time","time",1385887882),"14:40",new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865),"14:39"], null)], null)], null),new cljs.core.Keyword(null,"views","views",1450155487),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"stations","stations",-19744730),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keywords","keywords",1526959054),"",new cljs.core.Keyword(null,"stat","stat",-1370599836),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"Z\u00FCrich, Hirschwiesenstrasse",new cljs.core.Keyword(null,"id","id",-1388402092),"008591193"], null)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keywords","keywords",1526959054),"",new cljs.core.Keyword(null,"stat","stat",-1370599836),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"Z\u00FCrich, Milchbuck",new cljs.core.Keyword(null,"id","id",-1388402092),"008591276"], null)], null)], null),new cljs.core.Keyword(null,"name","name",1843675177),"Hirschi-City",new cljs.core.Keyword(null,"id","id",-1388402092),"hirschi-city"], null)], null)], null);
tramboard_clj.script.tram.display_time = (function display_time(in_hours,in_minutes){if(cljs.core._EQ_.call(null,in_hours,(0)))
{return in_minutes;
} else
{return ">59";
}
});
tramboard_clj.script.tram.arrival_row = (function arrival_row(arrival,owner){if(typeof tramboard_clj.script.tram.t22265 !== 'undefined')
{} else
{
/**
* @constructor
*/
tramboard_clj.script.tram.t22265 = (function (owner,arrival,arrival_row,meta22266){
this.owner = owner;
this.arrival = arrival;
this.arrival_row = arrival_row;
this.meta22266 = meta22266;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
tramboard_clj.script.tram.t22265.cljs$lang$type = true;
tramboard_clj.script.tram.t22265.cljs$lang$ctorStr = "tramboard-clj.script.tram/t22265";
tramboard_clj.script.tram.t22265.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"tramboard-clj.script.tram/t22265");
});
tramboard_clj.script.tram.t22265.prototype.om$core$IRender$ = true;
tramboard_clj.script.tram.t22265.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.tr({"className": "tram-row"},React.DOM.td({"className": "number-cell"},React.DOM.span({"className": ("number number-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"number","number",1570378438).cljs$core$IFn$_invoke$arity$1(self__.arrival)))},new cljs.core.Keyword(null,"number","number",1570378438).cljs$core$IFn$_invoke$arity$1(self__.arrival))),React.DOM.td({"className": "station"},new cljs.core.Keyword(null,"destination","destination",-253872483).cljs$core$IFn$_invoke$arity$1(self__.arrival)),React.DOM.td({"className": "departure"},React.DOM.div(null,new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(self__.arrival)),React.DOM.div({"className": "undelayed"},new cljs.core.Keyword(null,"undelayed-time","undelayed-time",1247030865).cljs$core$IFn$_invoke$arity$1(self__.arrival))),(function (){var display_time = tramboard_clj.script.tram.display_time.call(null,new cljs.core.Keyword(null,"in-hours","in-hours",347042092).cljs$core$IFn$_invoke$arity$1(self__.arrival),new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298).cljs$core$IFn$_invoke$arity$1(self__.arrival));return React.DOM.td({"className": ("text-right time time"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"in-hours","in-hours",347042092).cljs$core$IFn$_invoke$arity$1(self__.arrival))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"in-minutes","in-minutes",720983298).cljs$core$IFn$_invoke$arity$1(self__.arrival)))},React.DOM.img({"src": "images/tram.png"},React.DOM.div(null,display_time)));
})());
});
tramboard_clj.script.tram.t22265.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22267){var self__ = this;
var _22267__$1 = this;return self__.meta22266;
});
tramboard_clj.script.tram.t22265.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22267,meta22266__$1){var self__ = this;
var _22267__$1 = this;return (new tramboard_clj.script.tram.t22265(self__.owner,self__.arrival,self__.arrival_row,meta22266__$1));
});
tramboard_clj.script.tram.__GT_t22265 = (function __GT_t22265(owner__$1,arrival__$1,arrival_row__$1,meta22266){return (new tramboard_clj.script.tram.t22265(owner__$1,arrival__$1,arrival_row__$1,meta22266));
});
}
return (new tramboard_clj.script.tram.t22265(owner,arrival,arrival_row,null));
});
tramboard_clj.script.tram.arrival_table = (function arrival_table(arrivals,owner){if(typeof tramboard_clj.script.tram.t22271 !== 'undefined')
{} else
{
/**
* @constructor
*/
tramboard_clj.script.tram.t22271 = (function (owner,arrivals,arrival_table,meta22272){
this.owner = owner;
this.arrivals = arrivals;
this.arrival_table = arrival_table;
this.meta22272 = meta22272;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
tramboard_clj.script.tram.t22271.cljs$lang$type = true;
tramboard_clj.script.tram.t22271.cljs$lang$ctorStr = "tramboard-clj.script.tram/t22271";
tramboard_clj.script.tram.t22271.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"tramboard-clj.script.tram/t22271");
});
tramboard_clj.script.tram.t22271.prototype.om$core$IRender$ = true;
tramboard_clj.script.tram.t22271.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.table({"className": "tram-table"},cljs.core.apply.call(null,om.dom.tbody,null,om.core.build_all.call(null,tramboard_clj.script.tram.arrival_row,self__.arrivals)));
});
tramboard_clj.script.tram.t22271.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22273){var self__ = this;
var _22273__$1 = this;return self__.meta22272;
});
tramboard_clj.script.tram.t22271.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22273,meta22272__$1){var self__ = this;
var _22273__$1 = this;return (new tramboard_clj.script.tram.t22271(self__.owner,self__.arrivals,self__.arrival_table,meta22272__$1));
});
tramboard_clj.script.tram.__GT_t22271 = (function __GT_t22271(owner__$1,arrivals__$1,arrival_table__$1,meta22272){return (new tramboard_clj.script.tram.t22271(owner__$1,arrivals__$1,arrival_table__$1,meta22272));
});
}
return (new tramboard_clj.script.tram.t22271(owner,arrivals,arrival_table,null));
});
tramboard_clj.script.tram.fetch_stationboard_data = (function fetch_stationboard_data(ids,on_complete){return ajax.core.GET.call(null,"http://localhost:7000/stationboard/008591193",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"response-format","response-format",1664465322),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true,new cljs.core.Keyword(null,"handler","handler",-195596612),on_complete], null));
});
tramboard_clj.script.tram.arrivals_from_stationboard = (function arrivals_from_stationboard(stationboard_data,selected_views,window_size){return new cljs.core.Keyword(null,"arrivals","arrivals",1772544837).cljs$core$IFn$_invoke$arity$1(tramboard_clj.script.tram.mocks);
});
tramboard_clj.script.tram.arrival_tables_view = (function arrival_tables_view(app_state,owner){if(typeof tramboard_clj.script.tram.t22280 !== 'undefined')
{} else
{
/**
* @constructor
*/
tramboard_clj.script.tram.t22280 = (function (owner,app_state,arrival_tables_view,meta22281){
this.owner = owner;
this.app_state = app_state;
this.arrival_tables_view = arrival_tables_view;
this.meta22281 = meta22281;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
tramboard_clj.script.tram.t22280.cljs$lang$type = true;
tramboard_clj.script.tram.t22280.cljs$lang$ctorStr = "tramboard-clj.script.tram/t22280";
tramboard_clj.script.tram.t22280.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"tramboard-clj.script.tram/t22280");
});
tramboard_clj.script.tram.t22280.prototype.om$core$IRenderState$ = true;
tramboard_clj.script.tram.t22280.prototype.om$core$IRenderState$render_state$arity$2 = (function (this$,p__22283){var self__ = this;
var map__22284 = p__22283;var map__22284__$1 = ((cljs.core.seq_QMARK_.call(null,map__22284))?cljs.core.apply.call(null,cljs.core.hash_map,map__22284):map__22284);var arrivals = cljs.core.get.call(null,map__22284__$1,new cljs.core.Keyword(null,"arrivals","arrivals",1772544837));var this$__$1 = this;return cljs.core.apply.call(null,om.dom.div,{"className": "row"},cljs.core.map.call(null,((function (this$__$1,map__22284,map__22284__$1,arrivals){
return (function (p1__22274_SHARP_){return React.DOM.div({"className": "multi-col col-sm-6 col-md-6"},p1__22274_SHARP_);
});})(this$__$1,map__22284,map__22284__$1,arrivals))
,om.core.build_all.call(null,tramboard_clj.script.tram.arrival_table,arrivals)));
});
tramboard_clj.script.tram.t22280.prototype.om$core$IWillMount$ = true;
tramboard_clj.script.tram.t22280.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return tramboard_clj.script.tram.fetch_stationboard_data.call(null,cljs.core.PersistentVector.EMPTY,((function (___$1){
return (function (data){return om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"arrivals","arrivals",1772544837),tramboard_clj.script.tram.arrivals_from_stationboard.call(null,data,new cljs.core.Keyword(null,"selected-views","selected-views",923269654).cljs$core$IFn$_invoke$arity$1(self__.app_state),null));
});})(___$1))
);
});
tramboard_clj.script.tram.t22280.prototype.om$core$IInitState$ = true;
tramboard_clj.script.tram.t22280.prototype.om$core$IInitState$init_state$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"station-data","station-data",-805385155),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"arrivals","arrivals",1772544837),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"window-size","window-size",923834855),cljs.core.PersistentVector.EMPTY], null);
});
tramboard_clj.script.tram.t22280.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22282){var self__ = this;
var _22282__$1 = this;return self__.meta22281;
});
tramboard_clj.script.tram.t22280.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22282,meta22281__$1){var self__ = this;
var _22282__$1 = this;return (new tramboard_clj.script.tram.t22280(self__.owner,self__.app_state,self__.arrival_tables_view,meta22281__$1));
});
tramboard_clj.script.tram.__GT_t22280 = (function __GT_t22280(owner__$1,app_state__$1,arrival_tables_view__$1,meta22281){return (new tramboard_clj.script.tram.t22280(owner__$1,app_state__$1,arrival_tables_view__$1,meta22281));
});
}
return (new tramboard_clj.script.tram.t22280(owner,app_state,arrival_tables_view,null));
});
tramboard_clj.script.tram.main = (function main(){return om.core.root.call(null,tramboard_clj.script.tram.arrival_tables_view,tramboard_clj.script.tram.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("my-app")], null));
});

//# sourceMappingURL=tram.js.map