'use strict';

//Переменные 
let title = prompt('Как называется ваш проект?', 'Новый проект');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?', '1200'));
let rollback = 73;
let fullPrice;

let adaptive = prompt('Нужен ли адаптив на сайте?');
//приведение переменной adaptive к булевому типу явным способом
switch(adaptive) {
    case 'да':
    case 'Да':
    case 'нужен':
    case 'Нужен':
      adaptive = true;
      break;
    case 'нет':
    case 'Нет':
    case 'не нужен':
    case 'Не нужен':
      adaptive = false;
      break;
    default: 
      console.log('Некорректный ввод');
      adaptive = false;
      break;
}


//Задание дополнительных услуг
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1');
let servicePrice1 = parseFloat(prompt('Сколько это будет стоить?'));

let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2');
let servicePrice2 = parseFloat(prompt('Сколько это будет стоить?'));



fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback/100)); 

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей/долларов/гривен/юани');

console.log('Процент отката посреднику за работу: ' + fullPrice * (rollback/100));
console.log('Итоговая стоимость за вычетом процента отката: ' + servicePercentPrice);


//Конструкция условий
if(fullPrice >= 30000){
    console.log('Даём скидку в 10%');

} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');

} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log('Скидка не предусмотрена'); 

} else {
  console.log('Что то пошло не так:(');

}



//Вывод типа данных переменных
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

//Вывод длины строки
console.log(screens.length);

//Приведение строки screens к нижнему регистру и её разбиение на массив, вывести массив в консоль
screens = screens.toLowerCase(); //приведение к регистру
console.log(screens.split(', ')); //разбиение на массив
