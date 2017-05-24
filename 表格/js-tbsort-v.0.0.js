/**
 * Created by coderLius on 2017/4/21.
 */
function tbManage(name) {
    var aTb = document.getElementsByClassName(name);

    for(var i=0;i<aTb.length;i++){
        var aClaName = aTb[i].getElementsByTagName('th');
        _tb(aTb[i],aClaName);
    }

    function _tb(oTb,aClaName) {
        var aTr = oTb.getElementsByTagName('tr');
        var data = [];
        //构造出对象名
        var aObjName = [];
        for(var j=0;j<aClaName.length;j++){
            aObjName.push(aClaName[j].className)
        }
        console.log('objname',aObjName);
        // 将表格数据抽象成对象
        for(var i=1;i<aTr.length;i++){
            var arr = aTr[i].children;
            var temp = {};
            for(var j=0;j<aObjName.length;j++){
                temp[aObjName[j]] = arr[j].innerHTML
            }
            data.push(temp);
        }
        console.log(data);

        // 排序
        for(var i=0;i<aClaName.length;i++){
            aClaName[i].onclick = function () {
                var _this = this;
                if(this.getAttribute('data-sort')){
                    console.log('sort ing');
                    if(!this.hasSort){
                        this.desc = true;
                        this.hasSort = true;
                    }
                    if(this.desc){//降序
                        data.sort(function (o1,o2) {
                            return o2[_this.className]-o1[_this.className];
                        });
                        this.desc = false;
                    }else{ // 升序
                        data.sort(function (o1,o2) {
                            return o1[_this.className]-o2[_this.className];
                        });
                        this.desc = true;
                    }
                    // 刷新视图
                    for(var i=1;i<aTr.length;i++){
                        var aTd = aTr[i].children;
                        var json = data[i-1];
                        for(var j=0;j<aTd.length;j++){
                            aTd[j].innerHTML = json[aObjName[j]];
                        }
                    }
                }
            };
        }
    }

}