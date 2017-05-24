/**
 * Created by admin on 2017/4/6.
 */
var added = false;
$.fn.calendar = function (oT) {
    var oCalendar = null;
    oT.focus(function () {

        //清楚
        var aCalendar = $('.calendar');
        for(var i=0;i<aCalendar.length;i++){
            aCalendar[i].remove();
        }

        oCalendar = $('<div class="calendar"></div>');
        oCalendar.html('\
				<a href="javascript:;" class="prev">←</a>\
				<a href="javascript:;" class="next">→</a>\
				<h2></h2>\
				<ol>\
					<li>一</li>\
					<li>二</li>\
					<li>三</li>\
					<li>四</li>\
					<li>五</li>\
					<li class="weekend">六</li>\
					<li class="weekend">日</li>\
				</ol>\
				<ul></ul>\
			');

        oCalendar.appendTo(oT.parent());
        oCalendar.css({
            left:oT.offset().left+'px',
            top:oT.offset().top + oT.outerHeight()+5+'px'
        });
        _calendar();

        //点击外面消失
        $(document).click(function () {
            oCalendar.remove();
        });
    });

    oT.click(function (ev) {
        ev.stopPropagation();
    });

    //引入css
    if(!added){
        var oLink = $('<link rel="stylesheet" href="calendar.css">');
        oLink.appendTo($('head'));
        added = true;
    }

    function _calendar() {
        //当前月
        var now = 0;
        _create();

        //下一个月
        var oNext = $('.calendar .next');
        oNext.click(function (ev) {
            now++;
            _create();
            return false;
        });

        //上一个月
        var oPrev = $('.calendar .prev');
        oPrev.click(function (ev) {
            now--;
            _create();
            return false;
        });

        function _create() {
            //修改标题时间
            var oH2 = $('.calendar h2');
            var oDate = new Date();
            oDate.setMonth(oDate.getMonth()+now);
            var year = oDate.getFullYear();
            var month = oDate.getMonth();
            oH2.html(year+'年'+toDub(month+1)+'月');

            //先清空
            var oUl = $('.calendar ul');
            oUl.on('click','li',function (ev) {
                oT.val(year+'-'+toDub(month+1)+'-'+toDub(this.innerHTML));
                console.log(this.innerHTML);
            });
            oUl.html('');
            //创建空格
            var oDate = new Date();
            oDate.setMonth(oDate.getMonth()+now);
            oDate.setDate(1);
            var nSpace = oDate.getDay();
            if(nSpace==0){
                nSpace=7;
            }
            for(var i=0;i<nSpace-1;i++){
                var oLi=$('<li></li>');
                oLi.appendTo(oUl);
            }
            //创建日期
            var oDate = new Date();
            oDate.setMonth(oDate.getMonth()+now);
            oDate.setMonth(oDate.getMonth()+1,0);
            var nTotal = oDate.getDate();
            for(var i=0;i<nTotal;i++){
                var oLi=$('<li></li>');
                oLi.html(i+1);
                oLi.appendTo(oUl);
            }
            //周末变红
            var aLi=oUl.children();
            for(var i=0;i<aLi.length;i++){
                if(i%7==5 || i%7==6){
                    aLi[i].classList.add('weekend');
                }
            }
            if(now==0){
                var oDate = new Date();
                var nToday = oDate.getDate();
                for(var i=0;i<aLi.length;i++){
                    if(aLi[i].innerHTML==nToday){
                        aLi[i].classList.add('today');
                    }else if(aLi[i].innerHTML<nToday){
                        aLi[i].classList.add('past');
                    }
                }
            }else if(now<0){
                for(var i=0;i<aLi.length;i++){
                        aLi[i].classList.add('past');
                }
            }
        }
    }

    function toDub(val) {
        return val>9? (''+val):('0'+val);
    }
};