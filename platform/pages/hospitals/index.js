//@ sourceURL=hospitals.js
(function(){
	var Table = $('#m_hospitalsTable').DataTable($.extend(true, {
        serverSide: true,
        ajax: {
            url: CONFIG.PLATFORMURL + 'hospital/getHospital',
            type: 'POST',
            data: function(status){
                return JSON.stringify({
                    branchName: $('#inputBranchCode').val(),
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

    //查看编辑删除按钮
    $('#m_hospitalsTable').on('click', function(e){
        var btn = e.target;
        if (btn.nodeName !== 'BUTTON') return;
        var data = Table.row($(btn).parents('tr')).data();
        if (btn.classList.contains('btn-detail')) {
            handleDetail(data);
        } else if (btn.classList.contains('btn-edit')) {
            handleEdit(data);
        } else if (btn.classList.contains('btn-delete')) {
            handleDelete(data);
        }
    })

    //新增
    $('#hospitals_add').on('click', function(e){
        $.iPopWin('pages/hospitals/detail.html', {
            title: '新增',
            idPrefix: 'hospitals',
			width: '50vw'
		})
    })

    //查询
    $('#queryHospitals').on('click', function(){
        Table.draw();
    })

    function handleDetail(data) {
        $.iPopWin('pages/hospitals/detail.html', {
            title: '查看',
            readOnly: true,
            idPrefix: 'hospitals',
			data: {aaData: data},
			width: '50vw'
		})
    }

    function handleEdit(data) {
        $.iPopWin('pages/hospitals/detail.html', {
            title: '编辑',
            idPrefix: 'hospitals',
			data: {aaData: data},
			width: '50vw'
		})
    }

    function handleDelete(data, type, rowData, setting) {
        $.iConfirm('提示', '确认删除?', function(){

        });
    }
})()
