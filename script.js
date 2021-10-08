'use strict';

//============================================
//  Переменные 
//============================================
let title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?', '1200'));
let adaptive = prompt('Нужен ли адаптив на сайте?', 'да');

//дополнительные услуги
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1');
let servicePrice1 = parseFloat(prompt('Сколько это будет стоить?'));
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2');
let servicePrice2 = parseFloat(prompt('Сколько это будет стоить?'));
let allServicePrices;

let fullPrice;

let rollback = 10;

let rollbkPercentg;//Процент отката посреднику за работу
let servicePercentPrice;//Итог. сто-ть за вычетом процента отката

//============================================
//  Описание функций 
//============================================

const getAllServicePrices = function(srvPrice1, srvPrice2) {
  return srvPrice1 + srvPrice2;
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
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

fullPrice = getFullPrice(screenPrice, allServicePrices);

rollbkPercentg = fullPrice * (rollback/100);

title = getTitle(title);

servicePercentPrice = getServicePercentPrices(fullPrice, rollbkPercentg);


//============================================
//  Консолька 
//============================================
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

screens = screens.toLowerCase(); //приведение строки к нижнему регистру
console.log(screens.split(', ')); //разбиение на массив

console.log(getRollbackMessage(fullPrice));

console.log(getServicePercentPrices(fullPrice, rollbkPercentg));