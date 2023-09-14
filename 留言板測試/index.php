<?php
	//設置時區
	date_default_timezone_set('PRC');
	//讀取內容
	@$string=file_get_contents('message.txt');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>留言板</title>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.2/css/bootstrap.min.css' integrity='sha512-CpIKUSyh9QX2+zSdfGP+eWLx23C8Dj9/XmHjZY2uDtfkdLGo0uY12jgcnkX9vXOgYajEKb/jiw67EYm+kBf+6g==' crossorigin='anonymous'/>
    <style>
        body{
            background: url(images/FPDReFlX0AUD94A.jpg) no-repeat center/cover;
        }
        .container{
            width: 100vw;
            height: 100vh;
        }
        li{
            list-style: none;
        }
        .row>div{
            background: rgba(255,255,255,.5)
        }
    </style>
</head>
<body>
    <section class="container d-flex align-items-center">
        <div class="row m-0 w-100 h-75">
            <div class="col-12 col-md h-100 d-flex flex-column align-items-center border border-dark rounded-3 border-2 p-5">
                <h1>基於文件的留言本演示</h1>
                <form class="w-100" action="write.php" method="post">
                    <div>用戶名：</div>
                    <input class="w-100" type="text" name="username">
                    <div>留言內容：</div>
                    <textarea class="w-100" name="content"></textarea>
                    <div class="w-100 text-center"><input type="submit" value="提交"/></div>
                    
                </form>
            </div>
            <div class="col-12 col-md h-100 border border-dark rounded-3 border-2 ms-4 p-5">
                <ul>
                    <?php 
                    //如果$string不爲空的時候執行，也就是message.txt中有留言數據
                    if(!empty($string)){
                        //每一段留言有一個分隔符，但是最後多出了一個&^。因此，我們需要將$^刪掉
                        $string=rtrim($string,'&^');
                        //以&^切成數組
                        $arr=explode('&^',$string);
                        //將留言內容讀取
                        foreach($arr as $value){
                            list($username,$content,$time)=explode('$#',$value);
                            echo '<li><div>'.date('Y-m-d H:i:s',$time).'<font class="ms-1 fw-bold">'.$username.':</font></div><font color="black">'.$content.'</font></li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            
        </div>
    </section>
    


</body>
</html>

