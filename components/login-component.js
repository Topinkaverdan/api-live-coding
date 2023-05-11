export function renderLoginComponent({ appEl, setToken, fetchTodosAndRender}) {
    const appHtml = `<h3 class="form-title">Форма регистрации</h3>
                <div class="form-row">
                    Логин
                <input
                type="text"
                id="login-input"
                class="input"
                />
                <br/><br/>
                Пароль 
                <input
                type="text"
                id="login-input"
                class="input"
                />
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
                    </div>`
        
        appEl.innerHTML = appHtml;
        document.getElementById("login-button").addEventListener('click', () => {

            setToken("Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck")
           
            fetchTodosAndRender();

        });
}