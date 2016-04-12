    var num = document.getElementById('num'),
        ul = document.getElementsByTagName('ul')[0],
        btn = document.getElementsByClassName('button');

    btn[0].onclick = function () {
        if (num.value.length==0){
            alert("请输入加入的数字");
        }else{
            var li = document.createElement('li');
            li.innerHTML = num.value;
            ul.insertBefore(li,ul.firstChild);
            num.value = null;
        }
    }
    btn[1].onclick = function () {
        if (num.value.length==0){
            alert("请输入加入的数字");
        }else{
            ul.innerHTML += '<li>'+ num.value +'</li>';
            num.value = null;
        }
    }
    btn[2].onclick = function () {
        if (ul.hasChildNodes()) {
            alert(ul.firstChild.innerHTML);
            ul.removeChild(ul.firstChild);
        } else {
            alert('队列为空');
        }
    }
    btn[3].onclick = function () {
        if (ul.hasChildNodes()) {
            alert(ul.lastChild.innerHTML);
            ul.removeChild(ul.lastChild);
        } else {
            alert('队列为空');
            return false;
        }
    }
