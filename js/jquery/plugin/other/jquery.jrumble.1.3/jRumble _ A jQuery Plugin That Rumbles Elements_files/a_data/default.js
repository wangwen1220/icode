DISQUS.addBlocks("theme")(function(c){c.blocks.discoveryMain=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put('<div id="'),b.put((b.esc||function(a){return a})(id)),b.put('" class="discovery-main">    <div id="discovery-note" style="display:none;">        <div class="alert">        <a href="#" class="close" data-action="discovery-help-close" title="'),b.put(gettext("Close this box")),b.put('">\u00d7</a>        '),b.put(c.interpolate(gettext("Disqus helps you find new and interesting content, discussions and products. Some sponsors and ecommerce sites may pay us for these recommendations and links. %(learnMore)s or %(feedback)s."),
{learnMore:c.renderBlock("learnMore"),feedback:c.renderBlock("feedback")})),b.put("        </div>    </div>    "),c.each(sections,function(a){b.put('    <section id="');b.put((b.esc||function(a){return a})(a.id));b.put('" class="');b.put((b.esc||function(a){return a})(a.className));b.put('">        <header class="discovery-col-header">            ');a===sections[sections.length-1]&&(b.put("            "),b.put('            <div class="discovery-options">                <span class="publisher-anchor-color"><a href="#" class="discovery-help" data-action="discovery-help">'),
b.put(gettext("What's this?")),b.put("</a></span>            </div>            "));b.put("            ");a.type==="organic"?(b.put("            <h2>"),b.put(c.interpolate(gettext("Also on %(forumName)s"),{forumName:c.renderBlock("forumName",forum)})),b.put("</h2>            ")):a.type==="promoted"&&(b.put("            <h2>"),b.put(gettext("Around The Web")),b.put("</h2>            "));b.put('        </header>        <ul class="discovery-posts">        </ul>    </section>    ')}),b.put("</div>"),b.compile()};
c.blocks.discoveryCollection=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put("    "),c.each(collection,function(a,k){var e={thread:a,index:k};b.put('    <li class="discovery-post" id="discovery-link-');a.id?(b.put("o"),b.put((b.esc||function(a){return a})(a.id))):(b.put("p"),b.put((b.esc||function(a){return a})(a.body_id)));b.put('">        <header class="discovery-post-header">            <h3 title="');b.put((b.esc||function(a){return a})(a.title));b.put('">                <a ');
(function(){var a={};c.extend(a,e);c.extend(a,{});b.put(c.renderBlock("linkAttributes",a))})();b.put(' data-role="discovery-thread-title" class="title publisher-anchor-color line-truncate" data-line-truncate="2">                    ');b.put(a.title);b.put("                </a>                ");variant.inlineMeta&&(b.put("                    "),a.posts>0?(b.put('                    <span class="inline-meta">                        '),function(){var f={};c.extend(f,e);c.extend(f,{thread:a});b.put(c.renderBlock("discoveryPostCount",
f))}(),b.put("                    </span>                    ")):a.createdAgo&&(b.put('                    <span class="inline-meta">'),b.put((b.esc||function(a){return a})(a.createdAgo)),b.put("</span>                    ")),b.put("                    "),a.brand&&(b.put('                    <span class="inline-meta">                        '),b.put((b.esc||function(a){return a})(a.brand)),b.put("                    </span>                    ")),b.put("                "));b.put("            </h3>            ");
variant.inlineMeta||(b.put('            <ul class="meta">                '),a.posts>0&&(b.put('                <li class="comments">                    '),function(){var f={};c.extend(f,e);c.extend(f,{thread:a});b.put(c.renderBlock("discoveryPostCount",f))}(),b.put("                </li>                ")),b.put("                "),a.createdAgo&&(b.put('                <li class="time">'),b.put((b.esc||function(a){return a})(a.createdAgo)),b.put("</li>                ")),b.put("            </ul>            "));
b.put("        </header>        ");variant.contentPreviews&&a.preview&&(b.put("            "),function(){var f={};c.extend(f,e);c.extend(f,{post:a.preview});b.put(c.renderBlock("discoveryContentPreview",f))}(),b.put("        "));b.put("    </li>    ")}),b.compile()};c.blocks.discoveryPostCount=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put("    "),thread.posts===1?(b.put("        "),b.put(gettext("1 comment"))):(b.put("        "),b.put(c.interpolate(gettext("%(numPosts)s comments"),
{numPosts:thread.posts}))),b.put("    "),b.compile()};c.blocks.linkAttributes=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put('href="'),b.put((b.esc||function(a){return a})(thread.redirectUrl)),b.put('" '),thread.hasOwnProperty("brand")&&b.put('target="_blank" rel="nofollow"'),b.compile()};c.blocks.learnMore=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put('<a href="http://help.disqus.com/customer/portal/articles/666278-introducing-promoted-discovery-and-f-a-q-"   target="_blank">'),
b.put(gettext("Learn more")),b.put("</a>"),b.compile()};c.blocks.discoveryContentPreview=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put("<a "),function(){var a={};c.extend(a,d);c.extend(a,{});b.put(c.renderBlock("linkAttributes",a))}(),b.put(' class="top-comment" data-role="discovery-top-comment">    <img src="'),b.put((b.esc||function(a){return a})(post.author.avatar.cache)),b.put('" alt="'),b.put(gettext("Avatar")),b.put('" data-role="discovery-avatar">    <p><span class="user" data-role="discovery-top-comment-author">'),
b.put((b.esc||function(a){return a})(post.author.name)),b.put('</span> &#8212; <span data-role="discovery-top-comment-snippet" class="line-truncate" data-line-truncate="3">'),b.put((b.esc||function(a){return a})(post.plaintext)),b.put("</span></p></a>"),b.compile()};c.blocks.forumName=function(g,d){var b=new c.Builder,h=DISQUS.extend({},g,d);with(h)return b.put("<strong>"),b.put((b.esc||function(a){return a})(name)),b.put("</strong>"),b.compile()};c.blocks.feedback=function(g,d){var b=new c.Builder,
h=DISQUS.extend({},g,d);with(h)return b.put('<a href="https://www.surveymonkey.com/s/GHK872T" target="_blank">    '),b.put(gettext("give us feedback")),b.put("</a>"),b.compile()}});
DISQUS.define("discovery.collections",function(){var c={},g=DISQUS.testing,d=DISQUS.JSON,b=_.strip,h=DISQUS.use("discovery.helpers"),a=DISQUS.use("discovery.models"),k=Backbone.Collection.extend({url:function(a){return DISQUS.api.getURL(a)},fetch:function(a){a=a||{};a.reset=!0;return Backbone.Collection.prototype.fetch.call(this,a)},parse:function(a){return a.response}});c.PostCollection=function(a){var e=a.prototype;return a.extend({url:function(){return e.url.call(this,"discovery/listTopPost.json")},
parse:function(a){for(var a=e.parse.call(this,a),f=0,k=a.length;f<k;f++)a[f].plaintext=b(a[f].message);return a}})}(k);var e=function(b){var e=b.prototype;return b.extend({initialize:function(b,e){this.model=a[this.modelName];this.sourceThread=e.sourceThread;this.modelAttributes=e.modelAttributes;this.getBanditJSON=_.memoize(this.getBanditJSON)},fetch:function(a){a=a||{};a.data=a.data||{};a.data.thread=this.sourceThread.id;return e.fetch.call(this,a)},parse:function(a){a=e.parse.call(this,a);if("bandit"in
a)this.bandit=a.bandit,a=a.results;if(!_.isArray(a))return[];for(var b=0,f=a.length;b<f;b++)_.extend(a[b],this.modelAttributes);return a},getBanditJSON:function(){return d.stringify(this.bandit)}})}(k);c.RelatedThreadCollection=function(a){var b=a.prototype;return a.extend({modelName:"RelatedThread",url:function(){return b.url.call(this,"discovery/listRelated.json")},parse:function(a){return this.rejectInvalid(b.parse.call(this,a))},rejectInvalid:function(a){var b=[],e,f=this.sourceThread;if(DISQUS.debug)return a.slice();
for(var k=0,c=a.length;k<c;k++)e=a[k],e.id==f.id||e.link==f.link?this.reportInvalid(e,"Link or id of related thread points back to thread on this page (circular reference)"):e.title.search(/^https?:\/\//)===0?this.reportInvalid(e,"Title looks like a url (begins with http:// or https://)"):b.push(e);return b},reportInvalid:function(a,b){var e=h.log;e("An organic link failed validation:",a.title,a.link,"(id =",a.id+")");e("Reason:",b)}})}(e);c.AdvertisementCollection=function(a){var b=a.prototype;return a.extend({modelName:"Advertisement",
url:function(){return b.url.call(this,"discovery/listPromoted.json")}})}(e);if(g)c.BaseCollection=k,c.BaseContentCollection=e;return c});
DISQUS.define("discovery.helpers",function(c,g){var d={},b=!1,h=!1;d.config=function(a){b=!!a.lineTruncationEnabled;h=!!a.consoleLoggingEnabled};var a=function(){};c.console&&(a=function(){if(h){var a=_.toArray(arguments);a.unshift("[Discovery]");c.console.log.apply?c.console.log.apply(c.console,a):c.console.log(a.join(" "))}});d.log=a;d.allowLog=function(a){if(a===g)return h;h=!!a};d.allowLineTruncate=function(a){if(a===g)return b;b=!!a};d.lineTruncate=function(a,e){function f(){return d.scrollHeight-
d.offsetHeight>0.2*h}function q(){i.lastChild&&!_.contains(["...","\u2026"],i.lastChild.nodeValue)&&(j=i.appendChild(c.document.createTextNode(" "+g)),f()&&(i.removeChild(j),i.removeChild(i.lastChild),q()))}if(b){var m=DISQUS.logError||function(){};if(!a.closest("body").length)return void m("lineTruncate called on el not on DOM");if(a.text().length<1)return void m("lineTruncated called on empty el");if(_.any(a.children(),function(a){return a.nodeType!==3}))return void m("lineTruncate called on non-flat el");
var i=a[0],d=i;if(a.css("display")!=="block")for(;d.parentNode;)if(d=d.parentNode,$(d).css("display")==="block")break;var h=parseFloat(a.css("font-size"),10);if(f()){var e=e||{},m=e.lines||1,g=e.ellipsis,j,l=a.text();if(l.length){var o=a.width()/h,m=parseInt(o*m,10),l=l.split(/\s/),o=0;a.empty();for(var p=0,r=l.length;p<r;p++){o+=l[p].length+1;if(o>=m)break;i.appendChild(document.createTextNode(" "+l[p]))}if(f()){do j=i.removeChild(i.lastChild);while(f())}else{do j=i.appendChild(document.createTextNode(" "+
l[p++]));while(!f()&&p<r);i.removeChild(j)}g&&(_.isString(g)||(g="\u2026"),q())}}}};d.balancedPartition=function(a){var b=_.keys(a),f=Math.floor(_.reduce(a,function(a,b){return a+b},0)/2),c=b.length+1;f+=1;var m=Array(c),i,d;for(i=0;i<c;i++)m[i]=Array(f),m[i][0]={};for(d=1;d<f;d++)m[0][d]=!1;var h,g,j,l={};for(d=1;d<f;d++)for(i=1;i<c;i++){h=b[i-1];g=a[h];j=_.clone(m[i-1][d]);if(!j&&g<=d&&(j=_.clone(m[i-1][d-g])))j[h]=g,l=j;m[i][d]=j}return[l,_.omit(a,_.keys(l))]};return d});
DISQUS.define("discovery.models",function(){var c={},g=DISQUS.ISO_8601,d=function(b){var c=b.prototype;return b.extend({defaults:{redirectUrl:null,signedUrl:null,userId:null,sourceThreadId:null,forumId:null,forum:null,majorVersion:null,variant:null,isExperiment:!1},redirectPayload:function(){var a={url:this.get("signedUrl"),imp:DISQUS.juggler.impId,forum_id:this.get("forumId"),forum:this.get("forum"),thread_id:this.get("sourceThreadId"),major_version:this.get("majorVersion")};if(this.get("isExperiment"))a.variant=
this.get("variant");if(this.has("userId"))a.user_id=this.get("userId");if(this.collection&&this.collection.bandit)a.bandit=this.collection.getBanditJSON();return a},redirectUrl:function(){var a=this.get("redirectUrl"),b=this.redirectPayload();return DISQUS.serialize(a,b)},toJSON:function(){var a=c.toJSON.call(this);a.redirectUrl=this.redirectUrl();return a},toString:function(){return this.get("title")+" "+this.get("link")+" (id = "+this.id+")"}})}(Backbone.Model);c.RelatedThread=function(b){var c=
b.prototype;return b.extend({defaults:_.defaults({createdAgo:!1},c.defaults),initialize:function(){if(this.get("createdAgo")){var a;a=this.get("createdAt");a=a.indexOf("+")>=0?a:a+"+00:00";a=moment(a,g);this.set("createdAgo",a.fromNow())}},redirectPayload:function(){var a=c.redirectPayload.call(this);_.extend(a,{thread:this.id,zone:"internal_discovery"});return a},toJSON:function(){var a=c.toJSON.call(this);if(a.preview)a.preview=a.preview.toJSON();return a},toString:function(){return"organic link: "+
c.toString.call(this)}})}(d);c.Advertisement=function(b){var c=b.prototype;return b.extend({idAttribute:"body_id",defaults:_.defaults({brand:"",headline:"",text:"",url:"",advertisement_id:0,body_id:0},c.defaults),get:function(a){if(a==="title")return this.attributes.headline;if(a==="link")return this.attributes.url;return c.get.call(this,a)},redirectPayload:function(){var a=c.redirectPayload.call(this);_.extend(a,{zone:"promoted_discovery",advertisement_id:this.get("advertisement_id"),body_id:this.get("body_id")});
return a},toJSON:function(){var a=c.toJSON.call(this);a.title=a.headline;a.link=a.url;return a},toString:function(){return"promoted link: "+c.toString.call(this)}})}(d);if(DISQUS.testing)c.BaseContentModel=d;return c});
DISQUS.define("discovery",function(){var c={},g=DISQUS.use("discovery.collections"),d=DISQUS.use("discovery.views"),b=DISQUS.use("discovery.helpers");c.init=function(a,c){var e=_.object(_.map(["lineTruncationEnabled","consoleLoggingEnabled"],function(b){return b in a?[b,a[b]]:[b,h.prototype.defaults[b]]}));b.config(e);var f=new h(a);if(c)f.on("change:display",function(){if(this.get("display")===!0)f.mainView.render=function(){},c(f.mainView)});return f};var h=c.DiscoveryApp=Backbone.Model.extend({defaults:{name:"default",
inlineMeta:!1,contentPreviews:!0,promotedEnabled:!1,topPlacementEnabled:!1,isExperiment:!1,redirectUrl:"//redirect.disqus.com/url",listRelatedLimit:null,listPromotedLimit:null,httpTimeout:1E4,sourceThread:null,sourceForum:null,help:!1,display:!1,columnEveningEnabled:!0,numColumns:2,minPerColumn:1,maxPerColumn:2,toleranceCoefficient:1.2,minWidthForColumnLayout:440,containerId:"discovery",topPlacementContainerId:"discovery-top",innerContainerName:"discovery-main",sectionNames:["col-organic","col-promoted"],
collectionTagName:"ul",collectionClassName:"discovery-posts",consoleLoggingEnabled:DISQUS.debug,lineTruncationEnabled:!0,session:null,js:null,css:null},initialize:function(){var a=this;!a.has("sourceThread")&&!DISQUS.testing&&a.makeBackwardsCompatible();a.createDataReferences();a.set("innerContainerId",a.get("innerContainerName")+"-"+a.cid);a.set("sectionIds",_.map(a.get("sectionNames"),function(b){return b+"-"+a.cid}));var b=a.get("session");a.get("topPlacementEnabled")&&b.isAnonymous()&&a.set("containerId",
a.get("topPlacementContainerId"));a.on("change:display",function f(){a.off("change:display",f);a.onComplete()});_.bindAll(a,"getContentPreviews","validateData","showData");a.run()},makeBackwardsCompatible:function(){var a="default";this.get("variant").indexOf("midway")!==-1&&(a="promoted");this.set("name",a);this.set({"default":{maxPerColumn:2,inlineMeta:!1,contentPreviews:!0,promotedEnabled:!1,topPlacementEnabled:!1},promoted:{maxPerColumn:4,inlineMeta:!0,contentPreviews:!1,promotedEnabled:!0,topPlacementEnabled:!1},
max:{maxPerColumn:4,inlineMeta:!0,contentPreviews:!1,promotedEnabled:!0,topPlacementEnabled:!0}}[a]);this.set("topPlacementEnabled",!1);this.set("sourceThread",this.get("thread"));this.set("sourceForum",this.get("forum"));this.on("resize",function(){this.mainView&&this.mainView.trigger("resize")})},commonClickMetadata:function(){var a=this.get("sourceThread"),b=this.get("sourceForum"),a={redirectUrl:this.get("redirectUrl"),sourceThreadId:a.id,forumId:b.pk,forum:b.id,majorVersion:this.majorVersion(),
variant:this.get("name"),isExperiment:this.get("isExperiment")};if((b=this.get("session"))&&b.isRegistered())a.userId=b.user.id;return a},createDataReferences:function(){function a(){return{sourceThread:b.get("sourceThread"),modelAttributes:b.commonClickMetadata()}}var b=this;b.collections=[];var e=a();e.modelAttributes.createdAgo=!0;this.threads=new g.RelatedThreadCollection(null,e);this.collections.push(this.threads);if(this.get("promotedEnabled"))this.ads=new g.AdvertisementCollection(null,a()),
this.collections.push(this.ads)},run:function(){var a=_.bind(this.onComplete,this);this.getData().then(this.validateData).then(this.showData).otherwise(a)},getData:function(){function a(){return{timeout:b.get("httpTimeout"),data:{limit:e/b.collections.length*b.get("maxPerColumn")}}}var b=this,e=b.get("numColumns"),f=a();if(b.has("listRelatedLimit"))f.data.limit=b.get("listRelatedLimit");var c=b.listRelatedRequest=when(b.threads.fetch(f));b.get("contentPreviews")&&(c=c.then(b.getContentPreviews));
if(!b.get("promotedEnabled"))return c;f=a();if(b.has("listPromotedLimit"))f.data.limit=b.get("listPromotedLimit");f=b.listPromotedRequest=when(b.ads.fetch(f));return when.join(c,f)},getContentPreviews:function(){var a=this.threads.filter(function(a){return!a.get("posts")});DISQUS.debug||_.each(a,function(a){b.log("Rejecting "+a);b.log("Reason: Thread at that link has no comments");this.threads.remove(a)},this);var a=this.threads.pluck("id"),c=this.collections.length,e=this.get("numColumns"),f=this.get("minPerColumn");
if(a.length<e/c*f)return when.resolve();this.previews=new g.PostCollection;return(this.listTopPostRequest=when(this.previews.fetch({data:{thread:a},timeout:this.get("httpTimeout")}))).then(_.bind(this.attachPreviews,this))},attachPreviews:function(){var a=this;a.previews.each(function(b){var e=b.get("thread");(e=a.threads.get(e.id||e))&&e.set("preview",b)})},validateCollections:function(){for(var a=this.collections,b=a.length,e=this.get("numColumns"),f=this.get("minPerColumn"),c,d;b>0;)if(d=e/a.length*
f,c=a[--b],c.length<d)a.splice(b,1),b=a.length;b=a.length;if(b>0){e=e/b*this.get("maxPerColumn");for(f=0;f<b;f++)c=a[f],c.length>e&&c.reset(c.slice(0,e))}},validateData:function(){this.validateCollections();if(this.collections.length===0)throw"Not enough data";},showData:function(){d.BaseView.variant=this.toJSON();var a=document.getElementById(this.get("containerId"));if(!a)throw"No container on the DOM";a=this.mainView=new d.MainView({el:a,model:this});a.render();var b=this.get("sectionIds"),e=this.get("collectionTagName"),
f=this.get("collectionClassName");this.views=_.map(this.collections,function(a,c){return new d.BaseCollectionView({collection:a,el:$("#"+b[c]+" "+e+"."+f)})});this.views.length===2&&a.$el.find("#"+this.get("innerContainerId")).addClass("doublesection");_.invoke(this.views,"render");if(this.get("columnEveningEnabled")&&a.$el.width()>this.get("minWidthForColumnLayout"))(new d.TwoColumn({views:this.views,fudge:this.get("toleranceCoefficient")})).render();else{var c=_.min(_.pluck(this.collections,"length"));
_.each(this.views,function(a){for(;a.collection.length>c;)a.collection.pop()})}this.set("display",!0)},onComplete:function(a){var c=b.log;if(this.onCompleteCalled)return c("Error: Final reporting function called more than once");this.onCompleteCalled=!0;a&&c("It looks like there was a problem:",a);this.report()},report:function(){var a=b.log,c=this.snapshot(),e=DISQUS.juggler.client("juggler");if(!e)return void a("Cannot report app state, no client found");a("Sending analytics data about this Discovery impression:");
a("init_discovery: ",c);e.emit("init_discovery",c);this.get("darkJester")&&DISQUS.juggler.client("jester",!0).emit("init_discovery",c)},majorVersion:function(){return this.get("promotedEnabled")?"midway":"metadata"},snapshot:function(){var a=this.collections,b=this.threads,b={major_version:this.majorVersion(),internal_organic:b.length,external_organic:0,promoted:0,display:this.get("display"),placement:this.get("containerId")===this.get("topPlacementContainerId")?"top":"bottom"};if(this.get("promotedEnabled")){var e=
this.ads;_.extend(b,{promoted:e.length,promoted_ids:DISQUS.JSON.stringify(e.pluck("advertisement_id"))})}a=_.extend.apply(_,[{}].concat(_.pluck(a,"bandit")));if(!_.isEmpty(a))b.bandit=DISQUS.JSON.stringify(a);if(this.get("isExperiment"))b.variant=this.get("name");return b}});return c});
DISQUS.define("discovery.views",function(){var c={},g=DISQUS.use("discovery.helpers"),d=c.BaseView=Backbone.View.extend({template:function(a,b){if(d.variant)a.variant=d.variant;b=b||this.templateName;return DISQUS.renderBlock(b,a)}});c.BaseCollectionView=d.extend({events:{"click [data-redirect]":"handleClick"},handleClick:function(a){this.swapHref(a.currentTarget)},swapHref:function(a){a.setAttribute("data-href",a.getAttribute("href"));a.setAttribute("href",a.getAttribute("data-redirect"));_.delay(function(){a.setAttribute("href",
a.getAttribute("data-href"))},100)},templateName:"discoveryCollection",initialize:function(){this.elementsSelector="li.discovery-post";this.$elements=this.$el.find(this.elementsSelector);this.collectionName="collection";var a=this.collection;a.on("remove",this.remove,this);a.on("reset",this.render,this)},truncate:function(){this.$el.find(".line-truncate").each(function(a){a=$(a);g.lineTruncate(a,{lines:a.attr("data-line-truncate"),ellipsis:!0})})},render:function(){var a={};a[this.collectionName]=
this.collection.toJSON();this.$el.html(this.template(a));this.$elements=this.$el.find(this.elementsSelector);this.truncate();return this},remove:function(a,b,c){if(arguments.length===0)return d.prototype.remove.call(this);var m=_.toArray(this.$elements),i=m.splice(c.index,1)[0];$(i).remove();this.$elements=$(m);return this}});var b=function(a,b){this.modelIds=a||[];this.$elements=$(b||[])};_.extend(b.prototype,{height:function(){var a=this;a.heights=[];var b=$(a.$elements),c=b.first().offset().top,
c=function(){var a=b.last().offset();return a.top+a.height}()-c,d=0;_.each(b,function(b){b=$(b).height();a.heights.push(b);d+=b});this.interstice=(c-d)/(b.length-1);return c}});var h=function(){this.divideIntoColumns=function(){var a=this,c=a.subviews[0];a.left=new b;a.right=new b;var d=0;c.collection.each(function(b,i){var g=d++%2===0?"left":"right";a[g].modelIds.push(b.id);Array.prototype.push.call(a[g].$elements,c.$elements[i])})};this.removeOneFromColumn=function(a,b){var c=_.chain(a.modelIds).map(function(b,
c){return[b,a.heights[c]]}).sortBy(function(a){return-1*a[1]}).find(function(a){return a[1]<=b}).value()[0],d=this.subviews[0].collection,i=d.models,g=d.get(c),h=i.indexOf(g),c=[[],[]],n,j=i.length;for(n=0;n<j;n++)c[n%2].push(i[n]);i=c[h%2];i.splice(_.indexOf(i,g),1);i=[];g=(h+1)%2;for(n=0;n<j-1;n++)i.push(c[(n+g)%2].shift());d.reset(i)};this.balanceColumns=function(){var a=this.subviews[0],b=a.collection,c={};b.each(function(b,f){c[f]=a.$elements[f]});var d=g.balancedPartition(c),d=_.sortBy(d,"length"),
i=d[0],h=b.models,k=Array(h.length);_.each(d[1],function(a,b){k[2*b]=h[b]});_.each(i,function(a,b){k[2*b+1]=h[b]});b.reset(h)};this.shortenColumn=function(a,b){this.subviews[0].collection.length%2!==0&&a===this.left?this.removeOneFromColumn(a,this.fudge*b):this.balanceColumns()}},a=function(){this.divideIntoColumns=function(){var a=this.subviews,c=a[0],a=a[1];this.left=new b(c.collection.pluck(c.collection.model.prototype.idAttribute),c.$elements);this.right=new b(a.collection.pluck(a.collection.model.prototype.idAttribute),
a.$elements)};this.shortenColumn=function(a,b){for(var c=a===this.left?this.right:this.left,d=b/c.$elements.length,i=(a===this.left?this.subviews[0]:this.subviews[1]).collection,g=_.chain(a.modelIds).map(function(b,c){return[b,a.heights[c]]}).sortBy(function(a){return a[1]}).value(),h=[],k=0,j=b,j=d;g.length;){var l=g.pop(),o=l[0],l=l[1]+a.interstice;k+l>b&&(c=a);j=Math.abs(b-(k+l));j/=c.$elements.length;j>=d||(d=j,j=a.modelIds.indexOf(o),a.modelIds.splice(j,1),Array.prototype.splice.call(a.$elements,
j,1),k+=l,h.push(o))}i.remove(h)}},k=c.TwoColumn=function(b){this.fudge=b.fudge;this.subviews=b.views.slice(0,2);this.subviews.length===1?h.call(this):a.call(this)};_.extend(k.prototype,{ascendingByHeight:function(){var a=this.left,b=this.right,a=[[a,a.height()],[b,b.height()]];return _.sortBy(a,function(a){return a[1]})},evenColumns:function(a){var b=this.ascendingByHeight(),c=b[0][0],d=b[0][1],i=b[1][0],b=b[1][1];if(d!==b){var d=b-d,g=this.fudge*d,b=_.find(i.heights,function(a){return a+i.interstice<
g});if(!a&&b)return this.shortenColumn(i,d),this.divideIntoColumns(),this.evenColumns("do not recurse again");this.increaseMargins(c,d)}},increaseMargins:function(a,b){var c=b/a.$elements.length;_.each(a.$elements,function(a){var a=$(a),b=parseInt(a.css("margin-bottom"),10)+c;a.css("margin-bottom",b+"px")});(a===this.left?this.right:this.left).$elements.css("clear",a===this.right?"left":"right")},render:function(){this.divideIntoColumns();this.evenColumns();return this}});c.MainView=d.extend({templateName:"discoveryMain",
events:{"click [data-action=discovery-help]":function(a){a.preventDefault();this.model.set("help",!0)},"click [data-action=discovery-help-close]":function(a){a.preventDefault();this.model.set("help",!1)}},toggleHelp:function(a){this.$el.find("#discovery-note").toggle();a.trigger("resize")},initialize:function(){this.model.on("change:display",this.show,this);this.model.on("change:help",this.toggleHelp,this);this.$el.css({position:"absolute",visibility:"hidden",display:"block"})},createSections:function(){var a=
this.model,b=DISQUS.discovery.collections,c=b.RelatedThreadCollection,d=b.AdvertisementCollection,g=a.get("sectionNames"),h=a.get("sectionIds");return _.map(a.collections,function(a,b){var e;a instanceof c?e="organic":a instanceof d&&(e="promoted");return{id:h[b],className:g[b],type:e}})},render:function(){var a=this.model,b=this.createSections();this.$el.html(this.template({id:a.get("innerContainerId"),sections:b,forum:a.get("sourceForum"),session:a.get("session").toJSON()}))},show:function(a){a.get("display")&&
(this.$el.css({position:"static",visibility:"visible"}),a.trigger("resize"))}});return c});