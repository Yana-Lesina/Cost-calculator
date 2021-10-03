//Переменные 
let title = 'My Calculator';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 13;
let rollback = 73;
let fullPrice = 1000;
let adaptive = true;

//Вывод типа данных переменных
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

//Вывод длины строки
console.log(screens.length);

//Вывод строки с конкатенацией
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей/долларов/гривен/юани');

//Приведение строки screens к нижнему регистру и её разбиение на массив, вывести массив в консоль
screens = screens.toLowerCase(); //приведение к регистру
console.log(screens.split(', ')); //разбиение на массив

//Вывод в консоль процента отката посреднику за работу
console.log('Процент отката посреднику за работу: ' + fullPrice * (rollback/100) + '%');