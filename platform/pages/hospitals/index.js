//@ sourceURL=hospitals.js
(function(){
	var Table = $('#m_hospitalsTable').DataTable($.extend(true, {
        serverSide: true,
        ajax: {
            url: CONFIG.PLATFORMURL + 'hospital/getHospital',
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
                data: 'branchName',
                title: '医院名称',
                sortable: false
            },
            {
                data: 'branchCode',
                title: '医院编码',
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
                width: '20%',
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

    
    //查询
    $('#queryHospitals').on('click', function(){
        Table.draw();
    })
    
    //新增
    $('#hospitals_add').on('click', function(e){
        $.iPopWin('pages/hospitals/detail.html', {
            title: '新增',
            idPrefix: 'hospitals',
            width: '50vw',
            btns: [
                {
                    text: '确定',
                    click: function(){
                        var form = $("#hospital_detail")
                        if (!form.validationEngine('validate')) {
                            return false;
                        }
                        //要先上传图片
                        var picInput = $('#uploadPic')[0];
                        if (!picInput.files[0]) {
                            alert('请先选择要上传的医院图片');
                            return false;
                        }
                        
                        var formData = new FormData();
                        formData.append('file', picInput.files[0]);
                        var uploadPic = $.ajax({
                            url: CONFIG.PLATFORMURL + 'hospital/upload',
                            data: formData,
                            processData: false,
                            type: 'POST',
                            contentType: false
                        })
                        //上传成功后提交表单
                        uploadPic.done(function(result){
                            submitForm(result, form, 'hospital/addHospital');
                        })
                    }
                }
            ]
        }, handleModal)
    })

    function handleDetail(data) {
        $.iPopWin('pages/hospitals/detail.html', {
            title: '查看',
            readOnly: true,
            idPrefix: 'hospitals',
			data: {aaData: data},
			width: '50vw'
		}, function(){
            $('#previewPic').attr('src', data.picUrl);
        })
    }

    function handleEdit(data) {
        $.iPopWin('pages/hospitals/detail.html', {
            title: '编辑',
            idPrefix: 'hospitals',
			data: {aaData: data},
            width: '50vw',
            btns: [
                {
                    text: '确定',
                    click: function(){
                        var form = $("#hospital_detail");
                        //校验
                        if (!form.validationEngine('validate')) {
                            return false;
                        }
                        //如果有文件则上传图片
                        var picInput = $('#uploadPic')[0];
                        var uploadPic;
                        if (picInput.files[0]) {
                            var formData = new FormData();
                            formData.append('file', picInput.files[0]);
                            uploadPic = $.ajax({
                                url: CONFIG.PLATFORMURL + 'hospital/upload',
                                data: formData,
                                processData: false,
                                type: 'POST',
                                contentType: false
                            })
                        }
                        //上传成功后提交表单
                        if (uploadPic) {
                            uploadPic.done(function(result){
                                submitForm(result, form, 'hospital/updHospital');
                            })
                        } else {
                            submitForm(null, form, 'hospital/updHospital');
                        }
                    }
                }
            ]
		}, function(){
            handleModal(data);
        })
    }
    
    function handleModal(data){
        //图片预览
        $('#uploadPic').on('change', function(event){
            var file = this.files[0];
            var fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = function(e){
                $('#previewPic').attr('src', e.target.result);
            } 
        });
        //原有图片
        data && $('#previewPic').attr('src', data.picUrl);
    }

    function submitForm(result, form, interface) {
        if ( result && result.resultCode == 0) {
            form.find('#hospitals_picUrl').val(result.result.picUrl);
        }
        var jsonArr = form.serializeArray(),
            json = {};
        for (var i=0; i < jsonArr.length; i++) {
            json[jsonArr[i].name] = jsonArr[i].value;
        }
        $.ajax({
            url: CONFIG.PLATFORMURL + interface,
            data: JSON.stringify(json),
            type: 'POST',
            success: function(result) {
                if (result.resultCode == 0) {
                    Table.draw();
                }
            }
        })
    }

    function handleDelete(data, type, rowData, setting) {
        $.iConfirm('提示', '确认删除?', function(){
            $.ajax({
                url: CONFIG.PLATFORMURL + 'hospital/delHospital',
                data: JSON.stringify({
                    id: data.id
                }),
                type: 'POST',
                success: function(result) {
                    if (result.resultCode == 0) {
                        Table.draw();
                    }
                }
            })
        });
    }
})()
