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
                data: 'tradeMode',
                title: '支付平台',
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
                data: 'patIdCard',
                title: '身份证',
                sortable: false
            },
            {
                data: 'patMobile',
                title: '联系电话',
                sortable: false
            },
            {
                data: 'branchCode',
                title: '医院编号',
                sortable: false
            },
            {
                data: 'branchName',
                title: '医院名称',
                sortable: false
            },
            {
                data: 'examinationCode',
                title: '体检项目编号',
                sortable: false
            },
            {
                data: 'examinationName',
                title: '体检项目名称',
                sortable: false
            },
            {
                data: 'regDate',
                title: '预约日期',
                sortable: false
            },
            {
                data: 'timeFlag',
                title: '预约时段',
                sortable: false
			},
            {
                data: 'beginTime',
                title: '开始时间',
                sortable: false
			},
            {
                data: 'endTime',
                title: '结束时间',
                sortable: false
			},
            {
                data: 'fee',
                title: '费用',
                sortable: false
			},
            {
                data: 'status',
                title: '状态',
                sortable: false
			},
            {
                data: 'time',
                title: '下单时间',
                sortable: false
			},
            {
                data: 'agtOrderNo',
                title: '第三方交易流水号',
                sortable: false
			},
            {
                data: 'amount',
                title: '支付金额',
                sortable: false
			},
            {
                data: 'payTime',
                title: '支付时间',
                sortable: false
			}
        ]
    }, CONFIG.dataTableConf));

    //查询
    $('#queryOrders').on('click', function(){
        Table.draw();
    })

})()
