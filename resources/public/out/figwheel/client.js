// Compiled by ClojureScript 0.0-2371
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('figwheel.client.file_reloading');
goog.require('figwheel.client.heads_up');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.heads_up');
figwheel.client.get_essential_messages = (function get_essential_messages(ed){if(cljs.core.truth_(ed))
{return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else
{return null;
}
});
figwheel.client.error_msg_format = (function error_msg_format(p__20851){var map__20853 = p__20851;var map__20853__$1 = ((cljs.core.seq_QMARK_.call(null,map__20853))?cljs.core.apply.call(null,cljs.core.hash_map,map__20853):map__20853);var class$ = cljs.core.get.call(null,map__20853__$1,new cljs.core.Keyword(null,"class","class",-2030961996));var message = cljs.core.get.call(null,map__20853__$1,new cljs.core.Keyword(null,"message","message",-406056002));return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class$)+" : "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(message));
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function focus_msgs(name_set,msg_hist){return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function reload_file_QMARK__STAR_(msg_name,opts){var or__12563__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(or__12563__auto__))
{return or__12563__auto__;
} else
{return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function reload_file_state_QMARK_(msg_names,opts){var and__12551__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));if(and__12551__auto__)
{return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else
{return and__12551__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function block_reload_file_state_QMARK_(msg_names,opts){return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function warning_append_state_QMARK_(msg_names){return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function warning_state_QMARK_(msg_names){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function rewarning_state_QMARK_(msg_names){return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function compile_fail_state_QMARK_(msg_names){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function compile_refail_state_QMARK_(msg_names){return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function css_loaded_state_QMARK_(msg_names){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function file_reloader_plugin(opts){var ch = cljs.core.async.chan.call(null);var c__15945__auto___20974 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___20974,ch){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___20974,ch){
return (function (state_20948){var state_val_20949 = (state_20948[(1)]);if((state_val_20949 === (7)))
{var inst_20944 = (state_20948[(2)]);var state_20948__$1 = state_20948;var statearr_20950_20975 = state_20948__$1;(statearr_20950_20975[(2)] = inst_20944);
(statearr_20950_20975[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (1)))
{var state_20948__$1 = state_20948;var statearr_20951_20976 = state_20948__$1;(statearr_20951_20976[(2)] = null);
(statearr_20951_20976[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (4)))
{var inst_20916 = (state_20948[(7)]);var inst_20916__$1 = (state_20948[(2)]);var state_20948__$1 = (function (){var statearr_20952 = state_20948;(statearr_20952[(7)] = inst_20916__$1);
return statearr_20952;
})();if(cljs.core.truth_(inst_20916__$1))
{var statearr_20953_20977 = state_20948__$1;(statearr_20953_20977[(1)] = (5));
} else
{var statearr_20954_20978 = state_20948__$1;(statearr_20954_20978[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (13)))
{var state_20948__$1 = state_20948;var statearr_20955_20979 = state_20948__$1;(statearr_20955_20979[(2)] = null);
(statearr_20955_20979[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (6)))
{var state_20948__$1 = state_20948;var statearr_20956_20980 = state_20948__$1;(statearr_20956_20980[(2)] = null);
(statearr_20956_20980[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (3)))
{var inst_20946 = (state_20948[(2)]);var state_20948__$1 = state_20948;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20948__$1,inst_20946);
} else
{if((state_val_20949 === (12)))
{var inst_20923 = (state_20948[(8)]);var inst_20932 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_20923);var inst_20933 = cljs.core.first.call(null,inst_20932);var inst_20934 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_20933);var inst_20935 = console.warn("Figwheel: Not loading code with warnings - ",inst_20934);var state_20948__$1 = state_20948;var statearr_20957_20981 = state_20948__$1;(statearr_20957_20981[(2)] = inst_20935);
(statearr_20957_20981[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (2)))
{var state_20948__$1 = state_20948;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20948__$1,(4),ch);
} else
{if((state_val_20949 === (11)))
{var inst_20928 = (state_20948[(2)]);var state_20948__$1 = state_20948;var statearr_20958_20982 = state_20948__$1;(statearr_20958_20982[(2)] = inst_20928);
(statearr_20958_20982[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (9)))
{var inst_20922 = (state_20948[(9)]);var inst_20930 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_20922,opts);var state_20948__$1 = state_20948;if(inst_20930)
{var statearr_20959_20983 = state_20948__$1;(statearr_20959_20983[(1)] = (12));
} else
{var statearr_20960_20984 = state_20948__$1;(statearr_20960_20984[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (5)))
{var inst_20922 = (state_20948[(9)]);var inst_20916 = (state_20948[(7)]);var inst_20918 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];var inst_20919 = (new cljs.core.PersistentArrayMap(null,2,inst_20918,null));var inst_20920 = (new cljs.core.PersistentHashSet(null,inst_20919,null));var inst_20921 = figwheel.client.focus_msgs.call(null,inst_20920,inst_20916);var inst_20922__$1 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_20921);var inst_20923 = cljs.core.first.call(null,inst_20921);var inst_20924 = figwheel.client.reload_file_state_QMARK_.call(null,inst_20922__$1,opts);var state_20948__$1 = (function (){var statearr_20961 = state_20948;(statearr_20961[(8)] = inst_20923);
(statearr_20961[(9)] = inst_20922__$1);
return statearr_20961;
})();if(cljs.core.truth_(inst_20924))
{var statearr_20962_20985 = state_20948__$1;(statearr_20962_20985[(1)] = (8));
} else
{var statearr_20963_20986 = state_20948__$1;(statearr_20963_20986[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (14)))
{var inst_20938 = (state_20948[(2)]);var state_20948__$1 = state_20948;var statearr_20964_20987 = state_20948__$1;(statearr_20964_20987[(2)] = inst_20938);
(statearr_20964_20987[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (10)))
{var inst_20940 = (state_20948[(2)]);var state_20948__$1 = (function (){var statearr_20965 = state_20948;(statearr_20965[(10)] = inst_20940);
return statearr_20965;
})();var statearr_20966_20988 = state_20948__$1;(statearr_20966_20988[(2)] = null);
(statearr_20966_20988[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_20949 === (8)))
{var inst_20923 = (state_20948[(8)]);var inst_20926 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_20923);var state_20948__$1 = state_20948;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20948__$1,(11),inst_20926);
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
});})(c__15945__auto___20974,ch))
;return ((function (switch__15889__auto__,c__15945__auto___20974,ch){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_20970 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_20970[(0)] = state_machine__15890__auto__);
(statearr_20970[(1)] = (1));
return statearr_20970;
});
var state_machine__15890__auto____1 = (function (state_20948){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_20948);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e20971){if((e20971 instanceof Object))
{var ex__15893__auto__ = e20971;var statearr_20972_20989 = state_20948;(statearr_20972_20989[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20948);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e20971;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__20990 = state_20948;
state_20948 = G__20990;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_20948){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_20948);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___20974,ch))
})();var state__15947__auto__ = (function (){var statearr_20973 = f__15946__auto__.call(null);(statearr_20973[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___20974);
return statearr_20973;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___20974,ch))
);
return ((function (ch){
return (function (msg_hist){cljs.core.async.put_BANG_.call(null,ch,msg_hist);
return msg_hist;
});
;})(ch))
});
figwheel.client.css_reloader_plugin = (function css_reloader_plugin(opts){return (function (p__20994){var vec__20995 = p__20994;var map__20996 = cljs.core.nth.call(null,vec__20995,(0),null);var map__20996__$1 = ((cljs.core.seq_QMARK_.call(null,map__20996))?cljs.core.apply.call(null,cljs.core.hash_map,map__20996):map__20996);var msg = map__20996__$1;var msg_name = cljs.core.get.call(null,map__20996__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));var _ = cljs.core.nthnext.call(null,vec__20995,(1));if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874)))
{return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else
{return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function compile_fail_warning_plugin(p__20997){var map__21005 = p__20997;var map__21005__$1 = ((cljs.core.seq_QMARK_.call(null,map__21005))?cljs.core.apply.call(null,cljs.core.hash_map,map__21005):map__21005);var on_compile_fail = cljs.core.get.call(null,map__21005__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));var on_compile_warning = cljs.core.get.call(null,map__21005__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));return ((function (map__21005,map__21005__$1,on_compile_fail,on_compile_warning){
return (function (p__21006){var vec__21007 = p__21006;var map__21008 = cljs.core.nth.call(null,vec__21007,(0),null);var map__21008__$1 = ((cljs.core.seq_QMARK_.call(null,map__21008))?cljs.core.apply.call(null,cljs.core.hash_map,map__21008):map__21008);var msg = map__21008__$1;var msg_name = cljs.core.get.call(null,map__21008__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));var _ = cljs.core.nthnext.call(null,vec__21007,(1));var pred__21009 = cljs.core._EQ_;var expr__21010 = msg_name;if(cljs.core.truth_(pred__21009.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__21010)))
{return on_compile_warning.call(null,msg);
} else
{if(cljs.core.truth_(pred__21009.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__21010)))
{return on_compile_fail.call(null,msg);
} else
{return null;
}
}
});
;})(map__21005,map__21005__$1,on_compile_fail,on_compile_warning))
});
figwheel.client.heads_up_plugin_msg_handler = (function heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);var msg = cljs.core.first.call(null,msg_hist);var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__,msg_hist,msg_names,msg){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__,msg_hist,msg_names,msg){
return (function (state_21187){var state_val_21188 = (state_21187[(1)]);if((state_val_21188 === (7)))
{var inst_21136 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);var state_21187__$1 = state_21187;if(inst_21136)
{var statearr_21189_21226 = state_21187__$1;(statearr_21189_21226[(1)] = (11));
} else
{var statearr_21190_21227 = state_21187__$1;(statearr_21190_21227[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (20)))
{var inst_21177 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21191_21228 = state_21187__$1;(statearr_21191_21228[(2)] = inst_21177);
(statearr_21191_21228[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (27)))
{var inst_21168 = figwheel.client.heads_up.flash_loaded.call(null);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(30),inst_21168);
} else
{if((state_val_21188 === (1)))
{var inst_21119 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);var state_21187__$1 = state_21187;if(cljs.core.truth_(inst_21119))
{var statearr_21192_21229 = state_21187__$1;(statearr_21192_21229[(1)] = (2));
} else
{var statearr_21193_21230 = state_21187__$1;(statearr_21193_21230[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (24)))
{var inst_21166 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);var state_21187__$1 = state_21187;if(inst_21166)
{var statearr_21194_21231 = state_21187__$1;(statearr_21194_21231[(1)] = (27));
} else
{var statearr_21195_21232 = state_21187__$1;(statearr_21195_21232[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (4)))
{var inst_21185 = (state_21187[(2)]);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21187__$1,inst_21185);
} else
{if((state_val_21188 === (15)))
{var inst_21146 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);var inst_21147 = figwheel.client.heads_up.append_message.call(null,inst_21146);var state_21187__$1 = state_21187;var statearr_21196_21233 = state_21187__$1;(statearr_21196_21233[(2)] = inst_21147);
(statearr_21196_21233[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (21)))
{var inst_21153 = (state_21187[(2)]);var inst_21154 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);var inst_21155 = figwheel.client.heads_up.display_warning.call(null,inst_21154);var state_21187__$1 = (function (){var statearr_21197 = state_21187;(statearr_21197[(7)] = inst_21153);
return statearr_21197;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(22),inst_21155);
} else
{if((state_val_21188 === (13)))
{var inst_21181 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21198_21234 = state_21187__$1;(statearr_21198_21234[(2)] = inst_21181);
(statearr_21198_21234[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (22)))
{var inst_21157 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21199_21235 = state_21187__$1;(statearr_21199_21235[(2)] = inst_21157);
(statearr_21199_21235[(1)] = (20));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (29)))
{var inst_21173 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21200_21236 = state_21187__$1;(statearr_21200_21236[(2)] = inst_21173);
(statearr_21200_21236[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (6)))
{var inst_21127 = figwheel.client.heads_up.clear.call(null);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(9),inst_21127);
} else
{if((state_val_21188 === (28)))
{var state_21187__$1 = state_21187;var statearr_21201_21237 = state_21187__$1;(statearr_21201_21237[(2)] = null);
(statearr_21201_21237[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (25)))
{var inst_21175 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21202_21238 = state_21187__$1;(statearr_21202_21238[(2)] = inst_21175);
(statearr_21202_21238[(1)] = (20));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (17)))
{var inst_21179 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21203_21239 = state_21187__$1;(statearr_21203_21239[(2)] = inst_21179);
(statearr_21203_21239[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (3)))
{var inst_21125 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);var state_21187__$1 = state_21187;if(inst_21125)
{var statearr_21204_21240 = state_21187__$1;(statearr_21204_21240[(1)] = (6));
} else
{var statearr_21205_21241 = state_21187__$1;(statearr_21205_21241[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (12)))
{var inst_21144 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);var state_21187__$1 = state_21187;if(inst_21144)
{var statearr_21206_21242 = state_21187__$1;(statearr_21206_21242[(1)] = (15));
} else
{var statearr_21207_21243 = state_21187__$1;(statearr_21207_21243[(1)] = (16));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (2)))
{var inst_21121 = figwheel.client.heads_up.flash_loaded.call(null);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(5),inst_21121);
} else
{if((state_val_21188 === (23)))
{var inst_21161 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);var inst_21162 = figwheel.client.heads_up.display_warning.call(null,inst_21161);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(26),inst_21162);
} else
{if((state_val_21188 === (19)))
{var inst_21159 = figwheel.client.warning_state_QMARK_.call(null,msg_names);var state_21187__$1 = state_21187;if(inst_21159)
{var statearr_21208_21244 = state_21187__$1;(statearr_21208_21244[(1)] = (23));
} else
{var statearr_21209_21245 = state_21187__$1;(statearr_21209_21245[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (11)))
{var inst_21138 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);var inst_21139 = figwheel.client.format_messages.call(null,inst_21138);var inst_21140 = figwheel.client.heads_up.display_error.call(null,inst_21139);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(14),inst_21140);
} else
{if((state_val_21188 === (9)))
{var inst_21129 = (state_21187[(2)]);var inst_21130 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);var inst_21131 = figwheel.client.format_messages.call(null,inst_21130);var inst_21132 = figwheel.client.heads_up.display_error.call(null,inst_21131);var state_21187__$1 = (function (){var statearr_21210 = state_21187;(statearr_21210[(8)] = inst_21129);
return statearr_21210;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(10),inst_21132);
} else
{if((state_val_21188 === (5)))
{var inst_21123 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21211_21246 = state_21187__$1;(statearr_21211_21246[(2)] = inst_21123);
(statearr_21211_21246[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (14)))
{var inst_21142 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21212_21247 = state_21187__$1;(statearr_21212_21247[(2)] = inst_21142);
(statearr_21212_21247[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (26)))
{var inst_21164 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21213_21248 = state_21187__$1;(statearr_21213_21248[(2)] = inst_21164);
(statearr_21213_21248[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (16)))
{var inst_21149 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);var state_21187__$1 = state_21187;if(inst_21149)
{var statearr_21214_21249 = state_21187__$1;(statearr_21214_21249[(1)] = (18));
} else
{var statearr_21215_21250 = state_21187__$1;(statearr_21215_21250[(1)] = (19));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (30)))
{var inst_21170 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21216_21251 = state_21187__$1;(statearr_21216_21251[(2)] = inst_21170);
(statearr_21216_21251[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (10)))
{var inst_21134 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21217_21252 = state_21187__$1;(statearr_21217_21252[(2)] = inst_21134);
(statearr_21217_21252[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21188 === (18)))
{var inst_21151 = figwheel.client.heads_up.clear.call(null);var state_21187__$1 = state_21187;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21187__$1,(21),inst_21151);
} else
{if((state_val_21188 === (8)))
{var inst_21183 = (state_21187[(2)]);var state_21187__$1 = state_21187;var statearr_21218_21253 = state_21187__$1;(statearr_21218_21253[(2)] = inst_21183);
(statearr_21218_21253[(1)] = (4));
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
});})(c__15945__auto__,msg_hist,msg_names,msg))
;return ((function (switch__15889__auto__,c__15945__auto__,msg_hist,msg_names,msg){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21222 = [null,null,null,null,null,null,null,null,null];(statearr_21222[(0)] = state_machine__15890__auto__);
(statearr_21222[(1)] = (1));
return statearr_21222;
});
var state_machine__15890__auto____1 = (function (state_21187){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21187);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21223){if((e21223 instanceof Object))
{var ex__15893__auto__ = e21223;var statearr_21224_21254 = state_21187;(statearr_21224_21254[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21187);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21223;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21255 = state_21187;
state_21187 = G__21255;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21187){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21187);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__,msg_hist,msg_names,msg))
})();var state__15947__auto__ = (function (){var statearr_21225 = f__15946__auto__.call(null);(statearr_21225[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21225;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__,msg_hist,msg_names,msg))
);
return c__15945__auto__;
});
figwheel.client.heads_up_plugin = (function heads_up_plugin(opts){var ch = cljs.core.async.chan.call(null);figwheel.client.heads_up_config_options_STAR__STAR_ = opts;
var c__15945__auto___21318 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto___21318,ch){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto___21318,ch){
return (function (state_21301){var state_val_21302 = (state_21301[(1)]);if((state_val_21302 === (8)))
{var inst_21293 = (state_21301[(2)]);var state_21301__$1 = (function (){var statearr_21303 = state_21301;(statearr_21303[(7)] = inst_21293);
return statearr_21303;
})();var statearr_21304_21319 = state_21301__$1;(statearr_21304_21319[(2)] = null);
(statearr_21304_21319[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21302 === (7)))
{var inst_21297 = (state_21301[(2)]);var state_21301__$1 = state_21301;var statearr_21305_21320 = state_21301__$1;(statearr_21305_21320[(2)] = inst_21297);
(statearr_21305_21320[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21302 === (6)))
{var state_21301__$1 = state_21301;var statearr_21306_21321 = state_21301__$1;(statearr_21306_21321[(2)] = null);
(statearr_21306_21321[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21302 === (5)))
{var inst_21289 = (state_21301[(8)]);var inst_21291 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_21289);var state_21301__$1 = state_21301;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21301__$1,(8),inst_21291);
} else
{if((state_val_21302 === (4)))
{var inst_21289 = (state_21301[(8)]);var inst_21289__$1 = (state_21301[(2)]);var state_21301__$1 = (function (){var statearr_21307 = state_21301;(statearr_21307[(8)] = inst_21289__$1);
return statearr_21307;
})();if(cljs.core.truth_(inst_21289__$1))
{var statearr_21308_21322 = state_21301__$1;(statearr_21308_21322[(1)] = (5));
} else
{var statearr_21309_21323 = state_21301__$1;(statearr_21309_21323[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_21302 === (3)))
{var inst_21299 = (state_21301[(2)]);var state_21301__$1 = state_21301;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21301__$1,inst_21299);
} else
{if((state_val_21302 === (2)))
{var state_21301__$1 = state_21301;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21301__$1,(4),ch);
} else
{if((state_val_21302 === (1)))
{var state_21301__$1 = state_21301;var statearr_21310_21324 = state_21301__$1;(statearr_21310_21324[(2)] = null);
(statearr_21310_21324[(1)] = (2));
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
});})(c__15945__auto___21318,ch))
;return ((function (switch__15889__auto__,c__15945__auto___21318,ch){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21314 = [null,null,null,null,null,null,null,null,null];(statearr_21314[(0)] = state_machine__15890__auto__);
(statearr_21314[(1)] = (1));
return statearr_21314;
});
var state_machine__15890__auto____1 = (function (state_21301){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21301);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21315){if((e21315 instanceof Object))
{var ex__15893__auto__ = e21315;var statearr_21316_21325 = state_21301;(statearr_21316_21325[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21301);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21315;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21326 = state_21301;
state_21301 = G__21326;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21301){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21301);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto___21318,ch))
})();var state__15947__auto__ = (function (){var statearr_21317 = f__15946__auto__.call(null);(statearr_21317[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto___21318);
return statearr_21317;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto___21318,ch))
);
figwheel.client.heads_up.ensure_container.call(null);
return ((function (ch){
return (function (msg_hist){cljs.core.async.put_BANG_.call(null,ch,msg_hist);
return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function enforce_project_plugin(opts){return (function (msg_hist){if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist))))))
{figwheel.client.socket.close_BANG_.call(null);
console.error("Figwheel: message received from different project. Shutting socket down.");
if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts)))
{var c__15945__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15945__auto__){
return (function (){var f__15946__auto__ = (function (){var switch__15889__auto__ = ((function (c__15945__auto__){
return (function (state_21347){var state_val_21348 = (state_21347[(1)]);if((state_val_21348 === (2)))
{var inst_21344 = (state_21347[(2)]);var inst_21345 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");var state_21347__$1 = (function (){var statearr_21349 = state_21347;(statearr_21349[(7)] = inst_21344);
return statearr_21349;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21347__$1,inst_21345);
} else
{if((state_val_21348 === (1)))
{var inst_21342 = cljs.core.async.timeout.call(null,(3000));var state_21347__$1 = state_21347;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21347__$1,(2),inst_21342);
} else
{return null;
}
}
});})(c__15945__auto__))
;return ((function (switch__15889__auto__,c__15945__auto__){
return (function() {
var state_machine__15890__auto__ = null;
var state_machine__15890__auto____0 = (function (){var statearr_21353 = [null,null,null,null,null,null,null,null];(statearr_21353[(0)] = state_machine__15890__auto__);
(statearr_21353[(1)] = (1));
return statearr_21353;
});
var state_machine__15890__auto____1 = (function (state_21347){while(true){
var ret_value__15891__auto__ = (function (){try{while(true){
var result__15892__auto__ = switch__15889__auto__.call(null,state_21347);if(cljs.core.keyword_identical_QMARK_.call(null,result__15892__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15892__auto__;
}
break;
}
}catch (e21354){if((e21354 instanceof Object))
{var ex__15893__auto__ = e21354;var statearr_21355_21357 = state_21347;(statearr_21355_21357[(5)] = ex__15893__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21347);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e21354;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15891__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__21358 = state_21347;
state_21347 = G__21358;
continue;
}
} else
{return ret_value__15891__auto__;
}
break;
}
});
state_machine__15890__auto__ = function(state_21347){
switch(arguments.length){
case 0:
return state_machine__15890__auto____0.call(this);
case 1:
return state_machine__15890__auto____1.call(this,state_21347);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15890__auto____0;
state_machine__15890__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15890__auto____1;
return state_machine__15890__auto__;
})()
;})(switch__15889__auto__,c__15945__auto__))
})();var state__15947__auto__ = (function (){var statearr_21356 = f__15946__auto__.call(null);(statearr_21356[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15945__auto__);
return statearr_21356;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15947__auto__);
});})(c__15945__auto__))
);
return c__15945__auto__;
} else
{return null;
}
} else
{return null;
}
});
});
figwheel.client.default_on_jsload = (function default_on_jsload(url){if(cljs.core.truth_(("CustomEvent" in window)))
{return document.body.dispatchEvent((new CustomEvent("figwheel.js-reload",(function (){var obj21362 = {"detail":url};return obj21362;
})())));
} else
{return null;
}
});
figwheel.client.default_on_compile_fail = (function default_on_compile_fail(p__21363){var map__21369 = p__21363;var map__21369__$1 = ((cljs.core.seq_QMARK_.call(null,map__21369))?cljs.core.apply.call(null,cljs.core.hash_map,map__21369):map__21369);var ed = map__21369__$1;var exception_data = cljs.core.get.call(null,map__21369__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));var formatted_exception = cljs.core.get.call(null,map__21369__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));console.debug("Figwheel: Compile Exception");
var seq__21370_21374 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));var chunk__21371_21375 = null;var count__21372_21376 = (0);var i__21373_21377 = (0);while(true){
if((i__21373_21377 < count__21372_21376))
{var msg_21378 = cljs.core._nth.call(null,chunk__21371_21375,i__21373_21377);console.log(msg_21378);
{
var G__21379 = seq__21370_21374;
var G__21380 = chunk__21371_21375;
var G__21381 = count__21372_21376;
var G__21382 = (i__21373_21377 + (1));
seq__21370_21374 = G__21379;
chunk__21371_21375 = G__21380;
count__21372_21376 = G__21381;
i__21373_21377 = G__21382;
continue;
}
} else
{var temp__4126__auto___21383 = cljs.core.seq.call(null,seq__21370_21374);if(temp__4126__auto___21383)
{var seq__21370_21384__$1 = temp__4126__auto___21383;if(cljs.core.chunked_seq_QMARK_.call(null,seq__21370_21384__$1))
{var c__13333__auto___21385 = cljs.core.chunk_first.call(null,seq__21370_21384__$1);{
var G__21386 = cljs.core.chunk_rest.call(null,seq__21370_21384__$1);
var G__21387 = c__13333__auto___21385;
var G__21388 = cljs.core.count.call(null,c__13333__auto___21385);
var G__21389 = (0);
seq__21370_21374 = G__21386;
chunk__21371_21375 = G__21387;
count__21372_21376 = G__21388;
i__21373_21377 = G__21389;
continue;
}
} else
{var msg_21390 = cljs.core.first.call(null,seq__21370_21384__$1);console.log(msg_21390);
{
var G__21391 = cljs.core.next.call(null,seq__21370_21384__$1);
var G__21392 = null;
var G__21393 = (0);
var G__21394 = (0);
seq__21370_21374 = G__21391;
chunk__21371_21375 = G__21392;
count__21372_21376 = G__21393;
i__21373_21377 = G__21394;
continue;
}
}
} else
{}
}
break;
}
return ed;
});
figwheel.client.default_on_compile_warning = (function default_on_compile_warning(p__21395){var map__21397 = p__21395;var map__21397__$1 = ((cljs.core.seq_QMARK_.call(null,map__21397))?cljs.core.apply.call(null,cljs.core.hash_map,map__21397):map__21397);var w = map__21397__$1;var message = cljs.core.get.call(null,map__21397__$1,new cljs.core.Keyword(null,"message","message",-406056002));console.warn("Figwheel: Compile Warning -",message);
return w;
});
figwheel.client.default_before_load = (function default_before_load(files){console.debug("Figwheel: notified of file changes");
return files;
});
figwheel.client.default_on_cssload = (function default_on_cssload(files){console.debug("Figwheel: loaded CSS files");
console.log(cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));
return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined')
{} else
{figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[figwheel.client.default_on_compile_warning,figwheel.client.default_on_jsload,figwheel.client.default_on_compile_fail,true,("ws://"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.host)+"/figwheel-ws"),figwheel.client.default_before_load,false,(100),cljs.core.identity,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function handle_deprecated_jsload_callback(config){if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)))
{return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else
{return config;
}
});
figwheel.client.base_plugins = (function base_plugins(system_options){var base = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options)))
{return cljs.core.assoc.call(null,base,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else
{return base;
}
});
figwheel.client.add_plugins = (function add_plugins(plugins,system_options){var seq__21404 = cljs.core.seq.call(null,plugins);var chunk__21405 = null;var count__21406 = (0);var i__21407 = (0);while(true){
if((i__21407 < count__21406))
{var vec__21408 = cljs.core._nth.call(null,chunk__21405,i__21407);var k = cljs.core.nth.call(null,vec__21408,(0),null);var plugin = cljs.core.nth.call(null,vec__21408,(1),null);if(cljs.core.truth_(plugin))
{var pl_21410 = plugin.call(null,system_options);cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__21404,chunk__21405,count__21406,i__21407,pl_21410,vec__21408,k,plugin){
return (function (_,___$1,___$2,msg_hist){return pl_21410.call(null,msg_hist);
});})(seq__21404,chunk__21405,count__21406,i__21407,pl_21410,vec__21408,k,plugin))
);
} else
{}
{
var G__21411 = seq__21404;
var G__21412 = chunk__21405;
var G__21413 = count__21406;
var G__21414 = (i__21407 + (1));
seq__21404 = G__21411;
chunk__21405 = G__21412;
count__21406 = G__21413;
i__21407 = G__21414;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__21404);if(temp__4126__auto__)
{var seq__21404__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__21404__$1))
{var c__13333__auto__ = cljs.core.chunk_first.call(null,seq__21404__$1);{
var G__21415 = cljs.core.chunk_rest.call(null,seq__21404__$1);
var G__21416 = c__13333__auto__;
var G__21417 = cljs.core.count.call(null,c__13333__auto__);
var G__21418 = (0);
seq__21404 = G__21415;
chunk__21405 = G__21416;
count__21406 = G__21417;
i__21407 = G__21418;
continue;
}
} else
{var vec__21409 = cljs.core.first.call(null,seq__21404__$1);var k = cljs.core.nth.call(null,vec__21409,(0),null);var plugin = cljs.core.nth.call(null,vec__21409,(1),null);if(cljs.core.truth_(plugin))
{var pl_21419 = plugin.call(null,system_options);cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__21404,chunk__21405,count__21406,i__21407,pl_21419,vec__21409,k,plugin,seq__21404__$1,temp__4126__auto__){
return (function (_,___$1,___$2,msg_hist){return pl_21419.call(null,msg_hist);
});})(seq__21404,chunk__21405,count__21406,i__21407,pl_21419,vec__21409,k,plugin,seq__21404__$1,temp__4126__auto__))
);
} else
{}
{
var G__21420 = cljs.core.next.call(null,seq__21404__$1);
var G__21421 = null;
var G__21422 = (0);
var G__21423 = (0);
seq__21404 = G__21420;
chunk__21405 = G__21421;
count__21406 = G__21422;
i__21407 = G__21423;
continue;
}
}
} else
{return null;
}
}
break;
}
});
figwheel.client.start = (function() {
var start = null;
var start__0 = (function (){return start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});
var start__1 = (function (opts){if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined')
{return null;
} else
{figwheel.client.__figwheel_start_once__ = (function (){var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);var system_options = figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370))));var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));figwheel.client.add_plugins.call(null,plugins,system_options);
figwheel.client.file_reloading.patch_goog_base.call(null);
return figwheel.client.socket.open.call(null,system_options);
})();
}
});
start = function(opts){
switch(arguments.length){
case 0:
return start__0.call(this);
case 1:
return start__1.call(this,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
start.cljs$core$IFn$_invoke$arity$0 = start__0;
start.cljs$core$IFn$_invoke$arity$1 = start__1;
return start;
})()
;
figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
/**
* @param {...*} var_args
*/
figwheel.client.watch_and_reload = (function() { 
var watch_and_reload__delegate = function (p__21424){var map__21426 = p__21424;var map__21426__$1 = ((cljs.core.seq_QMARK_.call(null,map__21426))?cljs.core.apply.call(null,cljs.core.hash_map,map__21426):map__21426);var opts = map__21426__$1;return figwheel.client.start.call(null,opts);
};
var watch_and_reload = function (var_args){
var p__21424 = null;if (arguments.length > 0) {
  p__21424 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return watch_and_reload__delegate.call(this,p__21424);};
watch_and_reload.cljs$lang$maxFixedArity = 0;
watch_and_reload.cljs$lang$applyTo = (function (arglist__21427){
var p__21424 = cljs.core.seq(arglist__21427);
return watch_and_reload__delegate(p__21424);
});
watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = watch_and_reload__delegate;
return watch_and_reload;
})()
;

//# sourceMappingURL=client.js.map