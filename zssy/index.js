//全局设置
var CONFIG = {
    dummy: true,
    PLATFORMURL: 'http://211.159.189.178:8080/zssy/',
    dataTableConf: {
        searching: false,
		lengthChange: false,
        language: {  
            "sProcessing": "处理中...",  
            "sLengthMenu": "显示 _MENU_ 项结果",  
            "sZeroRecords": "没有匹配结果",  
            "sInfo": "当前第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",  
            "sInfoEmpty": "当前第 0 至 0 项结果，共 0 项",  
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",  
            "sInfoPostFix": "",  
            "sSearch": "医院编码:",  
            "sUrl": "",  
            "sEmptyTable": "没有搜索到数据",  
            "sLoadingRecords": "载入中...",  
            "sInfoThousands": ",",  
            "oPaginate": {  
                "sFirst": "首页",  
                "sPrevious": "上页",  
                "sNext": "下页",  
                "sLast": "末页"  
            },  
            "oAria": {  
                "sSortAscending": ": 以升序排列此列",  
                "sSortDescending": ": 以降序排列此列"  
            }  
        },
        ajax: {
            type: 'POST'
        }
    }
}

// jquery的ajax全局设置
$.ajaxSetup({
	xhrFields: {
		withCredentials: true
    },
    type: 'POST',
	//全局拦截未登录
	dataFilter: function(data, type){
		var json;
		if (type === 'json') {
			json = JSON.parse(data);
			if (json.resultCode && json.resultCode == 3) {
				window.location.pathname = '/zssy/login.html';
				return;
			} else if (json.resultCode && json.resultCode == 2) {
				alert(json.resultDesc);
				return;
			} else if (json.resultCode && json.resultCode == -1) {
				alert('系统错误，请联系系统管理员');
				return;
			}
		}
		return data;
	},
	contentType: 'application/json',
	type: 'GET'
});

//路由
var Router = {
	'hospitals': {
        default: true,
		html: 'pages/hospitals/index.html',
		text: '医院信息'
	},
	'exams': {
		html: 'pages/exams/index.html',
		text: '体检项目管理'
	},
	'reports': {
		html: 'pages/reports/index.html',
		text: '体检报告管理'
	}
}

//退出按钮
$('#logout').on('click', function(e){
    $.iConfirm('提示', '确定退出登录？', function(){
        $.ajax({
            url: CONFIG.PLATFORMURL + 'user/logout',
            type: 'POST',
            success: function(result){
                if (result.resultCode == 0) {
                    window.location.pathname = '/zssy/login.html';
                }
            }
        })
    })
})