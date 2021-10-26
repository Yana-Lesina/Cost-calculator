'use strict';

const isString = function (str) {
  return isNaN(+str);
  //если isNaN = true то действительно строка (вида "10фврпл", "дфывпр12843")
  //если isNaN = false то строку удалось перевести в число (она точно была вида "27436748274")
};

const getElems = function(elems) {
  let arr = [];
  
  for (let i = 0; i < elems.length; i++) {
    arr[i] = elems[i];
  }
  return arr;
};

const title = (document.getElementsByTagName('h1'))[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const btnPlus = document.querySelector('.screen-btn');

const otherItemsPers = document.querySelectorAll('.main-controls__views > .percent');
const otherItemsNum = document.querySelectorAll('.main-controls__views > .number');

const typeRange = document.querySelector('.rollback > .main-controls__range > input');
const rangeValue  = document.querySelector('.rollback > .main-controls__range > span');

const ttlScreensPrice = document.getElementsByClassName('total-input')[0];
const ttlScreensAmount = document.getElementsByClassName('total-input')[1];
const ttlOtherServsPrice = document.getElementsByClassName('total-input')[2];
const fullTtlPrice = document.getElementsByClassName('total-input')[3];
const ttlWithRollback = document.getElementsByClassName('total-input')[4];

let screens = (document.querySelectorAll('.screen'));

const appData = {
  title: '',
  screens: [],
  count: 0, //количество экранов всех типов
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPersent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPersent: {},
  servicesNumber: {},
  init: function() {
    appData.addTitle();

    startBtn.addEventListener('click', appData.checkCorrectInput);

    btnPlus.addEventListener('click', appData.addScreenBlock);

    typeRange.addEventListener('input', appData.instalRlbkValue);
  },

  checkCorrectInput: function() {
      screens = (document.querySelectorAll('.screen')); //переопределение
      let ifVoid;

      screens.forEach(function(screen) {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        
        if(select.value === '' || input.value === '') {
          ifVoid = true;
        } else {
          ifVoid = false;
        }
      });

      ifVoid === false ? appData.start() : alert('Данные не введены, расчёты невозможны\nВведите данные и всё будет в порядке!');
  },

  instalRlbkValue: function() {
      rangeValue.textContent = typeRange.value + '%';
      appData.rollback = typeRange.value;
      // console.log(appData.rollback)
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function() {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    // appData.logger()
    appData.showResult();
  }, 

  showResult: function() {
    ttlScreensPrice.value = appData.screenPrice;
    ttlScreensAmount.value = appData.count;
    ttlOtherServsPrice.value = appData.servicePricesPersent + appData.servicePricesNumber;
    fullTtlPrice.value = appData.fullPrice;
    ttlWithRollback.value = appData.servicePercentPrice;
  },

  addScreens: function() {
    screens = (document.querySelectorAll('.screen')); //переопределение коллекции

    screens.forEach(function(screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value,
        amount: +input.value //количество экранов данного типа
      });
    });

    console.log(appData.screens);
  },

  addServices: function() {
    otherItemsPers.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if(check.checked)
      {
        appData.servicesPersent[label.textContent] = +input.value;
      }
    });

    otherItemsNum.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if(check.checked)
      {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function() {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function() {
    ////Вар 1 рассчёта стоимости экранов
    // for ( let screen of appData.screens ) {
    //   appData.screenPrice += screen.price
    // }
    
    //Вар 2 рассчёта стоимости экранов
    let initialValue = 0;
    appData.screenPrice = appData.screens.reduce(function(accumulator, key){
      return accumulator + key.price;
    }, initialValue);

    for(let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for(let key in appData.servicesPersent) {
      appData.servicePricesPersent += appData.screenPrice * (appData.servicesPersent[key]/100);
    }

    //расчёт общего кол-ва экранов всех типов
    for(let key of appData.screens) {
      appData.count += key.amount;
    }

    appData.fullPrice =  appData.screenPrice + appData.servicePricesPersent + appData.servicePricesNumber;
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
  },

  logger: function() {
    //console.log()
  }
};


appData.init();
