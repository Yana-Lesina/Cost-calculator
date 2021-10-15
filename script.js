'use strict';

const isNumber = function (num) {
  return !isNaN(num) && isFinite(num) && num !== null  
}


const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',

  asking: function() {
  appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
  appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные')

  do {
    appData.screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?', '20000'))
  }  while (!isNumber(appData.screenPrice))
    
  appData.adaptive = confirm('Нужен ли адаптив на сайте?', 'да')
  },

  getAllServicePrices: function() {
  let sum = 0
  let price = 0
  
  for (let i = 0; i < 2; i++) {

    if(i === 0) {
      appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1')
    } else if (i === 1) {
      appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2')
    }

    do {
      price = parseFloat(prompt('Сколько это будет стоить?'))
    } while (!isNumber(price))
    
    sum += price
  }
  return sum
  },

  getFullPrice: function() {
  return appData.screenPrice + appData.allServicePrices;
  },


  getServicePercentPrices: function() {
  return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));
  },

  getTitle: function() { 
  appData.title = appData.title.trim().toLowerCase();
  appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
  return appData.title
  },

  getRollbackMessage: function(price) {
  if(price >= 30000){
      return 'Даём скидку в 10%';

  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';

  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена'; 

  } else {
    return 'Что то пошло не так:(';
  }
  },



  start: function() {
    appData.asking();

    appData.allServicePrices = appData.getAllServicePrices()
    appData.fullPrice = appData.getFullPrice()
    appData.servicePercentPrice = appData.getServicePercentPrices()
    appData.title = appData.getTitle()

    appData.logger()
  }, 

  logger: function() {
    for(let key in appData) {
      console.log('Ключ: ' + key + ' Значение: ' + appData[key])
    }
  }
}


appData.start()