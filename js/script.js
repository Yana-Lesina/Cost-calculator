'use strict';

const isNumber = function (num) {
  return !isNaN(num) && isFinite(num) && num !== null  
}

const isString = function (str) {
  return isNaN(+str)
  //если isNaN = true то действительно строка (вида "10фврпл", "дфывпр12843")
  //если isNaN = false то строку удалось перевести в число (она точно была вида "27436748274")
}

const getElems = function(elems) {
  let arr = []
  
  for (let i = 0; i < elems.length; i++) {
    arr[i] = elems[i]
  }
  return arr
}


const handlBtns = getElems(document.getElementsByClassName('handler_btn'));
const screenBtn = document.querySelector('.screen-btn');

const itemsPers = getElems(document.querySelectorAll('.main-controls__views > .percent'));
const itemsNum = getElems(document.querySelectorAll('.main-controls__views > .number'));

const typeRange = document.querySelector('.rollback > .main-controls__range > input');
const rangeValue  = document.querySelector('.rollback > .main-controls__range > span');

const totalInputs = getElems(document.getElementsByClassName('total-input'));

let screens = (document.querySelectorAll('.screen'))[0]



const appData = {
  title: [],
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},


  start: function() {
    appData.asking();

    appData.addPrices()
    appData.getFullPrice()
    appData.getServicePercentPrices()
    appData.getTitle()

    appData.logger()
  }, 


  asking: function() {

    appData.title = (document.getElementsByTagName('h1'))[0].textContent
    //сокращённо от 
    //appData.title = document.getElementsByTagName('h1') 
    //appData.title = appData.title[0].textContent
    //----------------------------------
    // do {
    //   //appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки')
    // } while (!isString(appData.title))
    
    
    for ( let i = 0; i < 2; i++ ) {   
      let name = ''
      let price = 0

      do {
        name = prompt('Какие типы экранов нужно разработать?')
      } while (!isString(name))

      
      do {
        price = parseFloat(prompt('Сколько это будет стоить?'))
      } while ( !isNumber(price) )

      appData.screens.push( {id: i, name: name, price: price} )
    }
      

    for ( let i = 0; i < 2; i++ ) {
      let name = ''
      let price = 0

      do {
        name = prompt('Какой дополнительный тип услуги нужен?', 'Услуга')
      } while (!isString(name))
      

      do {
        price = parseFloat(prompt('Сколько это будет стоить?'))
      } while (!isNumber(price))

      appData.services[name + i] = price //идентификатор = i, конкатенацией

      //console.log(appData.services)
    }

    
    appData.adaptive = confirm('Нужен ли адаптив на сайте?')
  },

  addPrices: function() {
    ////Вар 1 рассчёта стоимости экранов
    // for ( let screen of appData.screens ) {
    //   appData.screenPrice += screen.price
    // }
    
    //Вар 2 рассчёта стоимости экранов
    let initialValue = 0
    appData.screenPrice = appData.screens.reduce(function(accumulator, key){
      return accumulator + key.price
    }, initialValue)


    for(let key in appData.services) {
      appData.allServicePrices += appData.services[key]
    }
  },


  getFullPrice: function() {
    appData.fullPrice =  appData.screenPrice + appData.allServicePrices;
  },


  getServicePercentPrices: function() {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));
  },

  getTitle: function() { 
    appData.title = appData.title.trim().toLowerCase()
    appData.title = appData.title[0].toUpperCase() + appData.title.slice(1)
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

  logger: function() {
    // for(let key in appData) {
    //   console.log('Ключ: ' + key + ' Значение: ' + appData[key])
    // }
    // console.log(appData.fullPrice)
    // console.log(appData.servicePercentPrice)
    // console.log(appData.screens)
    // console.log(appData.screenPrice)
    // console.log(appData.title)
    

    console.log(appData.title);
    console.log('handlBtns ', handlBtns);
    console.log('screenBtn ', screenBtn);
    console.log('itemsPers ', itemsPers);
    console.log('itemsNum ', itemsNum);
    console.log('typeRange ', typeRange);
    console.log('rangeValue ', rangeValue);
    console.log('totalInputs ', totalInputs);
    console.log('screens ', screens);
  }
}


appData.start()