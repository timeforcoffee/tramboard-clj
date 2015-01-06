// Compiled by ClojureScript 0.0-2371
goog.provide('tramboard_clj.script.figwheel');
goog.require('cljs.core');
goog.require('tramboard_clj.script.tram');
goog.require('tramboard_clj.script.tram');
goog.require('figwheel.client');
goog.require('figwheel.client');
cljs.core.enable_console_print_BANG_.call(null);
figwheel.client.watch_and_reload.call(null,new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),"ws://localhost:3449/figwheel-ws",new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369),(function (){return tramboard_clj.script.tram.main.call(null);
}));
tramboard_clj.script.tram.main.call(null);

//# sourceMappingURL=figwheel.js.map