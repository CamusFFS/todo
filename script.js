(function() {
  'use strict';

  var initial_model = {
    todos: [],
    hash: '#/'
  };

  var new_model = { ...initial_model };

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
    object.erased = true;
    clearUI();
    print();
  }

  function clearUI() {
    var ul = document.getElementsByClassName('todo-list')[0];
    while (ul.firstChild) ul.removeChild(ul.firstChild);
  }

  function print() {
    function populate(item) {
      if (!item.done && !item.erased) {
        var li = document.createElement('li');
        li.setAttribute('id', item.id);
        var button = document.createElement('button');
        button.addEventListener('click', removeTask);
        button.innerHTML = 'X';
        var node = document.createTextNode(item.title);
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
    document.getElementsByClassName('footer')[0].style.display = 'none';
  }

  function keyPressed(event) {
    if (event.keyCode == '13') {
      newTask();
      clearUI();
      print();
    }
  }

  window.addEventListener('keydown', keyPressed);
})();
