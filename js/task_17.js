/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d; 
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var str = "";
    for(var n in chartData){
        str += "<div class='chart " + pageState["nowGraTime"] + "'>";
        str += "<div class='data' style='height:" + chartData[n] + "px;'"
            + " title='空气质量为" + chartData[n] + "'></div>";
        str += "</div>";
    }
    document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML = str;
    console.log(chartData);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    // 调用图表渲染函数
    var option = document.getElementById("city-select");
    if (this != time.target && time.target.tagName.toLocaleLowerCase()!="label") {
        if (time.target.value!=pageState.nowGraTime) {
            if (option.value != "-1") {
                pageState.nowGraTime = time.target.value;
                initAqiChartData()
                renderChart()
            };
        };
    };
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(time) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    // 调用图表渲染函数
    if (time.target.value!=pageState.nowSelectCity && time.target.value!= "-1") {
        pageState.nowSelectCity = time.target.value;
        initAqiChartData()
        renderChart()
    };
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementById("form-gra-time").onclick = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var optionCity = document.getElementById("city-select"),
        sqiData = [];
        sqiData.push('<option value="-1">--请选择--</option>');
    for (var city in aqiSourceData) {
        sqiData.push('<option value="' + city + '">' + city + '</option>')
    };
    optionCity.innerHTML = sqiData.join('');
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    optionCity.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    // 91天 14周 3月
    chartData = [];
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    // 调用图表渲染函数
    switch(time){
        case 'day':
            chartData = aqiSourceData[pageState.nowSelectCity];
        break;
        case 'week':
            chartData = aqiSourceData[pageState.nowSelectCity];
            var count = 1
            var num = 0
            var temp = []
            for(var i in chartData) {
                var index = Math.ceil(count / 7)
                num += chartData[i]
                if(count % 7 === 0) {
                    temp[index] = num
                    num = 0
                }
                count += 1;
            }
            chartData = temp
            console.log(index);
        break;
        case 'month':
            chartData = aqiSourceData[pageState.nowSelectCity];
            var count1 = count2 = count3 = 0;
            for(var i in chartData) {
                if(i.indexOf('2016-01') >= 0) {
                    count1 += chartData[i]
                } else if(i.indexOf('2016-02') >= 0) {
                    count2 += chartData[i]
                } else {
                    count3 += chartData[i]
                }
            }
            month1 = count1/31
            month2 = count2/29
            month3 = count3/31
            chartData = {
            '1': month1.toFixed(0),
            '2': month2.toFixed(0),
            '3': month3.toFixed(0)
            }
        break;
    }
}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();