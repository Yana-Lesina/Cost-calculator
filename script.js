'use strict';

//============================================
//  Переменные 
//============================================
let title
let screens
let screenPrice
let adaptive
let service1
let service2
let allServicePrices
let fullPrice
let rollback = 10
let rollbkPercentg;//Процент отката посреднику за работу
let servicePercentPrice;//Итог. сто-ть за вычетом процента отката

//============================================
//  Описание функций 
//============================================
const isNumber = function (num) {
  return !isNaN(num) && isFinite(num) && num !== null
  //ВОПРОС можно ли убрать parseFloat?? в уроке было так: return !isNaN(parseFloat(num)) && isFinite(num) && num !== null 
 //мне кажетсяя оно стало лишним потому что я добавила parseFloat к prompt
  
}

const asking = function() {
  title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')

  do {
    screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?', '1200'))
  }  while (!isNumber(screenPrice))
    
  adaptive = confirm('Нужен ли адаптив на сайте?', 'да')
}


const getAllServicePrices = function() {
  let sum = 0
  let checkVar
  

  for (let i = 0; i < 2; i++) {

    if(i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1')
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2')
    }

    do {
      checkVar = parseFloat(prompt('Сколько это будет стоить?'))
    } while (!isNumber(checkVar))
    
    sum += checkVar
  }
  return sum
};

const getTitle = function(ttle) { 
  ttle = ttle.trim().toLowerCase();
  ttle = ttle[0].toUpperCase() + ttle.slice(1);
 
  return ttle;
};


const getServicePercentPrices = function(vFulPrice, rlbkPerstg) {
  return Math.ceil(vFulPrice - rlbkPerstg);
};


const getRollbackMessage = function(price) {
  if(price >= 30000){
      return 'Даём скидку в 10%';

  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';

  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена'; 

  } else {
    return 'Что то пошло не так:(';
  }
};


function getFullPrice(scrPrice, allSrvPrice) {
  return scrPrice + allSrvPrice;
}


const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
};


//============================================
//  Функционал 
//============================================
asking();

allServicePrices = getAllServicePrices()
fullPrice = getFullPrice(screenPrice, allServicePrices)
rollbkPercentg = fullPrice * (rollback/100)
servicePercentPrice = getServicePercentPrices(fullPrice, rollbkPercentg)
title = getTitle(title)


//============================================
//  Консолька 
showTypeOf(title)
showTypeOf(screens)
showTypeOf (screenPrice)
showTypeOf(adaptive)
showTypeOf(fullPrice)
showTypeOf(servicePercentPrice)


console.log('allServicePrices', allServicePrices)

screens = screens.toLowerCase(); //приведение строки к нижнему регистру
console.log(screens.split(', ')); //разбиение на массив

console.log(getRollbackMessage(fullPrice));

console.log(getServicePercentPrices(fullPrice, rollbkPercentg));