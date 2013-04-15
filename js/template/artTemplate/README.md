artTemplate
===========

JavaScript Template Engine


## 极限速度

artTemplate 是新一代 javascript 模板引擎，它在 v8 中的渲染效率可接近 javascript 性能极限，在 chrome 下渲染效率测试中分别是知名引擎 Mustache 与 micro tmpl 的 25 、 32 倍。若作为后端模板引擎（Node.js）亦能在 CPU 与内存占用上保持优势。 



## 调试支持

模板调试器可以精确定位到引发渲染错误的模板语句，解决了编写模板过程中无法调试的痛苦，让开发变得高效，也避免了因为单个模板出错导致整个应用崩溃的情况发生。



## 沙箱机制

artTemplate 默认采用js原生语法。在使用原生语法的引擎中，模板中若引用外部对象，随着项目复杂度增加，那时候谁都不能确定模板中的变量到底是数据还是全局对象，这种复杂的依赖关系将为会项目带来巨大的维护成本。而 artTemplate 的模板语句是在沙箱中执行的，意味着强制断绝与全局对象的依赖，模板编写者无法再像原来一样随意读写外部对象，而需要公用的辅助方法统一由 template.helper() 进行注册管理，强制语法规范有助于团队更好的协作。



## 语法扩展


默认采用原生语法：


    <ul>
        <% for (var i = 0; i < list.length; i ++) { %>
            <li>索引： <%=i + 1%> - 内容：<%=list[i]%></li>
        <% } %>
    </ul>
    
    
    
可定通过语法扩展支持简洁的语法：


    <ul>
        {each list as val i}
            <li>索引： {i + 1} - 内容：{val}</li>
        {/each}
    </ul>
    
   
  
  
## 轻盈小巧

artTemplate 这一切都在 1.7kb(gzip) 中实现。



----------------------------------------------

### 在线预览

帮助文档： http://aui.github.com/artTemplate/

速度比赛： http://aui.github.com/artTemplate/test/test-speed.html

引擎原理： http://cdc.tencent.com/?p=5723




### 授权协议

Released under the MIT, BSD, and GPL Licenses

----------------------------------------------

© cdc.tencent.com