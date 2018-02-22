//全局设置
var CONFIG = {
    dummy: true,
    PLATFORMURL: 'http://211.159.189.178:8080/hr_examination_platform/',
    dataTableConf: {
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
        }
    }
}

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	},
	contentType: 'application/json',
	type: 'GET'
});

//路由
var Router = {
	'hospitals': {
		html: 'pages/hospitals/index.html',
		text: '医院管理'
	},
	'orders': {
		html: 'pages/orders/index.html',
		text: '体检订单'
	}
}
window.onhashchange = function(e){
	//hash值去掉‘#’
	var hashValue = e.newURL.split('#')[1];
	if (Router[hashValue]) {
		if (Router[hashValue].html) {
			$('#main-content').hide().load(Router[hashValue].html, function(){
				$('.breadcrumb .active').text(Router[hashValue].text);
				$(this).fadeIn();
			})
		} else {
			Router[hashValue].callback();
		}
	}
}
//刷新页面回到index
window.onload = function(e) {
    window.location.hash = '';
    window.location.hash = 'hospitals';
}

//ajax遮罩
$( document ).ajaxStart(function() {
 	$( "#loading" ).fadeIn();
});
$( document ).ajaxStop(function() {
  	$( "#loading" ).fadeOut();
});

//iPopWin组件
$.iPopWin = function(url, options, callback){
	var temp = `
		<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="exampleModalLabel">${options.title || ''}</h4>
		      </div>
					<div class="modal-body">
						加载失败...
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary">确定</button>
		      </div>
		    </div>
		  </div>
		</div>`;
	var wrapper = $(temp);
	
	//设置宽度
	wrapper.find('.modal-dialog').css('width', options.width || '50vw');
	
	//显示之后再执行回调函数
	wrapper.on('shown.bs.modal', function (e) {
		POPCALLBACKS.fire(options.data);
		POPCALLBACKS.empty();
		callback && callback();
	})
	
	//隐藏时移除
	wrapper.on('hidden.bs.modal', function (e) {
		wrapper.remove();
	})
	
	//加载内容完成后显示
	return wrapper.find('.modal-body').load(url, function(){
		wrapper.modal({
			show: true,
			backdrop: 'static'
		});
	});
}

//iPopWin页面js
var POPCALLBACKS = $.Callbacks();
