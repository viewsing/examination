//@ sourceURL=orders.js
(function(){
	var Table = $('#m_ordersTable').DataTable($.extend(true, {
        serverSide: true,
        ajax: {
            url: CONFIG.PLATFORMURL + 'examination/orders',
            type: 'POST',
            data: function(status){
                return JSON.stringify({
                    branchName: $('#inputBranchName').val(),
                    orderNo: $('#inputOrderNo').val(),
                    patName: $('#inputPatName').val(),
                    patIdCard: $('#inputPatIdCard').val(),
                    tradeMode: $('#inputTradeMode').val(),
                    regDate: $('#inputRegDate').val(),
                    pageNum: status.start
                });
            },
            dataSrc: function(json){
                json.iTotalRecords = json.result.totalRecord;
                json.iTotalDisplayRecords = json.result.dataList.length;
                return json.result.dataList;
            }
        },
        columns: [
            {
                data: 'branchName',
                title: '医院名称',
                sortable: false
            },
            {
                data: 'time',
                title: '下单时间',
                sortable: false
            },
            {
                data: 'orderNo',
                title: '订单号',
                sortable: false
            },
            {
                data: 'patName',
                title: '患者姓名',
                sortable: false
            },
            {
                data: 'status',
                title: '支付状态',
                sortable: false,
                render: function(data) {
                    switch(data) {
                        case '0':
                            return '<span class="label label-primary">未支付</span>';
                        break;
                        case '1':
                            return '<span class="label label-success">已支付</span>';                            
                        break;
                        case '2':
                            return '<span class="label label-warning">已退费</span>'                            
                        break;
                    }
                }
            },
            {
                data: 'examinationName',
                title: '体检项目名称',
                sortable: false
            },
            {
                data: 'fee',
                title: '费用',
                sortable: false
            },
            {
                data: 'id',
                title: '操作',
                sortable: false,
                render: function(data, type, rowData, setting){
                    return '<div><button class="btn btn-sm btn-primary btn-handle btn-detail"">查看</button></div>'
                }
            }
        ]
    }, CONFIG.dataTableConf));

    //查看按钮
    $('#m_ordersTable').on('click', function(e){
        var btn = e.target;
        if (btn.nodeName !== 'BUTTON') return;
        var data = Table.row($(btn).parents('tr')).data();
        if (btn.classList.contains('btn-detail')) {
            handleDetail(data);
        }
    })

    $('#inputRegDate').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

    //查询
    $('#queryOrders').on('click', function(){
        Table.draw();
    })

    function handleDetail(data) {
        $.iPopWin('pages/orders/detail.html', {
            title: '查看',
            readOnly: true,
            idPrefix: 'orders',
			data: {aaData: data},
			width: '50vw'
		})
    }

})()
