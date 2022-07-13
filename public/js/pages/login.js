import { isValid } from "../components/isValid.js";

const formDOM = document.querySelector('.form');
const formControlsDOM = formDOM.querySelectorAll('.form-control')
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', async (e) => {
        e.preventDefault();
        notificationsDOM.classList.remove('success', 'show');
        formControlsDOM.forEach(contr => {
            contr.classList.remove('success', 'error');
        });

        const data = {};
        const errors = [];
        let i = 0;
        for (const inputDOM of inputsDOM) {
            const rule = inputDOM.dataset.validation;
            const [err, msg] = isValid[rule](inputDOM.value);
            if (err) {
                errors.push(msg);
                formControlsDOM[i].classList.add('error');
            } else {
                data[inputDOM.name] = inputDOM.value;
                formControlsDOM[i].classList.add('success');
            }
            i++;
        }

        if (errors.length) {
            notificationsDOM.classList.add('show');
            notificationsDOM.innerText = errors.join('.\n') + '.';
        } else {
            const response = await fetch(formDOM.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const resBody = await response.json();
            switch (resBody.msgType) {
                case 'error':
                    notificationsDOM.innerText = resBody.msg;
                    notificationsDOM.classList.remove('success');
                    notificationsDOM.classList.add('show');
                    break;
                case 'success':
                    notificationsDOM.innerText = resBody.msg;
                    notificationsDOM.classList.add('success', 'show');
                    break;
                case 'redirect':
                    location.href = resBody.href;
                    break;
                default:
                    console.log('Message Type not found: ', resBody.msgType);
                    break;
            }
        }
    })
}