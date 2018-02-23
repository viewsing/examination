//全局设置
var CONFIG = {
    dummy: true,
    PLATFORMURL: 'http://211.159.189.178:8080/hr_examination_platform/',
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
        }
    }
}

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	},
	//全局拦截未登录
	dataFilter: function(data, type){
		var json;
		if (type === 'json') {
			json = JSON.parse(data);
			if (json.resultCode && json.resultCode == 3) {
				window.location.pathname = '/platform/login.html';
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
		//高亮选中菜单
		$('.sidebar-menu').find('[href]').removeClass('activeMenu');
		$('.sidebar-menu').find('[href="#'+hashValue+'"]').addClass('activeMenu');
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
						<button type="button" class="btn btn-primary" data-confirm="popWin">确定</button>
					</div>
				</div>
			</div>
		</div>`;
	var wrapper = $(temp);
	
	//设置宽度
	wrapper.find('.modal-dialog').css('width', options.width || '50vw');

	//确定按钮
	if (options.btns && options.btns[0]) {
		wrapper.find('[data-confirm]').on('click', function(event) {
			options.btns[0].click();
			wrapper.modal('hide');
		})
	} else {
		wrapper.find('[data-confirm]').remove();
	}
	
	//显示之后再执行回调函数
	wrapper.on('shown.bs.modal', function (e) {
		POPCALLBACKS.fire(options.data);
		POPCALLBACKS.empty();
		callback && callback();
	})
	
	//隐藏时移除(为了实现多层弹框)
	wrapper.on('hidden.bs.modal', function (e) {
		wrapper.remove();
	})
	
	//加载完成弹框内容
	return wrapper.find('.modal-body').load(url, function(){
		//数据反显
		if (options.data && options.data.aaData) {
			$.each(options.data.aaData, function(key, value) {
				wrapper.find('#' + options.idPrefix + '_' + key).val(value);
			})
		}
		//数据只读
		if (options.readOnly) {
			wrapper.find('.modal-body').find('button, input').attr('disabled', 'disabled');
		}
		//显示弹框
		wrapper.modal({
			show: true,
			backdrop: 'static'
		});
	});
}

//iPopWin页面js
var POPCALLBACKS = $.Callbacks();

//confirm组件
$.iConfirm = function(title, msg, callback) {
	var temp = `
		<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      	<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="exampleModalLabel">${title || ''}</h4>
		     	</div>
				<div class="modal-body">
					${msg}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" data-confirm="popWin">确定</button>
				</div>
		    </div>
		  </div>
		</div>`;
	var wrapper = $(temp);

	wrapper.find('.modal-dialog').css('width', '30vw');

	//确定
	wrapper.find('[data-confirm]').on('click', function(event) {
		callback();
		wrapper.modal('hide');
	})

	//隐藏时移除(为了实现多层弹框)
	wrapper.on('hidden.bs.modal', function (e) {
		wrapper.remove();
	})

	//显示弹框
	wrapper.modal({
		show: true,
		backdrop: 'static'
	});
}
