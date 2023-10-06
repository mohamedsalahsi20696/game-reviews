export class Login {
    constructor() {

        this.mode = document.getElementById('mode');
        this.mode.addEventListener('click', this.changeMode.bind(this));
        this.getMode();
        
        this.inputs = document.querySelectorAll('input');
        this.btnLogin = document.getElementById('btnLogin');

        this.btnLogin.addEventListener('click', this.preventDefaultBtn.bind(this));

        this.inputs[0].addEventListener('input', this.validationEmail.bind(this));
        this.inputs[1].addEventListener('input', this.validationPass.bind(this));

        this.formData = document.querySelector('form');
        // this.formData.addEventListener('input', this.validationForm.bind(this));

        this.alertMsg = document.getElementById('msg');
        this.isValid = false;
    }

    getMode() {
        if (localStorage.getItem("theme") != null) {
            const theme = localStorage.getItem("theme");

            if (theme === "light") {
                this.mode.classList.replace("fa-sun", "fa-moon");
            } else {
                this.mode.classList.replace("fa-moon", "fa-sun");
            }

            document.documentElement.setAttribute('data-theme', theme);
        }
    }


    changeMode() {

        // documentElement ==> كله html كده انا ماسك الاب الى هو ال 
        if (this.mode.classList.contains('fa-sun')) {
            document.documentElement.setAttribute('data-theme', 'light');
            this.mode.classList.replace('fa-sun', 'fa-moon')
            localStorage.setItem("theme", "light");
        }
        else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.mode.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem("theme", "dark");
        }
    }

    preventDefaultBtn() {
        this.formData.addEventListener('submit', function (e) {
            e.preventDefault();
        })

        if (this.validationForm()) {
            this.setForm();
        }
    }

    setForm() {
        const user = {
            email: this.inputs[0].value,
            password: this.inputs[1].value,
        }
        this.loginForm(user);
    }

    async loginForm(userData) {
        const api = await fetch('https://sticky-note-fe.vercel.app/signin', {
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const response = await api.json();

        if (response.message === 'success') {
            this.alertMsg.classList.add('d-none');
            localStorage.setItem('uToken', response.token);
            location.href = `./home.html?userName=${response.user.first_name + ' ' + response.user.last_name}`;
        }
        else {
            this.alertMsg.innerHTML = response.message;
            this.alertMsg.classList.remove('d-none');
        }
    }

    // =============> Validation ===============>
    validationForm() {

        if (this.validationEmail() & this.validationPass()) {
            this.isValid = true;
            return true;
        }
        else {
            this.isValid = false;
            return false;
        }
    }

    validationEmail() {
        const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

        if (regexStyle.test(this.inputs[0].value)) {

            this.inputs[0].classList.add('is-valid');
            this.inputs[0].classList.remove('is-invalid');
            return true;
        }
        else {

            this.inputs[0].classList.add('is-invalid');
            this.inputs[0].classList.remove('is-valid');
            return false;
        }
    }

    validationPass() {
        const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if (regexStyle.test(this.inputs[1].value)) {

            this.inputs[1].classList.add('is-valid');
            this.inputs[1].classList.remove('is-invalid');
            return true;
        }
        else {

            this.inputs[1].classList.add('is-invalid');
            this.inputs[1].classList.remove('is-valid');
            return false;
        }
    }

}

let login = new Login();
