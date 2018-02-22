(function(){
	$('#testbtn').on('click',function(){
		$.iPopWin('pages/mail/mytest.html', {
			title: 'mytest',
			data: {mytest: 'mytest'},
			width: '50vw',
			btns: []
		})
	})
})()
