(function() {
  'use strict';

  var new_model = {
    todos: []
  };

  function newTask() {
    var data = document.getElementsByClassName('new-task')[0].value;
    if (data == '') {
      alert('You must write something!');
    } else {
      new_model.todos.push({
        id: new_model.todos.length + 1,
        title: data,
        done: false,
        erased: false
      });
      document.getElementsByClassName('new-task')[0].value = '';
    }
  }

  function removeTask() {
    var task = event.target || event.srcElement;
    var parent = task.parentElement;
    var index = parent.id;
    var object = new_model.todos.find(i => i.id == index);
    if (event.type === 'change') {
      object.done = true;
    } else {
      object.erased = true;
    }
    clearUI();
    print();
    toggleFooter();
  }

  function clearUI() {
    var ul = document.getElementsByClassName('todo-list')[0];
    while (ul.firstChild) ul.removeChild(ul.firstChild);
  }

  function clearDB() {
    new_model = {
      todos: []
    };
    clearUI();
  }

  function print() {
    function populate(item) {
      if (!item.done && !item.erased) {
        var li = document.createElement('li');
        li.setAttribute('id', item.id);
        var button = document.createElement('button');
        button.addEventListener('click', removeTask);
        button.innerHTML = 'X';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', removeTask);
        var node = document.createTextNode(item.title);
        li.append(checkbox);
        li.appendChild(node);
        document
          .getElementsByClassName('todo-list')[0]
          .appendChild(li)
          .appendChild(button);
      }
    }

    new_model.todos.forEach(item => populate(item));
  }

  function toggleFooter() {
    if (new_model.todos.length === 0) {
      document.getElementsByClassName('footer')[0].style.display = 'none';
    } else {
      document.getElementsByClassName('footer')[0].style.display = 'flex';
    }
  }

  function flagDisplay() {
    switch (event.target.hash) {
      case '#ToDo':
        clearUI();
        print();
        break;
      case '#Done':
        clearUI();
        new_model.todos.forEach(item =>
          (function() {
            if (item.done) {
              var li = document.createElement('li');
              var node = document.createTextNode(item.title);
              li.appendChild(node);
              document.getElementsByClassName('todo-list')[0].appendChild(li);
            }
          })()
        );
        break;
      case '#Deleted':
        clearUI();
        new_model.todos.forEach(item =>
          (function() {
            if (item.erased) {
              var li = document.createElement('li');
              var node = document.createTextNode(item.title);
              li.appendChild(node);
              document.getElementsByClassName('todo-list')[0].appendChild(li);
            }
          })()
        );
        break;
    }
  }

  function keyPressed(event) {
    if (event.keyCode == '13') {
      newTask();
      clearUI();
      print();
      toggleFooter();
    }
  }

  window.addEventListener('keydown', keyPressed);
  document.querySelectorAll('a').forEach(item => item.addEventListener('click', flagDisplay));
  document.getElementsByClassName('clear')[0].addEventListener('click', clearDB);
  toggleFooter();
})();
