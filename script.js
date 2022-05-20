const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

const calculate = () => {
	fetch(
		`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`
	)
		.then((res) => res.json())
		.then((data) => {
			//changing api returning value to json

			const currency1 = currencyOne.value;
			const currency2 = currencyTwo.value;
			//value of inputs

			const rate = data.rates[currency2];
			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
			amountTwo.value = (amountOne.value * rate).toFixed(2);
			//downloading value from inputs and calculating exchaning rate
		});
};

const swap = () => {
	const newValue = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = newValue;
	calculate();

	//function that swap currencies one and two
};

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap);

calculate();
//function must be start at the beggining otherwise we couldnt see exchange rate from start
