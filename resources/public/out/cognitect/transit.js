// Compiled by ClojureScript 0.0-2371
goog.provide('cognitect.transit');
goog.require('cljs.core');
goog.require('goog.math.Long');
goog.require('com.cognitect.transit.eq');
goog.require('com.cognitect.transit.eq');
goog.require('com.cognitect.transit.types');
goog.require('com.cognitect.transit.types');
goog.require('com.cognitect.transit');
goog.require('com.cognitect.transit');
cljs.core.UUID.prototype.cljs$core$IEquiv$ = true;
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var this$__$1 = this;if((other instanceof cljs.core.UUID))
{return (this$__$1.uuid === other.uuid);
} else
{if((other instanceof com.cognitect.transit.types.UUID))
{return (this$__$1.uuid === other.toString());
} else
{return false;

}
}
});
com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IEquiv$ = true;
com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var this$__$1 = this;return this$__$1.equiv(other);
});
com.cognitect.transit.types.UUID.prototype.cljs$core$IEquiv$ = true;
com.cognitect.transit.types.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var this$__$1 = this;if((other instanceof cljs.core.UUID))
{return cljs.core._equiv.call(null,other,this$__$1);
} else
{return this$__$1.equiv(other);
}
});
goog.math.Long.prototype.cljs$core$IEquiv$ = true;
goog.math.Long.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var this$__$1 = this;return this$__$1.equiv(other);
});
com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IHash$ = true;
com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var this$__$1 = this;return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});
com.cognitect.transit.types.UUID.prototype.cljs$core$IHash$ = true;
com.cognitect.transit.types.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var this$__$1 = this;return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});
goog.math.Long.prototype.cljs$core$IHash$ = true;
goog.math.Long.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var this$__$1 = this;return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});
cognitect.transit.opts_merge = (function opts_merge(a,b){var seq__20523_20527 = cljs.core.seq.call(null,cljs.core.js_keys.call(null,b));var chunk__20524_20528 = null;var count__20525_20529 = (0);var i__20526_20530 = (0);while(true){
if((i__20526_20530 < count__20525_20529))
{var k_20531 = cljs.core._nth.call(null,chunk__20524_20528,i__20526_20530);var v_20532 = (b[k_20531]);(a[k_20531] = v_20532);
{
var G__20533 = seq__20523_20527;
var G__20534 = chunk__20524_20528;
var G__20535 = count__20525_20529;
var G__20536 = (i__20526_20530 + (1));
seq__20523_20527 = G__20533;
chunk__20524_20528 = G__20534;
count__20525_20529 = G__20535;
i__20526_20530 = G__20536;
continue;
}
} else
{var temp__4126__auto___20537 = cljs.core.seq.call(null,seq__20523_20527);if(temp__4126__auto___20537)
{var seq__20523_20538__$1 = temp__4126__auto___20537;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20523_20538__$1))
{var c__13333__auto___20539 = cljs.core.chunk_first.call(null,seq__20523_20538__$1);{
var G__20540 = cljs.core.chunk_rest.call(null,seq__20523_20538__$1);
var G__20541 = c__13333__auto___20539;
var G__20542 = cljs.core.count.call(null,c__13333__auto___20539);
var G__20543 = (0);
seq__20523_20527 = G__20540;
chunk__20524_20528 = G__20541;
count__20525_20529 = G__20542;
i__20526_20530 = G__20543;
continue;
}
} else
{var k_20544 = cljs.core.first.call(null,seq__20523_20538__$1);var v_20545 = (b[k_20544]);(a[k_20544] = v_20545);
{
var G__20546 = cljs.core.next.call(null,seq__20523_20538__$1);
var G__20547 = null;
var G__20548 = (0);
var G__20549 = (0);
seq__20523_20527 = G__20546;
chunk__20524_20528 = G__20547;
count__20525_20529 = G__20548;
i__20526_20530 = G__20549;
continue;
}
}
} else
{}
}
break;
}
return a;
});

/**
* @constructor
*/
cognitect.transit.MapBuilder = (function (){
})
cognitect.transit.MapBuilder.cljs$lang$type = true;
cognitect.transit.MapBuilder.cljs$lang$ctorStr = "cognitect.transit/MapBuilder";
cognitect.transit.MapBuilder.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/MapBuilder");
});
cognitect.transit.MapBuilder.prototype.init = (function (node){var self__ = this;
var _ = this;return cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
});
cognitect.transit.MapBuilder.prototype.add = (function (m,k,v,node){var self__ = this;
var _ = this;return cljs.core.assoc_BANG_.call(null,m,k,v);
});
cognitect.transit.MapBuilder.prototype.finalize = (function (m,node){var self__ = this;
var _ = this;return cljs.core.persistent_BANG_.call(null,m);
});
cognitect.transit.MapBuilder.prototype.fromArray = (function (arr,node){var self__ = this;
var _ = this;return cljs.core.PersistentArrayMap.fromArray.call(null,arr,true,true);
});
cognitect.transit.__GT_MapBuilder = (function __GT_MapBuilder(){return (new cognitect.transit.MapBuilder());
});

/**
* @constructor
*/
cognitect.transit.VectorBuilder = (function (){
})
cognitect.transit.VectorBuilder.cljs$lang$type = true;
cognitect.transit.VectorBuilder.cljs$lang$ctorStr = "cognitect.transit/VectorBuilder";
cognitect.transit.VectorBuilder.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/VectorBuilder");
});
cognitect.transit.VectorBuilder.prototype.init = (function (node){var self__ = this;
var _ = this;return cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
});
cognitect.transit.VectorBuilder.prototype.add = (function (v,x,node){var self__ = this;
var _ = this;return cljs.core.conj_BANG_.call(null,v,x);
});
cognitect.transit.VectorBuilder.prototype.finalize = (function (v,node){var self__ = this;
var _ = this;return cljs.core.persistent_BANG_.call(null,v);
});
cognitect.transit.VectorBuilder.prototype.fromArray = (function (arr,node){var self__ = this;
var _ = this;return cljs.core.PersistentVector.fromArray.call(null,arr,true);
});
cognitect.transit.__GT_VectorBuilder = (function __GT_VectorBuilder(){return (new cognitect.transit.VectorBuilder());
});
/**
* Return a transit reader. type may be either :json or :json-verbose.
* opts may be a map optionally containing a :handlers entry. The value
* of :handlers should be map from tag to a decoder function which returns
* then in-memory representation of the semantic transit value.
*/
cognitect.transit.reader = (function() {
var reader = null;
var reader__1 = (function (type){return reader.call(null,type,null);
});
var reader__2 = (function (type,opts){return com.cognitect.transit.reader.call(null,cljs.core.name.call(null,type),cognitect.transit.opts_merge.call(null,{"prefersStrings": false, "arrayBuilder": (new cognitect.transit.VectorBuilder()), "mapBuilder": (new cognitect.transit.MapBuilder()), "handlers": cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 5, ["$",(function (v){return cljs.core.symbol.call(null,v);
}),":",(function (v){return cljs.core.keyword.call(null,v);
}),"set",(function (v){return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,v);
}),"list",(function (v){return cljs.core.into.call(null,cljs.core.List.EMPTY,v.reverse());
}),"cmap",(function (v){var i = (0);var ret = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);while(true){
if((i < v.length))
{{
var G__20550 = (i + (2));
var G__20551 = cljs.core.assoc_BANG_.call(null,ret,(v[i]),(v[(i + (1))]));
i = G__20550;
ret = G__20551;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,ret);
}
break;
}
})], null),new cljs.core.Keyword(null,"handlers","handlers",79528781).cljs$core$IFn$_invoke$arity$1(opts)))},cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"handlers","handlers",79528781)))));
});
reader = function(type,opts){
switch(arguments.length){
case 1:
return reader__1.call(this,type);
case 2:
return reader__2.call(this,type,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
reader.cljs$core$IFn$_invoke$arity$1 = reader__1;
reader.cljs$core$IFn$_invoke$arity$2 = reader__2;
return reader;
})()
;
/**
* Read a transit encoded string into ClojureScript values given a
* transit reader.
*/
cognitect.transit.read = (function read(r,str){return r.read(str);
});

/**
* @constructor
*/
cognitect.transit.KeywordHandler = (function (){
})
cognitect.transit.KeywordHandler.cljs$lang$type = true;
cognitect.transit.KeywordHandler.cljs$lang$ctorStr = "cognitect.transit/KeywordHandler";
cognitect.transit.KeywordHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/KeywordHandler");
});
cognitect.transit.KeywordHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return ":";
});
cognitect.transit.KeywordHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;return v.fqn;
});
cognitect.transit.KeywordHandler.prototype.stringRep = (function (v){var self__ = this;
var _ = this;return v.fqn;
});
cognitect.transit.__GT_KeywordHandler = (function __GT_KeywordHandler(){return (new cognitect.transit.KeywordHandler());
});

/**
* @constructor
*/
cognitect.transit.SymbolHandler = (function (){
})
cognitect.transit.SymbolHandler.cljs$lang$type = true;
cognitect.transit.SymbolHandler.cljs$lang$ctorStr = "cognitect.transit/SymbolHandler";
cognitect.transit.SymbolHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/SymbolHandler");
});
cognitect.transit.SymbolHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return "$";
});
cognitect.transit.SymbolHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;return v.str;
});
cognitect.transit.SymbolHandler.prototype.stringRep = (function (v){var self__ = this;
var _ = this;return v.str;
});
cognitect.transit.__GT_SymbolHandler = (function __GT_SymbolHandler(){return (new cognitect.transit.SymbolHandler());
});

/**
* @constructor
*/
cognitect.transit.ListHandler = (function (){
})
cognitect.transit.ListHandler.cljs$lang$type = true;
cognitect.transit.ListHandler.cljs$lang$ctorStr = "cognitect.transit/ListHandler";
cognitect.transit.ListHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/ListHandler");
});
cognitect.transit.ListHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return "list";
});
cognitect.transit.ListHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;var ret = [];var seq__20552_20556 = cljs.core.seq.call(null,v);var chunk__20553_20557 = null;var count__20554_20558 = (0);var i__20555_20559 = (0);while(true){
if((i__20555_20559 < count__20554_20558))
{var x_20560 = cljs.core._nth.call(null,chunk__20553_20557,i__20555_20559);ret.push(x_20560);
{
var G__20561 = seq__20552_20556;
var G__20562 = chunk__20553_20557;
var G__20563 = count__20554_20558;
var G__20564 = (i__20555_20559 + (1));
seq__20552_20556 = G__20561;
chunk__20553_20557 = G__20562;
count__20554_20558 = G__20563;
i__20555_20559 = G__20564;
continue;
}
} else
{var temp__4126__auto___20565 = cljs.core.seq.call(null,seq__20552_20556);if(temp__4126__auto___20565)
{var seq__20552_20566__$1 = temp__4126__auto___20565;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20552_20566__$1))
{var c__13333__auto___20567 = cljs.core.chunk_first.call(null,seq__20552_20566__$1);{
var G__20568 = cljs.core.chunk_rest.call(null,seq__20552_20566__$1);
var G__20569 = c__13333__auto___20567;
var G__20570 = cljs.core.count.call(null,c__13333__auto___20567);
var G__20571 = (0);
seq__20552_20556 = G__20568;
chunk__20553_20557 = G__20569;
count__20554_20558 = G__20570;
i__20555_20559 = G__20571;
continue;
}
} else
{var x_20572 = cljs.core.first.call(null,seq__20552_20566__$1);ret.push(x_20572);
{
var G__20573 = cljs.core.next.call(null,seq__20552_20566__$1);
var G__20574 = null;
var G__20575 = (0);
var G__20576 = (0);
seq__20552_20556 = G__20573;
chunk__20553_20557 = G__20574;
count__20554_20558 = G__20575;
i__20555_20559 = G__20576;
continue;
}
}
} else
{}
}
break;
}
return com.cognitect.transit.tagged.call(null,"array",ret);
});
cognitect.transit.ListHandler.prototype.stringRep = (function (v){var self__ = this;
var _ = this;return null;
});
cognitect.transit.__GT_ListHandler = (function __GT_ListHandler(){return (new cognitect.transit.ListHandler());
});

/**
* @constructor
*/
cognitect.transit.MapHandler = (function (){
})
cognitect.transit.MapHandler.cljs$lang$type = true;
cognitect.transit.MapHandler.cljs$lang$ctorStr = "cognitect.transit/MapHandler";
cognitect.transit.MapHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/MapHandler");
});
cognitect.transit.MapHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return "map";
});
cognitect.transit.MapHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;return v;
});
cognitect.transit.MapHandler.prototype.stringRep = (function (v){var self__ = this;
var _ = this;return null;
});
cognitect.transit.__GT_MapHandler = (function __GT_MapHandler(){return (new cognitect.transit.MapHandler());
});

/**
* @constructor
*/
cognitect.transit.SetHandler = (function (){
})
cognitect.transit.SetHandler.cljs$lang$type = true;
cognitect.transit.SetHandler.cljs$lang$ctorStr = "cognitect.transit/SetHandler";
cognitect.transit.SetHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/SetHandler");
});
cognitect.transit.SetHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return "set";
});
cognitect.transit.SetHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;var ret = [];var seq__20577_20581 = cljs.core.seq.call(null,v);var chunk__20578_20582 = null;var count__20579_20583 = (0);var i__20580_20584 = (0);while(true){
if((i__20580_20584 < count__20579_20583))
{var x_20585 = cljs.core._nth.call(null,chunk__20578_20582,i__20580_20584);ret.push(x_20585);
{
var G__20586 = seq__20577_20581;
var G__20587 = chunk__20578_20582;
var G__20588 = count__20579_20583;
var G__20589 = (i__20580_20584 + (1));
seq__20577_20581 = G__20586;
chunk__20578_20582 = G__20587;
count__20579_20583 = G__20588;
i__20580_20584 = G__20589;
continue;
}
} else
{var temp__4126__auto___20590 = cljs.core.seq.call(null,seq__20577_20581);if(temp__4126__auto___20590)
{var seq__20577_20591__$1 = temp__4126__auto___20590;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20577_20591__$1))
{var c__13333__auto___20592 = cljs.core.chunk_first.call(null,seq__20577_20591__$1);{
var G__20593 = cljs.core.chunk_rest.call(null,seq__20577_20591__$1);
var G__20594 = c__13333__auto___20592;
var G__20595 = cljs.core.count.call(null,c__13333__auto___20592);
var G__20596 = (0);
seq__20577_20581 = G__20593;
chunk__20578_20582 = G__20594;
count__20579_20583 = G__20595;
i__20580_20584 = G__20596;
continue;
}
} else
{var x_20597 = cljs.core.first.call(null,seq__20577_20591__$1);ret.push(x_20597);
{
var G__20598 = cljs.core.next.call(null,seq__20577_20591__$1);
var G__20599 = null;
var G__20600 = (0);
var G__20601 = (0);
seq__20577_20581 = G__20598;
chunk__20578_20582 = G__20599;
count__20579_20583 = G__20600;
i__20580_20584 = G__20601;
continue;
}
}
} else
{}
}
break;
}
return com.cognitect.transit.tagged.call(null,"array",ret);
});
cognitect.transit.SetHandler.prototype.stringRep = (function (){var self__ = this;
var v = this;return null;
});
cognitect.transit.__GT_SetHandler = (function __GT_SetHandler(){return (new cognitect.transit.SetHandler());
});

/**
* @constructor
*/
cognitect.transit.VectorHandler = (function (){
})
cognitect.transit.VectorHandler.cljs$lang$type = true;
cognitect.transit.VectorHandler.cljs$lang$ctorStr = "cognitect.transit/VectorHandler";
cognitect.transit.VectorHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/VectorHandler");
});
cognitect.transit.VectorHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return "array";
});
cognitect.transit.VectorHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;var ret = [];var seq__20602_20606 = cljs.core.seq.call(null,v);var chunk__20603_20607 = null;var count__20604_20608 = (0);var i__20605_20609 = (0);while(true){
if((i__20605_20609 < count__20604_20608))
{var x_20610 = cljs.core._nth.call(null,chunk__20603_20607,i__20605_20609);ret.push(x_20610);
{
var G__20611 = seq__20602_20606;
var G__20612 = chunk__20603_20607;
var G__20613 = count__20604_20608;
var G__20614 = (i__20605_20609 + (1));
seq__20602_20606 = G__20611;
chunk__20603_20607 = G__20612;
count__20604_20608 = G__20613;
i__20605_20609 = G__20614;
continue;
}
} else
{var temp__4126__auto___20615 = cljs.core.seq.call(null,seq__20602_20606);if(temp__4126__auto___20615)
{var seq__20602_20616__$1 = temp__4126__auto___20615;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20602_20616__$1))
{var c__13333__auto___20617 = cljs.core.chunk_first.call(null,seq__20602_20616__$1);{
var G__20618 = cljs.core.chunk_rest.call(null,seq__20602_20616__$1);
var G__20619 = c__13333__auto___20617;
var G__20620 = cljs.core.count.call(null,c__13333__auto___20617);
var G__20621 = (0);
seq__20602_20606 = G__20618;
chunk__20603_20607 = G__20619;
count__20604_20608 = G__20620;
i__20605_20609 = G__20621;
continue;
}
} else
{var x_20622 = cljs.core.first.call(null,seq__20602_20616__$1);ret.push(x_20622);
{
var G__20623 = cljs.core.next.call(null,seq__20602_20616__$1);
var G__20624 = null;
var G__20625 = (0);
var G__20626 = (0);
seq__20602_20606 = G__20623;
chunk__20603_20607 = G__20624;
count__20604_20608 = G__20625;
i__20605_20609 = G__20626;
continue;
}
}
} else
{}
}
break;
}
return ret;
});
cognitect.transit.VectorHandler.prototype.stringRep = (function (v){var self__ = this;
var _ = this;return null;
});
cognitect.transit.__GT_VectorHandler = (function __GT_VectorHandler(){return (new cognitect.transit.VectorHandler());
});

/**
* @constructor
*/
cognitect.transit.UUIDHandler = (function (){
})
cognitect.transit.UUIDHandler.cljs$lang$type = true;
cognitect.transit.UUIDHandler.cljs$lang$ctorStr = "cognitect.transit/UUIDHandler";
cognitect.transit.UUIDHandler.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/UUIDHandler");
});
cognitect.transit.UUIDHandler.prototype.tag = (function (v){var self__ = this;
var _ = this;return "u";
});
cognitect.transit.UUIDHandler.prototype.rep = (function (v){var self__ = this;
var _ = this;return v.uuid;
});
cognitect.transit.UUIDHandler.prototype.stringRep = (function (v){var self__ = this;
var this$ = this;return this$.rep(v);
});
cognitect.transit.__GT_UUIDHandler = (function __GT_UUIDHandler(){return (new cognitect.transit.UUIDHandler());
});
/**
* Return a transit writer. type maybe either :json or :json-verbose.
* opts is a map containing a :handlers entry. :handlers is a map of
* type constructors to handler instances.
*/
cognitect.transit.writer = (function() {
var writer = null;
var writer__1 = (function (type){return writer.call(null,type,null);
});
var writer__2 = (function (type,opts){var keyword_handler = (new cognitect.transit.KeywordHandler());var symbol_handler = (new cognitect.transit.SymbolHandler());var list_handler = (new cognitect.transit.ListHandler());var map_handler = (new cognitect.transit.MapHandler());var set_handler = (new cognitect.transit.SetHandler());var vector_handler = (new cognitect.transit.VectorHandler());var uuid_handler = (new cognitect.transit.UUIDHandler());var handlers = cljs.core.merge.call(null,cljs.core.PersistentHashMap.fromArrays([cljs.core.PersistentHashMap,cljs.core.Cons,cljs.core.PersistentArrayMap,cljs.core.NodeSeq,cljs.core.PersistentQueue,cljs.core.IndexedSeq,cljs.core.Keyword,cljs.core.EmptyList,cljs.core.LazySeq,cljs.core.Subvec,cljs.core.PersistentQueueSeq,cljs.core.ArrayNodeSeq,cljs.core.ValSeq,cljs.core.PersistentArrayMapSeq,cljs.core.PersistentVector,cljs.core.List,cljs.core.RSeq,cljs.core.PersistentHashSet,cljs.core.PersistentTreeMap,cljs.core.KeySeq,cljs.core.ChunkedSeq,cljs.core.PersistentTreeSet,cljs.core.ChunkedCons,cljs.core.Symbol,cljs.core.UUID,cljs.core.Range,cljs.core.PersistentTreeMapSeq],[map_handler,list_handler,map_handler,list_handler,list_handler,list_handler,keyword_handler,list_handler,list_handler,vector_handler,list_handler,list_handler,list_handler,list_handler,vector_handler,list_handler,list_handler,set_handler,map_handler,list_handler,list_handler,set_handler,list_handler,symbol_handler,uuid_handler,list_handler,list_handler]),new cljs.core.Keyword(null,"handlers","handlers",79528781).cljs$core$IFn$_invoke$arity$1(opts));return com.cognitect.transit.writer.call(null,cljs.core.name.call(null,type),cognitect.transit.opts_merge.call(null,{"unpack": ((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (x){if((x instanceof cljs.core.PersistentArrayMap))
{return x.arr;
} else
{return false;
}
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
, "handlers": (function (){var x20636 = cljs.core.clone.call(null,handlers);x20636.forEach = ((function (x20636,keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (f){var coll = this;var seq__20637 = cljs.core.seq.call(null,coll);var chunk__20638 = null;var count__20639 = (0);var i__20640 = (0);while(true){
if((i__20640 < count__20639))
{var vec__20641 = cljs.core._nth.call(null,chunk__20638,i__20640);var k = cljs.core.nth.call(null,vec__20641,(0),null);var v = cljs.core.nth.call(null,vec__20641,(1),null);f.call(null,v,k);
{
var G__20643 = seq__20637;
var G__20644 = chunk__20638;
var G__20645 = count__20639;
var G__20646 = (i__20640 + (1));
seq__20637 = G__20643;
chunk__20638 = G__20644;
count__20639 = G__20645;
i__20640 = G__20646;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__20637);if(temp__4126__auto__)
{var seq__20637__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20637__$1))
{var c__13333__auto__ = cljs.core.chunk_first.call(null,seq__20637__$1);{
var G__20647 = cljs.core.chunk_rest.call(null,seq__20637__$1);
var G__20648 = c__13333__auto__;
var G__20649 = cljs.core.count.call(null,c__13333__auto__);
var G__20650 = (0);
seq__20637 = G__20647;
chunk__20638 = G__20648;
count__20639 = G__20649;
i__20640 = G__20650;
continue;
}
} else
{var vec__20642 = cljs.core.first.call(null,seq__20637__$1);var k = cljs.core.nth.call(null,vec__20642,(0),null);var v = cljs.core.nth.call(null,vec__20642,(1),null);f.call(null,v,k);
{
var G__20651 = cljs.core.next.call(null,seq__20637__$1);
var G__20652 = null;
var G__20653 = (0);
var G__20654 = (0);
seq__20637 = G__20651;
chunk__20638 = G__20652;
count__20639 = G__20653;
i__20640 = G__20654;
continue;
}
}
} else
{return null;
}
}
break;
}
});})(x20636,keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
;
return x20636;
})(), "objectBuilder": ((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (m,kfn,vfn){return cljs.core.reduce_kv.call(null,((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (obj,k,v){var G__20635 = obj;G__20635.push(kfn.call(null,k),vfn.call(null,v));
return G__20635;
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
,["^ "],m);
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
},cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"handlers","handlers",79528781)))));
});
writer = function(type,opts){
switch(arguments.length){
case 1:
return writer__1.call(this,type);
case 2:
return writer__2.call(this,type,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
writer.cljs$core$IFn$_invoke$arity$1 = writer__1;
writer.cljs$core$IFn$_invoke$arity$2 = writer__2;
return writer;
})()
;
/**
* Encode an object into a transit string given a transit writer.
*/
cognitect.transit.write = (function write(w,o){return w.write(o);
});
/**
* Construct a read handler. Implemented as identity, exists primarily
* for API compatiblity with transit-clj
*/
cognitect.transit.read_handler = (function read_handler(from_rep){return from_rep;
});
/**
* Creates a transit write handler whose tag, rep,
* stringRep, and verboseWriteHandler methods
* invoke the provided fns.
*/
cognitect.transit.write_handler = (function() {
var write_handler = null;
var write_handler__2 = (function (tag_fn,rep_fn){return write_handler.call(null,tag_fn,rep_fn,null,null);
});
var write_handler__3 = (function (tag_fn,rep_fn,str_rep_fn){return write_handler.call(null,tag_fn,rep_fn,str_rep_fn,null);
});
var write_handler__4 = (function (tag_fn,rep_fn,str_rep_fn,verbose_handler_fn){if(typeof cognitect.transit.t20658 !== 'undefined')
{} else
{
/**
* @constructor
*/
cognitect.transit.t20658 = (function (verbose_handler_fn,str_rep_fn,rep_fn,tag_fn,write_handler,meta20659){
this.verbose_handler_fn = verbose_handler_fn;
this.str_rep_fn = str_rep_fn;
this.rep_fn = rep_fn;
this.tag_fn = tag_fn;
this.write_handler = write_handler;
this.meta20659 = meta20659;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cognitect.transit.t20658.cljs$lang$type = true;
cognitect.transit.t20658.cljs$lang$ctorStr = "cognitect.transit/t20658";
cognitect.transit.t20658.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cognitect.transit/t20658");
});
cognitect.transit.t20658.prototype.tag = (function (o){var self__ = this;
var _ = this;return self__.tag_fn.call(null,o);
});
cognitect.transit.t20658.prototype.rep = (function (o){var self__ = this;
var _ = this;return self__.rep_fn.call(null,o);
});
cognitect.transit.t20658.prototype.stringRep = (function (o){var self__ = this;
var _ = this;if(cljs.core.truth_(self__.str_rep_fn))
{return self__.str_rep_fn.call(null,o);
} else
{return null;
}
});
cognitect.transit.t20658.prototype.getVerboseHandler = (function (){var self__ = this;
var _ = this;if(cljs.core.truth_(self__.verbose_handler_fn))
{return self__.verbose_handler_fn.call(null);
} else
{return null;
}
});
cognitect.transit.t20658.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_20660){var self__ = this;
var _20660__$1 = this;return self__.meta20659;
});
cognitect.transit.t20658.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_20660,meta20659__$1){var self__ = this;
var _20660__$1 = this;return (new cognitect.transit.t20658(self__.verbose_handler_fn,self__.str_rep_fn,self__.rep_fn,self__.tag_fn,self__.write_handler,meta20659__$1));
});
cognitect.transit.__GT_t20658 = (function __GT_t20658(verbose_handler_fn__$1,str_rep_fn__$1,rep_fn__$1,tag_fn__$1,write_handler__$1,meta20659){return (new cognitect.transit.t20658(verbose_handler_fn__$1,str_rep_fn__$1,rep_fn__$1,tag_fn__$1,write_handler__$1,meta20659));
});
}
return (new cognitect.transit.t20658(verbose_handler_fn,str_rep_fn,rep_fn,tag_fn,write_handler,null));
});
write_handler = function(tag_fn,rep_fn,str_rep_fn,verbose_handler_fn){
switch(arguments.length){
case 2:
return write_handler__2.call(this,tag_fn,rep_fn);
case 3:
return write_handler__3.call(this,tag_fn,rep_fn,str_rep_fn);
case 4:
return write_handler__4.call(this,tag_fn,rep_fn,str_rep_fn,verbose_handler_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
write_handler.cljs$core$IFn$_invoke$arity$2 = write_handler__2;
write_handler.cljs$core$IFn$_invoke$arity$3 = write_handler__3;
write_handler.cljs$core$IFn$_invoke$arity$4 = write_handler__4;
return write_handler;
})()
;
/**
* Construct a tagged value. tag must be a string and rep can
* be any transit encodeable value.
*/
cognitect.transit.tagged_value = (function tagged_value(tag,rep){return com.cognitect.transit.types.taggedValue.call(null,tag,rep);
});
/**
* Returns true if x is a transit tagged value, false otherwise.
*/
cognitect.transit.tagged_value_QMARK_ = (function tagged_value_QMARK_(x){return com.cognitect.transit.types.isTaggedValue.call(null,x);
});
/**
* Construct a transit integer value. Returns JavaScript number if
* in the 53bit integer range, a goog.math.Long instance if above. s
* may be a string or a JavaScript number.
*/
cognitect.transit.integer = (function integer(s){return com.cognitect.transit.types.integer.call(null,s);
});
/**
* Returns true if x is an integer value between the 53bit and 64bit
* range, false otherwise.
*/
cognitect.transit.integer_QMARK_ = (function integer_QMARK_(x){return com.cognitect.transit.types.isInteger.call(null,x);
});
/**
* Construct a big decimal from a string.
*/
cognitect.transit.bigint = (function bigint(s){return com.cognitect.transit.types.bigInteger.call(null,s);
});
/**
* Returns true if x is a transit big decimal value, false otherwise.
*/
cognitect.transit.bigint_QMARK_ = (function bigint_QMARK_(x){return com.cognitect.transit.types.isBigInteger.call(null,x);
});
/**
* Construct a big decimal from a string.
*/
cognitect.transit.bigdec = (function bigdec(s){return com.cognitect.transit.types.bigDecimalValue.call(null,s);
});
/**
* Returns true if x is a transit big decimal value, false otherwise.
*/
cognitect.transit.bigdec_QMARK_ = (function bigdec_QMARK_(x){return com.cognitect.transit.types.isBigDecimal.call(null,x);
});
/**
* Construct a URI from a string.
*/
cognitect.transit.uri = (function uri(s){return com.cognitect.transit.types.uri.call(null,s);
});
/**
* Returns true if x is a transit URI value, false otherwise.
*/
cognitect.transit.uri_QMARK_ = (function uri_QMARK_(x){return com.cognitect.transit.types.isURI.call(null,x);
});
/**
* Construct a UUID from a string.
*/
cognitect.transit.uuid = (function uuid(s){return com.cognitect.transit.types.uuid.call(null,s);
});
/**
* Returns true if x is a transit UUID value, false otherwise.
*/
cognitect.transit.uuid_QMARK_ = (function uuid_QMARK_(x){return com.cognitect.transit.types.isUUID.call(null,x);
});
/**
* Construct a transit binary value. s should be base64 encoded
* string.
*/
cognitect.transit.binary = (function binary(s){return com.cognitect.transit.types.binary.call(null,s);
});
/**
* Returns true if x is a transit binary value, false otherwise.
*/
cognitect.transit.binary_QMARK_ = (function binary_QMARK_(x){return com.cognitect.transit.types.isBinary.call(null,x);
});
/**
* Construct a quoted transit value. x should be a transit
* encodeable value.
*/
cognitect.transit.quoted = (function quoted(x){return com.cognitect.transit.types.quoted.call(null,x);
});
/**
* Returns true if x is a transit quoted value, false otherwise.
*/
cognitect.transit.quoted_QMARK_ = (function quoted_QMARK_(x){return com.cognitect.transit.types.isQuoted.call(null,x);
});
/**
* Construct a transit link value. x should be an IMap instance
* containing at a minimum the following keys: :href, :rel. It
* may optionall include :name, :render, and :prompt. :href must
* be a transit URI, all other values are strings, and :render must
* be either :image or :link.
*/
cognitect.transit.link = (function link(x){return com.cognitect.transit.types.link.call(null,x);
});
/**
* Returns true if x a transit link value, false if otherwise.
*/
cognitect.transit.link_QMARK_ = (function link_QMARK_(x){return com.cognitect.transit.types.isLink.call(null,x);
});

//# sourceMappingURL=transit.js.map