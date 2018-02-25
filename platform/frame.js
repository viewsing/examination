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
			if (options.btns[0].click() === false){
				return false;
			};
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

//alert组件
$.iAlert = function(title, msg, callback) {
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
				</div>
		    </div>
		  </div>
		</div>`;
	var wrapper = $(temp);

	wrapper.find('.modal-dialog').css('width', '30vw');

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

//Toast组件
$.iToast = function(title, msg, callback) {
	var temp = `
	<div class="toast">
		<div class="toast-dialog">
		<div class="toast-content">
				<div class="toast-header">
				<h4 class="toast-title">${title || ''}</h4>
				</div>
			<div class="toast-body">
				${msg}
			</div>
		</div>
		</div>
	</div>`;
	var wrapper = $(temp);

	wrapper.css('display', 'none');
	document.body.appendChild(wrapper[0])
	
	//显示弹框
	wrapper.fadeIn();

	setTimeout( function(){
		wrapper.fadeOut();
		wrapper.remove();
	}, 2000)
}