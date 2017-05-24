$(function(){
	
	//页面加载完毕之后，执行进度条计时功能，在100秒之内进度条更新完毕
	//灰色部分应该慢慢增加，灰色部分的百分比数字也是慢慢增加，时间代表使用的时间
	var time = 0;
	var intervalId = setInterval(function(){
		time++;
		$('#progressDiv').find('div').css('width',time+"%");
		
		$('#progressDiv').find('div').html(time+"%");
		
		if(time>60&&time<80){
			
			//滚动条应该显示黄色
			$('#progressDiv').removeClass('progress-bar-success').addClass('progress-bar-warning');
			
			
		}
		
		if(time>=80&&time<=100){
			
			//滚动条应该显示红色
			$('#progressDiv').removeClass('progress-bar-warning').addClass('progress-bar-danger');
		}
		
		//当时间到达100秒的时候，我应该停止计时
		if(time==100){
			
			//停止计时，停止计时器
			clearInterval(intervalId);
			
			//弹出提示框
			//$('#model').modal();
		}
	},1000);
	
});
