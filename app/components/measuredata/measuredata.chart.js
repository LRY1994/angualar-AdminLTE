//'use strict';

angular.module('com.pupil.app').
controller('MeasuredataChartController', ['$scope','$http','HOST','$window','$rootScope','AUTH_EVENTS','$state',
function ($scope,$http,HOST,$window,$rootScope,AUTH_EVENTS,$state) {
    var token = JSON.parse($window.sessionStorage["userInfo"]).token;
	var chart = echarts.init(document.getElementById('dataChart'));
            
    $scope.commitTime = [];
    $scope.device = [];
    $scope.step = [];
    $scope.heart = [];
    $scope.distance= [];
    
    $scope.formatTime = function(time) {
        var timeStamp = new Date(parseInt(time)),
        year = timeStamp.getFullYear();       
        month = timeStamp.getMonth() + 1,
        date = timeStamp.getDate() < 10 ? '0' + timeStamp.getDate() : timeStamp.getDate(),
        hour = timeStamp.getHours() < 10 ? '0' + timeStamp.getHours() : timeStamp.getHours(),
        minute = timeStamp.getMinutes() < 10 ? '0' + timeStamp.getMinutes() : timeStamp.getMinutes(),
        second = timeStamp.getSeconds() < 10 ? '0' + timeStamp.getSeconds() : timeStamp.getSeconds();
        return year + '-'+month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    };
            
    $scope.getData = function() {

	var bfromTime, btoTime;
	var lists = [];
	if($scope.fromTime == "") {
		bfromTime = "";
	} else {
		bfromTime = new Date($scope.fromTime).getTime();
	}
	if($scope.toTime == "") {
		btoTime = "";
	} else { //1天(d)=86400000毫秒(ms)
		btoTime = new Date($scope.toTime).getTime() + 86400000;
	}

	$http({
		method: 'GET',
		url: HOST + '/api/' + token + '/data',
		params: {
			fromTimeMills: bfromTime,
			toTimeMills: btoTime
		}
	}).success(function(data, status, headers, config) {

		lists = data.measures;
		$scope.loadData2Chart(lists);

	}).error(function(data, status, headers, config) {
		if(status == 404) {

			$scope.lists = [];

		} else if(status == 401) {
			$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

		} else {
			console.log("get data error");
		}
	});

};
$scope.chartOption = {
	title: {
		text: '测量数据',
		subtext: '周期:60s'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		data: ['step', 'distance', 'heart'],
		selected: {
			step: true,
			distance: true,
			heart: true
		}
	},
	toolbox: {
		show: true,
		orient: 'vertical',
		x: 'right',
		y: 'center',
		feature: {
			magicType: {
				show: true,
				type: ['line', 'bar']
			},
			restore: {
				show: true
			}
		}
	},
	calculable: true,
	xAxis: [{
		name: '时间',
		type: 'category',
		data: []
	}],
	yAxis: [{
		name: '步（步数）',
		type: 'value',
		splitArea: {
			show: true
		}},{
		name: '米（距离）,次/分钟（心率）',
		type: 'value',
		splitArea: {
			show: true
		}
	}],
	series: [{
		name: 'step',
		type: 'line',
		data: []
	}, {
		name: 'distance',
		type: 'line',
		data: []
	}, {
		name: 'heart',
		type: 'line',
		data: []
	}]
};

//刷新后给echarts填充数据
$scope.loadData2Chart = function(datalists) {

	var length = datalists.length;
	for(var j = 0; j < length; j++) {
		$scope.chartOption.xAxis[0].data[j] = $scope.formatTime(datalists[j].commitTime);
		if(datalists[j].step) {
			$scope.chartOption.series[0].data[j] = datalists[j].step;
		}
		if(datalists[j].distance) {
			$scope.chartOption.series[1].data[j] = datalists[j].distance;
		}
		if(datalists[j].heart) {
			$scope.chartOption.series[2].data[j] = datalists[j].heart;
		}
	}

	chart.clear($scope.chartOption);
	chart.setOption($scope.chartOption);
	addChartEvent();
};

//添加图表事件
function addChartEvent() {
	if(arguments.callee.one) {
		return;
	}
	arguments.callee.one = true;
	chart.on('legendselectchanged', function(params) {
		$scope.chartOption.legend.selected = params.selected;
	});
}

$scope.getData();
$scope.$on("updateData",function(){
    	$scope.getData();
    });
}]);
angular.module('com.pupil.app').directive('pMeasuredataChart', function () {
  return {
    restrict: 'EA',
    scope: {
    	fromTime:"=fromTime",
    	toTime:"=toTime",    	
    	formatTime:"&"
    },
    controller: 'MeasuredataChartController'
  };
});
