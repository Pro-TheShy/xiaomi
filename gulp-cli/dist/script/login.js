var loginModule = (function(){
    var ipt = $1('.ipt');
    var pass = $1('.pass');
    var loginImg = $1('.login-img');
    ajax({
        url: '../data/login.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            var json = JSON.parse(json);
            loginImg.onclick = function () {
                console.log(json);
                if (!ipt.value || !pass.value) {
                    alert('亲,账号或者密码不能为空哦');
                    return false;
                }
                if (ipt.value !== json.userName || pass.value !== json.pass){
                    alert('亲,别输了,老是错.账号:xiaocuo,密码:123456');
                    return false;
                } else {
                    alert('终于输对了啊,亲');
                }
                
            }
        }

    });
})()