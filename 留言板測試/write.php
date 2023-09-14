<?php
	//追加方式打開文件
	$fp=fopen('message.txt','a');
	//設置時間
	$time=time();
	//得到用戶名
	$username=trim($_POST['username']);
	//得到內容
	$content=trim($_POST['content']);

	//組合寫入的字符串：內容和用戶之間分開，使用$#行與行之間分開，使用&^
	$string=$username.'$#'.$content.'$#'.$time.'&^';
	//寫入文件
	fwrite($fp,$string);
	//關閉文件
	fclose($fp);

	header('location:index.php');
?>