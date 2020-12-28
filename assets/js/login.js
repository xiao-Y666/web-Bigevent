$(function () {
    //点击去注册按钮
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录按钮
    $('#link_login').on('click', () => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码需为6-12位，且不能有空格'],
        //检验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    //注册表单设置监听事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                //模拟人的点击行为
                $('#link_login').click();
                // $('#form-reg').val('').trim();
            }
        })
    })

    //登录表单设置监听事件

    $('#form-login').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！');
                //将登录成功得到的token字符串，保存到localStroage中
                localStorage.setItem('token', res.token);
                //跳转到后台页面
                location.href = '/index.html';
            }
        })
    })
})