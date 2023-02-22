const todolist = () => {
// grabing up the neede HTML elements to be used in JS codes.....😎😊😉😎............

  const btn = document.querySelector('form');
  const listInput = document.querySelector('#lists-input');
  const cleanAllDone = document.querySelector('#clearDones');
  const listHolder = document.querySelector('#list-holder');

  // ****Empty array for storing datas ****
  let listArray = [];

  // Store the listArray in Local Storage when the form is submitted....😎😊😉😎............
  // Define the todoListStore object using a function constructor😎😊😉😎............

  function TodoListStore(discription, completed, index) {
    this.discription = discription;
    this.completed = completed;
    this.index = index;
  }

  btn.addEventListener('submit', (e) => {
    e.preventDefault();
    const index = listArray.length + 1;
    const completed = false;
    if (listInput.value !== '' || null) {
      const todoObject = new TodoListStore(listInput.value, completed, index);
      listArray = [...listArray, todoObject];
      localStorage.setItem('listArray', JSON.stringify(listArray));
      // eslint-disable-next-line no-use-before-define
      UI.displayData();
      // eslint-disable-next-line no-use-before-define
      UI.cleanInputs();
    }
  });

  class UI {
    static displayData() {
      const datas = listArray.map((item) => `<div class="col-12" id="list" data-index=${item.index}>
                <p class="checkboxP"> 
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck">
                <span  index='${item.index}' id="discription">${item.discription}</span>
                </p>
                <span><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
            </div>`);
      listHolder.innerHTML = (datas).join(' ');
    }
    // cleaning the input field after submition process....😎😊😉😎............

    static cleanInputs() {
      listInput.value = '';
    }
  }

   

  listHolder.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-ellipsis-v')) {
      event.target.classList.remove('fa-ellipsis-v');
      event.target.classList.add('fa-trash');
      event.target.parentElement.parentElement.style.backgroundColor = '#f39c12';
     
    } else if (event.target.classList.contains('fa-trash')) {
    // Get the index of the element to be deleted
      const trash = event.target;
      const taskElm = trash.parentNode.parentNode;
      const listindex = Array.prototype.indexOf.call(listHolder.children, taskElm);

      // Remove the element from the listArray
      listArray.splice(listindex, 1);

      // Update the local storage with the updated listArray
      localStorage.setItem('listArray', JSON.stringify(listArray));

      // Remove the element from the DOM
      event.target.parentElement.parentElement.remove();
    }
  });


// Retrieve the listArray from Local Storage when the page is loaded..😎😊😉😎............
  window.addEventListener('load', () => {
    if (localStorage.getItem('listArray')) {
      listArray = JSON.parse(localStorage.getItem('listArray'));
      UI.displayData();
    }
  });

  if (localStorage.getItem('listArray')) {
    listArray = JSON.parse(localStorage.getItem('listArray'));
    UI.displayData();
  }

  
};

export default todolist;