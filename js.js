	$('.need_to_cheaper_link').click(function(e){
		e.preventDefault();
		var product_url=$(this).data('url');
		var product_name=$(this).data('name');
		var mess='';
		mess+='<form class="form-need_to_cheaper" enctype="multipart/form-data">';
		mess+='<div class="form-group"><input type="text" class="form-control" id="need_to_cheaper_name_input_id" placeholder="Ваше имя"></div>';
		mess+='<div class="form-group"><input type="text" class="form-control" id="need_to_cheaper_phone_input_id" placeholder="Телефон"></div>';
		mess+='<div class="form-group"><input type="text" class="form-control" id="need_to_cheaper_email_input_id" placeholder="E-mail"></div>';
		mess+='<div class="form-group"><input type="text" class="form-control" id="need_to_cheaper_name_product_input_id" placeholder="Название товара" value="'+product_name+'"></div>';
		mess+='<div class="form-group"><input type="text" class="form-control" id="need_to_cheaper_link_product_input_id" placeholder="Ссылка на товар другого магазина"></div>';
		mess+='<div class="form-group"><input id="sortpicture" type="file" class="form-control" name="sortpic" /></div>';
		mess+='<div class="form-group"><input type="text" class="form-control" id="need_to_cheaper_comment_input_id" placeholder="Сообщение"></div>';
		mess+='<div id="mitAdditionalOptions">';
		mess+='<p>';
		mess+='<input type="checkbox" id="agreeZayavkaCheaper" checked="checked">';
		mess+='<label>Нажимая кнопку, я даю согласие на обработку своих персональных данных в соответствии с </label>';
		mess+='<a target="_blank" href="/politika-konfidentsialnosti/">Политикой конфиденциальности</a>';
		mess+='</p>';
		mess+='</div>';
		mess+='<span id="btnZayavkaOffCheaper" class="btn">Отправить заявку!</span>';
		mess+='<div id="need_to_cheaper_alert_id"></div>';
		mess+='</form>';

		var dialog;
		dialog=bootbox.dialog({
			show: false,
			message: mess,
			title: '<span class="glyphicon glyphicon-ruble"></span> Нашли дешевле</span>',
			size: "small",
			buttons: {
				success: {
					label: "Отправить заявку!",
					className: "btn-primary btnZayavkaCheaper",
					callback: function() {
						var file_data = $('#sortpicture').prop('files')[0];
						var form_data = new FormData();
						var need_to_cheaper_name_input_id = $("#need_to_cheaper_name_input_id").val();
						var need_to_cheaper_phone_input_id = $("#need_to_cheaper_phone_input_id").val();
						var need_to_cheaper_email_input_id = $("#need_to_cheaper_email_input_id").val();
						var need_to_cheaper_name_product_input_id = $("#need_to_cheaper_name_product_input_id").val();
						var need_to_cheaper_link_product_input_id = $("#need_to_cheaper_link_product_input_id").val();
						var need_to_cheaper_comment_input_id = $("#need_to_cheaper_comment_input_id").val();
						var agreeZayavkaCheaper = $("#agreeZayavkaCheaper").val();
						var need_to_cheaper_form = 'need_to_cheaper_form';
						form_data.append("action", need_to_cheaper_form);
						form_data.append('file', file_data);
						form_data.append('url', product_url);
						form_data.append("name", need_to_cheaper_name_input_id);
						form_data.append("phone", need_to_cheaper_phone_input_id);
						form_data.append("email", need_to_cheaper_email_input_id);
						form_data.append("product_name", need_to_cheaper_name_product_input_id);
						form_data.append("product_link", need_to_cheaper_link_product_input_id);
						form_data.append("comment", need_to_cheaper_comment_input_id);
						form_data.append("agree", agreeZayavkaCheaper);

						$.ajax({
							type: 'POST',
							url: '/include/actions.php',
							data: form_data,
							contentType: false,
							processData: false,
							success: function(data){
								if(data.res){
									bs_alert({div_id:'need_to_cheaper_alert_id',mess:'Ваш запрос отправлен. Спасибо!'});
									setTimeout(function(){bootbox.hideAll()},3000);
								}else{
									bs_alert({div_id:'need_to_cheaper_alert_id',mess:'Пожалуйста, заполните все обязательные поля.'});
								}
							},

						});

						return false;
					}
				}
			}
		});
        dialog.modal('show');
        if($("#agreeZayavkaCheaper").prop("checked") !== true) {
            console.log('test2');
            $(".btnZayavkaCheaper").hide();
            $("#btnZayavkaOffCheaper").show();
        } else {
            $(".btnZayavkaCheaper").show();
            $("#btnZayavkaOffCheaper").hide();
        }
        $('#agreeZayavkaCheaper').click(function () {
            if($("#agreeZayavkaCheaper").prop("checked") !== true) {
                console.log('test2');
                $(".btnZayavkaCheaper").hide();
                $("#btnZayavkaOffCheaper").show();
            } else {
                $(".btnZayavkaCheaper").show();
                $("#btnZayavkaOffCheaper").hide();
            }
        });

    });
