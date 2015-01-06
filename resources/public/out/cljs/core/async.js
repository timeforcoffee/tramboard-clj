// Compiled by ClojureScript 0.0-2371
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t22035 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22035 = (function (f,fn_handler,meta22036){
this.f = f;
this.fn_handler = fn_handler;
this.meta22036 = meta22036;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22035.cljs$lang$type = true;
cljs.core.async.t22035.cljs$lang$ctorStr = "cljs.core.async/t22035";
cljs.core.async.t22035.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t22035");
});
cljs.core.async.t22035.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22035.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t22035.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t22035.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22037){var self__ = this;
var _22037__$1 = this;return self__.meta22036;
});
cljs.core.async.t22035.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22037,meta22036__$1){var self__ = this;
var _22037__$1 = this;return (new cljs.core.async.t22035(self__.f,self__.fn_handler,meta22036__$1));
});
cljs.core.async.__GT_t22035 = (function __GT_t22035(f__$1,fn_handler__$1,meta22036){return (new cljs.core.async.t22035(f__$1,fn_handler__$1,meta22036));
});
}
return (new cljs.core.async.t22035(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__22039 = buff;if(G__22039)
{var bit__13227__auto__ = null;if(cljs.core.truth_((function (){var or__12563__auto__ = bit__13227__auto__;if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{return G__22039.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__22039.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__22039);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__22039);
}
});
/**
* Creates a channel with an optional buffer, an optional transducer (like (map f),
* (filter p) etc or a composition thereof), and an optional exception handler.
* If buf-or-n is a number, will create and use a fixed buffer of that size. If a
* transducer is supplied a buffer must be specified. ex-handler must be a
* fn of one argument - if an exception occurs during transformation it will be called
* with the thrown value as an argument, and any non-nil return value will be placed
* in the channel.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){return chan.call(null,buf_or_n,null,null);
});
var chan__2 = (function (buf_or_n,xform){return chan.call(null,buf_or_n,xform,null);
});
var chan__3 = (function (buf_or_n,xform,ex_handler){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);if(cljs.core.truth_(xform))
{if(cljs.core.truth_(buf_or_n__$1))
{} else
{throw (new Error(("Assert failed: buffer must be supplied when transducer is\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null))))));
}
} else
{}
return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});
chan = function(buf_or_n,xform,ex_handler){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
case 2:
return chan__2.call(this,buf_or_n,xform);
case 3:
return chan__3.call(this,buf_or_n,xform,ex_handler);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
chan.cljs$core$IFn$_invoke$arity$2 = chan__2;
chan.cljs$core$IFn$_invoke$arity$3 = chan__3;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
* Returns true unless port is already closed
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){throw (new Error("<! used not in (go ...) block"));
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_22040 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_22040);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_22040,ret){
return (function (){return fn1.call(null,val_22040);
});})(val_22040,ret))
);
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(_){return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
* Returns true unless port is already closed.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){throw (new Error(">! used not in (go ...) block"));
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);if(cljs.core.truth_(temp__4124__auto__))
{var ret = temp__4124__auto__;return cljs.core.deref.call(null,ret);
} else
{return true;
}
});
var put_BANG___3 = (function (port,val,fn1){return put_BANG_.call(null,port,val,fn1,true);
});
var put_BANG___4 = (function (port,val,fn1,on_caller_QMARK_){var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(temp__4124__auto__))
{var retb = temp__4124__auto__;var ret = cljs.core.deref.call(null,retb);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,ret);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4124__auto__){
return (function (){return fn1.call(null,ret);
});})(ret,retb,temp__4124__auto__))
);
}
return ret;
} else
{return true;
}
});
put_BANG_ = function(port,val,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn1);
case 4:
return put_BANG___4.call(this,port,val,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__13433__auto___22041 = n;var x_22042 = (0);while(true){
if((x_22042 < n__13433__auto___22041))
{(a[x_22042] = (0));
{
var G__22043 = (x_22042 + (1));
x_22042 = G__22043;
continue;
}
} else
{}
break;
}
var i = (1);while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__22044 = (i + (1));
i = G__22044;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t22048 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22048 = (function (flag,alt_flag,meta22049){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta22049 = meta22049;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22048.cljs$lang$type = true;
cljs.core.async.t22048.cljs$lang$ctorStr = "cljs.core.async/t22048";
cljs.core.async.t22048.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t22048");
});})(flag))
;
cljs.core.async.t22048.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22048.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t22048.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t22048.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_22050){var self__ = this;
var _22050__$1 = this;return self__.meta22049;
});})(flag))
;
cljs.core.async.t22048.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_22050,meta22049__$1){var self__ = this;
var _22050__$1 = this;return (new cljs.core.async.t22048(self__.flag,self__.alt_flag,meta22049__$1));
});})(flag))
;
cljs.core.async.__GT_t22048 = ((function (flag){
return (function __GT_t22048(flag__$1,alt_flag__$1,meta22049){return (new cljs.core.async.t22048(flag__$1,alt_flag__$1,meta22049));
});})(flag))
;
}
return (new cljs.core.async.t22048(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t22054 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22054 = (function (cb,flag,alt_handler,meta22055){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta22055 = meta22055;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22054.cljs$lang$type = true;
cljs.core.async.t22054.cljs$lang$ctorStr = "cljs.core.async/t22054";
cljs.core.async.t22054.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t22054");
});
cljs.core.async.t22054.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22054.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t22054.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t22054.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22056){var self__ = this;
var _22056__$1 = this;return self__.meta22055;
});
cljs.core.async.t22054.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22056,meta22055__$1){var self__ = this;
var _22056__$1 = this;return (new cljs.core.async.t22054(self__.cb,self__.flag,self__.alt_handler,meta22055__$1));
});
cljs.core.async.__GT_t22054 = (function __GT_t22054(cb__$1,flag__$1,alt_handler__$1,meta22055){return (new cljs.core.async.t22054(cb__$1,flag__$1,alt_handler__$1,meta22055));
});
}
return (new cljs.core.async.t22054(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = (0);while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__22057_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__22057_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__22058_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__22058_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__12563__auto__ = wport;if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__22059 = (i + (1));
i = G__22059;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__12563__auto__ = ret;if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328)))
{var temp__4126__auto__ = (function (){var and__12551__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__12551__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__12551__auto__;
}
})();if(cljs.core.truth_(temp__4126__auto__))
{var got = temp__4126__auto__;return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints,
* which can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and a
* boolean (true unless already closed, as per put!) for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__22060){var map__22062 = p__22060;var map__22062__$1 = ((cljs.core.seq_QMARK_.call(null,map__22062))?cljs.core.apply.call(null,cljs.core.hash_map,map__22062):map__22062);var opts = map__22062__$1;throw (new Error("alts! used not in (go ...) block"));
};
var alts_BANG_ = function (ports,var_args){
var p__22060 = null;if (arguments.length > 1) {
  p__22060 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__22060);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__22063){
var ports = cljs.core.first(arglist__22063);
var p__22060 = cljs.core.rest(arglist__22063);
return alts_BANG___delegate(ports,p__22060);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the from
* channel closes, but can be determined by the close?  parameter. Will
* stop consuming the from channel if the to channel closes
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__15945__auto___22158 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___22158){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___22158){
return (function (state_22134){var state_val_22135 = (state_22134[(1)]);if((state_val_22135 === (7)))
{var inst_22130 = (state_22134[(2)]);var state_22134__$1 = state_22134;var statearr_22136_22159 = state_22134__$1;(statearr_22136_22159[(2)] = inst_22130);
(statearr_22136_22159[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (1)))
{var state_22134__$1 = state_22134;var statearr_22137_22160 = state_22134__$1;(statearr_22137_22160[(2)] = null);
(statearr_22137_22160[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (4)))
{var inst_22113 = (state_22134[(7)]);var inst_22113__$1 = (state_22134[(2)]);var inst_22114 = (inst_22113__$1 == null);var state_22134__$1 = (function (){var statearr_22138 = state_22134;(statearr_22138[(7)] = inst_22113__$1);
return statearr_22138;
})();if(cljs.core.truth_(inst_22114))
{var statearr_22139_22161 = state_22134__$1;(statearr_22139_22161[(1)] = (5));
} else
{var statearr_22140_22162 = state_22134__$1;(statearr_22140_22162[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (13)))
{var state_22134__$1 = state_22134;var statearr_22141_22163 = state_22134__$1;(statearr_22141_22163[(2)] = null);
(statearr_22141_22163[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (6)))
{var inst_22113 = (state_22134[(7)]);var state_22134__$1 = state_22134;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22134__$1,(11),to,inst_22113);
} else
{if((state_val_22135 === (3)))
{var inst_22132 = (state_22134[(2)]);var state_22134__$1 = state_22134;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22134__$1,inst_22132);
} else
{if((state_val_22135 === (12)))
{var state_22134__$1 = state_22134;var statearr_22142_22164 = state_22134__$1;(statearr_22142_22164[(2)] = null);
(statearr_22142_22164[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (2)))
{var state_22134__$1 = state_22134;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22134__$1,(4),from);
} else
{if((state_val_22135 === (11)))
{var inst_22123 = (state_22134[(2)]);var state_22134__$1 = state_22134;if(cljs.core.truth_(inst_22123))
{var statearr_22143_22165 = state_22134__$1;(statearr_22143_22165[(1)] = (12));
} else
{var statearr_22144_22166 = state_22134__$1;(statearr_22144_22166[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (9)))
{var state_22134__$1 = state_22134;var statearr_22145_22167 = state_22134__$1;(statearr_22145_22167[(2)] = null);
(statearr_22145_22167[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (5)))
{var state_22134__$1 = state_22134;if(cljs.core.truth_(close_QMARK_))
{var statearr_22146_22168 = state_22134__$1;(statearr_22146_22168[(1)] = (8));
} else
{var statearr_22147_22169 = state_22134__$1;(statearr_22147_22169[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (14)))
{var inst_22128 = (state_22134[(2)]);var state_22134__$1 = state_22134;var statearr_22148_22170 = state_22134__$1;(statearr_22148_22170[(2)] = inst_22128);
(statearr_22148_22170[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (10)))
{var inst_22120 = (state_22134[(2)]);var state_22134__$1 = state_22134;var statearr_22149_22171 = state_22134__$1;(statearr_22149_22171[(2)] = inst_22120);
(statearr_22149_22171[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22135 === (8)))
{var inst_22117 = cljs.core.async.close_BANG_.call(null,to);var state_22134__$1 = state_22134;var statearr_22150_22172 = state_22134__$1;(statearr_22150_22172[(2)] = inst_22117);
(statearr_22150_22172[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___22158))
;return ((function (switch__15889__auto__,c__15945__auto___22158){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22154 = [null,null,null,null,null,null,null,null];(statearr_22154[(0)] = state_machine__15890__auto__);
(statearr_22154[(1)] = (1));
return statearr_22154;
});
var state_machine__15890__auto____1 = (function (state_22134){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22134);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22155){if((e22155 instanceof Object))
{var ex__15893__auto__ = e22155;var statearr_22156_22173 = state_22134;(statearr_22156_22173[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22134);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22155;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22174 = state_22134;
state_22134 = G__22174;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22134){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22134);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___22158))
})();var state__15947__auto__ = (function (){var statearr_22157 = f__15946__auto__.call(null);(statearr_22157[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___22158);
return statearr_22157;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___22158))
);
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
cljs.core.async.pipeline_STAR_ = (function pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){if((n > (0)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null)))))));
}
var jobs = cljs.core.async.chan.call(null,n);var results = cljs.core.async.chan.call(null,n);var process = ((function (jobs,results){
return (function (p__22358){var vec__22359 = p__22358;var v = cljs.core.nth.call(null,vec__22359,(0),null);var p = cljs.core.nth.call(null,vec__22359,(1),null);var job = vec__22359;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);var c__15945__auto___22541 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___22541,res,vec__22359,v,p,job,jobs,results){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___22541,res,vec__22359,v,p,job,jobs,results){
return (function (state_22364){var state_val_22365 = (state_22364[(1)]);if((state_val_22365 === (2)))
{var inst_22361 = (state_22364[(2)]);var inst_22362 = cljs.core.async.close_BANG_.call(null,res);var state_22364__$1 = (function (){var statearr_22366 = state_22364;(statearr_22366[(7)] = inst_22361);
return statearr_22366;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22364__$1,inst_22362);
} else
{if((state_val_22365 === (1)))
{var state_22364__$1 = state_22364;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22364__$1,(2),res,v);
} else
{return null;
}
}
});})(c__15945__auto___22541,res,vec__22359,v,p,job,jobs,results))
;return ((function (switch__15889__auto__,c__15945__auto___22541,res,vec__22359,v,p,job,jobs,results){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22370 = [null,null,null,null,null,null,null,null];(statearr_22370[(0)] = state_machine__15890__auto__);
(statearr_22370[(1)] = (1));
return statearr_22370;
});
var state_machine__15890__auto____1 = (function (state_22364){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22364);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22371){if((e22371 instanceof Object))
{var ex__15893__auto__ = e22371;var statearr_22372_22542 = state_22364;(statearr_22372_22542[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22364);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22371;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22543 = state_22364;
state_22364 = G__22543;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22364){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22364);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___22541,res,vec__22359,v,p,job,jobs,results))
})();var state__15947__auto__ = (function (){var statearr_22373 = f__15946__auto__.call(null);(statearr_22373[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___22541);
return statearr_22373;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___22541,res,vec__22359,v,p,job,jobs,results))
);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results))
;var async = ((function (jobs,results,process){
return (function (p__22374){var vec__22375 = p__22374;var v = cljs.core.nth.call(null,vec__22375,(0),null);var p = cljs.core.nth.call(null,vec__22375,(1),null);var job = vec__22375;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1));xf.call(null,v,res);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results,process))
;var n__13433__auto___22544 = n;var __22545 = (0);while(true){
if((__22545 < n__13433__auto___22544))
{var G__22376_22546 = (((type instanceof cljs.core.Keyword))?type.fqn:null);switch (G__22376_22546) {
case "async":
var c__15945__auto___22548 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__22545,c__15945__auto___22548,G__22376_22546,n__13433__auto___22544,jobs,results,process,async){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (__22545,c__15945__auto___22548,G__22376_22546,n__13433__auto___22544,jobs,results,process,async){
return (function (state_22389){var state_val_22390 = (state_22389[(1)]);if((state_val_22390 === (7)))
{var inst_22385 = (state_22389[(2)]);var state_22389__$1 = state_22389;var statearr_22391_22549 = state_22389__$1;(statearr_22391_22549[(2)] = inst_22385);
(statearr_22391_22549[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22390 === (6)))
{var state_22389__$1 = state_22389;var statearr_22392_22550 = state_22389__$1;(statearr_22392_22550[(2)] = null);
(statearr_22392_22550[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22390 === (5)))
{var state_22389__$1 = state_22389;var statearr_22393_22551 = state_22389__$1;(statearr_22393_22551[(2)] = null);
(statearr_22393_22551[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22390 === (4)))
{var inst_22379 = (state_22389[(2)]);var inst_22380 = async.call(null,inst_22379);var state_22389__$1 = state_22389;if(cljs.core.truth_(inst_22380))
{var statearr_22394_22552 = state_22389__$1;(statearr_22394_22552[(1)] = (5));
} else
{var statearr_22395_22553 = state_22389__$1;(statearr_22395_22553[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22390 === (3)))
{var inst_22387 = (state_22389[(2)]);var state_22389__$1 = state_22389;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22389__$1,inst_22387);
} else
{if((state_val_22390 === (2)))
{var state_22389__$1 = state_22389;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22389__$1,(4),jobs);
} else
{if((state_val_22390 === (1)))
{var state_22389__$1 = state_22389;var statearr_22396_22554 = state_22389__$1;(statearr_22396_22554[(2)] = null);
(statearr_22396_22554[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
});})(__22545,c__15945__auto___22548,G__22376_22546,n__13433__auto___22544,jobs,results,process,async))
;return ((function (__22545,switch__15889__auto__,c__15945__auto___22548,G__22376_22546,n__13433__auto___22544,jobs,results,process,async){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22400 = [null,null,null,null,null,null,null];(statearr_22400[(0)] = state_machine__15890__auto__);
(statearr_22400[(1)] = (1));
return statearr_22400;
});
var state_machine__15890__auto____1 = (function (state_22389){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22389);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22401){if((e22401 instanceof Object))
{var ex__15893__auto__ = e22401;var statearr_22402_22555 = state_22389;(statearr_22402_22555[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22389);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22401;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22556 = state_22389;
state_22389 = G__22556;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22389){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22389);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(__22545,switch__15889__auto__,c__15945__auto___22548,G__22376_22546,n__13433__auto___22544,jobs,results,process,async))
})();var state__15947__auto__ = (function (){var statearr_22403 = f__15946__auto__.call(null);(statearr_22403[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___22548);
return statearr_22403;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(__22545,c__15945__auto___22548,G__22376_22546,n__13433__auto___22544,jobs,results,process,async))
);

break;
case "compute":
var c__15945__auto___22557 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__22545,c__15945__auto___22557,G__22376_22546,n__13433__auto___22544,jobs,results,process,async){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (__22545,c__15945__auto___22557,G__22376_22546,n__13433__auto___22544,jobs,results,process,async){
return (function (state_22416){var state_val_22417 = (state_22416[(1)]);if((state_val_22417 === (7)))
{var inst_22412 = (state_22416[(2)]);var state_22416__$1 = state_22416;var statearr_22418_22558 = state_22416__$1;(statearr_22418_22558[(2)] = inst_22412);
(statearr_22418_22558[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22417 === (6)))
{var state_22416__$1 = state_22416;var statearr_22419_22559 = state_22416__$1;(statearr_22419_22559[(2)] = null);
(statearr_22419_22559[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22417 === (5)))
{var state_22416__$1 = state_22416;var statearr_22420_22560 = state_22416__$1;(statearr_22420_22560[(2)] = null);
(statearr_22420_22560[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22417 === (4)))
{var inst_22406 = (state_22416[(2)]);var inst_22407 = process.call(null,inst_22406);var state_22416__$1 = state_22416;if(cljs.core.truth_(inst_22407))
{var statearr_22421_22561 = state_22416__$1;(statearr_22421_22561[(1)] = (5));
} else
{var statearr_22422_22562 = state_22416__$1;(statearr_22422_22562[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22417 === (3)))
{var inst_22414 = (state_22416[(2)]);var state_22416__$1 = state_22416;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22416__$1,inst_22414);
} else
{if((state_val_22417 === (2)))
{var state_22416__$1 = state_22416;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22416__$1,(4),jobs);
} else
{if((state_val_22417 === (1)))
{var state_22416__$1 = state_22416;var statearr_22423_22563 = state_22416__$1;(statearr_22423_22563[(2)] = null);
(statearr_22423_22563[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
});})(__22545,c__15945__auto___22557,G__22376_22546,n__13433__auto___22544,jobs,results,process,async))
;return ((function (__22545,switch__15889__auto__,c__15945__auto___22557,G__22376_22546,n__13433__auto___22544,jobs,results,process,async){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22427 = [null,null,null,null,null,null,null];(statearr_22427[(0)] = state_machine__15890__auto__);
(statearr_22427[(1)] = (1));
return statearr_22427;
});
var state_machine__15890__auto____1 = (function (state_22416){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22416);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22428){if((e22428 instanceof Object))
{var ex__15893__auto__ = e22428;var statearr_22429_22564 = state_22416;(statearr_22429_22564[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22416);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22428;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22565 = state_22416;
state_22416 = G__22565;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22416){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22416);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(__22545,switch__15889__auto__,c__15945__auto___22557,G__22376_22546,n__13433__auto___22544,jobs,results,process,async))
})();var state__15947__auto__ = (function (){var statearr_22430 = f__15946__auto__.call(null);(statearr_22430[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___22557);
return statearr_22430;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(__22545,c__15945__auto___22557,G__22376_22546,n__13433__auto___22544,jobs,results,process,async))
);

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type))));

}
{
var G__22566 = (__22545 + (1));
__22545 = G__22566;
continue;
}
} else
{}
break;
}
var c__15945__auto___22567 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___22567,jobs,results,process,async){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___22567,jobs,results,process,async){
return (function (state_22452){var state_val_22453 = (state_22452[(1)]);if((state_val_22453 === (9)))
{var inst_22445 = (state_22452[(2)]);var state_22452__$1 = (function (){var statearr_22454 = state_22452;(statearr_22454[(7)] = inst_22445);
return statearr_22454;
})();var statearr_22455_22568 = state_22452__$1;(statearr_22455_22568[(2)] = null);
(statearr_22455_22568[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22453 === (8)))
{var inst_22438 = (state_22452[(8)]);var inst_22443 = (state_22452[(2)]);var state_22452__$1 = (function (){var statearr_22456 = state_22452;(statearr_22456[(9)] = inst_22443);
return statearr_22456;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22452__$1,(9),results,inst_22438);
} else
{if((state_val_22453 === (7)))
{var inst_22448 = (state_22452[(2)]);var state_22452__$1 = state_22452;var statearr_22457_22569 = state_22452__$1;(statearr_22457_22569[(2)] = inst_22448);
(statearr_22457_22569[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22453 === (6)))
{var inst_22438 = (state_22452[(8)]);var inst_22433 = (state_22452[(10)]);var inst_22438__$1 = cljs.core.async.chan.call(null,(1));var inst_22439 = cljs.core.PersistentVector.EMPTY_NODE;var inst_22440 = [inst_22433,inst_22438__$1];var inst_22441 = (new cljs.core.PersistentVector(null,2,(5),inst_22439,inst_22440,null));var state_22452__$1 = (function (){var statearr_22458 = state_22452;(statearr_22458[(8)] = inst_22438__$1);
return statearr_22458;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22452__$1,(8),jobs,inst_22441);
} else
{if((state_val_22453 === (5)))
{var inst_22436 = cljs.core.async.close_BANG_.call(null,jobs);var state_22452__$1 = state_22452;var statearr_22459_22570 = state_22452__$1;(statearr_22459_22570[(2)] = inst_22436);
(statearr_22459_22570[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22453 === (4)))
{var inst_22433 = (state_22452[(10)]);var inst_22433__$1 = (state_22452[(2)]);var inst_22434 = (inst_22433__$1 == null);var state_22452__$1 = (function (){var statearr_22460 = state_22452;(statearr_22460[(10)] = inst_22433__$1);
return statearr_22460;
})();if(cljs.core.truth_(inst_22434))
{var statearr_22461_22571 = state_22452__$1;(statearr_22461_22571[(1)] = (5));
} else
{var statearr_22462_22572 = state_22452__$1;(statearr_22462_22572[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22453 === (3)))
{var inst_22450 = (state_22452[(2)]);var state_22452__$1 = state_22452;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22452__$1,inst_22450);
} else
{if((state_val_22453 === (2)))
{var state_22452__$1 = state_22452;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22452__$1,(4),from);
} else
{if((state_val_22453 === (1)))
{var state_22452__$1 = state_22452;var statearr_22463_22573 = state_22452__$1;(statearr_22463_22573[(2)] = null);
(statearr_22463_22573[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___22567,jobs,results,process,async))
;return ((function (switch__15889__auto__,c__15945__auto___22567,jobs,results,process,async){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22467 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_22467[(0)] = state_machine__15890__auto__);
(statearr_22467[(1)] = (1));
return statearr_22467;
});
var state_machine__15890__auto____1 = (function (state_22452){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22452);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22468){if((e22468 instanceof Object))
{var ex__15893__auto__ = e22468;var statearr_22469_22574 = state_22452;(statearr_22469_22574[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22452);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22468;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22575 = state_22452;
state_22452 = G__22575;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22452){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22452);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___22567,jobs,results,process,async))
})();var state__15947__auto__ = (function (){var statearr_22470 = f__15946__auto__.call(null);(statearr_22470[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___22567);
return statearr_22470;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___22567,jobs,results,process,async))
);
var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__,jobs,results,process,async){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__,jobs,results,process,async){
return (function (state_22508){var state_val_22509 = (state_22508[(1)]);if((state_val_22509 === (7)))
{var inst_22504 = (state_22508[(2)]);var state_22508__$1 = state_22508;var statearr_22510_22576 = state_22508__$1;(statearr_22510_22576[(2)] = inst_22504);
(statearr_22510_22576[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (20)))
{var state_22508__$1 = state_22508;var statearr_22511_22577 = state_22508__$1;(statearr_22511_22577[(2)] = null);
(statearr_22511_22577[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (1)))
{var state_22508__$1 = state_22508;var statearr_22512_22578 = state_22508__$1;(statearr_22512_22578[(2)] = null);
(statearr_22512_22578[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (4)))
{var inst_22473 = (state_22508[(7)]);var inst_22473__$1 = (state_22508[(2)]);var inst_22474 = (inst_22473__$1 == null);var state_22508__$1 = (function (){var statearr_22513 = state_22508;(statearr_22513[(7)] = inst_22473__$1);
return statearr_22513;
})();if(cljs.core.truth_(inst_22474))
{var statearr_22514_22579 = state_22508__$1;(statearr_22514_22579[(1)] = (5));
} else
{var statearr_22515_22580 = state_22508__$1;(statearr_22515_22580[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (15)))
{var inst_22486 = (state_22508[(8)]);var state_22508__$1 = state_22508;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22508__$1,(18),to,inst_22486);
} else
{if((state_val_22509 === (21)))
{var inst_22499 = (state_22508[(2)]);var state_22508__$1 = state_22508;var statearr_22516_22581 = state_22508__$1;(statearr_22516_22581[(2)] = inst_22499);
(statearr_22516_22581[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (13)))
{var inst_22501 = (state_22508[(2)]);var state_22508__$1 = (function (){var statearr_22517 = state_22508;(statearr_22517[(9)] = inst_22501);
return statearr_22517;
})();var statearr_22518_22582 = state_22508__$1;(statearr_22518_22582[(2)] = null);
(statearr_22518_22582[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (6)))
{var inst_22473 = (state_22508[(7)]);var state_22508__$1 = state_22508;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22508__$1,(11),inst_22473);
} else
{if((state_val_22509 === (17)))
{var inst_22494 = (state_22508[(2)]);var state_22508__$1 = state_22508;if(cljs.core.truth_(inst_22494))
{var statearr_22519_22583 = state_22508__$1;(statearr_22519_22583[(1)] = (19));
} else
{var statearr_22520_22584 = state_22508__$1;(statearr_22520_22584[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (3)))
{var inst_22506 = (state_22508[(2)]);var state_22508__$1 = state_22508;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22508__$1,inst_22506);
} else
{if((state_val_22509 === (12)))
{var inst_22483 = (state_22508[(10)]);var state_22508__$1 = state_22508;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22508__$1,(14),inst_22483);
} else
{if((state_val_22509 === (2)))
{var state_22508__$1 = state_22508;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22508__$1,(4),results);
} else
{if((state_val_22509 === (19)))
{var state_22508__$1 = state_22508;var statearr_22521_22585 = state_22508__$1;(statearr_22521_22585[(2)] = null);
(statearr_22521_22585[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (11)))
{var inst_22483 = (state_22508[(2)]);var state_22508__$1 = (function (){var statearr_22522 = state_22508;(statearr_22522[(10)] = inst_22483);
return statearr_22522;
})();var statearr_22523_22586 = state_22508__$1;(statearr_22523_22586[(2)] = null);
(statearr_22523_22586[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (9)))
{var state_22508__$1 = state_22508;var statearr_22524_22587 = state_22508__$1;(statearr_22524_22587[(2)] = null);
(statearr_22524_22587[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (5)))
{var state_22508__$1 = state_22508;if(cljs.core.truth_(close_QMARK_))
{var statearr_22525_22588 = state_22508__$1;(statearr_22525_22588[(1)] = (8));
} else
{var statearr_22526_22589 = state_22508__$1;(statearr_22526_22589[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (14)))
{var inst_22486 = (state_22508[(8)]);var inst_22488 = (state_22508[(11)]);var inst_22486__$1 = (state_22508[(2)]);var inst_22487 = (inst_22486__$1 == null);var inst_22488__$1 = cljs.core.not.call(null,inst_22487);var state_22508__$1 = (function (){var statearr_22527 = state_22508;(statearr_22527[(8)] = inst_22486__$1);
(statearr_22527[(11)] = inst_22488__$1);
return statearr_22527;
})();if(inst_22488__$1)
{var statearr_22528_22590 = state_22508__$1;(statearr_22528_22590[(1)] = (15));
} else
{var statearr_22529_22591 = state_22508__$1;(statearr_22529_22591[(1)] = (16));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (16)))
{var inst_22488 = (state_22508[(11)]);var state_22508__$1 = state_22508;var statearr_22530_22592 = state_22508__$1;(statearr_22530_22592[(2)] = inst_22488);
(statearr_22530_22592[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (10)))
{var inst_22480 = (state_22508[(2)]);var state_22508__$1 = state_22508;var statearr_22531_22593 = state_22508__$1;(statearr_22531_22593[(2)] = inst_22480);
(statearr_22531_22593[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (18)))
{var inst_22491 = (state_22508[(2)]);var state_22508__$1 = state_22508;var statearr_22532_22594 = state_22508__$1;(statearr_22532_22594[(2)] = inst_22491);
(statearr_22532_22594[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22509 === (8)))
{var inst_22477 = cljs.core.async.close_BANG_.call(null,to);var state_22508__$1 = state_22508;var statearr_22533_22595 = state_22508__$1;(statearr_22533_22595[(2)] = inst_22477);
(statearr_22533_22595[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto__,jobs,results,process,async))
;return ((function (switch__15889__auto__,c__15945__auto__,jobs,results,process,async){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22537 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_22537[(0)] = state_machine__15890__auto__);
(statearr_22537[(1)] = (1));
return statearr_22537;
});
var state_machine__15890__auto____1 = (function (state_22508){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22508);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22538){if((e22538 instanceof Object))
{var ex__15893__auto__ = e22538;var statearr_22539_22596 = state_22508;(statearr_22539_22596[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22508);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22538;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22597 = state_22508;
state_22508 = G__22597;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22508){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22508);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__,jobs,results,process,async))
})();var state__15947__auto__ = (function (){var statearr_22540 = f__15946__auto__.call(null);(statearr_22540[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_22540;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__,jobs,results,process,async))
);
return c__15945__auto__;
});
/**
* Takes elements from the from channel and supplies them to the to
* channel, subject to the async function af, with parallelism n. af
* must be a function of two arguments, the first an input value and
* the second a channel on which to place the result(s). af must close!
* the channel before returning.  The presumption is that af will
* return immediately, having launched some asynchronous operation
* whose completion/callback will manipulate the result channel. Outputs
* will be returned in order relative to  the inputs. By default, the to
* channel will be closed when the from channel closes, but can be
* determined by the close?  parameter. Will stop consuming the from
* channel if the to channel closes.
*/
cljs.core.async.pipeline_async = (function() {
var pipeline_async = null;
var pipeline_async__4 = (function (n,to,af,from){return pipeline_async.call(null,n,to,af,from,true);
});
var pipeline_async__5 = (function (n,to,af,from,close_QMARK_){return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});
pipeline_async = function(n,to,af,from,close_QMARK_){
switch(arguments.length){
case 4:
return pipeline_async__4.call(this,n,to,af,from);
case 5:
return pipeline_async__5.call(this,n,to,af,from,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipeline_async.cljs$core$IFn$_invoke$arity$4 = pipeline_async__4;
pipeline_async.cljs$core$IFn$_invoke$arity$5 = pipeline_async__5;
return pipeline_async;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel, subject to the transducer xf, with parallelism n. Because
* it is parallel, the transducer will be applied independently to each
* element, not across elements, and may produce zero or more outputs
* per input.  Outputs will be returned in order relative to the
* inputs. By default, the to channel will be closed when the from
* channel closes, but can be determined by the close?  parameter. Will
* stop consuming the from channel if the to channel closes.
* 
* Note this is supplied for API compatibility with the Clojure version.
* Values of N > 1 will not result in actual concurrency in a
* single-threaded runtime.
*/
cljs.core.async.pipeline = (function() {
var pipeline = null;
var pipeline__4 = (function (n,to,xf,from){return pipeline.call(null,n,to,xf,from,true);
});
var pipeline__5 = (function (n,to,xf,from,close_QMARK_){return pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});
var pipeline__6 = (function (n,to,xf,from,close_QMARK_,ex_handler){return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});
pipeline = function(n,to,xf,from,close_QMARK_,ex_handler){
switch(arguments.length){
case 4:
return pipeline__4.call(this,n,to,xf,from);
case 5:
return pipeline__5.call(this,n,to,xf,from,close_QMARK_);
case 6:
return pipeline__6.call(this,n,to,xf,from,close_QMARK_,ex_handler);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipeline.cljs$core$IFn$_invoke$arity$4 = pipeline__4;
pipeline.cljs$core$IFn$_invoke$arity$5 = pipeline__5;
pipeline.cljs$core$IFn$_invoke$arity$6 = pipeline__6;
return pipeline;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__15945__auto___22698 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___22698,tc,fc){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___22698,tc,fc){
return (function (state_22673){var state_val_22674 = (state_22673[(1)]);if((state_val_22674 === (7)))
{var inst_22669 = (state_22673[(2)]);var state_22673__$1 = state_22673;var statearr_22675_22699 = state_22673__$1;(statearr_22675_22699[(2)] = inst_22669);
(statearr_22675_22699[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (1)))
{var state_22673__$1 = state_22673;var statearr_22676_22700 = state_22673__$1;(statearr_22676_22700[(2)] = null);
(statearr_22676_22700[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (4)))
{var inst_22650 = (state_22673[(7)]);var inst_22650__$1 = (state_22673[(2)]);var inst_22651 = (inst_22650__$1 == null);var state_22673__$1 = (function (){var statearr_22677 = state_22673;(statearr_22677[(7)] = inst_22650__$1);
return statearr_22677;
})();if(cljs.core.truth_(inst_22651))
{var statearr_22678_22701 = state_22673__$1;(statearr_22678_22701[(1)] = (5));
} else
{var statearr_22679_22702 = state_22673__$1;(statearr_22679_22702[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (13)))
{var state_22673__$1 = state_22673;var statearr_22680_22703 = state_22673__$1;(statearr_22680_22703[(2)] = null);
(statearr_22680_22703[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (6)))
{var inst_22650 = (state_22673[(7)]);var inst_22656 = p.call(null,inst_22650);var state_22673__$1 = state_22673;if(cljs.core.truth_(inst_22656))
{var statearr_22681_22704 = state_22673__$1;(statearr_22681_22704[(1)] = (9));
} else
{var statearr_22682_22705 = state_22673__$1;(statearr_22682_22705[(1)] = (10));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (3)))
{var inst_22671 = (state_22673[(2)]);var state_22673__$1 = state_22673;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22673__$1,inst_22671);
} else
{if((state_val_22674 === (12)))
{var state_22673__$1 = state_22673;var statearr_22683_22706 = state_22673__$1;(statearr_22683_22706[(2)] = null);
(statearr_22683_22706[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (2)))
{var state_22673__$1 = state_22673;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22673__$1,(4),ch);
} else
{if((state_val_22674 === (11)))
{var inst_22650 = (state_22673[(7)]);var inst_22660 = (state_22673[(2)]);var state_22673__$1 = state_22673;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22673__$1,(8),inst_22660,inst_22650);
} else
{if((state_val_22674 === (9)))
{var state_22673__$1 = state_22673;var statearr_22684_22707 = state_22673__$1;(statearr_22684_22707[(2)] = tc);
(statearr_22684_22707[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (5)))
{var inst_22653 = cljs.core.async.close_BANG_.call(null,tc);var inst_22654 = cljs.core.async.close_BANG_.call(null,fc);var state_22673__$1 = (function (){var statearr_22685 = state_22673;(statearr_22685[(8)] = inst_22653);
return statearr_22685;
})();var statearr_22686_22708 = state_22673__$1;(statearr_22686_22708[(2)] = inst_22654);
(statearr_22686_22708[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (14)))
{var inst_22667 = (state_22673[(2)]);var state_22673__$1 = state_22673;var statearr_22687_22709 = state_22673__$1;(statearr_22687_22709[(2)] = inst_22667);
(statearr_22687_22709[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (10)))
{var state_22673__$1 = state_22673;var statearr_22688_22710 = state_22673__$1;(statearr_22688_22710[(2)] = fc);
(statearr_22688_22710[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22674 === (8)))
{var inst_22662 = (state_22673[(2)]);var state_22673__$1 = state_22673;if(cljs.core.truth_(inst_22662))
{var statearr_22689_22711 = state_22673__$1;(statearr_22689_22711[(1)] = (12));
} else
{var statearr_22690_22712 = state_22673__$1;(statearr_22690_22712[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___22698,tc,fc))
;return ((function (switch__15889__auto__,c__15945__auto___22698,tc,fc){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22694 = [null,null,null,null,null,null,null,null,null];(statearr_22694[(0)] = state_machine__15890__auto__);
(statearr_22694[(1)] = (1));
return statearr_22694;
});
var state_machine__15890__auto____1 = (function (state_22673){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22673);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22695){if((e22695 instanceof Object))
{var ex__15893__auto__ = e22695;var statearr_22696_22713 = state_22673;(statearr_22696_22713[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22673);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22695;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22714 = state_22673;
state_22673 = G__22714;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22673){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22673);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___22698,tc,fc))
})();var state__15947__auto__ = (function (){var statearr_22697 = f__15946__auto__.call(null);(statearr_22697[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___22698);
return statearr_22697;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___22698,tc,fc))
);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_22761){var state_val_22762 = (state_22761[(1)]);if((state_val_22762 === (7)))
{var inst_22757 = (state_22761[(2)]);var state_22761__$1 = state_22761;var statearr_22763_22779 = state_22761__$1;(statearr_22763_22779[(2)] = inst_22757);
(statearr_22763_22779[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22762 === (6)))
{var inst_22747 = (state_22761[(7)]);var inst_22750 = (state_22761[(8)]);var inst_22754 = f.call(null,inst_22747,inst_22750);var inst_22747__$1 = inst_22754;var state_22761__$1 = (function (){var statearr_22764 = state_22761;(statearr_22764[(7)] = inst_22747__$1);
return statearr_22764;
})();var statearr_22765_22780 = state_22761__$1;(statearr_22765_22780[(2)] = null);
(statearr_22765_22780[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22762 === (5)))
{var inst_22747 = (state_22761[(7)]);var state_22761__$1 = state_22761;var statearr_22766_22781 = state_22761__$1;(statearr_22766_22781[(2)] = inst_22747);
(statearr_22766_22781[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22762 === (4)))
{var inst_22750 = (state_22761[(8)]);var inst_22750__$1 = (state_22761[(2)]);var inst_22751 = (inst_22750__$1 == null);var state_22761__$1 = (function (){var statearr_22767 = state_22761;(statearr_22767[(8)] = inst_22750__$1);
return statearr_22767;
})();if(cljs.core.truth_(inst_22751))
{var statearr_22768_22782 = state_22761__$1;(statearr_22768_22782[(1)] = (5));
} else
{var statearr_22769_22783 = state_22761__$1;(statearr_22769_22783[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22762 === (3)))
{var inst_22759 = (state_22761[(2)]);var state_22761__$1 = state_22761;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22761__$1,inst_22759);
} else
{if((state_val_22762 === (2)))
{var state_22761__$1 = state_22761;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22761__$1,(4),ch);
} else
{if((state_val_22762 === (1)))
{var inst_22747 = init;var state_22761__$1 = (function (){var statearr_22770 = state_22761;(statearr_22770[(7)] = inst_22747);
return statearr_22770;
})();var statearr_22771_22784 = state_22761__$1;(statearr_22771_22784[(2)] = null);
(statearr_22771_22784[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22775 = [null,null,null,null,null,null,null,null,null];(statearr_22775[(0)] = state_machine__15890__auto__);
(statearr_22775[(1)] = (1));
return statearr_22775;
});
var state_machine__15890__auto____1 = (function (state_22761){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22761);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22776){if((e22776 instanceof Object))
{var ex__15893__auto__ = e22776;var statearr_22777_22785 = state_22761;(statearr_22777_22785[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22761);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22776;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22786 = state_22761;
state_22761 = G__22786;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22761){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22761);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_22778 = f__15946__auto__.call(null);(statearr_22778[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_22778;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_22860){var state_val_22861 = (state_22860[(1)]);if((state_val_22861 === (7)))
{var inst_22842 = (state_22860[(2)]);var state_22860__$1 = state_22860;var statearr_22862_22885 = state_22860__$1;(statearr_22862_22885[(2)] = inst_22842);
(statearr_22862_22885[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (1)))
{var inst_22836 = cljs.core.seq.call(null,coll);var inst_22837 = inst_22836;var state_22860__$1 = (function (){var statearr_22863 = state_22860;(statearr_22863[(7)] = inst_22837);
return statearr_22863;
})();var statearr_22864_22886 = state_22860__$1;(statearr_22864_22886[(2)] = null);
(statearr_22864_22886[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (4)))
{var inst_22837 = (state_22860[(7)]);var inst_22840 = cljs.core.first.call(null,inst_22837);var state_22860__$1 = state_22860;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22860__$1,(7),ch,inst_22840);
} else
{if((state_val_22861 === (13)))
{var inst_22854 = (state_22860[(2)]);var state_22860__$1 = state_22860;var statearr_22865_22887 = state_22860__$1;(statearr_22865_22887[(2)] = inst_22854);
(statearr_22865_22887[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (6)))
{var inst_22845 = (state_22860[(2)]);var state_22860__$1 = state_22860;if(cljs.core.truth_(inst_22845))
{var statearr_22866_22888 = state_22860__$1;(statearr_22866_22888[(1)] = (8));
} else
{var statearr_22867_22889 = state_22860__$1;(statearr_22867_22889[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (3)))
{var inst_22858 = (state_22860[(2)]);var state_22860__$1 = state_22860;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22860__$1,inst_22858);
} else
{if((state_val_22861 === (12)))
{var state_22860__$1 = state_22860;var statearr_22868_22890 = state_22860__$1;(statearr_22868_22890[(2)] = null);
(statearr_22868_22890[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (2)))
{var inst_22837 = (state_22860[(7)]);var state_22860__$1 = state_22860;if(cljs.core.truth_(inst_22837))
{var statearr_22869_22891 = state_22860__$1;(statearr_22869_22891[(1)] = (4));
} else
{var statearr_22870_22892 = state_22860__$1;(statearr_22870_22892[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (11)))
{var inst_22851 = cljs.core.async.close_BANG_.call(null,ch);var state_22860__$1 = state_22860;var statearr_22871_22893 = state_22860__$1;(statearr_22871_22893[(2)] = inst_22851);
(statearr_22871_22893[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (9)))
{var state_22860__$1 = state_22860;if(cljs.core.truth_(close_QMARK_))
{var statearr_22872_22894 = state_22860__$1;(statearr_22872_22894[(1)] = (11));
} else
{var statearr_22873_22895 = state_22860__$1;(statearr_22873_22895[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (5)))
{var inst_22837 = (state_22860[(7)]);var state_22860__$1 = state_22860;var statearr_22874_22896 = state_22860__$1;(statearr_22874_22896[(2)] = inst_22837);
(statearr_22874_22896[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (10)))
{var inst_22856 = (state_22860[(2)]);var state_22860__$1 = state_22860;var statearr_22875_22897 = state_22860__$1;(statearr_22875_22897[(2)] = inst_22856);
(statearr_22875_22897[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_22861 === (8)))
{var inst_22837 = (state_22860[(7)]);var inst_22847 = cljs.core.next.call(null,inst_22837);var inst_22837__$1 = inst_22847;var state_22860__$1 = (function (){var statearr_22876 = state_22860;(statearr_22876[(7)] = inst_22837__$1);
return statearr_22876;
})();var statearr_22877_22898 = state_22860__$1;(statearr_22877_22898[(2)] = null);
(statearr_22877_22898[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22881 = [null,null,null,null,null,null,null,null];(statearr_22881[(0)] = state_machine__15890__auto__);
(statearr_22881[(1)] = (1));
return statearr_22881;
});
var state_machine__15890__auto____1 = (function (state_22860){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_22860);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22882){if((e22882 instanceof Object))
{var ex__15893__auto__ = e22882;var statearr_22883_22899 = state_22860;(statearr_22883_22899[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22860);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22882;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22900 = state_22860;
state_22860 = G__22900;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_22860){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_22860);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_22884 = f__15946__auto__.call(null);(statearr_22884[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_22884;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj22902 = {};return obj22902;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__12551__auto__ = _;if(and__12551__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__12551__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__13200__auto__ = (((_ == null))?null:_);return (function (){var or__12563__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj22904 = {};return obj22904;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* Items received when there are no taps get dropped.
* 
* If a tap puts to a closed channel, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t23126 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t23126 = (function (cs,ch,mult,meta23127){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta23127 = meta23127;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t23126.cljs$lang$type = true;
cljs.core.async.t23126.cljs$lang$ctorStr = "cljs.core.async/t23126";
cljs.core.async.t23126.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t23126");
});})(cs))
;
cljs.core.async.t23126.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t23126.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t23126.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t23126.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t23126.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t23126.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t23126.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_23128){var self__ = this;
var _23128__$1 = this;return self__.meta23127;
});})(cs))
;
cljs.core.async.t23126.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_23128,meta23127__$1){var self__ = this;
var _23128__$1 = this;return (new cljs.core.async.t23126(self__.cs,self__.ch,self__.mult,meta23127__$1));
});})(cs))
;
cljs.core.async.__GT_t23126 = ((function (cs){
return (function __GT_t23126(cs__$1,ch__$1,mult__$1,meta23127){return (new cljs.core.async.t23126(cs__$1,ch__$1,mult__$1,meta23127));
});})(cs))
;
}
return (new cljs.core.async.t23126(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (_){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__15945__auto___23347 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___23347,cs,m,dchan,dctr,done){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___23347,cs,m,dchan,dctr,done){
return (function (state_23259){var state_val_23260 = (state_23259[(1)]);if((state_val_23260 === (7)))
{var inst_23255 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23261_23348 = state_23259__$1;(statearr_23261_23348[(2)] = inst_23255);
(statearr_23261_23348[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (20)))
{var inst_23160 = (state_23259[(7)]);var inst_23170 = cljs.core.first.call(null,inst_23160);var inst_23171 = cljs.core.nth.call(null,inst_23170,(0),null);var inst_23172 = cljs.core.nth.call(null,inst_23170,(1),null);var state_23259__$1 = (function (){var statearr_23262 = state_23259;(statearr_23262[(8)] = inst_23171);
return statearr_23262;
})();if(cljs.core.truth_(inst_23172))
{var statearr_23263_23349 = state_23259__$1;(statearr_23263_23349[(1)] = (22));
} else
{var statearr_23264_23350 = state_23259__$1;(statearr_23264_23350[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (27)))
{var inst_23200 = (state_23259[(9)]);var inst_23202 = (state_23259[(10)]);var inst_23207 = (state_23259[(11)]);var inst_23131 = (state_23259[(12)]);var inst_23207__$1 = cljs.core._nth.call(null,inst_23200,inst_23202);var inst_23208 = cljs.core.async.put_BANG_.call(null,inst_23207__$1,inst_23131,done);var state_23259__$1 = (function (){var statearr_23265 = state_23259;(statearr_23265[(11)] = inst_23207__$1);
return statearr_23265;
})();if(cljs.core.truth_(inst_23208))
{var statearr_23266_23351 = state_23259__$1;(statearr_23266_23351[(1)] = (30));
} else
{var statearr_23267_23352 = state_23259__$1;(statearr_23267_23352[(1)] = (31));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (1)))
{var state_23259__$1 = state_23259;var statearr_23268_23353 = state_23259__$1;(statearr_23268_23353[(2)] = null);
(statearr_23268_23353[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (24)))
{var inst_23160 = (state_23259[(7)]);var inst_23177 = (state_23259[(2)]);var inst_23178 = cljs.core.next.call(null,inst_23160);var inst_23140 = inst_23178;var inst_23141 = null;var inst_23142 = (0);var inst_23143 = (0);var state_23259__$1 = (function (){var statearr_23269 = state_23259;(statearr_23269[(13)] = inst_23177);
(statearr_23269[(14)] = inst_23142);
(statearr_23269[(15)] = inst_23140);
(statearr_23269[(16)] = inst_23141);
(statearr_23269[(17)] = inst_23143);
return statearr_23269;
})();var statearr_23270_23354 = state_23259__$1;(statearr_23270_23354[(2)] = null);
(statearr_23270_23354[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (39)))
{var state_23259__$1 = state_23259;var statearr_23274_23355 = state_23259__$1;(statearr_23274_23355[(2)] = null);
(statearr_23274_23355[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (4)))
{var inst_23131 = (state_23259[(12)]);var inst_23131__$1 = (state_23259[(2)]);var inst_23132 = (inst_23131__$1 == null);var state_23259__$1 = (function (){var statearr_23275 = state_23259;(statearr_23275[(12)] = inst_23131__$1);
return statearr_23275;
})();if(cljs.core.truth_(inst_23132))
{var statearr_23276_23356 = state_23259__$1;(statearr_23276_23356[(1)] = (5));
} else
{var statearr_23277_23357 = state_23259__$1;(statearr_23277_23357[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (15)))
{var inst_23142 = (state_23259[(14)]);var inst_23140 = (state_23259[(15)]);var inst_23141 = (state_23259[(16)]);var inst_23143 = (state_23259[(17)]);var inst_23156 = (state_23259[(2)]);var inst_23157 = (inst_23143 + (1));var tmp23271 = inst_23142;var tmp23272 = inst_23140;var tmp23273 = inst_23141;var inst_23140__$1 = tmp23272;var inst_23141__$1 = tmp23273;var inst_23142__$1 = tmp23271;var inst_23143__$1 = inst_23157;var state_23259__$1 = (function (){var statearr_23278 = state_23259;(statearr_23278[(18)] = inst_23156);
(statearr_23278[(14)] = inst_23142__$1);
(statearr_23278[(15)] = inst_23140__$1);
(statearr_23278[(16)] = inst_23141__$1);
(statearr_23278[(17)] = inst_23143__$1);
return statearr_23278;
})();var statearr_23279_23358 = state_23259__$1;(statearr_23279_23358[(2)] = null);
(statearr_23279_23358[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (21)))
{var inst_23181 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23283_23359 = state_23259__$1;(statearr_23283_23359[(2)] = inst_23181);
(statearr_23283_23359[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (31)))
{var inst_23207 = (state_23259[(11)]);var inst_23211 = done.call(null,null);var inst_23212 = cljs.core.async.untap_STAR_.call(null,m,inst_23207);var state_23259__$1 = (function (){var statearr_23284 = state_23259;(statearr_23284[(19)] = inst_23211);
return statearr_23284;
})();var statearr_23285_23360 = state_23259__$1;(statearr_23285_23360[(2)] = inst_23212);
(statearr_23285_23360[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (32)))
{var inst_23200 = (state_23259[(9)]);var inst_23202 = (state_23259[(10)]);var inst_23199 = (state_23259[(20)]);var inst_23201 = (state_23259[(21)]);var inst_23214 = (state_23259[(2)]);var inst_23215 = (inst_23202 + (1));var tmp23280 = inst_23200;var tmp23281 = inst_23199;var tmp23282 = inst_23201;var inst_23199__$1 = tmp23281;var inst_23200__$1 = tmp23280;var inst_23201__$1 = tmp23282;var inst_23202__$1 = inst_23215;var state_23259__$1 = (function (){var statearr_23286 = state_23259;(statearr_23286[(9)] = inst_23200__$1);
(statearr_23286[(10)] = inst_23202__$1);
(statearr_23286[(20)] = inst_23199__$1);
(statearr_23286[(21)] = inst_23201__$1);
(statearr_23286[(22)] = inst_23214);
return statearr_23286;
})();var statearr_23287_23361 = state_23259__$1;(statearr_23287_23361[(2)] = null);
(statearr_23287_23361[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (40)))
{var inst_23227 = (state_23259[(23)]);var inst_23231 = done.call(null,null);var inst_23232 = cljs.core.async.untap_STAR_.call(null,m,inst_23227);var state_23259__$1 = (function (){var statearr_23288 = state_23259;(statearr_23288[(24)] = inst_23231);
return statearr_23288;
})();var statearr_23289_23362 = state_23259__$1;(statearr_23289_23362[(2)] = inst_23232);
(statearr_23289_23362[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (33)))
{var inst_23218 = (state_23259[(25)]);var inst_23220 = cljs.core.chunked_seq_QMARK_.call(null,inst_23218);var state_23259__$1 = state_23259;if(inst_23220)
{var statearr_23290_23363 = state_23259__$1;(statearr_23290_23363[(1)] = (36));
} else
{var statearr_23291_23364 = state_23259__$1;(statearr_23291_23364[(1)] = (37));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (13)))
{var inst_23150 = (state_23259[(26)]);var inst_23153 = cljs.core.async.close_BANG_.call(null,inst_23150);var state_23259__$1 = state_23259;var statearr_23292_23365 = state_23259__$1;(statearr_23292_23365[(2)] = inst_23153);
(statearr_23292_23365[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (22)))
{var inst_23171 = (state_23259[(8)]);var inst_23174 = cljs.core.async.close_BANG_.call(null,inst_23171);var state_23259__$1 = state_23259;var statearr_23293_23366 = state_23259__$1;(statearr_23293_23366[(2)] = inst_23174);
(statearr_23293_23366[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (36)))
{var inst_23218 = (state_23259[(25)]);var inst_23222 = cljs.core.chunk_first.call(null,inst_23218);var inst_23223 = cljs.core.chunk_rest.call(null,inst_23218);var inst_23224 = cljs.core.count.call(null,inst_23222);var inst_23199 = inst_23223;var inst_23200 = inst_23222;var inst_23201 = inst_23224;var inst_23202 = (0);var state_23259__$1 = (function (){var statearr_23294 = state_23259;(statearr_23294[(9)] = inst_23200);
(statearr_23294[(10)] = inst_23202);
(statearr_23294[(20)] = inst_23199);
(statearr_23294[(21)] = inst_23201);
return statearr_23294;
})();var statearr_23295_23367 = state_23259__$1;(statearr_23295_23367[(2)] = null);
(statearr_23295_23367[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (41)))
{var inst_23218 = (state_23259[(25)]);var inst_23234 = (state_23259[(2)]);var inst_23235 = cljs.core.next.call(null,inst_23218);var inst_23199 = inst_23235;var inst_23200 = null;var inst_23201 = (0);var inst_23202 = (0);var state_23259__$1 = (function (){var statearr_23296 = state_23259;(statearr_23296[(9)] = inst_23200);
(statearr_23296[(10)] = inst_23202);
(statearr_23296[(20)] = inst_23199);
(statearr_23296[(27)] = inst_23234);
(statearr_23296[(21)] = inst_23201);
return statearr_23296;
})();var statearr_23297_23368 = state_23259__$1;(statearr_23297_23368[(2)] = null);
(statearr_23297_23368[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (43)))
{var state_23259__$1 = state_23259;var statearr_23298_23369 = state_23259__$1;(statearr_23298_23369[(2)] = null);
(statearr_23298_23369[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (29)))
{var inst_23243 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23299_23370 = state_23259__$1;(statearr_23299_23370[(2)] = inst_23243);
(statearr_23299_23370[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (44)))
{var inst_23252 = (state_23259[(2)]);var state_23259__$1 = (function (){var statearr_23300 = state_23259;(statearr_23300[(28)] = inst_23252);
return statearr_23300;
})();var statearr_23301_23371 = state_23259__$1;(statearr_23301_23371[(2)] = null);
(statearr_23301_23371[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (6)))
{var inst_23191 = (state_23259[(29)]);var inst_23190 = cljs.core.deref.call(null,cs);var inst_23191__$1 = cljs.core.keys.call(null,inst_23190);var inst_23192 = cljs.core.count.call(null,inst_23191__$1);var inst_23193 = cljs.core.reset_BANG_.call(null,dctr,inst_23192);var inst_23198 = cljs.core.seq.call(null,inst_23191__$1);var inst_23199 = inst_23198;var inst_23200 = null;var inst_23201 = (0);var inst_23202 = (0);var state_23259__$1 = (function (){var statearr_23302 = state_23259;(statearr_23302[(9)] = inst_23200);
(statearr_23302[(10)] = inst_23202);
(statearr_23302[(20)] = inst_23199);
(statearr_23302[(29)] = inst_23191__$1);
(statearr_23302[(21)] = inst_23201);
(statearr_23302[(30)] = inst_23193);
return statearr_23302;
})();var statearr_23303_23372 = state_23259__$1;(statearr_23303_23372[(2)] = null);
(statearr_23303_23372[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (28)))
{var inst_23199 = (state_23259[(20)]);var inst_23218 = (state_23259[(25)]);var inst_23218__$1 = cljs.core.seq.call(null,inst_23199);var state_23259__$1 = (function (){var statearr_23304 = state_23259;(statearr_23304[(25)] = inst_23218__$1);
return statearr_23304;
})();if(inst_23218__$1)
{var statearr_23305_23373 = state_23259__$1;(statearr_23305_23373[(1)] = (33));
} else
{var statearr_23306_23374 = state_23259__$1;(statearr_23306_23374[(1)] = (34));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (25)))
{var inst_23202 = (state_23259[(10)]);var inst_23201 = (state_23259[(21)]);var inst_23204 = (inst_23202 < inst_23201);var inst_23205 = inst_23204;var state_23259__$1 = state_23259;if(cljs.core.truth_(inst_23205))
{var statearr_23307_23375 = state_23259__$1;(statearr_23307_23375[(1)] = (27));
} else
{var statearr_23308_23376 = state_23259__$1;(statearr_23308_23376[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (34)))
{var state_23259__$1 = state_23259;var statearr_23309_23377 = state_23259__$1;(statearr_23309_23377[(2)] = null);
(statearr_23309_23377[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (17)))
{var state_23259__$1 = state_23259;var statearr_23310_23378 = state_23259__$1;(statearr_23310_23378[(2)] = null);
(statearr_23310_23378[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (3)))
{var inst_23257 = (state_23259[(2)]);var state_23259__$1 = state_23259;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23259__$1,inst_23257);
} else
{if((state_val_23260 === (12)))
{var inst_23186 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23311_23379 = state_23259__$1;(statearr_23311_23379[(2)] = inst_23186);
(statearr_23311_23379[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (2)))
{var state_23259__$1 = state_23259;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23259__$1,(4),ch);
} else
{if((state_val_23260 === (23)))
{var state_23259__$1 = state_23259;var statearr_23312_23380 = state_23259__$1;(statearr_23312_23380[(2)] = null);
(statearr_23312_23380[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (35)))
{var inst_23241 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23313_23381 = state_23259__$1;(statearr_23313_23381[(2)] = inst_23241);
(statearr_23313_23381[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (19)))
{var inst_23160 = (state_23259[(7)]);var inst_23164 = cljs.core.chunk_first.call(null,inst_23160);var inst_23165 = cljs.core.chunk_rest.call(null,inst_23160);var inst_23166 = cljs.core.count.call(null,inst_23164);var inst_23140 = inst_23165;var inst_23141 = inst_23164;var inst_23142 = inst_23166;var inst_23143 = (0);var state_23259__$1 = (function (){var statearr_23314 = state_23259;(statearr_23314[(14)] = inst_23142);
(statearr_23314[(15)] = inst_23140);
(statearr_23314[(16)] = inst_23141);
(statearr_23314[(17)] = inst_23143);
return statearr_23314;
})();var statearr_23315_23382 = state_23259__$1;(statearr_23315_23382[(2)] = null);
(statearr_23315_23382[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (11)))
{var inst_23160 = (state_23259[(7)]);var inst_23140 = (state_23259[(15)]);var inst_23160__$1 = cljs.core.seq.call(null,inst_23140);var state_23259__$1 = (function (){var statearr_23316 = state_23259;(statearr_23316[(7)] = inst_23160__$1);
return statearr_23316;
})();if(inst_23160__$1)
{var statearr_23317_23383 = state_23259__$1;(statearr_23317_23383[(1)] = (16));
} else
{var statearr_23318_23384 = state_23259__$1;(statearr_23318_23384[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (9)))
{var inst_23188 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23319_23385 = state_23259__$1;(statearr_23319_23385[(2)] = inst_23188);
(statearr_23319_23385[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (5)))
{var inst_23138 = cljs.core.deref.call(null,cs);var inst_23139 = cljs.core.seq.call(null,inst_23138);var inst_23140 = inst_23139;var inst_23141 = null;var inst_23142 = (0);var inst_23143 = (0);var state_23259__$1 = (function (){var statearr_23320 = state_23259;(statearr_23320[(14)] = inst_23142);
(statearr_23320[(15)] = inst_23140);
(statearr_23320[(16)] = inst_23141);
(statearr_23320[(17)] = inst_23143);
return statearr_23320;
})();var statearr_23321_23386 = state_23259__$1;(statearr_23321_23386[(2)] = null);
(statearr_23321_23386[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (14)))
{var state_23259__$1 = state_23259;var statearr_23322_23387 = state_23259__$1;(statearr_23322_23387[(2)] = null);
(statearr_23322_23387[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (45)))
{var inst_23249 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23323_23388 = state_23259__$1;(statearr_23323_23388[(2)] = inst_23249);
(statearr_23323_23388[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (26)))
{var inst_23191 = (state_23259[(29)]);var inst_23245 = (state_23259[(2)]);var inst_23246 = cljs.core.seq.call(null,inst_23191);var state_23259__$1 = (function (){var statearr_23324 = state_23259;(statearr_23324[(31)] = inst_23245);
return statearr_23324;
})();if(inst_23246)
{var statearr_23325_23389 = state_23259__$1;(statearr_23325_23389[(1)] = (42));
} else
{var statearr_23326_23390 = state_23259__$1;(statearr_23326_23390[(1)] = (43));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (16)))
{var inst_23160 = (state_23259[(7)]);var inst_23162 = cljs.core.chunked_seq_QMARK_.call(null,inst_23160);var state_23259__$1 = state_23259;if(inst_23162)
{var statearr_23327_23391 = state_23259__$1;(statearr_23327_23391[(1)] = (19));
} else
{var statearr_23328_23392 = state_23259__$1;(statearr_23328_23392[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (38)))
{var inst_23238 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23329_23393 = state_23259__$1;(statearr_23329_23393[(2)] = inst_23238);
(statearr_23329_23393[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (30)))
{var state_23259__$1 = state_23259;var statearr_23330_23394 = state_23259__$1;(statearr_23330_23394[(2)] = null);
(statearr_23330_23394[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (10)))
{var inst_23141 = (state_23259[(16)]);var inst_23143 = (state_23259[(17)]);var inst_23149 = cljs.core._nth.call(null,inst_23141,inst_23143);var inst_23150 = cljs.core.nth.call(null,inst_23149,(0),null);var inst_23151 = cljs.core.nth.call(null,inst_23149,(1),null);var state_23259__$1 = (function (){var statearr_23331 = state_23259;(statearr_23331[(26)] = inst_23150);
return statearr_23331;
})();if(cljs.core.truth_(inst_23151))
{var statearr_23332_23395 = state_23259__$1;(statearr_23332_23395[(1)] = (13));
} else
{var statearr_23333_23396 = state_23259__$1;(statearr_23333_23396[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (18)))
{var inst_23184 = (state_23259[(2)]);var state_23259__$1 = state_23259;var statearr_23334_23397 = state_23259__$1;(statearr_23334_23397[(2)] = inst_23184);
(statearr_23334_23397[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (42)))
{var state_23259__$1 = state_23259;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23259__$1,(45),dchan);
} else
{if((state_val_23260 === (37)))
{var inst_23227 = (state_23259[(23)]);var inst_23131 = (state_23259[(12)]);var inst_23218 = (state_23259[(25)]);var inst_23227__$1 = cljs.core.first.call(null,inst_23218);var inst_23228 = cljs.core.async.put_BANG_.call(null,inst_23227__$1,inst_23131,done);var state_23259__$1 = (function (){var statearr_23335 = state_23259;(statearr_23335[(23)] = inst_23227__$1);
return statearr_23335;
})();if(cljs.core.truth_(inst_23228))
{var statearr_23336_23398 = state_23259__$1;(statearr_23336_23398[(1)] = (39));
} else
{var statearr_23337_23399 = state_23259__$1;(statearr_23337_23399[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23260 === (8)))
{var inst_23142 = (state_23259[(14)]);var inst_23143 = (state_23259[(17)]);var inst_23145 = (inst_23143 < inst_23142);var inst_23146 = inst_23145;var state_23259__$1 = state_23259;if(cljs.core.truth_(inst_23146))
{var statearr_23338_23400 = state_23259__$1;(statearr_23338_23400[(1)] = (10));
} else
{var statearr_23339_23401 = state_23259__$1;(statearr_23339_23401[(1)] = (11));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___23347,cs,m,dchan,dctr,done))
;return ((function (switch__15889__auto__,c__15945__auto___23347,cs,m,dchan,dctr,done){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_23343 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23343[(0)] = state_machine__15890__auto__);
(statearr_23343[(1)] = (1));
return statearr_23343;
});
var state_machine__15890__auto____1 = (function (state_23259){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_23259);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e23344){if((e23344 instanceof Object))
{var ex__15893__auto__ = e23344;var statearr_23345_23402 = state_23259;(statearr_23345_23402[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23259);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e23344;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__23403 = state_23259;
state_23259 = G__23403;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_23259){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_23259);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___23347,cs,m,dchan,dctr,done))
})();var state__15947__auto__ = (function (){var statearr_23346 = f__15946__auto__.call(null);(statearr_23346[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___23347);
return statearr_23346;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___23347,cs,m,dchan,dctr,done))
);
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = (function (){var obj23405 = {};return obj23405;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__12551__auto__ = m;if(and__12551__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__12551__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__13200__auto__ = (((m == null))?null:m);return (function (){var or__12563__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* @param {...*} var_args
*/
cljs.core.async.ioc_alts_BANG_ = (function() { 
var ioc_alts_BANG___delegate = function (state,cont_block,ports,p__23406){var map__23411 = p__23406;var map__23411__$1 = ((cljs.core.seq_QMARK_.call(null,map__23411))?cljs.core.apply.call(null,cljs.core.hash_map,map__23411):map__23411);var opts = map__23411__$1;var statearr_23412_23415 = state;(statearr_23412_23415[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);
var temp__4126__auto__ = cljs.core.async.do_alts.call(null,((function (map__23411,map__23411__$1,opts){
return (function (val){var statearr_23413_23416 = state;(statearr_23413_23416[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__23411,map__23411__$1,opts))
,ports,opts);if(cljs.core.truth_(temp__4126__auto__))
{var cb = temp__4126__auto__;var statearr_23414_23417 = state;(statearr_23414_23417[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
};
var ioc_alts_BANG_ = function (state,cont_block,ports,var_args){
var p__23406 = null;if (arguments.length > 3) {
  p__23406 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return ioc_alts_BANG___delegate.call(this,state,cont_block,ports,p__23406);};
ioc_alts_BANG_.cljs$lang$maxFixedArity = 3;
ioc_alts_BANG_.cljs$lang$applyTo = (function (arglist__23418){
var state = cljs.core.first(arglist__23418);
arglist__23418 = cljs.core.next(arglist__23418);
var cont_block = cljs.core.first(arglist__23418);
arglist__23418 = cljs.core.next(arglist__23418);
var ports = cljs.core.first(arglist__23418);
var p__23406 = cljs.core.rest(arglist__23418);
return ioc_alts_BANG___delegate(state,cont_block,ports,p__23406);
});
ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = ioc_alts_BANG___delegate;
return ioc_alts_BANG_;
})()
;
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t23538 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t23538 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta23539){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta23539 = meta23539;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t23538.cljs$lang$type = true;
cljs.core.async.t23538.cljs$lang$ctorStr = "cljs.core.async/t23538";
cljs.core.async.t23538.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t23538");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t23538.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("mode must be one of: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null)))))));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t23538.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_23540){var self__ = this;
var _23540__$1 = this;return self__.meta23539;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23538.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_23540,meta23539__$1){var self__ = this;
var _23540__$1 = this;return (new cljs.core.async.t23538(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta23539__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t23538 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t23538(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta23539){return (new cljs.core.async.t23538(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta23539));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t23538(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__15945__auto___23657 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___23657,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___23657,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_23610){var state_val_23611 = (state_23610[(1)]);if((state_val_23611 === (7)))
{var inst_23554 = (state_23610[(7)]);var inst_23559 = cljs.core.apply.call(null,cljs.core.hash_map,inst_23554);var state_23610__$1 = state_23610;var statearr_23612_23658 = state_23610__$1;(statearr_23612_23658[(2)] = inst_23559);
(statearr_23612_23658[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (20)))
{var inst_23569 = (state_23610[(8)]);var state_23610__$1 = state_23610;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23610__$1,(23),out,inst_23569);
} else
{if((state_val_23611 === (1)))
{var inst_23544 = (state_23610[(9)]);var inst_23544__$1 = calc_state.call(null);var inst_23545 = cljs.core.seq_QMARK_.call(null,inst_23544__$1);var state_23610__$1 = (function (){var statearr_23613 = state_23610;(statearr_23613[(9)] = inst_23544__$1);
return statearr_23613;
})();if(inst_23545)
{var statearr_23614_23659 = state_23610__$1;(statearr_23614_23659[(1)] = (2));
} else
{var statearr_23615_23660 = state_23610__$1;(statearr_23615_23660[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (24)))
{var inst_23562 = (state_23610[(10)]);var inst_23554 = inst_23562;var state_23610__$1 = (function (){var statearr_23616 = state_23610;(statearr_23616[(7)] = inst_23554);
return statearr_23616;
})();var statearr_23617_23661 = state_23610__$1;(statearr_23617_23661[(2)] = null);
(statearr_23617_23661[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (4)))
{var inst_23544 = (state_23610[(9)]);var inst_23550 = (state_23610[(2)]);var inst_23551 = cljs.core.get.call(null,inst_23550,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_23552 = cljs.core.get.call(null,inst_23550,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_23553 = cljs.core.get.call(null,inst_23550,new cljs.core.Keyword(null,"solos","solos",1441458643));var inst_23554 = inst_23544;var state_23610__$1 = (function (){var statearr_23618 = state_23610;(statearr_23618[(11)] = inst_23553);
(statearr_23618[(12)] = inst_23551);
(statearr_23618[(7)] = inst_23554);
(statearr_23618[(13)] = inst_23552);
return statearr_23618;
})();var statearr_23619_23662 = state_23610__$1;(statearr_23619_23662[(2)] = null);
(statearr_23619_23662[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (15)))
{var state_23610__$1 = state_23610;var statearr_23620_23663 = state_23610__$1;(statearr_23620_23663[(2)] = null);
(statearr_23620_23663[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (21)))
{var inst_23562 = (state_23610[(10)]);var inst_23554 = inst_23562;var state_23610__$1 = (function (){var statearr_23621 = state_23610;(statearr_23621[(7)] = inst_23554);
return statearr_23621;
})();var statearr_23622_23664 = state_23610__$1;(statearr_23622_23664[(2)] = null);
(statearr_23622_23664[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (13)))
{var inst_23606 = (state_23610[(2)]);var state_23610__$1 = state_23610;var statearr_23623_23665 = state_23610__$1;(statearr_23623_23665[(2)] = inst_23606);
(statearr_23623_23665[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (22)))
{var inst_23604 = (state_23610[(2)]);var state_23610__$1 = state_23610;var statearr_23624_23666 = state_23610__$1;(statearr_23624_23666[(2)] = inst_23604);
(statearr_23624_23666[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (6)))
{var inst_23608 = (state_23610[(2)]);var state_23610__$1 = state_23610;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23610__$1,inst_23608);
} else
{if((state_val_23611 === (25)))
{var state_23610__$1 = state_23610;var statearr_23625_23667 = state_23610__$1;(statearr_23625_23667[(2)] = null);
(statearr_23625_23667[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (17)))
{var inst_23584 = (state_23610[(14)]);var state_23610__$1 = state_23610;var statearr_23626_23668 = state_23610__$1;(statearr_23626_23668[(2)] = inst_23584);
(statearr_23626_23668[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (3)))
{var inst_23544 = (state_23610[(9)]);var state_23610__$1 = state_23610;var statearr_23627_23669 = state_23610__$1;(statearr_23627_23669[(2)] = inst_23544);
(statearr_23627_23669[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (12)))
{var inst_23570 = (state_23610[(15)]);var inst_23584 = (state_23610[(14)]);var inst_23565 = (state_23610[(16)]);var inst_23584__$1 = inst_23565.call(null,inst_23570);var state_23610__$1 = (function (){var statearr_23628 = state_23610;(statearr_23628[(14)] = inst_23584__$1);
return statearr_23628;
})();if(cljs.core.truth_(inst_23584__$1))
{var statearr_23629_23670 = state_23610__$1;(statearr_23629_23670[(1)] = (17));
} else
{var statearr_23630_23671 = state_23610__$1;(statearr_23630_23671[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (2)))
{var inst_23544 = (state_23610[(9)]);var inst_23547 = cljs.core.apply.call(null,cljs.core.hash_map,inst_23544);var state_23610__$1 = state_23610;var statearr_23631_23672 = state_23610__$1;(statearr_23631_23672[(2)] = inst_23547);
(statearr_23631_23672[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (23)))
{var inst_23595 = (state_23610[(2)]);var state_23610__$1 = state_23610;if(cljs.core.truth_(inst_23595))
{var statearr_23632_23673 = state_23610__$1;(statearr_23632_23673[(1)] = (24));
} else
{var statearr_23633_23674 = state_23610__$1;(statearr_23633_23674[(1)] = (25));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (19)))
{var inst_23592 = (state_23610[(2)]);var state_23610__$1 = state_23610;if(cljs.core.truth_(inst_23592))
{var statearr_23634_23675 = state_23610__$1;(statearr_23634_23675[(1)] = (20));
} else
{var statearr_23635_23676 = state_23610__$1;(statearr_23635_23676[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (11)))
{var inst_23569 = (state_23610[(8)]);var inst_23575 = (inst_23569 == null);var state_23610__$1 = state_23610;if(cljs.core.truth_(inst_23575))
{var statearr_23636_23677 = state_23610__$1;(statearr_23636_23677[(1)] = (14));
} else
{var statearr_23637_23678 = state_23610__$1;(statearr_23637_23678[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (9)))
{var inst_23562 = (state_23610[(10)]);var inst_23562__$1 = (state_23610[(2)]);var inst_23563 = cljs.core.get.call(null,inst_23562__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_23564 = cljs.core.get.call(null,inst_23562__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_23565 = cljs.core.get.call(null,inst_23562__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));var state_23610__$1 = (function (){var statearr_23638 = state_23610;(statearr_23638[(10)] = inst_23562__$1);
(statearr_23638[(17)] = inst_23564);
(statearr_23638[(16)] = inst_23565);
return statearr_23638;
})();return cljs.core.async.ioc_alts_BANG_.call(null,state_23610__$1,(10),inst_23563);
} else
{if((state_val_23611 === (5)))
{var inst_23554 = (state_23610[(7)]);var inst_23557 = cljs.core.seq_QMARK_.call(null,inst_23554);var state_23610__$1 = state_23610;if(inst_23557)
{var statearr_23639_23679 = state_23610__$1;(statearr_23639_23679[(1)] = (7));
} else
{var statearr_23640_23680 = state_23610__$1;(statearr_23640_23680[(1)] = (8));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (14)))
{var inst_23570 = (state_23610[(15)]);var inst_23577 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_23570);var state_23610__$1 = state_23610;var statearr_23641_23681 = state_23610__$1;(statearr_23641_23681[(2)] = inst_23577);
(statearr_23641_23681[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (26)))
{var inst_23600 = (state_23610[(2)]);var state_23610__$1 = state_23610;var statearr_23642_23682 = state_23610__$1;(statearr_23642_23682[(2)] = inst_23600);
(statearr_23642_23682[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (16)))
{var inst_23580 = (state_23610[(2)]);var inst_23581 = calc_state.call(null);var inst_23554 = inst_23581;var state_23610__$1 = (function (){var statearr_23643 = state_23610;(statearr_23643[(18)] = inst_23580);
(statearr_23643[(7)] = inst_23554);
return statearr_23643;
})();var statearr_23644_23683 = state_23610__$1;(statearr_23644_23683[(2)] = null);
(statearr_23644_23683[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (10)))
{var inst_23569 = (state_23610[(8)]);var inst_23570 = (state_23610[(15)]);var inst_23568 = (state_23610[(2)]);var inst_23569__$1 = cljs.core.nth.call(null,inst_23568,(0),null);var inst_23570__$1 = cljs.core.nth.call(null,inst_23568,(1),null);var inst_23571 = (inst_23569__$1 == null);var inst_23572 = cljs.core._EQ_.call(null,inst_23570__$1,change);var inst_23573 = (inst_23571) || (inst_23572);var state_23610__$1 = (function (){var statearr_23645 = state_23610;(statearr_23645[(8)] = inst_23569__$1);
(statearr_23645[(15)] = inst_23570__$1);
return statearr_23645;
})();if(cljs.core.truth_(inst_23573))
{var statearr_23646_23684 = state_23610__$1;(statearr_23646_23684[(1)] = (11));
} else
{var statearr_23647_23685 = state_23610__$1;(statearr_23647_23685[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (18)))
{var inst_23570 = (state_23610[(15)]);var inst_23564 = (state_23610[(17)]);var inst_23565 = (state_23610[(16)]);var inst_23587 = cljs.core.empty_QMARK_.call(null,inst_23565);var inst_23588 = inst_23564.call(null,inst_23570);var inst_23589 = cljs.core.not.call(null,inst_23588);var inst_23590 = (inst_23587) && (inst_23589);var state_23610__$1 = state_23610;var statearr_23648_23686 = state_23610__$1;(statearr_23648_23686[(2)] = inst_23590);
(statearr_23648_23686[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23611 === (8)))
{var inst_23554 = (state_23610[(7)]);var state_23610__$1 = state_23610;var statearr_23649_23687 = state_23610__$1;(statearr_23649_23687[(2)] = inst_23554);
(statearr_23649_23687[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___23657,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__15889__auto__,c__15945__auto___23657,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_23653 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23653[(0)] = state_machine__15890__auto__);
(statearr_23653[(1)] = (1));
return statearr_23653;
});
var state_machine__15890__auto____1 = (function (state_23610){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_23610);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e23654){if((e23654 instanceof Object))
{var ex__15893__auto__ = e23654;var statearr_23655_23688 = state_23610;(statearr_23655_23688[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23610);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e23654;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__23689 = state_23610;
state_23610 = G__23689;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_23610){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_23610);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___23657,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__15947__auto__ = (function (){var statearr_23656 = f__15946__auto__.call(null);(statearr_23656[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___23657);
return statearr_23656;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___23657,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = (function (){var obj23691 = {};return obj23691;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__12551__auto__ = p;if(and__12551__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__12551__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__13200__auto__ = (((p == null))?null:p);return (function (){var or__12563__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__12551__auto__ = p;if(and__12551__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__12551__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__13200__auto__ = (((p == null))?null:p);return (function (){var or__12563__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__12551__auto__ = p;if(and__12551__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__12551__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__13200__auto__ = (((p == null))?null:p);return (function (){var or__12563__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__12551__auto__ = p;if(and__12551__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__12551__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__13200__auto__ = (((p == null))?null:p);return (function (){var or__12563__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__13200__auto__)]);if(or__12563__auto__)
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__12563__auto____$1)
{return or__12563__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Items received when there are no matching subs get dropped.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__12563__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__12563__auto__,mults){
return (function (p1__23692_SHARP_){if(cljs.core.truth_(p1__23692_SHARP_.call(null,topic)))
{return p1__23692_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__23692_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__12563__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t23815 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t23815 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta23816){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta23816 = meta23816;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t23815.cljs$lang$type = true;
cljs.core.async.t23815.cljs$lang$ctorStr = "cljs.core.async/t23815";
cljs.core.async.t23815.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t23815");
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t23815.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t23815.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_23817){var self__ = this;
var _23817__$1 = this;return self__.meta23816;
});})(mults,ensure_mult))
;
cljs.core.async.t23815.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_23817,meta23816__$1){var self__ = this;
var _23817__$1 = this;return (new cljs.core.async.t23815(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta23816__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t23815 = ((function (mults,ensure_mult){
return (function __GT_t23815(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta23816){return (new cljs.core.async.t23815(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta23816));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t23815(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__15945__auto___23937 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___23937,mults,ensure_mult,p){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___23937,mults,ensure_mult,p){
return (function (state_23889){var state_val_23890 = (state_23889[(1)]);if((state_val_23890 === (7)))
{var inst_23885 = (state_23889[(2)]);var state_23889__$1 = state_23889;var statearr_23891_23938 = state_23889__$1;(statearr_23891_23938[(2)] = inst_23885);
(statearr_23891_23938[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (20)))
{var state_23889__$1 = state_23889;var statearr_23892_23939 = state_23889__$1;(statearr_23892_23939[(2)] = null);
(statearr_23892_23939[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (1)))
{var state_23889__$1 = state_23889;var statearr_23893_23940 = state_23889__$1;(statearr_23893_23940[(2)] = null);
(statearr_23893_23940[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (24)))
{var inst_23868 = (state_23889[(7)]);var inst_23877 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_23868);var state_23889__$1 = state_23889;var statearr_23894_23941 = state_23889__$1;(statearr_23894_23941[(2)] = inst_23877);
(statearr_23894_23941[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (4)))
{var inst_23820 = (state_23889[(8)]);var inst_23820__$1 = (state_23889[(2)]);var inst_23821 = (inst_23820__$1 == null);var state_23889__$1 = (function (){var statearr_23895 = state_23889;(statearr_23895[(8)] = inst_23820__$1);
return statearr_23895;
})();if(cljs.core.truth_(inst_23821))
{var statearr_23896_23942 = state_23889__$1;(statearr_23896_23942[(1)] = (5));
} else
{var statearr_23897_23943 = state_23889__$1;(statearr_23897_23943[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (15)))
{var inst_23862 = (state_23889[(2)]);var state_23889__$1 = state_23889;var statearr_23898_23944 = state_23889__$1;(statearr_23898_23944[(2)] = inst_23862);
(statearr_23898_23944[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (21)))
{var inst_23882 = (state_23889[(2)]);var state_23889__$1 = (function (){var statearr_23899 = state_23889;(statearr_23899[(9)] = inst_23882);
return statearr_23899;
})();var statearr_23900_23945 = state_23889__$1;(statearr_23900_23945[(2)] = null);
(statearr_23900_23945[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (13)))
{var inst_23844 = (state_23889[(10)]);var inst_23846 = cljs.core.chunked_seq_QMARK_.call(null,inst_23844);var state_23889__$1 = state_23889;if(inst_23846)
{var statearr_23901_23946 = state_23889__$1;(statearr_23901_23946[(1)] = (16));
} else
{var statearr_23902_23947 = state_23889__$1;(statearr_23902_23947[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (22)))
{var inst_23874 = (state_23889[(2)]);var state_23889__$1 = state_23889;if(cljs.core.truth_(inst_23874))
{var statearr_23903_23948 = state_23889__$1;(statearr_23903_23948[(1)] = (23));
} else
{var statearr_23904_23949 = state_23889__$1;(statearr_23904_23949[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (6)))
{var inst_23820 = (state_23889[(8)]);var inst_23868 = (state_23889[(7)]);var inst_23870 = (state_23889[(11)]);var inst_23868__$1 = topic_fn.call(null,inst_23820);var inst_23869 = cljs.core.deref.call(null,mults);var inst_23870__$1 = cljs.core.get.call(null,inst_23869,inst_23868__$1);var state_23889__$1 = (function (){var statearr_23905 = state_23889;(statearr_23905[(7)] = inst_23868__$1);
(statearr_23905[(11)] = inst_23870__$1);
return statearr_23905;
})();if(cljs.core.truth_(inst_23870__$1))
{var statearr_23906_23950 = state_23889__$1;(statearr_23906_23950[(1)] = (19));
} else
{var statearr_23907_23951 = state_23889__$1;(statearr_23907_23951[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (25)))
{var inst_23879 = (state_23889[(2)]);var state_23889__$1 = state_23889;var statearr_23908_23952 = state_23889__$1;(statearr_23908_23952[(2)] = inst_23879);
(statearr_23908_23952[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (17)))
{var inst_23844 = (state_23889[(10)]);var inst_23853 = cljs.core.first.call(null,inst_23844);var inst_23854 = cljs.core.async.muxch_STAR_.call(null,inst_23853);var inst_23855 = cljs.core.async.close_BANG_.call(null,inst_23854);var inst_23856 = cljs.core.next.call(null,inst_23844);var inst_23830 = inst_23856;var inst_23831 = null;var inst_23832 = (0);var inst_23833 = (0);var state_23889__$1 = (function (){var statearr_23909 = state_23889;(statearr_23909[(12)] = inst_23832);
(statearr_23909[(13)] = inst_23833);
(statearr_23909[(14)] = inst_23830);
(statearr_23909[(15)] = inst_23831);
(statearr_23909[(16)] = inst_23855);
return statearr_23909;
})();var statearr_23910_23953 = state_23889__$1;(statearr_23910_23953[(2)] = null);
(statearr_23910_23953[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (3)))
{var inst_23887 = (state_23889[(2)]);var state_23889__$1 = state_23889;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23889__$1,inst_23887);
} else
{if((state_val_23890 === (12)))
{var inst_23864 = (state_23889[(2)]);var state_23889__$1 = state_23889;var statearr_23911_23954 = state_23889__$1;(statearr_23911_23954[(2)] = inst_23864);
(statearr_23911_23954[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (2)))
{var state_23889__$1 = state_23889;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23889__$1,(4),ch);
} else
{if((state_val_23890 === (23)))
{var state_23889__$1 = state_23889;var statearr_23912_23955 = state_23889__$1;(statearr_23912_23955[(2)] = null);
(statearr_23912_23955[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (19)))
{var inst_23820 = (state_23889[(8)]);var inst_23870 = (state_23889[(11)]);var inst_23872 = cljs.core.async.muxch_STAR_.call(null,inst_23870);var state_23889__$1 = state_23889;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23889__$1,(22),inst_23872,inst_23820);
} else
{if((state_val_23890 === (11)))
{var inst_23830 = (state_23889[(14)]);var inst_23844 = (state_23889[(10)]);var inst_23844__$1 = cljs.core.seq.call(null,inst_23830);var state_23889__$1 = (function (){var statearr_23913 = state_23889;(statearr_23913[(10)] = inst_23844__$1);
return statearr_23913;
})();if(inst_23844__$1)
{var statearr_23914_23956 = state_23889__$1;(statearr_23914_23956[(1)] = (13));
} else
{var statearr_23915_23957 = state_23889__$1;(statearr_23915_23957[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (9)))
{var inst_23866 = (state_23889[(2)]);var state_23889__$1 = state_23889;var statearr_23916_23958 = state_23889__$1;(statearr_23916_23958[(2)] = inst_23866);
(statearr_23916_23958[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (5)))
{var inst_23827 = cljs.core.deref.call(null,mults);var inst_23828 = cljs.core.vals.call(null,inst_23827);var inst_23829 = cljs.core.seq.call(null,inst_23828);var inst_23830 = inst_23829;var inst_23831 = null;var inst_23832 = (0);var inst_23833 = (0);var state_23889__$1 = (function (){var statearr_23917 = state_23889;(statearr_23917[(12)] = inst_23832);
(statearr_23917[(13)] = inst_23833);
(statearr_23917[(14)] = inst_23830);
(statearr_23917[(15)] = inst_23831);
return statearr_23917;
})();var statearr_23918_23959 = state_23889__$1;(statearr_23918_23959[(2)] = null);
(statearr_23918_23959[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (14)))
{var state_23889__$1 = state_23889;var statearr_23922_23960 = state_23889__$1;(statearr_23922_23960[(2)] = null);
(statearr_23922_23960[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (16)))
{var inst_23844 = (state_23889[(10)]);var inst_23848 = cljs.core.chunk_first.call(null,inst_23844);var inst_23849 = cljs.core.chunk_rest.call(null,inst_23844);var inst_23850 = cljs.core.count.call(null,inst_23848);var inst_23830 = inst_23849;var inst_23831 = inst_23848;var inst_23832 = inst_23850;var inst_23833 = (0);var state_23889__$1 = (function (){var statearr_23923 = state_23889;(statearr_23923[(12)] = inst_23832);
(statearr_23923[(13)] = inst_23833);
(statearr_23923[(14)] = inst_23830);
(statearr_23923[(15)] = inst_23831);
return statearr_23923;
})();var statearr_23924_23961 = state_23889__$1;(statearr_23924_23961[(2)] = null);
(statearr_23924_23961[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (10)))
{var inst_23832 = (state_23889[(12)]);var inst_23833 = (state_23889[(13)]);var inst_23830 = (state_23889[(14)]);var inst_23831 = (state_23889[(15)]);var inst_23838 = cljs.core._nth.call(null,inst_23831,inst_23833);var inst_23839 = cljs.core.async.muxch_STAR_.call(null,inst_23838);var inst_23840 = cljs.core.async.close_BANG_.call(null,inst_23839);var inst_23841 = (inst_23833 + (1));var tmp23919 = inst_23832;var tmp23920 = inst_23830;var tmp23921 = inst_23831;var inst_23830__$1 = tmp23920;var inst_23831__$1 = tmp23921;var inst_23832__$1 = tmp23919;var inst_23833__$1 = inst_23841;var state_23889__$1 = (function (){var statearr_23925 = state_23889;(statearr_23925[(12)] = inst_23832__$1);
(statearr_23925[(17)] = inst_23840);
(statearr_23925[(13)] = inst_23833__$1);
(statearr_23925[(14)] = inst_23830__$1);
(statearr_23925[(15)] = inst_23831__$1);
return statearr_23925;
})();var statearr_23926_23962 = state_23889__$1;(statearr_23926_23962[(2)] = null);
(statearr_23926_23962[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (18)))
{var inst_23859 = (state_23889[(2)]);var state_23889__$1 = state_23889;var statearr_23927_23963 = state_23889__$1;(statearr_23927_23963[(2)] = inst_23859);
(statearr_23927_23963[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_23890 === (8)))
{var inst_23832 = (state_23889[(12)]);var inst_23833 = (state_23889[(13)]);var inst_23835 = (inst_23833 < inst_23832);var inst_23836 = inst_23835;var state_23889__$1 = state_23889;if(cljs.core.truth_(inst_23836))
{var statearr_23928_23964 = state_23889__$1;(statearr_23928_23964[(1)] = (10));
} else
{var statearr_23929_23965 = state_23889__$1;(statearr_23929_23965[(1)] = (11));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___23937,mults,ensure_mult,p))
;return ((function (switch__15889__auto__,c__15945__auto___23937,mults,ensure_mult,p){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_23933 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23933[(0)] = state_machine__15890__auto__);
(statearr_23933[(1)] = (1));
return statearr_23933;
});
var state_machine__15890__auto____1 = (function (state_23889){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_23889);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e23934){if((e23934 instanceof Object))
{var ex__15893__auto__ = e23934;var statearr_23935_23966 = state_23889;(statearr_23935_23966[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23889);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e23934;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__23967 = state_23889;
state_23889 = G__23967;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_23889){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_23889);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___23937,mults,ensure_mult,p))
})();var state__15947__auto__ = (function (){var statearr_23936 = f__15946__auto__.call(null);(statearr_23936[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___23937);
return statearr_23936;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___23937,mults,ensure_mult,p))
);
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__15945__auto___24104 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___24104,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___24104,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_24074){var state_val_24075 = (state_24074[(1)]);if((state_val_24075 === (7)))
{var state_24074__$1 = state_24074;var statearr_24076_24105 = state_24074__$1;(statearr_24076_24105[(2)] = null);
(statearr_24076_24105[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (1)))
{var state_24074__$1 = state_24074;var statearr_24077_24106 = state_24074__$1;(statearr_24077_24106[(2)] = null);
(statearr_24077_24106[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (4)))
{var inst_24038 = (state_24074[(7)]);var inst_24040 = (inst_24038 < cnt);var state_24074__$1 = state_24074;if(cljs.core.truth_(inst_24040))
{var statearr_24078_24107 = state_24074__$1;(statearr_24078_24107[(1)] = (6));
} else
{var statearr_24079_24108 = state_24074__$1;(statearr_24079_24108[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (15)))
{var inst_24070 = (state_24074[(2)]);var state_24074__$1 = state_24074;var statearr_24080_24109 = state_24074__$1;(statearr_24080_24109[(2)] = inst_24070);
(statearr_24080_24109[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (13)))
{var inst_24063 = cljs.core.async.close_BANG_.call(null,out);var state_24074__$1 = state_24074;var statearr_24081_24110 = state_24074__$1;(statearr_24081_24110[(2)] = inst_24063);
(statearr_24081_24110[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (6)))
{var state_24074__$1 = state_24074;var statearr_24082_24111 = state_24074__$1;(statearr_24082_24111[(2)] = null);
(statearr_24082_24111[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (3)))
{var inst_24072 = (state_24074[(2)]);var state_24074__$1 = state_24074;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24074__$1,inst_24072);
} else
{if((state_val_24075 === (12)))
{var inst_24060 = (state_24074[(8)]);var inst_24060__$1 = (state_24074[(2)]);var inst_24061 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_24060__$1);var state_24074__$1 = (function (){var statearr_24083 = state_24074;(statearr_24083[(8)] = inst_24060__$1);
return statearr_24083;
})();if(cljs.core.truth_(inst_24061))
{var statearr_24084_24112 = state_24074__$1;(statearr_24084_24112[(1)] = (13));
} else
{var statearr_24085_24113 = state_24074__$1;(statearr_24085_24113[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (2)))
{var inst_24037 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_24038 = (0);var state_24074__$1 = (function (){var statearr_24086 = state_24074;(statearr_24086[(9)] = inst_24037);
(statearr_24086[(7)] = inst_24038);
return statearr_24086;
})();var statearr_24087_24114 = state_24074__$1;(statearr_24087_24114[(2)] = null);
(statearr_24087_24114[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (11)))
{var inst_24038 = (state_24074[(7)]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_24074,(10),Object,null,(9));var inst_24047 = chs__$1.call(null,inst_24038);var inst_24048 = done.call(null,inst_24038);var inst_24049 = cljs.core.async.take_BANG_.call(null,inst_24047,inst_24048);var state_24074__$1 = state_24074;var statearr_24088_24115 = state_24074__$1;(statearr_24088_24115[(2)] = inst_24049);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24074__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (9)))
{var inst_24038 = (state_24074[(7)]);var inst_24051 = (state_24074[(2)]);var inst_24052 = (inst_24038 + (1));var inst_24038__$1 = inst_24052;var state_24074__$1 = (function (){var statearr_24089 = state_24074;(statearr_24089[(10)] = inst_24051);
(statearr_24089[(7)] = inst_24038__$1);
return statearr_24089;
})();var statearr_24090_24116 = state_24074__$1;(statearr_24090_24116[(2)] = null);
(statearr_24090_24116[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (5)))
{var inst_24058 = (state_24074[(2)]);var state_24074__$1 = (function (){var statearr_24091 = state_24074;(statearr_24091[(11)] = inst_24058);
return statearr_24091;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24074__$1,(12),dchan);
} else
{if((state_val_24075 === (14)))
{var inst_24060 = (state_24074[(8)]);var inst_24065 = cljs.core.apply.call(null,f,inst_24060);var state_24074__$1 = state_24074;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24074__$1,(16),out,inst_24065);
} else
{if((state_val_24075 === (16)))
{var inst_24067 = (state_24074[(2)]);var state_24074__$1 = (function (){var statearr_24092 = state_24074;(statearr_24092[(12)] = inst_24067);
return statearr_24092;
})();var statearr_24093_24117 = state_24074__$1;(statearr_24093_24117[(2)] = null);
(statearr_24093_24117[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (10)))
{var inst_24042 = (state_24074[(2)]);var inst_24043 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_24074__$1 = (function (){var statearr_24094 = state_24074;(statearr_24094[(13)] = inst_24042);
return statearr_24094;
})();var statearr_24095_24118 = state_24074__$1;(statearr_24095_24118[(2)] = inst_24043);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24074__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24075 === (8)))
{var inst_24056 = (state_24074[(2)]);var state_24074__$1 = state_24074;var statearr_24096_24119 = state_24074__$1;(statearr_24096_24119[(2)] = inst_24056);
(statearr_24096_24119[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___24104,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__15889__auto__,c__15945__auto___24104,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24100 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24100[(0)] = state_machine__15890__auto__);
(statearr_24100[(1)] = (1));
return statearr_24100;
});
var state_machine__15890__auto____1 = (function (state_24074){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24074);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24101){if((e24101 instanceof Object))
{var ex__15893__auto__ = e24101;var statearr_24102_24120 = state_24074;(statearr_24102_24120[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24074);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24101;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24121 = state_24074;
state_24074 = G__24121;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24074){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24074);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___24104,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__15947__auto__ = (function (){var statearr_24103 = f__15946__auto__.call(null);(statearr_24103[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___24104);
return statearr_24103;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___24104,chs__$1,out,cnt,rets,dchan,dctr,done))
);
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__15945__auto___24229 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___24229,out){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___24229,out){
return (function (state_24205){var state_val_24206 = (state_24205[(1)]);if((state_val_24206 === (7)))
{var inst_24185 = (state_24205[(7)]);var inst_24184 = (state_24205[(8)]);var inst_24184__$1 = (state_24205[(2)]);var inst_24185__$1 = cljs.core.nth.call(null,inst_24184__$1,(0),null);var inst_24186 = cljs.core.nth.call(null,inst_24184__$1,(1),null);var inst_24187 = (inst_24185__$1 == null);var state_24205__$1 = (function (){var statearr_24207 = state_24205;(statearr_24207[(7)] = inst_24185__$1);
(statearr_24207[(8)] = inst_24184__$1);
(statearr_24207[(9)] = inst_24186);
return statearr_24207;
})();if(cljs.core.truth_(inst_24187))
{var statearr_24208_24230 = state_24205__$1;(statearr_24208_24230[(1)] = (8));
} else
{var statearr_24209_24231 = state_24205__$1;(statearr_24209_24231[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (1)))
{var inst_24176 = cljs.core.vec.call(null,chs);var inst_24177 = inst_24176;var state_24205__$1 = (function (){var statearr_24210 = state_24205;(statearr_24210[(10)] = inst_24177);
return statearr_24210;
})();var statearr_24211_24232 = state_24205__$1;(statearr_24211_24232[(2)] = null);
(statearr_24211_24232[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (4)))
{var inst_24177 = (state_24205[(10)]);var state_24205__$1 = state_24205;return cljs.core.async.ioc_alts_BANG_.call(null,state_24205__$1,(7),inst_24177);
} else
{if((state_val_24206 === (6)))
{var inst_24201 = (state_24205[(2)]);var state_24205__$1 = state_24205;var statearr_24212_24233 = state_24205__$1;(statearr_24212_24233[(2)] = inst_24201);
(statearr_24212_24233[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (3)))
{var inst_24203 = (state_24205[(2)]);var state_24205__$1 = state_24205;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24205__$1,inst_24203);
} else
{if((state_val_24206 === (2)))
{var inst_24177 = (state_24205[(10)]);var inst_24179 = cljs.core.count.call(null,inst_24177);var inst_24180 = (inst_24179 > (0));var state_24205__$1 = state_24205;if(cljs.core.truth_(inst_24180))
{var statearr_24214_24234 = state_24205__$1;(statearr_24214_24234[(1)] = (4));
} else
{var statearr_24215_24235 = state_24205__$1;(statearr_24215_24235[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (11)))
{var inst_24177 = (state_24205[(10)]);var inst_24194 = (state_24205[(2)]);var tmp24213 = inst_24177;var inst_24177__$1 = tmp24213;var state_24205__$1 = (function (){var statearr_24216 = state_24205;(statearr_24216[(10)] = inst_24177__$1);
(statearr_24216[(11)] = inst_24194);
return statearr_24216;
})();var statearr_24217_24236 = state_24205__$1;(statearr_24217_24236[(2)] = null);
(statearr_24217_24236[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (9)))
{var inst_24185 = (state_24205[(7)]);var state_24205__$1 = state_24205;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24205__$1,(11),out,inst_24185);
} else
{if((state_val_24206 === (5)))
{var inst_24199 = cljs.core.async.close_BANG_.call(null,out);var state_24205__$1 = state_24205;var statearr_24218_24237 = state_24205__$1;(statearr_24218_24237[(2)] = inst_24199);
(statearr_24218_24237[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (10)))
{var inst_24197 = (state_24205[(2)]);var state_24205__$1 = state_24205;var statearr_24219_24238 = state_24205__$1;(statearr_24219_24238[(2)] = inst_24197);
(statearr_24219_24238[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24206 === (8)))
{var inst_24177 = (state_24205[(10)]);var inst_24185 = (state_24205[(7)]);var inst_24184 = (state_24205[(8)]);var inst_24186 = (state_24205[(9)]);var inst_24189 = (function (){var c = inst_24186;var v = inst_24185;var vec__24182 = inst_24184;var cs = inst_24177;return ((function (c,v,vec__24182,cs,inst_24177,inst_24185,inst_24184,inst_24186,state_val_24206,c__15945__auto___24229,out){
return (function (p1__24122_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__24122_SHARP_);
});
;})(c,v,vec__24182,cs,inst_24177,inst_24185,inst_24184,inst_24186,state_val_24206,c__15945__auto___24229,out))
})();var inst_24190 = cljs.core.filterv.call(null,inst_24189,inst_24177);var inst_24177__$1 = inst_24190;var state_24205__$1 = (function (){var statearr_24220 = state_24205;(statearr_24220[(10)] = inst_24177__$1);
return statearr_24220;
})();var statearr_24221_24239 = state_24205__$1;(statearr_24221_24239[(2)] = null);
(statearr_24221_24239[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___24229,out))
;return ((function (switch__15889__auto__,c__15945__auto___24229,out){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24225 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24225[(0)] = state_machine__15890__auto__);
(statearr_24225[(1)] = (1));
return statearr_24225;
});
var state_machine__15890__auto____1 = (function (state_24205){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24205);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24226){if((e24226 instanceof Object))
{var ex__15893__auto__ = e24226;var statearr_24227_24240 = state_24205;(statearr_24227_24240[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24205);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24226;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24241 = state_24205;
state_24205 = G__24241;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24205){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___24229,out))
})();var state__15947__auto__ = (function (){var statearr_24228 = f__15946__auto__.call(null);(statearr_24228[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___24229);
return statearr_24228;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___24229,out))
);
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__15945__auto___24334 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___24334,out){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___24334,out){
return (function (state_24311){var state_val_24312 = (state_24311[(1)]);if((state_val_24312 === (7)))
{var inst_24293 = (state_24311[(7)]);var inst_24293__$1 = (state_24311[(2)]);var inst_24294 = (inst_24293__$1 == null);var inst_24295 = cljs.core.not.call(null,inst_24294);var state_24311__$1 = (function (){var statearr_24313 = state_24311;(statearr_24313[(7)] = inst_24293__$1);
return statearr_24313;
})();if(inst_24295)
{var statearr_24314_24335 = state_24311__$1;(statearr_24314_24335[(1)] = (8));
} else
{var statearr_24315_24336 = state_24311__$1;(statearr_24315_24336[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (1)))
{var inst_24288 = (0);var state_24311__$1 = (function (){var statearr_24316 = state_24311;(statearr_24316[(8)] = inst_24288);
return statearr_24316;
})();var statearr_24317_24337 = state_24311__$1;(statearr_24317_24337[(2)] = null);
(statearr_24317_24337[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (4)))
{var state_24311__$1 = state_24311;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24311__$1,(7),ch);
} else
{if((state_val_24312 === (6)))
{var inst_24306 = (state_24311[(2)]);var state_24311__$1 = state_24311;var statearr_24318_24338 = state_24311__$1;(statearr_24318_24338[(2)] = inst_24306);
(statearr_24318_24338[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (3)))
{var inst_24308 = (state_24311[(2)]);var inst_24309 = cljs.core.async.close_BANG_.call(null,out);var state_24311__$1 = (function (){var statearr_24319 = state_24311;(statearr_24319[(9)] = inst_24308);
return statearr_24319;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24311__$1,inst_24309);
} else
{if((state_val_24312 === (2)))
{var inst_24288 = (state_24311[(8)]);var inst_24290 = (inst_24288 < n);var state_24311__$1 = state_24311;if(cljs.core.truth_(inst_24290))
{var statearr_24320_24339 = state_24311__$1;(statearr_24320_24339[(1)] = (4));
} else
{var statearr_24321_24340 = state_24311__$1;(statearr_24321_24340[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (11)))
{var inst_24288 = (state_24311[(8)]);var inst_24298 = (state_24311[(2)]);var inst_24299 = (inst_24288 + (1));var inst_24288__$1 = inst_24299;var state_24311__$1 = (function (){var statearr_24322 = state_24311;(statearr_24322[(8)] = inst_24288__$1);
(statearr_24322[(10)] = inst_24298);
return statearr_24322;
})();var statearr_24323_24341 = state_24311__$1;(statearr_24323_24341[(2)] = null);
(statearr_24323_24341[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (9)))
{var state_24311__$1 = state_24311;var statearr_24324_24342 = state_24311__$1;(statearr_24324_24342[(2)] = null);
(statearr_24324_24342[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (5)))
{var state_24311__$1 = state_24311;var statearr_24325_24343 = state_24311__$1;(statearr_24325_24343[(2)] = null);
(statearr_24325_24343[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (10)))
{var inst_24303 = (state_24311[(2)]);var state_24311__$1 = state_24311;var statearr_24326_24344 = state_24311__$1;(statearr_24326_24344[(2)] = inst_24303);
(statearr_24326_24344[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24312 === (8)))
{var inst_24293 = (state_24311[(7)]);var state_24311__$1 = state_24311;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24311__$1,(11),out,inst_24293);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___24334,out))
;return ((function (switch__15889__auto__,c__15945__auto___24334,out){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24330 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_24330[(0)] = state_machine__15890__auto__);
(statearr_24330[(1)] = (1));
return statearr_24330;
});
var state_machine__15890__auto____1 = (function (state_24311){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24311);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24331){if((e24331 instanceof Object))
{var ex__15893__auto__ = e24331;var statearr_24332_24345 = state_24311;(statearr_24332_24345[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24311);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24331;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24346 = state_24311;
state_24311 = G__24346;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24311){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24311);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___24334,out))
})();var state__15947__auto__ = (function (){var statearr_24333 = f__15946__auto__.call(null);(statearr_24333[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___24334);
return statearr_24333;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___24334,out))
);
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t24354 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t24354 = (function (ch,f,map_LT_,meta24355){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta24355 = meta24355;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t24354.cljs$lang$type = true;
cljs.core.async.t24354.cljs$lang$ctorStr = "cljs.core.async/t24354";
cljs.core.async.t24354.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t24354");
});
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t24357 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t24357 = (function (fn1,_,meta24355,ch,f,map_LT_,meta24358){
this.fn1 = fn1;
this._ = _;
this.meta24355 = meta24355;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta24358 = meta24358;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t24357.cljs$lang$type = true;
cljs.core.async.t24357.cljs$lang$ctorStr = "cljs.core.async/t24357";
cljs.core.async.t24357.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t24357");
});})(___$1))
;
cljs.core.async.t24357.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t24357.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t24357.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__24347_SHARP_){return f1.call(null,(((p1__24347_SHARP_ == null))?null:self__.f.call(null,p1__24347_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t24357.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_24359){var self__ = this;
var _24359__$1 = this;return self__.meta24358;
});})(___$1))
;
cljs.core.async.t24357.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_24359,meta24358__$1){var self__ = this;
var _24359__$1 = this;return (new cljs.core.async.t24357(self__.fn1,self__._,self__.meta24355,self__.ch,self__.f,self__.map_LT_,meta24358__$1));
});})(___$1))
;
cljs.core.async.__GT_t24357 = ((function (___$1){
return (function __GT_t24357(fn1__$1,___$2,meta24355__$1,ch__$2,f__$2,map_LT___$2,meta24358){return (new cljs.core.async.t24357(fn1__$1,___$2,meta24355__$1,ch__$2,f__$2,map_LT___$2,meta24358));
});})(___$1))
;
}
return (new cljs.core.async.t24357(fn1,___$1,self__.meta24355,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__12551__auto__ = ret;if(cljs.core.truth_(and__12551__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__12551__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t24354.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t24354.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24356){var self__ = this;
var _24356__$1 = this;return self__.meta24355;
});
cljs.core.async.t24354.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24356,meta24355__$1){var self__ = this;
var _24356__$1 = this;return (new cljs.core.async.t24354(self__.ch,self__.f,self__.map_LT_,meta24355__$1));
});
cljs.core.async.__GT_t24354 = (function __GT_t24354(ch__$1,f__$1,map_LT___$1,meta24355){return (new cljs.core.async.t24354(ch__$1,f__$1,map_LT___$1,meta24355));
});
}
return (new cljs.core.async.t24354(ch,f,map_LT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t24363 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t24363 = (function (ch,f,map_GT_,meta24364){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta24364 = meta24364;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t24363.cljs$lang$type = true;
cljs.core.async.t24363.cljs$lang$ctorStr = "cljs.core.async/t24363";
cljs.core.async.t24363.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t24363");
});
cljs.core.async.t24363.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t24363.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});
cljs.core.async.t24363.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t24363.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t24363.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t24363.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t24363.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24365){var self__ = this;
var _24365__$1 = this;return self__.meta24364;
});
cljs.core.async.t24363.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24365,meta24364__$1){var self__ = this;
var _24365__$1 = this;return (new cljs.core.async.t24363(self__.ch,self__.f,self__.map_GT_,meta24364__$1));
});
cljs.core.async.__GT_t24363 = (function __GT_t24363(ch__$1,f__$1,map_GT___$1,meta24364){return (new cljs.core.async.t24363(ch__$1,f__$1,map_GT___$1,meta24364));
});
}
return (new cljs.core.async.t24363(ch,f,map_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t24369 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t24369 = (function (ch,p,filter_GT_,meta24370){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta24370 = meta24370;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t24369.cljs$lang$type = true;
cljs.core.async.t24369.cljs$lang$ctorStr = "cljs.core.async/t24369";
cljs.core.async.t24369.cljs$lang$ctorPrWriter = (function (this__13140__auto__,writer__13141__auto__,opt__13142__auto__){return cljs.core._write.call(null,writer__13141__auto__,"cljs.core.async/t24369");
});
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else
{return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t24369.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t24369.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24371){var self__ = this;
var _24371__$1 = this;return self__.meta24370;
});
cljs.core.async.t24369.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24371,meta24370__$1){var self__ = this;
var _24371__$1 = this;return (new cljs.core.async.t24369(self__.ch,self__.p,self__.filter_GT_,meta24370__$1));
});
cljs.core.async.__GT_t24369 = (function __GT_t24369(ch__$1,p__$1,filter_GT___$1,meta24370){return (new cljs.core.async.t24369(ch__$1,p__$1,filter_GT___$1,meta24370));
});
}
return (new cljs.core.async.t24369(ch,p,filter_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__15945__auto___24454 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___24454,out){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___24454,out){
return (function (state_24433){var state_val_24434 = (state_24433[(1)]);if((state_val_24434 === (7)))
{var inst_24429 = (state_24433[(2)]);var state_24433__$1 = state_24433;var statearr_24435_24455 = state_24433__$1;(statearr_24435_24455[(2)] = inst_24429);
(statearr_24435_24455[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (1)))
{var state_24433__$1 = state_24433;var statearr_24436_24456 = state_24433__$1;(statearr_24436_24456[(2)] = null);
(statearr_24436_24456[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (4)))
{var inst_24415 = (state_24433[(7)]);var inst_24415__$1 = (state_24433[(2)]);var inst_24416 = (inst_24415__$1 == null);var state_24433__$1 = (function (){var statearr_24437 = state_24433;(statearr_24437[(7)] = inst_24415__$1);
return statearr_24437;
})();if(cljs.core.truth_(inst_24416))
{var statearr_24438_24457 = state_24433__$1;(statearr_24438_24457[(1)] = (5));
} else
{var statearr_24439_24458 = state_24433__$1;(statearr_24439_24458[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (6)))
{var inst_24415 = (state_24433[(7)]);var inst_24420 = p.call(null,inst_24415);var state_24433__$1 = state_24433;if(cljs.core.truth_(inst_24420))
{var statearr_24440_24459 = state_24433__$1;(statearr_24440_24459[(1)] = (8));
} else
{var statearr_24441_24460 = state_24433__$1;(statearr_24441_24460[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (3)))
{var inst_24431 = (state_24433[(2)]);var state_24433__$1 = state_24433;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24433__$1,inst_24431);
} else
{if((state_val_24434 === (2)))
{var state_24433__$1 = state_24433;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24433__$1,(4),ch);
} else
{if((state_val_24434 === (11)))
{var inst_24423 = (state_24433[(2)]);var state_24433__$1 = state_24433;var statearr_24442_24461 = state_24433__$1;(statearr_24442_24461[(2)] = inst_24423);
(statearr_24442_24461[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (9)))
{var state_24433__$1 = state_24433;var statearr_24443_24462 = state_24433__$1;(statearr_24443_24462[(2)] = null);
(statearr_24443_24462[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (5)))
{var inst_24418 = cljs.core.async.close_BANG_.call(null,out);var state_24433__$1 = state_24433;var statearr_24444_24463 = state_24433__$1;(statearr_24444_24463[(2)] = inst_24418);
(statearr_24444_24463[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (10)))
{var inst_24426 = (state_24433[(2)]);var state_24433__$1 = (function (){var statearr_24445 = state_24433;(statearr_24445[(8)] = inst_24426);
return statearr_24445;
})();var statearr_24446_24464 = state_24433__$1;(statearr_24446_24464[(2)] = null);
(statearr_24446_24464[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24434 === (8)))
{var inst_24415 = (state_24433[(7)]);var state_24433__$1 = state_24433;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24433__$1,(11),out,inst_24415);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___24454,out))
;return ((function (switch__15889__auto__,c__15945__auto___24454,out){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24450 = [null,null,null,null,null,null,null,null,null];(statearr_24450[(0)] = state_machine__15890__auto__);
(statearr_24450[(1)] = (1));
return statearr_24450;
});
var state_machine__15890__auto____1 = (function (state_24433){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24433);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24451){if((e24451 instanceof Object))
{var ex__15893__auto__ = e24451;var statearr_24452_24465 = state_24433;(statearr_24452_24465[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24433);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24451;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24466 = state_24433;
state_24433 = G__24466;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24433){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24433);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___24454,out))
})();var state__15947__auto__ = (function (){var statearr_24453 = f__15946__auto__.call(null);(statearr_24453[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___24454);
return statearr_24453;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___24454,out))
);
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_24632){var state_val_24633 = (state_24632[(1)]);if((state_val_24633 === (7)))
{var inst_24628 = (state_24632[(2)]);var state_24632__$1 = state_24632;var statearr_24634_24675 = state_24632__$1;(statearr_24634_24675[(2)] = inst_24628);
(statearr_24634_24675[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (20)))
{var inst_24598 = (state_24632[(7)]);var inst_24609 = (state_24632[(2)]);var inst_24610 = cljs.core.next.call(null,inst_24598);var inst_24584 = inst_24610;var inst_24585 = null;var inst_24586 = (0);var inst_24587 = (0);var state_24632__$1 = (function (){var statearr_24635 = state_24632;(statearr_24635[(8)] = inst_24586);
(statearr_24635[(9)] = inst_24609);
(statearr_24635[(10)] = inst_24585);
(statearr_24635[(11)] = inst_24587);
(statearr_24635[(12)] = inst_24584);
return statearr_24635;
})();var statearr_24636_24676 = state_24632__$1;(statearr_24636_24676[(2)] = null);
(statearr_24636_24676[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (1)))
{var state_24632__$1 = state_24632;var statearr_24637_24677 = state_24632__$1;(statearr_24637_24677[(2)] = null);
(statearr_24637_24677[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (4)))
{var inst_24573 = (state_24632[(13)]);var inst_24573__$1 = (state_24632[(2)]);var inst_24574 = (inst_24573__$1 == null);var state_24632__$1 = (function (){var statearr_24638 = state_24632;(statearr_24638[(13)] = inst_24573__$1);
return statearr_24638;
})();if(cljs.core.truth_(inst_24574))
{var statearr_24639_24678 = state_24632__$1;(statearr_24639_24678[(1)] = (5));
} else
{var statearr_24640_24679 = state_24632__$1;(statearr_24640_24679[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (15)))
{var state_24632__$1 = state_24632;var statearr_24644_24680 = state_24632__$1;(statearr_24644_24680[(2)] = null);
(statearr_24644_24680[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (21)))
{var state_24632__$1 = state_24632;var statearr_24645_24681 = state_24632__$1;(statearr_24645_24681[(2)] = null);
(statearr_24645_24681[(1)] = (23));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (13)))
{var inst_24586 = (state_24632[(8)]);var inst_24585 = (state_24632[(10)]);var inst_24587 = (state_24632[(11)]);var inst_24584 = (state_24632[(12)]);var inst_24594 = (state_24632[(2)]);var inst_24595 = (inst_24587 + (1));var tmp24641 = inst_24586;var tmp24642 = inst_24585;var tmp24643 = inst_24584;var inst_24584__$1 = tmp24643;var inst_24585__$1 = tmp24642;var inst_24586__$1 = tmp24641;var inst_24587__$1 = inst_24595;var state_24632__$1 = (function (){var statearr_24646 = state_24632;(statearr_24646[(8)] = inst_24586__$1);
(statearr_24646[(14)] = inst_24594);
(statearr_24646[(10)] = inst_24585__$1);
(statearr_24646[(11)] = inst_24587__$1);
(statearr_24646[(12)] = inst_24584__$1);
return statearr_24646;
})();var statearr_24647_24682 = state_24632__$1;(statearr_24647_24682[(2)] = null);
(statearr_24647_24682[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (22)))
{var state_24632__$1 = state_24632;var statearr_24648_24683 = state_24632__$1;(statearr_24648_24683[(2)] = null);
(statearr_24648_24683[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (6)))
{var inst_24573 = (state_24632[(13)]);var inst_24582 = f.call(null,inst_24573);var inst_24583 = cljs.core.seq.call(null,inst_24582);var inst_24584 = inst_24583;var inst_24585 = null;var inst_24586 = (0);var inst_24587 = (0);var state_24632__$1 = (function (){var statearr_24649 = state_24632;(statearr_24649[(8)] = inst_24586);
(statearr_24649[(10)] = inst_24585);
(statearr_24649[(11)] = inst_24587);
(statearr_24649[(12)] = inst_24584);
return statearr_24649;
})();var statearr_24650_24684 = state_24632__$1;(statearr_24650_24684[(2)] = null);
(statearr_24650_24684[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (17)))
{var inst_24598 = (state_24632[(7)]);var inst_24602 = cljs.core.chunk_first.call(null,inst_24598);var inst_24603 = cljs.core.chunk_rest.call(null,inst_24598);var inst_24604 = cljs.core.count.call(null,inst_24602);var inst_24584 = inst_24603;var inst_24585 = inst_24602;var inst_24586 = inst_24604;var inst_24587 = (0);var state_24632__$1 = (function (){var statearr_24651 = state_24632;(statearr_24651[(8)] = inst_24586);
(statearr_24651[(10)] = inst_24585);
(statearr_24651[(11)] = inst_24587);
(statearr_24651[(12)] = inst_24584);
return statearr_24651;
})();var statearr_24652_24685 = state_24632__$1;(statearr_24652_24685[(2)] = null);
(statearr_24652_24685[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (3)))
{var inst_24630 = (state_24632[(2)]);var state_24632__$1 = state_24632;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24632__$1,inst_24630);
} else
{if((state_val_24633 === (12)))
{var inst_24618 = (state_24632[(2)]);var state_24632__$1 = state_24632;var statearr_24653_24686 = state_24632__$1;(statearr_24653_24686[(2)] = inst_24618);
(statearr_24653_24686[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (2)))
{var state_24632__$1 = state_24632;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24632__$1,(4),in$);
} else
{if((state_val_24633 === (23)))
{var inst_24626 = (state_24632[(2)]);var state_24632__$1 = state_24632;var statearr_24654_24687 = state_24632__$1;(statearr_24654_24687[(2)] = inst_24626);
(statearr_24654_24687[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (19)))
{var inst_24613 = (state_24632[(2)]);var state_24632__$1 = state_24632;var statearr_24655_24688 = state_24632__$1;(statearr_24655_24688[(2)] = inst_24613);
(statearr_24655_24688[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (11)))
{var inst_24598 = (state_24632[(7)]);var inst_24584 = (state_24632[(12)]);var inst_24598__$1 = cljs.core.seq.call(null,inst_24584);var state_24632__$1 = (function (){var statearr_24656 = state_24632;(statearr_24656[(7)] = inst_24598__$1);
return statearr_24656;
})();if(inst_24598__$1)
{var statearr_24657_24689 = state_24632__$1;(statearr_24657_24689[(1)] = (14));
} else
{var statearr_24658_24690 = state_24632__$1;(statearr_24658_24690[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (9)))
{var inst_24620 = (state_24632[(2)]);var inst_24621 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);var state_24632__$1 = (function (){var statearr_24659 = state_24632;(statearr_24659[(15)] = inst_24620);
return statearr_24659;
})();if(cljs.core.truth_(inst_24621))
{var statearr_24660_24691 = state_24632__$1;(statearr_24660_24691[(1)] = (21));
} else
{var statearr_24661_24692 = state_24632__$1;(statearr_24661_24692[(1)] = (22));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (5)))
{var inst_24576 = cljs.core.async.close_BANG_.call(null,out);var state_24632__$1 = state_24632;var statearr_24662_24693 = state_24632__$1;(statearr_24662_24693[(2)] = inst_24576);
(statearr_24662_24693[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (14)))
{var inst_24598 = (state_24632[(7)]);var inst_24600 = cljs.core.chunked_seq_QMARK_.call(null,inst_24598);var state_24632__$1 = state_24632;if(inst_24600)
{var statearr_24663_24694 = state_24632__$1;(statearr_24663_24694[(1)] = (17));
} else
{var statearr_24664_24695 = state_24632__$1;(statearr_24664_24695[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (16)))
{var inst_24616 = (state_24632[(2)]);var state_24632__$1 = state_24632;var statearr_24665_24696 = state_24632__$1;(statearr_24665_24696[(2)] = inst_24616);
(statearr_24665_24696[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24633 === (10)))
{var inst_24585 = (state_24632[(10)]);var inst_24587 = (state_24632[(11)]);var inst_24592 = cljs.core._nth.call(null,inst_24585,inst_24587);var state_24632__$1 = state_24632;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24632__$1,(13),out,inst_24592);
} else
{if((state_val_24633 === (18)))
{var inst_24598 = (state_24632[(7)]);var inst_24607 = cljs.core.first.call(null,inst_24598);var state_24632__$1 = state_24632;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24632__$1,(20),out,inst_24607);
} else
{if((state_val_24633 === (8)))
{var inst_24586 = (state_24632[(8)]);var inst_24587 = (state_24632[(11)]);var inst_24589 = (inst_24587 < inst_24586);var inst_24590 = inst_24589;var state_24632__$1 = state_24632;if(cljs.core.truth_(inst_24590))
{var statearr_24666_24697 = state_24632__$1;(statearr_24666_24697[(1)] = (10));
} else
{var statearr_24667_24698 = state_24632__$1;(statearr_24667_24698[(1)] = (11));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24671 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24671[(0)] = state_machine__15890__auto__);
(statearr_24671[(1)] = (1));
return statearr_24671;
});
var state_machine__15890__auto____1 = (function (state_24632){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24632);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24672){if((e24672 instanceof Object))
{var ex__15893__auto__ = e24672;var statearr_24673_24699 = state_24632;(statearr_24673_24699[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24632);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24672;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24700 = state_24632;
state_24632 = G__24700;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24632){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24632);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_24674 = f__15946__auto__.call(null);(statearr_24674[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_24674;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__15945__auto___24797 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___24797,out){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___24797,out){
return (function (state_24772){var state_val_24773 = (state_24772[(1)]);if((state_val_24773 === (7)))
{var inst_24767 = (state_24772[(2)]);var state_24772__$1 = state_24772;var statearr_24774_24798 = state_24772__$1;(statearr_24774_24798[(2)] = inst_24767);
(statearr_24774_24798[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (1)))
{var inst_24749 = null;var state_24772__$1 = (function (){var statearr_24775 = state_24772;(statearr_24775[(7)] = inst_24749);
return statearr_24775;
})();var statearr_24776_24799 = state_24772__$1;(statearr_24776_24799[(2)] = null);
(statearr_24776_24799[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (4)))
{var inst_24752 = (state_24772[(8)]);var inst_24752__$1 = (state_24772[(2)]);var inst_24753 = (inst_24752__$1 == null);var inst_24754 = cljs.core.not.call(null,inst_24753);var state_24772__$1 = (function (){var statearr_24777 = state_24772;(statearr_24777[(8)] = inst_24752__$1);
return statearr_24777;
})();if(inst_24754)
{var statearr_24778_24800 = state_24772__$1;(statearr_24778_24800[(1)] = (5));
} else
{var statearr_24779_24801 = state_24772__$1;(statearr_24779_24801[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (6)))
{var state_24772__$1 = state_24772;var statearr_24780_24802 = state_24772__$1;(statearr_24780_24802[(2)] = null);
(statearr_24780_24802[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (3)))
{var inst_24769 = (state_24772[(2)]);var inst_24770 = cljs.core.async.close_BANG_.call(null,out);var state_24772__$1 = (function (){var statearr_24781 = state_24772;(statearr_24781[(9)] = inst_24769);
return statearr_24781;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24772__$1,inst_24770);
} else
{if((state_val_24773 === (2)))
{var state_24772__$1 = state_24772;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24772__$1,(4),ch);
} else
{if((state_val_24773 === (11)))
{var inst_24752 = (state_24772[(8)]);var inst_24761 = (state_24772[(2)]);var inst_24749 = inst_24752;var state_24772__$1 = (function (){var statearr_24782 = state_24772;(statearr_24782[(7)] = inst_24749);
(statearr_24782[(10)] = inst_24761);
return statearr_24782;
})();var statearr_24783_24803 = state_24772__$1;(statearr_24783_24803[(2)] = null);
(statearr_24783_24803[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (9)))
{var inst_24752 = (state_24772[(8)]);var state_24772__$1 = state_24772;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24772__$1,(11),out,inst_24752);
} else
{if((state_val_24773 === (5)))
{var inst_24752 = (state_24772[(8)]);var inst_24749 = (state_24772[(7)]);var inst_24756 = cljs.core._EQ_.call(null,inst_24752,inst_24749);var state_24772__$1 = state_24772;if(inst_24756)
{var statearr_24785_24804 = state_24772__$1;(statearr_24785_24804[(1)] = (8));
} else
{var statearr_24786_24805 = state_24772__$1;(statearr_24786_24805[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (10)))
{var inst_24764 = (state_24772[(2)]);var state_24772__$1 = state_24772;var statearr_24787_24806 = state_24772__$1;(statearr_24787_24806[(2)] = inst_24764);
(statearr_24787_24806[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24773 === (8)))
{var inst_24749 = (state_24772[(7)]);var tmp24784 = inst_24749;var inst_24749__$1 = tmp24784;var state_24772__$1 = (function (){var statearr_24788 = state_24772;(statearr_24788[(7)] = inst_24749__$1);
return statearr_24788;
})();var statearr_24789_24807 = state_24772__$1;(statearr_24789_24807[(2)] = null);
(statearr_24789_24807[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___24797,out))
;return ((function (switch__15889__auto__,c__15945__auto___24797,out){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24793 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_24793[(0)] = state_machine__15890__auto__);
(statearr_24793[(1)] = (1));
return statearr_24793;
});
var state_machine__15890__auto____1 = (function (state_24772){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24772);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24794){if((e24794 instanceof Object))
{var ex__15893__auto__ = e24794;var statearr_24795_24808 = state_24772;(statearr_24795_24808[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24772);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24794;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24809 = state_24772;
state_24772 = G__24809;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24772){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24772);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___24797,out))
})();var state__15947__auto__ = (function (){var statearr_24796 = f__15946__auto__.call(null);(statearr_24796[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___24797);
return statearr_24796;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___24797,out))
);
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__15945__auto___24944 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___24944,out){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___24944,out){
return (function (state_24914){var state_val_24915 = (state_24914[(1)]);if((state_val_24915 === (7)))
{var inst_24910 = (state_24914[(2)]);var state_24914__$1 = state_24914;var statearr_24916_24945 = state_24914__$1;(statearr_24916_24945[(2)] = inst_24910);
(statearr_24916_24945[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (1)))
{var inst_24877 = (new Array(n));var inst_24878 = inst_24877;var inst_24879 = (0);var state_24914__$1 = (function (){var statearr_24917 = state_24914;(statearr_24917[(7)] = inst_24879);
(statearr_24917[(8)] = inst_24878);
return statearr_24917;
})();var statearr_24918_24946 = state_24914__$1;(statearr_24918_24946[(2)] = null);
(statearr_24918_24946[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (4)))
{var inst_24882 = (state_24914[(9)]);var inst_24882__$1 = (state_24914[(2)]);var inst_24883 = (inst_24882__$1 == null);var inst_24884 = cljs.core.not.call(null,inst_24883);var state_24914__$1 = (function (){var statearr_24919 = state_24914;(statearr_24919[(9)] = inst_24882__$1);
return statearr_24919;
})();if(inst_24884)
{var statearr_24920_24947 = state_24914__$1;(statearr_24920_24947[(1)] = (5));
} else
{var statearr_24921_24948 = state_24914__$1;(statearr_24921_24948[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (15)))
{var inst_24904 = (state_24914[(2)]);var state_24914__$1 = state_24914;var statearr_24922_24949 = state_24914__$1;(statearr_24922_24949[(2)] = inst_24904);
(statearr_24922_24949[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (13)))
{var state_24914__$1 = state_24914;var statearr_24923_24950 = state_24914__$1;(statearr_24923_24950[(2)] = null);
(statearr_24923_24950[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (6)))
{var inst_24879 = (state_24914[(7)]);var inst_24900 = (inst_24879 > (0));var state_24914__$1 = state_24914;if(cljs.core.truth_(inst_24900))
{var statearr_24924_24951 = state_24914__$1;(statearr_24924_24951[(1)] = (12));
} else
{var statearr_24925_24952 = state_24914__$1;(statearr_24925_24952[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (3)))
{var inst_24912 = (state_24914[(2)]);var state_24914__$1 = state_24914;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24914__$1,inst_24912);
} else
{if((state_val_24915 === (12)))
{var inst_24878 = (state_24914[(8)]);var inst_24902 = cljs.core.vec.call(null,inst_24878);var state_24914__$1 = state_24914;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24914__$1,(15),out,inst_24902);
} else
{if((state_val_24915 === (2)))
{var state_24914__$1 = state_24914;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24914__$1,(4),ch);
} else
{if((state_val_24915 === (11)))
{var inst_24894 = (state_24914[(2)]);var inst_24895 = (new Array(n));var inst_24878 = inst_24895;var inst_24879 = (0);var state_24914__$1 = (function (){var statearr_24926 = state_24914;(statearr_24926[(10)] = inst_24894);
(statearr_24926[(7)] = inst_24879);
(statearr_24926[(8)] = inst_24878);
return statearr_24926;
})();var statearr_24927_24953 = state_24914__$1;(statearr_24927_24953[(2)] = null);
(statearr_24927_24953[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (9)))
{var inst_24878 = (state_24914[(8)]);var inst_24892 = cljs.core.vec.call(null,inst_24878);var state_24914__$1 = state_24914;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24914__$1,(11),out,inst_24892);
} else
{if((state_val_24915 === (5)))
{var inst_24882 = (state_24914[(9)]);var inst_24887 = (state_24914[(11)]);var inst_24879 = (state_24914[(7)]);var inst_24878 = (state_24914[(8)]);var inst_24886 = (inst_24878[inst_24879] = inst_24882);var inst_24887__$1 = (inst_24879 + (1));var inst_24888 = (inst_24887__$1 < n);var state_24914__$1 = (function (){var statearr_24928 = state_24914;(statearr_24928[(11)] = inst_24887__$1);
(statearr_24928[(12)] = inst_24886);
return statearr_24928;
})();if(cljs.core.truth_(inst_24888))
{var statearr_24929_24954 = state_24914__$1;(statearr_24929_24954[(1)] = (8));
} else
{var statearr_24930_24955 = state_24914__$1;(statearr_24930_24955[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (14)))
{var inst_24907 = (state_24914[(2)]);var inst_24908 = cljs.core.async.close_BANG_.call(null,out);var state_24914__$1 = (function (){var statearr_24932 = state_24914;(statearr_24932[(13)] = inst_24907);
return statearr_24932;
})();var statearr_24933_24956 = state_24914__$1;(statearr_24933_24956[(2)] = inst_24908);
(statearr_24933_24956[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (10)))
{var inst_24898 = (state_24914[(2)]);var state_24914__$1 = state_24914;var statearr_24934_24957 = state_24914__$1;(statearr_24934_24957[(2)] = inst_24898);
(statearr_24934_24957[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_24915 === (8)))
{var inst_24887 = (state_24914[(11)]);var inst_24878 = (state_24914[(8)]);var tmp24931 = inst_24878;var inst_24878__$1 = tmp24931;var inst_24879 = inst_24887;var state_24914__$1 = (function (){var statearr_24935 = state_24914;(statearr_24935[(7)] = inst_24879);
(statearr_24935[(8)] = inst_24878__$1);
return statearr_24935;
})();var statearr_24936_24958 = state_24914__$1;(statearr_24936_24958[(2)] = null);
(statearr_24936_24958[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___24944,out))
;return ((function (switch__15889__auto__,c__15945__auto___24944,out){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_24940 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24940[(0)] = state_machine__15890__auto__);
(statearr_24940[(1)] = (1));
return statearr_24940;
});
var state_machine__15890__auto____1 = (function (state_24914){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_24914);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e24941){if((e24941 instanceof Object))
{var ex__15893__auto__ = e24941;var statearr_24942_24959 = state_24914;(statearr_24942_24959[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24914);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e24941;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__24960 = state_24914;
state_24914 = G__24960;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_24914){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_24914);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___24944,out))
})();var state__15947__auto__ = (function (){var statearr_24943 = f__15946__auto__.call(null);(statearr_24943[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___24944);
return statearr_24943;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___24944,out))
);
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__15945__auto___25103 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___25103,out){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___25103,out){
return (function (state_25073){var state_val_25074 = (state_25073[(1)]);if((state_val_25074 === (7)))
{var inst_25069 = (state_25073[(2)]);var state_25073__$1 = state_25073;var statearr_25075_25104 = state_25073__$1;(statearr_25075_25104[(2)] = inst_25069);
(statearr_25075_25104[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (1)))
{var inst_25032 = [];var inst_25033 = inst_25032;var inst_25034 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);var state_25073__$1 = (function (){var statearr_25076 = state_25073;(statearr_25076[(7)] = inst_25034);
(statearr_25076[(8)] = inst_25033);
return statearr_25076;
})();var statearr_25077_25105 = state_25073__$1;(statearr_25077_25105[(2)] = null);
(statearr_25077_25105[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (4)))
{var inst_25037 = (state_25073[(9)]);var inst_25037__$1 = (state_25073[(2)]);var inst_25038 = (inst_25037__$1 == null);var inst_25039 = cljs.core.not.call(null,inst_25038);var state_25073__$1 = (function (){var statearr_25078 = state_25073;(statearr_25078[(9)] = inst_25037__$1);
return statearr_25078;
})();if(inst_25039)
{var statearr_25079_25106 = state_25073__$1;(statearr_25079_25106[(1)] = (5));
} else
{var statearr_25080_25107 = state_25073__$1;(statearr_25080_25107[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (15)))
{var inst_25063 = (state_25073[(2)]);var state_25073__$1 = state_25073;var statearr_25081_25108 = state_25073__$1;(statearr_25081_25108[(2)] = inst_25063);
(statearr_25081_25108[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (13)))
{var state_25073__$1 = state_25073;var statearr_25082_25109 = state_25073__$1;(statearr_25082_25109[(2)] = null);
(statearr_25082_25109[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (6)))
{var inst_25033 = (state_25073[(8)]);var inst_25058 = inst_25033.length;var inst_25059 = (inst_25058 > (0));var state_25073__$1 = state_25073;if(cljs.core.truth_(inst_25059))
{var statearr_25083_25110 = state_25073__$1;(statearr_25083_25110[(1)] = (12));
} else
{var statearr_25084_25111 = state_25073__$1;(statearr_25084_25111[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (3)))
{var inst_25071 = (state_25073[(2)]);var state_25073__$1 = state_25073;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25073__$1,inst_25071);
} else
{if((state_val_25074 === (12)))
{var inst_25033 = (state_25073[(8)]);var inst_25061 = cljs.core.vec.call(null,inst_25033);var state_25073__$1 = state_25073;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25073__$1,(15),out,inst_25061);
} else
{if((state_val_25074 === (2)))
{var state_25073__$1 = state_25073;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25073__$1,(4),ch);
} else
{if((state_val_25074 === (11)))
{var inst_25037 = (state_25073[(9)]);var inst_25041 = (state_25073[(10)]);var inst_25051 = (state_25073[(2)]);var inst_25052 = [];var inst_25053 = inst_25052.push(inst_25037);var inst_25033 = inst_25052;var inst_25034 = inst_25041;var state_25073__$1 = (function (){var statearr_25085 = state_25073;(statearr_25085[(11)] = inst_25053);
(statearr_25085[(12)] = inst_25051);
(statearr_25085[(7)] = inst_25034);
(statearr_25085[(8)] = inst_25033);
return statearr_25085;
})();var statearr_25086_25112 = state_25073__$1;(statearr_25086_25112[(2)] = null);
(statearr_25086_25112[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (9)))
{var inst_25033 = (state_25073[(8)]);var inst_25049 = cljs.core.vec.call(null,inst_25033);var state_25073__$1 = state_25073;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25073__$1,(11),out,inst_25049);
} else
{if((state_val_25074 === (5)))
{var inst_25037 = (state_25073[(9)]);var inst_25041 = (state_25073[(10)]);var inst_25034 = (state_25073[(7)]);var inst_25041__$1 = f.call(null,inst_25037);var inst_25042 = cljs.core._EQ_.call(null,inst_25041__$1,inst_25034);var inst_25043 = cljs.core.keyword_identical_QMARK_.call(null,inst_25034,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));var inst_25044 = (inst_25042) || (inst_25043);var state_25073__$1 = (function (){var statearr_25087 = state_25073;(statearr_25087[(10)] = inst_25041__$1);
return statearr_25087;
})();if(cljs.core.truth_(inst_25044))
{var statearr_25088_25113 = state_25073__$1;(statearr_25088_25113[(1)] = (8));
} else
{var statearr_25089_25114 = state_25073__$1;(statearr_25089_25114[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (14)))
{var inst_25066 = (state_25073[(2)]);var inst_25067 = cljs.core.async.close_BANG_.call(null,out);var state_25073__$1 = (function (){var statearr_25091 = state_25073;(statearr_25091[(13)] = inst_25066);
return statearr_25091;
})();var statearr_25092_25115 = state_25073__$1;(statearr_25092_25115[(2)] = inst_25067);
(statearr_25092_25115[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (10)))
{var inst_25056 = (state_25073[(2)]);var state_25073__$1 = state_25073;var statearr_25093_25116 = state_25073__$1;(statearr_25093_25116[(2)] = inst_25056);
(statearr_25093_25116[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_25074 === (8)))
{var inst_25037 = (state_25073[(9)]);var inst_25041 = (state_25073[(10)]);var inst_25033 = (state_25073[(8)]);var inst_25046 = inst_25033.push(inst_25037);var tmp25090 = inst_25033;var inst_25033__$1 = tmp25090;var inst_25034 = inst_25041;var state_25073__$1 = (function (){var statearr_25094 = state_25073;(statearr_25094[(14)] = inst_25046);
(statearr_25094[(7)] = inst_25034);
(statearr_25094[(8)] = inst_25033__$1);
return statearr_25094;
})();var statearr_25095_25117 = state_25073__$1;(statearr_25095_25117[(2)] = null);
(statearr_25095_25117[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__15945__auto___25103,out))
;return ((function (switch__15889__auto__,c__15945__auto___25103,out){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_25099 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_25099[(0)] = state_machine__15890__auto__);
(statearr_25099[(1)] = (1));
return statearr_25099;
});
var state_machine__15890__auto____1 = (function (state_25073){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_25073);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e25100){if((e25100 instanceof Object))
{var ex__15893__auto__ = e25100;var statearr_25101_25118 = state_25073;(statearr_25101_25118[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25073);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e25100;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__25119 = state_25073;
state_25073 = G__25119;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_25073){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_25073);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___25103,out))
})();var state__15947__auto__ = (function (){var statearr_25102 = f__15946__auto__.call(null);(statearr_25102[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___25103);
return statearr_25102;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___25103,out))
);
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;

//# sourceMappingURL=async.js.map