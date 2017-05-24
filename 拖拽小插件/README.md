# 写在前面
有时候需要在一个窗口中移动一个DOM，自己去写很麻烦，可以封装成一个插件的形式。

# 用法
在需要添加拖拽功能的DOM上面添加`class="j-drag"`即可使用

# 三个坑
## 坑1
在绑定鼠标move事件时，绑定document更好，否则会出现很怪异的现象

## 坑2
在计算移动后的位置时，需要注意：
1. 鼠标的当前位置并不是该拖拽DOM的当前位置
2. 合理的做法应该是鼠标的相对位置不改变（相对于被拖拽的DOM，鼠标在其内部的位置）

## 坑3
必须要让布局模型转换，在设置被拖拽的DOM为`fixed`时，其位置可能是会变的。


# 演示
![Markdown](http://i2.muimg.com/593460/d1be32aa508a340b.gif)

# 代码
[https://github.com/coderLius/H5Sth/tree/master/%E6%8B%96%E6%8B%BD%E5%B0%8F%E6%8F%92%E4%BB%B6](https://github.com/coderLius/H5Sth/tree/master/%E6%8B%96%E6%8B%BD%E5%B0%8F%E6%8F%92%E4%BB%B6)

**感谢看官的鼠标一点，觉得可以的话给我的GitHub一个星星赞哈**