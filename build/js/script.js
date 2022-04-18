(function () {
  const FILTERS = document.querySelector('.sidebar__filters');

  const roomsCheckbox = document.querySelectorAll('input[name="rooms"]');
  const projectCheckbox = document.querySelectorAll('input[name="project"]');

  const inputPriceMin = document.querySelector('#min-price');
  const viewPriceMin = document.querySelector('label[for="min-price"] span')
  const inputPriceMax = document.querySelector('#max-price');
  const viewPriceMax = document.querySelector('label[for="max-price"] span')

  const inputSizeMin = document.querySelector('#min-size');
  const viewSizeMin = document.querySelector('label[for="min-size"] span')
  const inputSizeMax = document.querySelector('#max-size');
  const viewSizeMax = document.querySelector('label[for="max-size"] span')

  const resetBtn = document.querySelector('button[type="reset"]');

  const changeValue = (input, label) => {
    input.addEventListener('input', () => {
      let qountity = new Intl.NumberFormat('ru-RU').format(input.value);
      label.textContent = qountity;

    })
  }

  changeValue(inputPriceMin, viewPriceMin);
  changeValue(inputPriceMax, viewPriceMax);
  changeValue(inputSizeMin, viewSizeMin);
  changeValue(inputSizeMax, viewSizeMax);

  // Filter

  const checkedRoomsNumbers = (roomsCollection, collection) => {
    let room = [];
    roomsCollection.forEach((e) => {
      if (e.checked) {
        room.push(e.id)
        return room
      }
    })

    if (!room.length) {
      return collection;
    }

    for (let i = 0; i <= room.length - 1; i++) {
      if (collection.rooms == room[i] && room[i] !== 4) {
        return collection
      } else if (room[i] == 4) {
        if (++collection.rooms >= 4) {
          return collection
        }
      }
    }
  };

  const checkedProject = (projectsCollection, collection) => {
    let project = [];
    projectsCollection.forEach((e) => {
      if (e.checked) {
        project.push(e.value)
        return project
      }
    })
    if (!project.length) {
      return collection;
    }

    for (let i = 0; i <= project.length - 1; i++) {
      if (collection.housingComplexName == project[i]) {
        return collection
      }
    }
  };

  const checkedPrice = (collection) => {
    if (inputPriceMin.value <= collection.price && inputPriceMax.value >= collection.price) {
      return collection;
    }
  }

  // Окно ошибки загрузки данных  - Расскоментировать при подклюсении к API

  // const loadingError = (message) => {
  //   const alertContainer = document.createElement('div');
  //   alertContainer.style.zIndex = 100;
  //   alertContainer.style.position = 'absolute';
  //   alertContainer.style.left = 0;
  //   alertContainer.style.top = 0;
  //   alertContainer.style.right = 0;
  //   alertContainer.style.padding = '15px 5px';
  //   alertContainer.style.fontSize = '30px';
  //   alertContainer.style.textAlign = 'center';
  //   alertContainer.style.color = 'white';
  //   alertContainer.style.backgroundColor = '#ee3643';
  //   alertContainer.style.border = '5px solid black';

  //   alertContainer.textContent = message;

  //   document.body.append(alertContainer);

  //   setTimeout(() => {
  //     alertContainer.remove();
  //   }, 5000);
  // };

  // API

  // const getData = () => {
  //   return fetch('#')
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error('Не удалось загрузить данные с сервера!');
  //     })
  //     .then((array) => {
  //       return array;
  //     })
  //     .catch(() => {
  //       loadingError('Что-то пошло не так, попробуйте перезагрузить страницу!');
  //     });
  // };


  // Создание рандомных карточек квартир - удалить при подключении к API

  const COMPLEX_NAME = [
    'ZNAK',
    'На Ломоносова',
    'Васильки',
    'На Калинина',
  ];

  const PLAN_LINKS = [
    'https://www.cian.ru/sale/flat/272441480/',
    'https://www.cian.ru/sale/flat/272485180/',
    'https://www.cian.ru/sale/flat/272441478/',
    'https://www.cian.ru/sale/flat/267897054/',
  ];

  const NUMBER_ROOMS = [
    'studio',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '5',
    '6',
  ];

  const PHOTOS = [
    'https://avatars.mds.yandex.net/get-yablogs/49865/file_1538987617496/orig',
    'https://i.pinimg.com/originals/ed/d8/2c/edd82cff7b88411d9603b66054586062.jpg',
    'https://xn--80ac1bcbgb9aa.xn--p1ai/wp-content/uploads/2019/02/planirovka-odnokomnatnoy-kvartiryi-1.jpg',
    'https://smallflat.ru/assets/images/resources/205/xo2v5xcra-i.jpg',
    'https://italstroy.ru/800/600/https/vokrug-nas.ru/wp-content/uploads/2018/01/proekt-sverhu1.jpg',
    'img/appartments-1.png',
  ];

  const generateId = () => {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
  };

  const getRandomArrayElement = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  };

  let getRandomnInteger = (minNumber, maxNumber) => {
    if (minNumber >= maxNumber) {
      throw new Error('проверьте введенные значения');
    }
    return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
  };

  const createObject = () => {
    try {
      return {
        id: generateId(),
        name: "string",
        price: getRandomnInteger(2354000, 3700000),
        rooms: getRandomArrayElement(NUMBER_ROOMS),
        housingComplexName: getRandomArrayElement(COMPLEX_NAME),
        planLink: getRandomArrayElement(PLAN_LINKS),
        photos: PHOTOS.slice(getRandomnInteger(0, 5)),
        sameLayoutFlatCount: getRandomnInteger(0, 20),
        minPrice: getRandomnInteger(2354000, 3700000),
      };
    } catch (e) {
      console.log(e.message);
    }
  };

  const getArray = () => new Array(18)
    .fill(null)
    .map(() => createObject());

  const CARDS = getArray();

  // Отображение карточки

  const CARDS_WRAP = document.querySelector('.appartments__list');
  const CARD = document.querySelector('#card').content.querySelector('.appartments__type');

  const createCardElement = (element) => {
    const cardElement = CARD.cloneNode(true);

    cardElement.querySelector('.appartments__name').textContent = element.rooms;
    cardElement.querySelector('.appartments__place').textContent = element.housingComplexName;
    cardElement.querySelector('.appartments__name').textContent = element.rooms;
    cardElement.querySelector('.appartments__amount').textContent = `${element.sameLayoutFlatCount} квартир`;
    cardElement.querySelector('.appartments__price').textContent = `от ${new Intl.NumberFormat('ru-RU').format(element.minPrice)} ₽`;
    cardElement.querySelector('img').src = element.photos[0];
    cardElement.querySelector('.appartments__btn').href = element.planLink;

    return cardElement;
  };

  const createCards = (array) => {
    CARDS_WRAP.innerHTML = '';

    array.forEach((e) => {
      let card = createCardElement(e);
      CARDS_WRAP.appendChild(card);
    })
  }

  function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const setData = (collection) => {
    createCards(collection);

    resetBtn.addEventListener('click', () => {
      createCards(collection);
    })

    FILTERS.addEventListener('change', debounce(function () {

      const mem = (element) => {
        return (
          checkedRoomsNumbers(roomsCheckbox, element) &&
          checkedProject(projectCheckbox, element) &&
          checkedPrice(element)
        );
      };

      let filteredRents = [];

      for (let element of collection) {
        if (mem(element)) {
          filteredRents.push(element);
        }
        if (filteredRents >= 18) {
          break;
        }
      }

      console.log(filteredRents);
      createCards(filteredRents);
    }, 500))
  }



  setData(CARDS);

  // getData().then((result) => {  //
  //   setData(result);
  // });



})();
