export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'Success',
            failure: 'Failure'
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    clearMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
            input.addEventListener('keypress', function (event) {
                if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    event.preventDefault();
                }
            });
        });
    }

    initMask() {
        function setCursorPosition(position, element) {
            element.focus();

            if (element.setSelectionRange) {
                element.setSelectionRange(position, position);
            } else if (element.createTextRange) {
                let range = element.createTextRange();

                range.collapse(true);
                range.moveEnd('character', position);
                range.moveStart('character', position);
                range.select();
            }
        }

        function createMask(event) {
            let matrix = '+1 (___) ___ __ __',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length > val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }

        }

        let inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    init() {
        this.clearMailInputs();
        this.initMask();
        this.forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 3000)
                    });
            });
        });
    }
}
