# 开始使用

- order: 5
- category: alice

---

> You jump, I jump!   *「Titanic」1997*

准备要使用 Alice 了吗，天，太激动太正能量了！请随我来。

![](https://i.alipayobjects.com/e/201303/2P3fLYiHrA.jpg)

---

## 一个简单的例子

```html
<head>
<meta charset="UTF-8">
<title>Alice 的简单例子</title>
<link media="all" href="http://assets.spmjs.org/alice/one/1.0.0/one.css" rel="stylesheet">
<style>
    .wrapper {
        width: 990px;
        margin: 0 auto;
    }
    h1 {
        font-size: 26px;
    }
    .ui-grid-row {
        margin-bottom: 15px;
    }
</style>
</head>

<body>
<div class="wrapper">
    <div class="ui-grid-row">
        <div class="ui-grid-25">
            <h1>这是一个简陋的页面</h1>
        </div>
    </div>
    <div class="ui-grid-row">
        <div class="ui-grid-25">
            <div class="ui-nav">
                <ul class="ui-nav-main">
                    <li class="ui-nav-item">
                    <a href="#">一级导航 1</a>
                    <ul class="ui-nav-submain">
                        <li class="ui-nav-subitem ui-nav-subitem-current"><a href="#">二级导航 1-1</a></li>
                        <li class="ui-nav-subitem"><a href="#">二级导航 1-2</a></li>
                        <li class="ui-nav-subitem"><a href="#">二级导航 1-3</a></li>
                    </ul>
                    </li>
                    <li class="ui-nav-item ui-nav-item-current">
                    <a href="#">一级导航 2</a>
                    <ul class="ui-nav-submain">
                        <li class="ui-nav-subitem"><a href="#">二级导航 2-1</a></li>
                        <li class="ui-nav-subitem ui-nav-subitem-current"><a href="#">二级导航 2-2</a></li>
                        <li class="ui-nav-subitem"><a href="#">二级导航 2-3</a></li>
                    </ul>
                    </li>
                    <li class="ui-nav-item">
                    <a href="#">一级导航 3</a>
                    <ul class="ui-nav-submain">
                        <li class="ui-nav-subitem"><a href="#">二级导航 3-1</a></li>
                        <li class="ui-nav-subitem"><a href="#">二级导航 3-2</a></li>
                        <li class="ui-nav-subitem ui-nav-subitem-current"><a href="#">二级导航 3-3</a></li>
                    </ul>
                    </li>
                    <li class="ui-nav-item"><a href="#">一级导航 4</a></li>
                </ul>
                <div class="ui-nav-subcontainer"></div>
            </div>
        </div>
    </div>
    <div class="ui-grid-row">
        <div class="ui-grid-6">


            <div class="ui-box">
                <div class="ui-box-head">
                    <div class="ui-box-head-border">
                        <h3 class="ui-box-head-title">区块标题</h3>
                        <span class="ui-box-head-text">其他文字</span>
                        <a href="#" class="ui-box-head-more">更多</a>
                    </div>
                </div>
                <div class="ui-box-container">
                    <div class="ui-box-content">
                        <ul class="ui-list">
                            <li class="ui-list-item"><a href="#">如何申请认证？</a></li>
                            <li class="ui-list-item"><a href="#">如何提现？</a></li>
                            <li class="ui-list-item"><a href="#">支付宝数字证书有什么作用？</a></li>
                            <li class="ui-list-item"><a href="#">如何申请认证？</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-grid-19">
            <div class="ui-tipbox ui-tipbox-success">
                <div class="ui-tipbox-icon">
                    <i class="iconfont" title="成功">ï</i>
                </div>
                <div class="ui-tipbox-content">
                    <h3 class="ui-tipbox-title">成功标题</h3>
                    <p class="ui-tipbox-explain">完成的说明完成的说明。</p>
                    <p class="ui-tipbox-explain"><a href="#">查询缴费记录</a> | <a href="#">我的支付宝</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
```

把上述代码复制到一个新的 html 文件中，然后用浏览器打开。

你会看到一个使用了 grid、box、nav 和 tipbox 四个模块的页面。

这里我们引用了一个 [one.css](http://assets.spmjs.org/alice/one/1.0.0/one.css) 文件，
这是一个打包了所有 alice 模块的集合文件。

使用 alice 非常简单，只需要引入样式，复制对应的 HTML 结构，就能构建需要的页面了。
相关的文档和 HTML 结构可以访问菜单上的 [基础框架](/docs/framework.html)、[通用样式库](/docs/widget.html)、[JavaScript](/docs/javascript.html) 这三个链接。


## 下载

1. 可以直接下载上面的 css 文件，这里提供一个未压缩的版本。

    [http://assets.spmjs.org/alice/one/1.0.0/one.css](http://assets.spmjs.org/alice/one/1.0.0/one.css)

    这个文件来自于 [aliceui/one](https://github.com/aliceui/one)，可以自行 clone 到本地并构建之。

2. 或者通过 [spm](https://github.com/spmjs/spm2/) 工具进行下载。（这个工具在后面会大量使用）

    ```
    $ spm install alice
    ```

    和 Arale 模块一样，这行命令会把所有的 Alice 模块安装到 sea-modules 目录中，您可以自由合并和调用。

3. 当然也可以到我们的 [github 仓库](https://github.com/aliceui/) 中 clone 对应的模块。
