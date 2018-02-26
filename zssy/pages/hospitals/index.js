//@ sourceURL=hospitals.js
(function(){
    
    var hospitalId;
    var exams_add = $('#exams_add');
    var exams_edit = $('#exams_edit');
    var exams_delete = $('#exams_delete');
    var operateField = $('.g_operatedField');

    $('.g_operatedField').on('click', function(e){
        if (e.target.id === 'exams_add') {
            handleAdd();
        } else if (e.target.id === 'exams_edit') {
            handleEdit();
        } else if (e.target.id === 'exams_delete') {
            handleDelete();
        }
    })
    
    handleDetail();

    function handleDetail() {
        exams_add.remove();
        exams_edit.remove();
        exams_delete.remove();
        $.ajax({
            url: CONFIG.PLATFORMURL + 'hospital/getHospital',
            success: function(result){
                var context = $('#hospital_detail');
                if (result.resultCode == 0){
                    $.each(result.result, function(key, value) {
                        if (key === 'id') {
                            hospitalId = value;
                        }
                        context.find('#hospitals_' + key).val(value).attr('title', value);
                    })
                    operateField.append(exams_edit);
                    operateField.append(exams_delete);
                } else {
                    operateField.append(exams_add);
                    context.find('input, textarea').val('').attr('title', '');
                }
            }
        })
    }

    function handleAdd(){
        submitForm('hospital/addHospital');
    }

    function handleEdit() {
        submitForm('hospital/updHospital');
    }
    
    function submitForm(interface) {
        var form = $('#hospital_detail');
        //校验
        if (!form.validationEngine('validate')) {
            return false;
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
                    handleDetail();
                }
            }
        })
    }

    function handleDelete() {
        $.iConfirm('提示', '确认删除?', function(){
            $.ajax({
                url: CONFIG.PLATFORMURL + 'hospital/delHospital',
                type: 'POST',
                data: JSON.stringify({
                    id: hospitalId
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
