const mortgageAmountInput = document.querySelector('.amout-input');
const yearsInput = document.querySelector('.year-input');
const percentageInput = document.querySelector('.percent-input');
const calculateButton = document.querySelector('.button');
const mortgageType = document.querySelectorAll('.radio');
const errorMsgs = document.querySelectorAll('.error-msg');
const resultContainer = document.querySelector('.result-container');
const clearAll = document.querySelector('.clear');
let type = '';




Array.from(mortgageType).map(input => {
  input.addEventListener('click', (e) => {
    type = e.target.value;
  });
});



calculateButton.addEventListener('click', () => {
  const amount = mortgageAmountInput.value;
  const term = yearsInput.value;
  const rate = percentageInput.value;
  const type_ = type;
  const arr = [amount, term, rate, type_];

  arr.forEach((inputValue, index) => {
    if (inputValue === '') {
      errorMsgs[index].textContent = 'This field is required';

    } else {
      errorMsgs[index].textContent = '';
    }
  });

  const allInputs = [mortgageAmountInput, yearsInput, percentageInput];
  for (let i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value === '') {
      allInputs[i].classList.add('input-border')
    } else {
      allInputs[i].classList.remove('input-border')
    }
  }



  //Mortgage Calculator logics...
  let monthlyRate = rate / 100 / 12;
  let numberOfPayments = term * 12;
  let monthlyRepayments;
  let totalRepayment;


  if (type_ === 'repayment') {
    monthlyRepayments = amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    totalRepayment = monthlyRepayments * numberOfPayments;
  } else if (type_ === 'interestOnly') {
    monthlyRepayments = amount * monthlyRate;
    totalRepayment = monthlyRepayments * numberOfPayments;
  }; //end of Mortgage Calculator logics...

  if (monthlyRepayments === undefined || totalRepayment === undefined) {
    console.log('An error occurred during the calculation. Please check your inputs.');
    return;
  }
  resultContainer.innerHTML =
    `
        <div class="final-result-container">
            <h1>Your results</h1>
            <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and
              click "Calculate repayments" again.</p>
            <div class="display-container">
              <h3>Your monthly repayments</h3>
              <h1>₹${monthlyRepayments.toFixed(2)}</h1>
              <hr>
              <h3>Total you'll repay over the term</h3>
              <h2>₹${totalRepayment.toFixed(2)}</h2>
            </div>
          </div>
    
      `
});

clearAll.addEventListener('click', () => {
  mortgageAmountInput.value = '';
  yearsInput.value = '';
  percentageInput.value = '';
  type = '';
  resultContainer.innerHTML =
    `
    <div class="empty-result-container">
        <img src="assets/images/illustration-empty.svg" alt="">
        <h1>Results shown here</h1>
        <p>Complete the form and click "Calculate Repayments" to see what your monthly repayment would be.</p>
      </div>
  `

})

let activeInput = null;
mortgageType.forEach(input => {
  input.addEventListener('click', () => {
    if (activeInput) {
      activeInput.parentElement.classList.remove('active');

    }
    input.parentElement.classList.add('active');
    activeInput = input;
  })
})


