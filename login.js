document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    // 密码显示切换
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.querySelector('i').className = `ri-eye${type === 'password' ? '-off' : ''}-line`;
    });

    // 表单验证
    function validateUsername(username) {
        if (!username) {
            usernameError.textContent = '用户名不能为空';
            usernameError.classList.add('show');
            return false;
        }
        if (username.length < 6) {
            usernameError.textContent = '用户名长度不能小于6个字符';
            usernameError.classList.add('show');
            return false;
        }
        if (username.length > 20) {
            usernameError.textContent = '用户名长度不能超过20个字符';
            usernameError.classList.add('show');
            return false;
        }
        usernameError.classList.remove('show');
        return true;
    }

    function validatePassword(password) {
        if (!password) {
            passwordError.textContent = '密码不能为空';
            passwordError.classList.add('show');
            return false;
        }
        if (password.length < 8) {
            passwordError.textContent = '密码长度不能小于8个字符';
            passwordError.classList.add('show');
            return false;
        }
        if (password.length > 20) {
            passwordError.textContent = '密码长度不能超过20个字符';
            passwordError.classList.add('show');
            return false;
        }
        passwordError.classList.remove('show');
        return true;
    }

    // 实时验证
    usernameInput.addEventListener('input', function() {
        validateUsername(this.value);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });

    // 表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (isUsernameValid && isPasswordValid) {
            // 这里添加登录逻辑
            console.log('登录验证中...');
            
            // 模拟登录请求
            const loginButton = this.querySelector('.login-button');
            const originalText = loginButton.innerHTML;
            
            loginButton.disabled = true;
            loginButton.innerHTML = `
                <span>登录中</span>
                <i class="ri-loader-4-line rotating"></i>
            `;

            // 模拟API请求
            setTimeout(() => {
                // 登录成功后跳转
                window.location.href = 'member.html';
            }, 1500);
        }
    });

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotating {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        .rotating {
            animation: rotating 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
}); 