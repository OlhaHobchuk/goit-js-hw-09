import Notiflix from 'notiflix';


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
      resolve({ position, delay })
      }
      reject({ position, delay })
    }, delay)

})

}

const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onFormInput);

const formData = {};

function onFormInput(event) {
 formData[event.target.name] = event.target.value;
  console.log(formData);
}


function onFormSubmit(event) { 
  event.preventDefault();
  createAmountOfPromises()
}

function createAmountOfPromises() {
  const { delay, step, amount } = formData;

  const amountOfPromises = Number(amount);
  let firstDelay = Number(delay);
  const secondAndNextDelayes = Number(step);
  for (let i = 1; i <= amountOfPromises; (i += 1, firstDelay += secondAndNextDelayes)) {
    
    createPromise(i, firstDelay).then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}


