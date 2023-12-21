var array = [
    [0,],
    [1,],
    [2,],
    [3,],
];

var arr_question = [
    ['А когда с человеком может произойти дрожемент?', 'Когда он влюбляется', 'Когда он идет шопиться', 'Когда он слышит смешную шутку', 'Когда он боится, пугается', 4],
    ['Говорят, Антон заовнил всех. Это еще как понимать?', 'Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?', 'Антон очень надоедливый и въедливый человек, всех задолбал', 'Молодец, Антон, всех победил!', 'Нет ничего плохого в том, что Антон тщательно выбирает себе друзей', 3],
    ['А фразу «заскамить мамонта» как понимать?', 'Разозлить кого-то из родителей', 'Увлекаться археологией', 'Развести недотепу на деньги', 'Оскорбить пожилого человека', 3],
    ['Кто такие бефефе?', 'Вши?', 'Милые котики, такие милые, что бефефе', 'Лучшие друзья', 'Люди, которые не держат слово', 3],
];

var arr_true_add = [
    ['Когда он боится, пугается', 'Когда он боится, пугается\n(правильно)\nЛексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят».'],
    ['Молодец, Антон, всех победил!', 'Молодец, Антон, всех победил!\n(правильно)\nТермин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить».'],
    ['Развести недотепу на деньги', 'Развести недотепу на деньги\n(правильно)\nЗаскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца.'],
    ['Лучшие друзья', 'Лучшие друзья\n(правильно)\nБефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever.'],
]

var a1 = document.getElementById('main');
id_question = 0;
count_true_answer = 0;
var size = 600;

shuffle(array);

function func() {
    if (id_question > 3)
    {
        if (document.getElementById('q_end') == null)
        {
            var q_end = document.createElement('div');
            q_end.innerHTML = 'Вопросы закончились';
            q_end.id = 'q_end';
            a1.appendChild(q_end);

            document.getElementById('Button1').innerHTML = 'Результат';
        }

        for (var i_q = 0; i_q < 4; i_q++)
        {
            array[i_q][1].onclick = print_true;
        }

        alert('Вы набрали ' + count_true_answer + ' из 4 возможных очков!');
        return;
    }


    array[id_question].push(document.createElement('p'));
    array[id_question][1].innerHTML = arr_question[array[id_question][0]][0];
    array[id_question][1].id = 'q' + array[id_question][0];


    var flex_answers = document.createElement('div');
    flex_answers.className = 'flex_answers';

    var item_answer = [];

    var length_answers = arr_question[array[id_question][0]].length - 2;
    for (var i = 0; i < length_answers; i++)
    {
        item_answer.push(document.createElement('div'));
        item_answer[i].innerHTML = arr_question[array[id_question][0]][i + 1];
        item_answer[i].className = 'answer';


        var true_answer = arr_question[array[id_question][0]][arr_question[array[id_question][0]].length - 1] - 1;
        if (i == true_answer)
        {
            // item_answer[i].onclick = function() { alert(this.className);}; ты долго к этому шел))
            item_answer[i].onclick = green;
        }
        else
        {
            item_answer[i].onclick = red;
        }

        flex_answers.appendChild(item_answer[i]);
    }


    var text = array[id_question][1].innerHTML;
    array[id_question][1].innerHTML = (id_question+1) + ') ' + text;
    a1.appendChild(array[id_question][1]);
    a1.appendChild(flex_answers);
    id_question++;

    document.getElementById('Button1').onclick = null;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function red() {
    // var item = event.target; это устаревшее

    // this.style.position = 'relative';
    // this.style.animation = 'run_out 3s forwards';


    var parent = this.parentNode;
    var quest = parent.previousSibling;

    new_item = document.createElement('img');
    new_item.src = '../img/false.jpg';
    new_item.id = 'false';
    new_item.style.width = '12px';
    new_item.style.height = '12px';
    quest.appendChild(new_item);

    var i = parent.firstElementChild;
    while(1)
    {
        i.onclick = null;
        i.style.position = 'relative';
        i.style.animation = 'run_out 3s forwards';
        if (i == parent.lastElementChild)
        {
            break;
        }
        i = i.nextElementSibling;
    }

    document.getElementById('Button1').onclick = func;
}


// const running = [
//     { transform: 'translateX(0px)'},
//     { transform: 'translateX(var(--size))'},
// ]

// const timing = {
//     duration: 2000,
//     iterations: 1,
// }

function green() {
    // var item = event.target; это устаревшее

    //меняем блок
    this.style.width = '30%';
    //this.style.fontSize = 0.05*400 + 'px';
    for (var z = 0; z < 4; z++)
    {
        if(arr_true_add[z][0] == this.innerHTML)
        {
            this.innerHTML = arr_true_add[z][1];
        }
    }


    //добавляем галочку к вопросу
    var parent = this.parentNode;
    var quest = parent.previousSibling; // следующий сосед - nextSibling, а предыдущий – previousSibling.

    new_item = document.createElement('img');
    new_item.src = '../img/true.jpg';
    new_item.id = 'true';
    new_item.style.width = '12px';
    new_item.style.height = '12px';
    quest.appendChild(new_item);

    var i = parent.firstElementChild;
    while(1)
    {
        i.onclick = null;
        i.style.position = 'relative';
        if (i != this)
        {
            //i.animate(running, timing, asdf);
            i.style.animation = 'run_out 4s forwards';
        }
        else
        {
            i.style.animation = 'del 4s forwards';
        }

        if (i == parent.lastElementChild)
        {
            break;
        }
        i = i.nextElementSibling;
    }

    

    count_true_answer++;
    // this.onclick = null; // чтобы не считать с того же самого много раз

    var i = parent.firstElementChild;
    while(1)
    {
        i.onclick = null;
        if (i == parent.lastElementChild)
        {
            break;
        }
        i = i.nextElementSibling;
    }

    document.getElementById('Button1').onclick = func;
}

function print_true()
{
    var i_parent = this.nextSibling;
    var i = this.nextSibling.firstElementChild;
    while(1)
    {
        if(i.innerHTML == arr_true_add[0][0] || i.innerHTML == arr_true_add[1][0] || i.innerHTML == arr_true_add[2][0] || i.innerHTML == arr_true_add[3][0] || i.innerHTML == arr_true_add[0][1] || i.innerHTML == arr_true_add[1][1] || i.innerHTML == arr_true_add[2][1] || i.innerHTML == arr_true_add[3][1])
        {
            for (var z = 0; z < 4; z++)
            {
                if(arr_true_add[z][0] == i.innerHTML)
                {
                    i.innerHTML = arr_true_add[z][1];
                }
            }

            i.style.display = 'block';
            i.style.width = '40%';
            i.style.animation = 'none';
        }
        if (i == i_parent.lastElementChild)
        {
            break;
        }
        i = i.nextElementSibling;
    }

    var arr_flex = document.querySelectorAll('.flex_answers'); //Использую для поиска всех flex

    for (var z = 0; z < 4; z++)
    {
        if (arr_flex[z] != i_parent)
        {
            var t = arr_flex[z].firstElementChild;
            while(1)
            {
                t.style.display = 'none';
                if (t == arr_flex[z].lastElementChild)
                {
                    break;
                }
                t = t.nextElementSibling;
            }
        }
    }
}