//@ sourceURL=reports.js
(function(){
	var Table = $('#m_reportsTable').DataTable($.extend(true, {
        serverSide: true,
        ajax: {
            url: CONFIG.PLATFORMURL + 'examination/getReportInfo',
            type: 'POST',
            data: function(status){
                return JSON.stringify({
                    regDate: $('#inputRegDate').val(),
                    patIdCard: $('#inputPatIdCard').val(),
                    status: $('#inputStatus').val(),
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
                data: 'orderNo',
                title: '平台订单号',
                sortable: false
            },
            {
                data: 'reportCode',
                title: '体检报告编码',
                sortable: false
            },
            {
                data: 'status',
                title: '状态',
                sortable: false,
                render: function(data){
                    if (data == 0) {
                        return '<span class="label label-primary">未体检</span>';
                    } else if (data == 1) {
                        return '<span class="label label-success">已体检</span>';
                    }
                }
            },
            {
                data: 'regDate',
                title: '体检日期',
                sortable: false
            },
            {
                data: 'patName',
                title: '患者姓名',
                sortable: false
            },
            {
                data: 'patIdCard',
                title: '患者身份证号码',
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
                data: 'itemTotal',
                title: '检查项目总数',
                sortable: false
            },
            {
                data: 'reportTime',
                title: '报告生成时间',
                sortable: false
            },
            {
                data: 'id',
                title: '操作',
                sortable: false,
                render: function(data, type, rowData, setting){
                    return '<div><button class="btn btn-sm btn-primary btn-handle btn-detail"">查看</button>'+
                    '<button class="btn btn-sm btn-warning btn-handle btn-edit">编辑</button></div>'
                }
            }
        ]
    }, CONFIG.dataTableConf));

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

    //查看编辑按钮
    $('#m_reportsTable').on('click', function(e){
        var btn = e.target;
        if (btn.nodeName !== 'BUTTON') return;
        var data = Table.row($(btn).parents('tr')).data();
        if (btn.classList.contains('btn-detail')) {
            handleDetail(data);
        } else if (btn.classList.contains('btn-edit')) {
            handleEdit(data);
        }
    })
    
    //查询
    $('#queryReports').on('click', function(){
        Table.draw();
    })
    
    function handleDetail(data) {
        $.ajax({
            url: CONFIG.PLATFORMURL + 'examination/getReportDetail',
            type: 'POST',
            data: JSON.stringify({reportCode: data.reportCode}),
            success: function(result) {
                if (result.resultCode == 0) {
                    $.iPopWin('pages/reports/detail.html', {
                        title: '查看',
                        readOnly: true,
                        idPrefix: 'reports',
                        data: {aaData: result.result},
                        width: '50vw',
                        before: function(popWin){
                            result.result.examinationReportDetail.forEach(function(item){
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
            url: CONFIG.PLATFORMURL + 'examination/getReportDetail',
            type: 'POST',
            data: JSON.stringify({reportCode: data.reportCode}),
            success: function(result) {
                if (result.resultCode == 0) {
                    $.iPopWin('pages/reports/detail.html', {
                        title: '编辑',
                        idPrefix: 'reports',
                        data: {aaData: result.result},
                        width: '50vw',
                        before: function(popWin){
                            result.result.examinationReportDetail.forEach(function(item){
                                makeChildrenItem(popWin, item);
                            })
                        },
                        btns: [
                            {
                                text: '确定',
                                click: function(){
                                    var form = $('#report_detail');
                                    //校验
                                    if (!form.validationEngine('validate')) {
                                        return false;
                                    }
                                    submitForm(form, 'examination/updReportDetail');
                                }
                            }
                        ]
                    })
                }
            }
        })
    }

    //创建子项目
    function makeChildrenItem(popWin, item) {
        var temp = `<div class="panel panel-default">
            <div class="panel-heading" style="position: relative;">
                <a role="button" data-toggle="collapse" data-parent="#examinationReportDetail" href="#${item.id}">
                    <h4 class="panel-title">
                    ${item.itemName}
                    </h4>
                </a>
            </div>
            <div id="${item.id}" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="form-group">
                        <label for="dCode_${item.id}" class="col-sm-2 control-label">医生编号:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.doctorCode}" title="${item.doctorCode}" class="form-control validate[required]" data-name="doctorCode" id="dCode_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dName_${item.id}" class="col-sm-2 control-label">医生姓名:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.doctorName}" title="${item.doctorName}" class="form-control validate[required]" data-name="doctorName" id="dName_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="range_${item.id}" class="col-sm-2 control-label">参考范围:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.range}" title="${item.range}" class="form-control validate[required]" data-name="range" id="range_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="result_${item.id}" class="col-sm-2 control-label">结果:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.result}" title="${item.result}" class="form-control validate[required]" data-name="result" id="result_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="abnormal_${item.id}" class="col-sm-2 control-label">结果异常提示:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.abnormal}" title="${item.abnormal}" class="form-control validate[required]" data-name="abnormal" id="abnormal_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="focus_${item.id}" class="col-sm-2 control-label">重点关注:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.focus}" title="${item.focus}" class="form-control validate[required]" data-name="focus" id="focus_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="finding_${item.id}" class="col-sm-2 control-label">检查所见:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.finding}" title="${item.finding}" class="form-control validate[required]" data-name="finding" id="finding_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="advise_${item.id}" class="col-sm-2 control-label">医生建议:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.advise}" title="${item.advise}" class="form-control validate[required]" data-name="advise" id="advise_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="followUp_${item.id}" class="col-sm-2 control-label">后续医疗:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.followUp}" title="${item.followUp}" class="form-control validate[required]" data-name="followUp" id="followUp_${item.id}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="mattersNeedAttention_${item.id}" class="col-sm-2 control-label">注意事项:</label>
                        <div class="col-sm-9">
                            <input type="text" value="${item.mattersNeedAttention}" title="${item.mattersNeedAttention}" class="form-control validate[required]" data-name="mattersNeedAttention" id="mattersNeedAttention_${item.id}">
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" data-name="id" value=${item.id} />
            <input type="hidden" data-name="reportCode" value=${item.reportCode} />
            <input type="hidden" data-name="itemName" value=${item.itemName} />
        </div>`;
        var panel = $(temp);
        popWin.find('#examinationReportDetail').append(panel);

    }

    //序列化子项目
    function serializePanel(){
        var ret = [];
        var context = $('#examinationReportDetail');
        var panels = context.find('.panel');
        panels.each(function(index, panel){
            var item = {};
            var $panel = $(panel);
            item.itemName = $panel.find('[data-name="itemName"]').val();
            item.reportCode = $panel.find('[data-name="reportCode"]').val();
            item.doctorCode = $panel.find('[data-name="doctorCode"]').val();
            item.doctorName = $panel.find('[data-name="doctorName"]').val();
            item.range = $panel.find('[data-name="range"]').val();
            item.result = $panel.find('[data-name="result"]').val();
            item.abnormal = $panel.find('[data-name="abnormal"]').val();
            item.focus = $panel.find('[data-name="focus"]').val();
            item.finding = $panel.find('[data-name="finding"]').val();
            item.advise = $panel.find('[data-name="advise"]').val();
            item.followUp = $panel.find('[data-name="followUp"]').val();
            item.mattersNeedAttention = $panel.find('[data-name="mattersNeedAttention"]').val();
            item.id = $panel.find('[data-name="id"]').val()
            ret.push(item);
        })
        return ret;
    }

    function submitForm(form, interface) {
        var jsonArr = serializePanel();
        $.ajax({
            url: CONFIG.PLATFORMURL + interface,
            data: JSON.stringify(jsonArr),
            type: 'POST',
            success: function(result) {
                if (result.resultCode == 0) {
                    Table.draw();
                }
            }
        })
    }

})()
