<?
	require_once($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include/prolog_before.php");

	global $USER;


	$action=isset($_POST['action'])?$_POST['action']:$_GET['action'];
	$is_auth=$USER->IsAuthorized();
	$res=array('res'=>false,'auth'=>$is_auth);

if ($action == 'need_to_cheaper_form') {
    if (
        isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['product_name']) && isset($_POST['product_link']) && isset($_POST['comment']) &&
        !empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['email']) && !empty($_POST['product_name']) && !empty($_POST['product_link']) && !empty($_POST['comment']) &&
        strlen($_POST['name']) >= 3 && strlen($_POST['phone']) >= 3 && strlen($_POST['email']) >= 3 && strlen($_POST['product_name']) >= 3 && strlen($_POST['product_link']) >= 3 && strlen($_POST['comment']) >= 3
    ) {
        if (!empty($_FILES['file']['tmp_name'])) {
            //здесь проверяем расширение (картинка):
            if (strripos($_FILES['file']['type'], 'image') !== false) {
                if ($_FILES['file']['size'] <= 5242880) {


                    // Закачиваем файл в /tmp_img
                    $name = $_FILES['file']['name'];
                    $uploads_dir = $_SERVER['DOCUMENT_ROOT'] . '/tmp_img';
                    $is_moved = move_uploaded_file($_FILES['file']['tmp_name'], "$uploads_dir/$name");

                    if ($is_moved) {
                        $preview_picture_img_path = $_SERVER["DOCUMENT_ROOT"] . "/tmp_img/" . $name;
                    } else {
                        $preview_picture_img_path = '';
                    }
                }
            }
        }
        if (CModule::IncludeModule("iblock")) {
            $el = new CIBlockElement;
            $PROP = Array();
            $PROP['EMAIL'] = $_POST["email"];
            $PROP['PHONE'] = $_POST['phone'];
            $PROP['NAME_PRODUCT'] = $_POST["product_name"];
            $PROP['LINK_PRODUCT'] = $_POST["product_link"];
            //  $_FILES = $_FILES; //Свойство файл
            $PROP['DATE'] = ConvertTimeStamp(time() + CTimeZone::GetOffset(), "FULL");

            $arLoadProductArray = Array(
                "MODIFIED_BY" => $USER->GetID(), // элемент изменен текущим пользователем
                "IBLOCK_SECTION_ID" => false,   // элемент лежит в корне раздела
                "IBLOCK_ID" => 21,             // id инфоблока, который вы создали
                "PROPERTY_VALUES" => $PROP,
                "NAME" => $_POST['name'],             // имя пользователя будет именем элемента
                "ACTIVE" => "Y",            // активность
                "PREVIEW_TEXT" => $_POST['comment'],   // отзыв клиента
                "PREVIEW_PICTURE" => CFile::MakeFileArray($preview_picture_img_path), //изображение для анонса
            );
            if ($PRODUCT_ID = $el->Add($arLoadProductArray)) {
                $res['res'] = true;
            } else {
                $res['res'] = false;

            }
        }
    }
}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($res);

	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");
