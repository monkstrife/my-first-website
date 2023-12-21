function func1 () {
    var a1 = document.getElementById('i1');
    a1 = a1.value;
    a1 = parseInt(a1);
    var result;
    var vac = document.getElementById('vac');
    var img = document.getElementById('img');
    var type;
    
    var a2 = document.getElementById('i2');
    if(a2.checked)
    {
        result = Math.ceil(a1/4);
        type = "механизированная";
    }
    else
    {
        result = Math.ceil(a1/3);
        type = "не механизированная";
    }
    
    var question = confirm("Показать результат?");
    if(question)
    {
        vac.innerHTML = '';
        img.innerHTML = '';
        let new_div1;
        new_div1 = document.createElement('div');
        new_div1.innerText = "Длина канавы = " + a1 + "\nтип бригады - " + type + "\nколичество землекопов = " + result;
        vac.append(new_div1);

        let new_div2;
        new_div2 = document.createElement('img');
        if(a2.checked)
        {
            new_div2.src = '../img/землекоп2.png';
        }
        else
        {
            new_div2.src = '../img/землекоп1.png';
        }
        img.append(new_div2);
    }
    else
    {
        vac.innerHTML = '';
        img.innerHTML = '';
        let new_div1;
        new_div1 = document.createElement('div');
        new_div1.innerText = "Бригада в отпуске";
        vac.append(new_div1);

        let new_div2;
        new_div2 = document.createElement('img');
        new_div2.src = '../img/землекоп3.png';
        img.append(new_div2);
    }
}

