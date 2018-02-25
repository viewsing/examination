//@ sourceURL=hospitals.js
(function(){

    handleDetail();

    $('#exams_add').on('click', handleAdd);
    $('#exams_edit').on('click', handleEdit);
    $('#exams_delete').on('click', handleDelete);

    function handleDetail() {
        $.ajax({
            url: CONFIG.PLATFORMURL + 'hospital/getHospital',
            success: function(result){
                if (result.resultCode == 0){
                    var context = $('#hospital_detail');
                    $.each(result.result, function(key, value) {
                        context.find('#hospitals_' + key).val(value).attr('title', value);
                    })
                    $('#exams_add').remove();
                } else {
                    $('#exams_edit').remove();
                    $('#exams_delete').remove();
                }
            }
        })
    }

    function handleAdd(){

    }

    function handleEdit() {
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
                            formData.append('file', file);
                            uploadPic = $.ajax({
                                url: CONFIG.PLATFORMURL + 'hospital/upload',
                                data: formData,
                                processData: false,
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
    
    function submitForm() {
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
            success: function(result) {
                if (result.resultCode == 0) {
                    Table.draw();
                }
            }
        })
    }

    function handleDelete() {
        $.iConfirm('提示', '确认删除?', function(){
            $.ajax({
                url: CONFIG.PLATFORMURL + 'hospital/delHospital',
                data: JSON.stringify({
                    id: data.id
                }),
                success: function(result) {
                    if (result.resultCode == 0) {
                        handleDetail();
                    }
                }
            })
        });
    }
})()
