//随机生成一组0-50的整数测试数据
var testArr = [];
for(var n = 0; n < 20; n++) {
	var testNum = parseInt(Math.random()*50);
	testArr.push(testNum);
}
console.log(testArr);

//坐标点
//x0 = 数据中x -originX;
//y0 = originY - 数据中y;

var cas = document.getElementById("tempcas"),
	ctx = cas.getContext("2d"),//p
	//绘制方式： 方形-squre  圆形-circle
	method = 'circle',//p
	//边长或者半径
	radius = 3,//p
	//点的颜色
	pointColor = 'red',//p
	lineColor = 'green',//p
	//数据入口
	// originData = [2, 55, 2, 55, 21, 55],
	originData = testArr,//p
	//canvas画布宽高
	offsetWidth = cas.width,//p
	offsetHeight = cas.height,//p
	//canvas离容器边距离
	paddingLeft = 50,//p
	paddingRight = 50,//p
	paddingTop = 30,//p
	paddingBottom = 30,//p
	//坐标轴三角
	triangleWidth = 20,//p
	triangleHeight = 5,//p

	colNum = originData.length,//p
	//X Y轴 的长度
	xAxisLength = offsetWidth - paddingLeft - paddingRight - triangleWidth,
	yAxisLength = offsetHeight - paddingTop - paddingBottom - triangleWidth,
	//x轴每个数字的间距
	space = xAxisLength / (colNum + 1),
	//原点
	originX = paddingLeft,
	originY = offsetHeight - paddingBottom,
	//坐标点
	//x0 = 数据中x -originX;
	//y0 = originY - 数据中y;
	//点坐标中的坐标最大范围
	// xAxisMaxRange = colNum * space,
	yAxisMaxRange = Math.max.apply(null, originData.map(function (v) {
		return v;
	})),
	scaleY = yAxisLength / yAxisMaxRange,
	//放大后的数字坐标 = 原来的坐标 * 放大比例 .存储在newData里
	finalData = [],
	//每个坐标点的最终坐标，用于连线
	pointCoord = [];
//每个元素
originData.map(function (v) {
	var newY = originY - (v * scaleY);
	finalData.push(newY);
});
//--------------------------------------------------
//X轴
ctx.moveTo(originX, originY);
ctx.lineTo(originX + xAxisLength, originY);
//y轴
ctx.moveTo(originX, originY);
ctx.lineTo(originX, originY - yAxisLength);
ctx.stroke();
//X轴箭头
ctx.beginPath();
ctx.moveTo(originX + xAxisLength - triangleWidth, originY - triangleHeight);
ctx.lineTo(originX + xAxisLength, originY);
ctx.lineTo(originX + xAxisLength - triangleWidth, originY + triangleHeight);
ctx.fill();
//Y轴箭头
ctx.beginPath();
ctx.moveTo(originX - triangleHeight, originY - yAxisLength + triangleWidth);
ctx.lineTo(originX, originY - yAxisLength);
ctx.lineTo(originX + triangleHeight, originY - yAxisLength + triangleWidth);
ctx.fill();

drawPoint();
drawLine(pointCoord, lineColor);

//画点-----------------------------------------------------------------
function drawPoint() {
	ctx.beginPath();
	ctx.fillStyle = pointColor;
	for (var i = 0; i < finalData.length; i++) {
		// 每一个点在xy轴上的坐标
		var pointX = (i + 1) * space + originX,
			pointY = finalData[i];
		pointCoord[i] = [pointX + radius, pointY - radius];
		//绘制点的样式
		if (method == 'squre') {
			ctx.moveTo(pointX - radius, pointY - radius);
			ctx.lineTo(pointX + radius, pointY - radius);
			ctx.lineTo(pointX + radius, pointY + radius);
			ctx.lineTo(pointX - radius, pointY + radius);
			ctx.closePath();
		} else /*if (method == 'circle')*/ {
			ctx.moveTo(pointX - radius, pointY - radius);
			ctx.arc(pointX + radius, pointY - radius, radius, 0, 2 * Math.PI);
		}
	}
	console.log("坐标：" + pointCoord);
	ctx.fill();
}


//drawLine-----------------------------------------------------------------

function drawLine(coordArr, color) {
	ctx.beginPath();
	if (color) {
		ctx.fillStyle = color
	}
	coordArr.forEach(function (v, i ) {
		ctx[['moveTo', 'lineTo'][i == 0 ? 0 : 1]](v[0], v[1]);
	});
	ctx.stroke();
}

var waterfall = {
	init: function () {
		this.setCanvas();
	},
	setCanvas: function () {

	}
}
upShuffling.init();