

var main_div = document.getElementById('main');

var array_map = new Map();

allow_dragging_in_place();
move_word();

function func() {
    remove_word_list();
    array_map.clear();

    var text = document.getElementById("text1");
    var array_of_string = text.value.split('-');
    array_of_string = array_of_string.sort(compare);

    add_arr(array_of_string, array_of_string.length);

    add_word_list();

    allow_dragging();
    allow_reaction();
}

// сортировка
function compare (a, b) {
    if (!isNaN(Number(a)) && isNaN(Number(b)))
    {
        return 1;
    }
    else if (isNaN(Number(a)) && !isNaN(Number(b))) 
    {
        return -1;
    }
    else if (isNaN(Number(a))) {
        if(a < b)
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }
    else {
        if(Number(a) > Number(b))
        {
            return 1;
        }
        else
        {
            return -1;
        }
    }
}

// добавляем элементы в map
function add_arr(array_of_string, length) {
    var count = 1;
    var type_key = 'a';
    for (var i = 0; i < length ; i++)
    {
        let value = array_of_string[i];
        if(type_key != 'n' && !isNaN(Number(value)))
        {
            type_key = 'n';
            count = 1;
        }
        array_map.set(type_key + count, value);
        count++;
    }
}

// создаем новый список
function add_word_list () {
    var word_list = document.getElementById('word_list1');
    var new_item;
    for (const [key, value] of array_map)
    {
        new_item = document.createElement('li');
        new_item.innerHTML = key + ' ' + value;
        new_item.className = 'word_item';

        word_list.appendChild(new_item);
    }
}

// отчищаем старый список
function remove_word_list () {
    var word_list = document.querySelector('.word_list');
    var cont = word_list.querySelectorAll('li');

    var word_list2 = document.querySelector('#word_list2');
    var cont2 = word_list2.querySelectorAll('li');

    cont.forEach( (item) => {
        word_list.removeChild(item);
    })

    cont2.forEach( (item) => {
        word_list2.removeChild(item);
    })
}

// разрешаем сброс элементов в области (по умолчанию браузеры это заперщают)
function allow_dragging_in_place () {
    var word_list = document.querySelector('.word_list');
    var word_list2 = document.querySelector('#word_list2');

    word_list.addEventListener('dragover', (evnt) => {
        evnt.preventDefault();
    })

    word_list2.addEventListener('dragover', (evnt) => {
        evnt.preventDefault();
    })
}


// разрешаем перетаскивание элементов
function allow_dragging () {
    var word_list = document.querySelector('.word_list');
    var cont = word_list.querySelectorAll('li');

    var word_list2 = document.querySelector('#word_list2');
    var cont2 = word_list2.querySelectorAll('li');

    for (const item of cont) {
        item.draggable = true;
    }

    for (const item of cont2) {
        item.draggable = true;
    }
}

// добавляем реакцию на перетаскивание
function allow_reaction () {
    var word_list = document.querySelector('.word_list');
    var word_list2 = document.querySelector('#word_list2');

    // добавляем "особый" style на момент начала перетаскивания
    word_list.addEventListener('dragstart', (evnt) => {
        evnt.target.classList.add('dragging');
    })

    word_list2.addEventListener('dragstart', (evnt) => {
        evnt.target.classList.add('dragging');
    })

    // убираем этот style
    word_list.addEventListener('dragend', (evnt) => {
        evnt.target.classList.remove('dragging');
        result_text();
    })

    word_list2.addEventListener('dragend', (evnt) => {
        evnt.target.classList.remove('dragging');
        result_text();
    })
}

function move_word () {
    var word_list = document.querySelector('.word_list');
    var word_list2 = document.querySelector('#word_list2');
    var next_item;

    var all_list = document.querySelector('#main');

    all_list.addEventListener('dragover', (evnt) => {
        var draggable_item = all_list.querySelector('.dragging');

        var under_cursor_item = evnt.target;

        if(draggable_item == under_cursor_item)
        {
            return;
        }

        // для левого списка
        if(under_cursor_item.parentElement == word_list)
        {
            if(draggable_item.parentElement == word_list) {
                next_item = (under_cursor_item == draggable_item.nextElementSibling) ? under_cursor_item.nextElementSibling : under_cursor_item;
            }
            else {
                next_item = under_cursor_item;
                draggable_item.classList.remove('word_item2');
                draggable_item.classList.add('word_item');
            }
            word_list.insertBefore(draggable_item, next_item);
        }

        //для правого списка
        if(under_cursor_item.parentElement == word_list2)
        {
            if(draggable_item.parentElement == word_list2) {
                next_item = (under_cursor_item == draggable_item.nextElementSibling) ? under_cursor_item.nextElementSibling : under_cursor_item;
            }
            else {
                next_item = under_cursor_item;
                draggable_item.classList.remove('word_item');
                draggable_item.classList.add('word_item2');
            }
            word_list2.insertBefore(draggable_item, next_item);
        }

        //здесь, когда наводимся на блок, а не элементы списка
        if(under_cursor_item.id == 'u_subblock')
        {
            if(draggable_item.parentElement != word_list2) {
                draggable_item.classList.remove('word_item');
                draggable_item.classList.add('word_item2');
            }
            word_list2.insertBefore(draggable_item, null);
        }

        if(under_cursor_item.id == 'l_subblock')
        {
            if(draggable_item.parentElement != word_list) {
                draggable_item.classList.remove('word_item2');
                draggable_item.classList.add('word_item');
            }
            word_list.insertBefore(draggable_item, null);
        }
    })
}

function result_text()
{
    var word_list2 = document.querySelector('#word_list2');
    var cont = word_list2.querySelectorAll('li');
    var result = document.querySelector('#result');
    result.innerHTML = null;

    for (const item of cont) {
        var text = item.innerHTML.split(' ')[1];
        result.innerHTML += text + ' '; 
    }
}