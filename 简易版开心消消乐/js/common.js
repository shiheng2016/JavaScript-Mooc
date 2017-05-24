$(function(){
	//模态框中again按钮的点击事件
	$('#again').on('click',function(){
		//刷新页面
		window.location.href = "index.html";
	});
	
	//将图片放置在数组中，然后循环到列表组中
	var starArray = new Array('img/star0.gif','img/star1.gif','img/star2.gif','img/star3.gif','img/star4.gif','img/star5.gif');
	
	//定义一个二维数组，数组存放的是页面上星星的内容
	var tabArray = new Array();
	
	$('.list-group').find('li').each(function(index){
		
		$(this).append($('<img src="'+starArray[index]+'"/>'));
	});
	
	
	//获取随机数的方法,获取到数字的范围是0-1之间
	//对小数类型进行四舍五入
	//Math.round(Math.random()*5)获取到的值是大于等于0并且小于等于5
	console.info("随机数："+Math.round(Math.random()*5));
	
	
	//将表格中填充星星的内容
	$('table').find('tr').each(function(rowIndex){
		
		var tabSubArray = new Array();
		//$(this)代表每一行
		$(this).find('td').each(function(cellIndex){
			//$(this)代表一行中的每一个单元格
			var randomIndex = Math.round(Math.random()*5);
			
			$(this).append($('<img src="'+starArray[randomIndex]+'"/>'));
			
			tabSubArray[cellIndex] = randomIndex;
		});
		
		tabArray[rowIndex] = tabSubArray;
	});
	
	//二维数组循环
	for(var i=0;i<tabArray.length;i++){
		
		for(var j=0;j<tabArray[i].length;j++){
			
			//获取到要删除的星星内容
			getRemovedCell(tabArray,i,j);
		}
	}
	
	//定义规则：
	/**
	 * 1，当我们找到了可以删除的内容时，我们就将其标记为-2，我们认为-2是需要删除的内容
	 * 2,当我们找到了不能删除的内容时，我们标记为-1
	 * 3，当我们找到了要删除的内容时，后期是不需要再进行循环的
	 * 
	 * 递归：自己调用自己
	 * */
	
	
	
});

function getRemovedCell(tabArray, rowIndex, cellIndex){
	//如果按照这种情况向下找，那么会重复计算之前的内容
	var currentValue = tabArray[rowIndex][cellIndex];
	
	tabArray[rowIndex][cellIndex] = -2;
	
	var num = 1;
	
	//分别定义出需要和当前值比较的元素(坐，上，右，下)
	var left, top, right, bottom;
	//如果要取左边，必须保证列下标大于0
	if(cellIndex>0){
		left = tabArray[rowIndex][cellIndex-1];
	}
	
	//如果要取上面，保证行下标大于0
	if(rowIndex>0){
		top = tabArray[rowIndex-1][cellIndex];
	}
	
	//如果要取右边，保证列下标小于整行长度-1
	if(cellIndex<tabArray[rowIndex].length-1){
		right = tabArray[rowIndex][cellIndex+1];
	}
	
	//如果要取下边，保证行下标小于整体长度-1
	if(cellIndex<tabArray.length-1){
		bottom = tabArray[rowIndex+1][cellIndex];
	}
	
	//说明有左边的元素
	if(left!=undefined&&left==currentValue){
		
		num++;
		
		getRemovedCell(tabArray, rowIndex,cellIndex-1);
	}
	
	//说明有左边的元素
	if(top!=undefined&&top==currentValue){
		
		num++;
		
		getRemovedCell(tabArray, rowIndex-1,cellIndex);
	}
	
	//说明有左边的元素
	if(right!=undefined&&right==currentValue){
		
		num++;
		
		getRemovedCell(tabArray, rowIndex,cellIndex+1);
	}
	
	//说明有左边的元素
	if(bottom!=undefined&&bottom==currentValue){
		
		num++;
		
		getRemovedCell(tabArray, rowIndex+1,cellIndex);
	}
	
	return num;
}
   //num1 = 1
function test1(num1){
	
	var num2 = num1++;
	
	if(num2<10){
		
		num2 = test1(num2);
	}
	
	return num2;
	
	
}
