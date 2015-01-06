// Compiled by ClojureScript 0.0-2371
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('goog.net.jsloader');
goog.require('goog.net.jsloader');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('goog.Uri');
figwheel.client.file_reloading.add_cache_buster = (function add_cache_buster(url){return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.reload_host = (function reload_host(p__21797){var map__21799 = p__21797;var map__21799__$1 = ((cljs.core.seq_QMARK_.call(null,map__21799))?cljs.core.apply.call(null,cljs.core.hash_map,map__21799):map__21799);var websocket_url = cljs.core.get.call(null,map__21799__$1,new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938));return cljs.core.first.call(null,clojure.string.split.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,websocket_url,/^wss?:/,""),/^\/\//,""),/\//));
});
if(typeof figwheel.client.file_reloading.ns_meta_data !== 'undefined')
{} else
{figwheel.client.file_reloading.ns_meta_data = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.get_meta_data_for_ns = (function get_meta_data_for_ns(ns){return cljs.core.get.call(null,figwheel.client.file_reloading.ns_meta_data,ns);
});
figwheel.client.file_reloading.resolve_ns = (function resolve_ns(ns){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace_first.call(null,goog.basePath,"/goog",""))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace.call(null,ns,".","/"))+".js");
});
figwheel.client.file_reloading.js_reload = (function js_reload(p__21800,callback){var map__21802 = p__21800;var map__21802__$1 = ((cljs.core.seq_QMARK_.call(null,map__21802))?cljs.core.apply.call(null,cljs.core.hash_map,map__21802):map__21802);var msg = map__21802__$1;var meta_data = cljs.core.get.call(null,map__21802__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));var dependency_file = cljs.core.get.call(null,map__21802__$1,new cljs.core.Keyword(null,"dependency-file","dependency-file",-1682436382));var namespace = cljs.core.get.call(null,map__21802__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));var request_url = cljs.core.get.call(null,map__21802__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.ns_meta_data,cljs.core.assoc,namespace,meta_data);
if(cljs.core.truth_((function (){var and__12551__auto__ = (function (){var or__12563__auto__ = dependency_file;if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{var or__12563__auto____$1 = (function (){var and__12551__auto__ = meta_data;if(cljs.core.truth_(and__12551__auto__))
{return new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_data);
} else
{return and__12551__auto__;
}
})();if(cljs.core.truth_(or__12563__auto____$1))
{return or__12563__auto____$1;
} else
{return goog.isProvided_(cljs.core.name.call(null,namespace));
}
}
})();if(cljs.core.truth_(and__12551__auto__))
{return cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1((function (){var or__12563__auto__ = meta_data;if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})()));
} else
{return and__12551__auto__;
}
})()))
{return goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true}).addCallback(((function (map__21802,map__21802__$1,msg,meta_data,dependency_file,namespace,request_url){
return (function (){return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
});})(map__21802,map__21802__$1,msg,meta_data,dependency_file,namespace,request_url))
);
} else
{return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function reload_js_file(file_msg){var out = cljs.core.async.chan.call(null);setTimeout(((function (out){
return (function (){return figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){cljs.core.async.put_BANG_.call(null,out,url);
return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);
});})(out))
,(10));
return out;
});
/**
* Returns a chanel with one collection of loaded filenames on it.
*/
figwheel.client.file_reloading.load_all_js_files = (function load_all_js_files(files){return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.async.filter_LT_.call(null,cljs.core.identity,cljs.core.async.merge.call(null,cljs.core.mapv.call(null,figwheel.client.file_reloading.reload_js_file,files))));
});
figwheel.client.file_reloading.add_request_url = (function add_request_url(p__21803,p__21804){var map__21807 = p__21803;var map__21807__$1 = ((cljs.core.seq_QMARK_.call(null,map__21807))?cljs.core.apply.call(null,cljs.core.hash_map,map__21807):map__21807);var opts = map__21807__$1;var url_rewriter = cljs.core.get.call(null,map__21807__$1,new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838));var map__21808 = p__21804;var map__21808__$1 = ((cljs.core.seq_QMARK_.call(null,map__21808))?cljs.core.apply.call(null,cljs.core.hash_map,map__21808):map__21808);var d = map__21808__$1;var file = cljs.core.get.call(null,map__21808__$1,new cljs.core.Keyword(null,"file","file",-1269645878));return cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"request-url","request-url",2100346596),url_rewriter.call(null,("//"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_reloading.reload_host.call(null,opts))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(file))));
});
figwheel.client.file_reloading.add_request_urls = (function add_request_urls(opts,files){return cljs.core.map.call(null,cljs.core.partial.call(null,figwheel.client.file_reloading.add_request_url,opts),files);
});
figwheel.client.file_reloading.reload_js_files = (function reload_js_files(p__21810,p__21811){var map__21865 = p__21810;var map__21865__$1 = ((cljs.core.seq_QMARK_.call(null,map__21865))?cljs.core.apply.call(null,cljs.core.hash_map,map__21865):map__21865);var opts = map__21865__$1;var on_jsload = cljs.core.get.call(null,map__21865__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));var before_jsload = cljs.core.get.call(null,map__21865__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));var map__21866 = p__21811;var map__21866__$1 = ((cljs.core.seq_QMARK_.call(null,map__21866))?cljs.core.apply.call(null,cljs.core.hash_map,map__21866):map__21866);var msg = map__21866__$1;var files = cljs.core.get.call(null,map__21866__$1,new cljs.core.Keyword(null,"files","files",-472457450));var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files){
return (function (state_21896){var state_val_21897 = (state_21896[(1)]);if((state_val_21897 === (8)))
{var inst_21894 = (state_21896[(2)]);var state_21896__$1 = state_21896;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21896__$1,inst_21894);
} else
{if((state_val_21897 === (7)))
{var state_21896__$1 = state_21896;var statearr_21898_21918 = state_21896__$1;(statearr_21898_21918[(2)] = null);
(statearr_21898_21918[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21897 === (6)))
{var inst_21874 = (state_21896[(7)]);var inst_21888 = console.debug("Figwheel: NOT loading files that haven't been required");var inst_21889 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_21874);var inst_21890 = cljs.core.pr_str.call(null,inst_21889);var inst_21891 = console.log("not required:",inst_21890);var state_21896__$1 = (function (){var statearr_21899 = state_21896;(statearr_21899[(8)] = inst_21888);
return statearr_21899;
})();var statearr_21900_21919 = state_21896__$1;(statearr_21900_21919[(2)] = inst_21891);
(statearr_21900_21919[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21897 === (5)))
{var inst_21874 = (state_21896[(7)]);var inst_21885 = (state_21896[(2)]);var inst_21886 = cljs.core.not_empty.call(null,inst_21874);var state_21896__$1 = (function (){var statearr_21901 = state_21896;(statearr_21901[(9)] = inst_21885);
return statearr_21901;
})();if(cljs.core.truth_(inst_21886))
{var statearr_21902_21920 = state_21896__$1;(statearr_21902_21920[(1)] = (6));
} else
{var statearr_21903_21921 = state_21896__$1;(statearr_21903_21921[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21897 === (4)))
{var state_21896__$1 = state_21896;var statearr_21904_21922 = state_21896__$1;(statearr_21904_21922[(2)] = null);
(statearr_21904_21922[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21897 === (3)))
{var inst_21871 = (state_21896[(10)]);var inst_21868 = (state_21896[(11)]);var inst_21874 = (state_21896[(7)]);var inst_21872 = (state_21896[(12)]);var inst_21877 = console.debug("Figwheel: loaded these files");var inst_21878 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_21872);var inst_21879 = cljs.core.pr_str.call(null,inst_21878);var inst_21880 = console.log(inst_21879);var inst_21881 = (function (){var files_not_loaded = inst_21874;var res = inst_21872;var res_SINGLEQUOTE_ = inst_21871;var files_SINGLEQUOTE_ = inst_21868;return ((function (files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,inst_21871,inst_21868,inst_21874,inst_21872,inst_21877,inst_21878,inst_21879,inst_21880,state_val_21897,c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files){
return (function (){return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,inst_21871,inst_21868,inst_21874,inst_21872,inst_21877,inst_21878,inst_21879,inst_21880,state_val_21897,c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files))
})();var inst_21882 = setTimeout(inst_21881,(10));var state_21896__$1 = (function (){var statearr_21905 = state_21896;(statearr_21905[(13)] = inst_21880);
(statearr_21905[(14)] = inst_21877);
return statearr_21905;
})();var statearr_21906_21923 = state_21896__$1;(statearr_21906_21923[(2)] = inst_21882);
(statearr_21906_21923[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21897 === (2)))
{var inst_21871 = (state_21896[(10)]);var inst_21868 = (state_21896[(11)]);var inst_21872 = (state_21896[(12)]);var inst_21871__$1 = (state_21896[(2)]);var inst_21872__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_21871__$1);var inst_21873 = (function (){var res = inst_21872__$1;var res_SINGLEQUOTE_ = inst_21871__$1;var files_SINGLEQUOTE_ = inst_21868;return ((function (res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,inst_21871,inst_21868,inst_21872,inst_21871__$1,inst_21872__$1,state_val_21897,c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files){
return (function (p1__21809_SHARP_){return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__21809_SHARP_));
});
;})(res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,inst_21871,inst_21868,inst_21872,inst_21871__$1,inst_21872__$1,state_val_21897,c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files))
})();var inst_21874 = cljs.core.filter.call(null,inst_21873,inst_21871__$1);var inst_21875 = cljs.core.not_empty.call(null,inst_21872__$1);var state_21896__$1 = (function (){var statearr_21907 = state_21896;(statearr_21907[(10)] = inst_21871__$1);
(statearr_21907[(7)] = inst_21874);
(statearr_21907[(12)] = inst_21872__$1);
return statearr_21907;
})();if(cljs.core.truth_(inst_21875))
{var statearr_21908_21924 = state_21896__$1;(statearr_21908_21924[(1)] = (3));
} else
{var statearr_21909_21925 = state_21896__$1;(statearr_21909_21925[(1)] = (4));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21897 === (1)))
{var inst_21868 = (state_21896[(11)]);var inst_21867 = before_jsload.call(null,files);var inst_21868__$1 = figwheel.client.file_reloading.add_request_urls.call(null,opts,files);var inst_21869 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_21868__$1);var state_21896__$1 = (function (){var statearr_21910 = state_21896;(statearr_21910[(11)] = inst_21868__$1);
(statearr_21910[(15)] = inst_21867);
return statearr_21910;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21896__$1,(2),inst_21869);
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
});})(c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files))
;return ((function (switch__15889__auto__,c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21914 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_21914[(0)] = state_machine__15890__auto__);
(statearr_21914[(1)] = (1));
return statearr_21914;
});
var state_machine__15890__auto____1 = (function (state_21896){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21896);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21915){if((e21915 instanceof Object))
{var ex__15893__auto__ = e21915;var statearr_21916_21926 = state_21896;(statearr_21916_21926[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21896);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21915;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21927 = state_21896;
state_21896 = G__21927;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21896){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21896);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files))
})();var state__15947__auto__ = (function (){var statearr_21917 = f__15946__auto__.call(null);(statearr_21917[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21917;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__,map__21865,map__21865__$1,opts,on_jsload,before_jsload,map__21866,map__21866__$1,msg,files))
);
return c__15945__auto__;
});
figwheel.client.file_reloading.current_links = (function current_links(){return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function truncate_url(url){return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol)+"//"),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function matches_file_QMARK_(p__21928,link_href){var map__21930 = p__21928;var map__21930__$1 = ((cljs.core.seq_QMARK_.call(null,map__21930))?cljs.core.apply.call(null,cljs.core.hash_map,map__21930):map__21930);var request_url = cljs.core.get.call(null,map__21930__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));var file = cljs.core.get.call(null,map__21930__$1,new cljs.core.Keyword(null,"file","file",-1269645878));var trunc_href = figwheel.client.file_reloading.truncate_url.call(null,link_href);return (cljs.core._EQ_.call(null,file,trunc_href)) || (cljs.core._EQ_.call(null,figwheel.client.file_reloading.truncate_url.call(null,request_url),trunc_href));
});
figwheel.client.file_reloading.get_correct_link = (function get_correct_link(f_data){return cljs.core.some.call(null,(function (l){if(figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,l.href))
{return l;
} else
{return null;
}
}),figwheel.client.file_reloading.current_links.call(null));
});
figwheel.client.file_reloading.clone_link = (function clone_link(link,url){var clone = document.createElement("link");clone.rel = "stylesheet";
clone.media = link.media;
clone.disabled = link.disabled;
clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);
return clone;
});
figwheel.client.file_reloading.create_link = (function create_link(url){var link = document.createElement("link");link.rel = "stylesheet";
link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);
return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function() {
var add_link_to_doc = null;
var add_link_to_doc__1 = (function (new_link){return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});
var add_link_to_doc__2 = (function (orig_link,klone){var parent = orig_link.parentNode;if(cljs.core._EQ_.call(null,orig_link,parent.lastChild))
{parent.appendChild(klone);
} else
{parent.insertBefore(klone,orig_link.nextSibling);
}
var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__,parent){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__,parent){
return (function (state_21951){var state_val_21952 = (state_21951[(1)]);if((state_val_21952 === (2)))
{var inst_21948 = (state_21951[(2)]);var inst_21949 = parent.removeChild(orig_link);var state_21951__$1 = (function (){var statearr_21953 = state_21951;(statearr_21953[(7)] = inst_21948);
return statearr_21953;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21951__$1,inst_21949);
} else
{if((state_val_21952 === (1)))
{var inst_21946 = cljs.core.async.timeout.call(null,(200));var state_21951__$1 = state_21951;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21951__$1,(2),inst_21946);
} else
{return null;
}
}
});})(c__15945__auto__,parent))
;return ((function (switch__15889__auto__,c__15945__auto__,parent){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21957 = [null,null,null,null,null,null,null,null];(statearr_21957[(0)] = state_machine__15890__auto__);
(statearr_21957[(1)] = (1));
return statearr_21957;
});
var state_machine__15890__auto____1 = (function (state_21951){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21951);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21958){if((e21958 instanceof Object))
{var ex__15893__auto__ = e21958;var statearr_21959_21961 = state_21951;(statearr_21959_21961[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21951);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21958;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21962 = state_21951;
state_21951 = G__21962;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21951){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21951);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__,parent))
})();var state__15947__auto__ = (function (){var statearr_21960 = f__15946__auto__.call(null);(statearr_21960[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21960;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__,parent))
);
return c__15945__auto__;
});
add_link_to_doc = function(orig_link,klone){
switch(arguments.length){
case 1:
return add_link_to_doc__1.call(this,orig_link);
case 2:
return add_link_to_doc__2.call(this,orig_link,klone);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = add_link_to_doc__1;
add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = add_link_to_doc__2;
return add_link_to_doc;
})()
;
figwheel.client.file_reloading.reload_css_file = (function reload_css_file(p__21963){var map__21965 = p__21963;var map__21965__$1 = ((cljs.core.seq_QMARK_.call(null,map__21965))?cljs.core.apply.call(null,cljs.core.hash_map,map__21965):map__21965);var f_data = map__21965__$1;var request_url = cljs.core.get.call(null,map__21965__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));var file = cljs.core.get.call(null,map__21965__$1,new cljs.core.Keyword(null,"file","file",-1269645878));var temp__4124__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);if(cljs.core.truth_(temp__4124__auto__))
{var link = temp__4124__auto__;return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,request_url));
} else
{return figwheel.client.file_reloading.add_link_to_doc.call(null,figwheel.client.file_reloading.create_link.call(null,request_url));
}
});
figwheel.client.file_reloading.reload_css_files = (function reload_css_files(p__21966,files_msg){var map__21988 = p__21966;var map__21988__$1 = ((cljs.core.seq_QMARK_.call(null,map__21988))?cljs.core.apply.call(null,cljs.core.hash_map,map__21988):map__21988);var opts = map__21988__$1;var on_cssload = cljs.core.get.call(null,map__21988__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));var seq__21989_22009 = cljs.core.seq.call(null,figwheel.client.file_reloading.add_request_urls.call(null,opts,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));var chunk__21990_22010 = null;var count__21991_22011 = (0);var i__21992_22012 = (0);while(true){
if((i__21992_22012 < count__21991_22011))
{var f_22013 = cljs.core._nth.call(null,chunk__21990_22010,i__21992_22012);figwheel.client.file_reloading.reload_css_file.call(null,f_22013);
{
var G__22014 = seq__21989_22009;
var G__22015 = chunk__21990_22010;
var G__22016 = count__21991_22011;
var G__22017 = (i__21992_22012 + (1));
seq__21989_22009 = G__22014;
chunk__21990_22010 = G__22015;
count__21991_22011 = G__22016;
i__21992_22012 = G__22017;
continue;
}
} else
{var temp__4126__auto___22018 = cljs.core.seq.call(null,seq__21989_22009);if(temp__4126__auto___22018)
{var seq__21989_22019__$1 = temp__4126__auto___22018;if(cljs.core.chunked_seq_QMARK_.call(null,seq__21989_22019__$1))
{var c__13333__auto___22020 = cljs.core.chunk_first.call(null,seq__21989_22019__$1);{
var G__22021 = cljs.core.chunk_rest.call(null,seq__21989_22019__$1);
var G__22022 = c__13333__auto___22020;
var G__22023 = cljs.core.count.call(null,c__13333__auto___22020);
var G__22024 = (0);
seq__21989_22009 = G__22021;
chunk__21990_22010 = G__22022;
count__21991_22011 = G__22023;
i__21992_22012 = G__22024;
continue;
}
} else
{var f_22025 = cljs.core.first.call(null,seq__21989_22019__$1);figwheel.client.file_reloading.reload_css_file.call(null,f_22025);
{
var G__22026 = cljs.core.next.call(null,seq__21989_22019__$1);
var G__22027 = null;
var G__22028 = (0);
var G__22029 = (0);
seq__21989_22009 = G__22026;
chunk__21990_22010 = G__22027;
count__21991_22011 = G__22028;
i__21992_22012 = G__22029;
continue;
}
}
} else
{}
}
break;
}
var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__,map__21988,map__21988__$1,opts,on_cssload){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__,map__21988,map__21988__$1,opts,on_cssload){
return (function (state_21999){var state_val_22000 = (state_21999[(1)]);if((state_val_22000 === (2)))
{var inst_21995 = (state_21999[(2)]);var inst_21996 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg);var inst_21997 = on_cssload.call(null,inst_21996);var state_21999__$1 = (function (){var statearr_22001 = state_21999;(statearr_22001[(7)] = inst_21995);
return statearr_22001;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21999__$1,inst_21997);
} else
{if((state_val_22000 === (1)))
{var inst_21993 = cljs.core.async.timeout.call(null,(100));var state_21999__$1 = state_21999;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21999__$1,(2),inst_21993);
} else
{return null;
}
}
});})(c__15945__auto__,map__21988,map__21988__$1,opts,on_cssload))
;return ((function (switch__15889__auto__,c__15945__auto__,map__21988,map__21988__$1,opts,on_cssload){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_22005 = [null,null,null,null,null,null,null,null];(statearr_22005[(0)] = state_machine__15890__auto__);
(statearr_22005[(1)] = (1));
return statearr_22005;
});
var state_machine__15890__auto____1 = (function (state_21999){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21999);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e22006){if((e22006 instanceof Object))
{var ex__15893__auto__ = e22006;var statearr_22007_22030 = state_21999;(statearr_22007_22030[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21999);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e22006;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__22031 = state_21999;
state_21999 = G__22031;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21999){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21999);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__,map__21988,map__21988__$1,opts,on_cssload))
})();var state__15947__auto__ = (function (){var statearr_22008 = f__15946__auto__.call(null);(statearr_22008[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_22008;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__,map__21988,map__21988__$1,opts,on_cssload))
);
return c__15945__auto__;
});
figwheel.client.file_reloading.figwheel_closure_import_script = (function figwheel_closure_import_script(src){if(cljs.core.truth_(goog.inHtmlDocument_()))
{goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,src));
return true;
} else
{return false;
}
});
figwheel.client.file_reloading.patch_goog_base = (function patch_goog_base(){goog.provide = goog.exportPath_;
return goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.figwheel_closure_import_script;
});

//# sourceMappingURL=file_reloading.js.map