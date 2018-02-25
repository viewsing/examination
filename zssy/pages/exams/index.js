//@ sourceURL=exams.js
(function(){
	var Table = $('#m_examsTable').DataTable($.extend(true, {
        serverSide: true,
        ajax: {
            url: CONFIG.PLATFORMURL + 'examination/getExaminationInfo',
            type: 'POST',
            data: function(status){
                return JSON.stringify({
                    examinationName: $('#inputExaminationName').val(),
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
                data: 'examinationName',
                title: '体检项目名称',
                sortable: false
            },
            {
                data: 'examinationCode',
                title: '体检项目编码',
                sortable: false
            },
            {
                data: 'desc',
                title: '描述',
                // width: '20%',
                sortable: false
            },
            {
                data: 'suitAge',
                title: '适用年龄段',
                sortable: false
            },
            {
                data: 'suitSex',
                title: '适用性别',
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
                    return '<div><button class="btn btn-sm btn-primary btn-handle btn-detail"">查看</button>'+
                    '<button class="btn btn-sm btn-warning btn-handle btn-edit">编辑</button>'+
                    '<button class="btn btn-sm btn-danger btn-handle btn-delete">删除</button></div>'
                }
            }
        ]
    }, CONFIG.dataTableConf));

    //查看编辑删除按钮
    $('#m_examsTable').on('click', function(e){
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
    $('#queryExams').on('click', function(){
        Table.draw();
    })
    
    //新增
    $('#exams_add').on('click', function(e){
        $.iPopWin('pages/exams/detail.html', {
            title: '新增',
            idPrefix: 'exams',
            width: '50vw',
            before: function(popWin){
                //新建子项目
                popWin.find('#addChildrenItem').on('click', function(e){
                    addChildrenItem(popWin);
                })
                //删除子项目
                popWin.on('click', '.delChildrenItem', function(e){
                    var $self= $(this);
                    $.iConfirm('提示', '确认删除该子项目？', function(){
                        $self.parents('.panel').remove();
                    })
                })
            },
            btns: [
                {
                    text: '确定',
                    click: function(){
                        var form = $('#exam_detail');
                        //校验
                        if (!form.validationEngine('validate')) {
                            return false;
                        }
                        submitForm(form, 'examination/addExamination');
                    }
                }
            ]
        })
    })

    function handleDetail(data) {
        $.ajax({
            url: CONFIG.PLATFORMURL + 'examination/getExaminationDetail',
            data: JSON.stringify({examinationCode: data.examinationCode}),
            type: 'POST',
            success: function(result){
                if (result.resultCode == 0) {
                    $.iPopWin('pages/exams/detail.html', {
                        title: '查看',
                        readOnly: true,
                        idPrefix: 'exams',
                        data: {aaData: result.result},
                        width: '50vw',
                        before: function(popWin){
                            result.result.examinationDetail.forEach(function(item){
                                makeChildrenItem(popWin, item);
                            })
                        }
                    })
                }
            }
        })
    }
    
    function handleEdit(data) {
        $.ajax({
            url: CONFIG.PLATFORMURL + 'examination/getExaminationDetail',
            data: JSON.stringify({examinationCode: data.examinationCode}),
            type: 'POST',
            success: function(result){
                if (result.resultCode == 0) {
                    $.iPopWin('pages/exams/detail.html', {
                        title: '编辑',
                        idPrefix: 'exams',
                        data: {aaData: result.result},
                        width: '50vw',
                        before: function(popWin){
                            //展示子项目
                            result.result.examinationDetail.forEach(function(item){
                                makeChildrenItem(popWin, item);
                            })
                            //新建子项目
                            popWin.find('#addChildrenItem').on('click', function(e){
                                addChildrenItem(popWin);
                            })
                            //删除子项目
                            popWin.on('click', '.delChildrenItem', function(e){
                                var $self= $(this);
                                $.iConfirm('提示', '确认删除该子项目？', function(){
                                    var id = $self.prev().attr('href').substring(1);
                                    if (id) {
                                        $.ajax({
                                            url: CONFIG.PLATFORMURL + 'examination/delExaminationDetail',
                                            data: JSON.stringify({
                                                id: id
                                            }),
                                            success: function(result){
                                                if (result.resultCode == 0) {
                                                    $self.parents('.panel').remove();
                                                }
                                            }
                                        })
                                    } else {
                                        $self.parents('.panel').remove();
                                    }
                                })
                            })
                        },
                        btns: [
                            {
                                text: '确定',
                                click: function(){
                                    var form = $('#exam_detail');
                                    //校验
                                    if (!form.validationEngine('validate')) {
                                        return false;
                                    }
                                    submitForm(form, 'examination/updExamination');
                                }
                            }
                        ]
                    })
                }
            }
        })
    }

    function handleDelete(data, type, rowData, setting) {
        $.iConfirm('提示', '确认删除?', function(){
            $.ajax({
                url: CONFIG.PLATFORMURL + 'examination/delExamination',
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

    //子项目
    function makeChildrenItem(popWin, item) {
        var temp = `<div class="panel panel-default">
            <div class="panel-heading" style="position: relative;">
                <a role="button" data-toggle="collapse" data-parent="#examinationDetail" href="#${item.id}">
                    <h4 class="panel-title">
                    ${item.itemName}
                    </h4>
                </a>
                <button type="button" class="btn btn-sm btn-danger delChildrenItem" style="position: absolute;right: 5%; top:21%; padding: 1px 3px;">删除</button>
            </div>
            <div id="${item.id}" class="panel-collapse collapse in">
                <div class="panel-body">
                    <div class="form-group">
                        <label for="name_${item.itemCode}" class="col-sm-2 control-label">名称:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.itemName}" title="${item.itemName}" class="form-control validate[required]" data-name="itemName" id="name_${item.itemCode}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="code_${item.itemCode}" class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.itemCode}" title="${item.itemCode}" class="form-control validate[required]" data-name="itemCode" id="code_${item.itemCode}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="desc_${item.itemCode}" class="col-sm-2 control-label">描述:</label>
                        <div class="col-sm-9">
                            <textarea title="${item.desc}" class="form-control validate[required]" data-name="desc" id="desc_${item.itemCode}">${item.desc}</textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="check_${item.itemCode}" class="col-sm-2 control-label">检查部位:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.checkPart}" title="${item.checkPart}" class="form-control validate[required]" data-name="checkPart" id="check_${item.itemCode}">
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" data-name="id" value=${item.id} />
        </div>`;
        var panel = $(temp);
        popWin.find('#examinationDetail').append(panel);

    }

    function serializePanel(){
        var ret = [];
        var context = $('#examinationDetail');
        var panels = context.find('.panel');
        panels.each(function(index, panel){
            var item = {};
            var $panel = $(panel);
            item.itemName = $panel.find('[data-name="itemName"]').val();
            item.itemCode = $panel.find('[data-name="itemCode"]').val();
            item.desc = $panel.find('[data-name="desc"]').val();
            item.checkPart = $panel.find('[data-name="checkPart"]').val();
            var id = $panel.find('[data-name="id"]').val()
            id!=='undefined' && (item.id = id);
            ret.push(item);
        })
        return ret;
    }

    function submitForm(form, interface) {
        var jsonArr = form.serializeArray(),
            json = {};
        for (var i=0; i < jsonArr.length; i++) {
            json[jsonArr[i].name] = jsonArr[i].value;
        }
        json.examinationDetail = serializePanel();
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

    function addChildrenItem(popWin) {
        $.iPopWin('./pages/exams/childrenItem.html',{
            title: '新建子项目',
            btns: [
                {
                    text: '确定',
                    click: function(){
                        var form = $('#item_detail');
                        //校验
                        if (!form.validationEngine('validate')) {
                            return false;
                        }
                        var jsonArr = form.serializeArray(),
                            json = {};
                        for (var i=0; i < jsonArr.length; i++) {
                            json[jsonArr[i].name] = jsonArr[i].value;
                        }
                        makeChildrenItem(popWin, json);
                    }
                }
            ]
        })
    }

})()
