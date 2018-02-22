//@ sourceURL=hospitals.js
(function(){
	var Table = $('#m_hospitalsTable').DataTable($.extend(true, {
        serverSide: true,
        ajax: {
            url: CONFIG.PLATFORMURL + 'hospital/getHospital',
            type: 'POST',
            data: function(status){
                return JSON.stringify({
                    branchName: status.search.value,
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
                data: 'branchCode',
                title: '医院编码',
                sortable: false
            },
            {
                data: 'branchName',
                title: '医院名称',
                sortable: false
            },
            {
                data: 'levle',
                title: '医院级别',
                sortable: false
            },
            {
                data: 'category',
                title: '医院类别',
                sortable: false
            },
            {
                data: 'telephone',
                title: '医院电话',
                sortable: false
            },
            {
                data: 'desc',
                title: '医院介绍',
                sortable: false
            },
            {
                data: 'location',
                title: '医院位置',
                sortable: false
            },
            {
                data: 'id',
                title: '操作',
                sortable: false,
                render: function(data, type, rowData, setting){
                    return '<div><button class="btn btn-sm btn-primary btn-handle btn-detail"">查看</button>'+
                    '<button class="btn btn-sm btn-warning btn-handle btn-edit">编辑</button>'+
                    '<button class="btn btn-sm btn-danger btn-handle btn-delete">删除</button></div>'
                }
            }
        ]
    }, CONFIG.dataTableConf));

    $('#m_hospitalsTable').on('click', function(e){
        var btn = e.target;
        if (btn.nodeName !== 'BUTTON') return;
        var data = Table.row($(btn).parents('tr')).data();
        if (btn.classList.contains('btn-detail')) {
            handleDetail(data);
        }
    })

    function handleDetail(data) {
        $.iPopWin('pages/hospitals/detail.html', {
			title: '查看',
			data: {aaData: data},
			width: '50vw',
			btns: []
		})
    }

    function handleEdit(data) {
        
    }

    function handleDelete(data, type, rowData, setting) {
        
    }
})()
