let arr=[];
let arrPrice=[];
let mainArr=[];
fetch('http://demo4164358.mockable.io/bicycles')
.then(function(response) {
    if(response.status==200) {
        return response.json();
    }
    else throw response.status+' '+response.statusText;
})
.then(function(obj) {
    let arrBicycles=[];
    for(let key in obj) {
        arrBicycles.push(obj[key]);                                     //создал массив из полученного объекта
    }
    
    for(let i=0; i<arrBicycles.length; i++) {
        arrBicycles[i].brand=arrBicycles[i].name.split(" ")[0];
    }
    for(let i=0; i<arrBicycles.length; i++) {
        arrBicycles[i].price=arrBicycles[i].price.replace(' ','');
        arrBicycles[i].price= +arrBicycles[i].price;
    }
    
    let arrParams=[];
    for(let i=0; i<arrBicycles.length; i++) {
        let newArr=[];
        createParams(arrBicycles[i], newArr);
        arrParams.push(newArr);
    }
    for(let i=0; i<arrBicycles.length; i++) {
        arrPrice.push(arrBicycles[i]);
    }
    
    let mainDiv=document.getElementById('main');
    for(let i=0; i<arrBicycles.length; i++) {
        mainDiv.appendChild(createHtmlElem(arrBicycles[i]));               //создаю новые элементы из полученного массива и вставляю в документ
    }
    let aside=document.getElementsByTagName('aside')[0];
    mainArr=arrBicycles;
    
    aside.addEventListener('click', clickParams);                      //вешаю обработчики
    aside.addEventListener('click', checkDiv);
    aside.addEventListener('click', filtr.bind(this, arrBicycles, arrParams));
    aside.addEventListener('input', inputs.bind(this, arrBicycles));
    aside.addEventListener('click', amount);
    aside.addEventListener('input', amount);
    aside.addEventListener('click', sort);
    point1.addEventListener('mousedown', movePoints.bind(this, arrBicycles));
    point2.addEventListener('mousedown', movePoints.bind(this, arrBicycles));
    document.addEventListener('click', createPopup);
    document.addEventListener('click', addToBasket);

    let show=document.getElementById('showBicycles');
    show.onclick=function() {
        let main=document.getElementById('main');
        let bicycle=document.getElementsByClassName('bicycle');
        for(let i=0; i<bicycle.length; i++) {
            main.removeChild(bicycle[i]);
            --i;
        }
        for(let i=0; i<mainArr.length; i++) {
            main.appendChild(createHtmlElem(mainArr[i]));
        }   
        this.hidden=true;
        let dataCheck=document.getElementsByClassName('sort')[0].getElementsByClassName('check');
        for(let i=0; i<dataCheck.length; i++) {
            dataCheck[i].firstElementChild.style.backgroundColor='';
        }
    }
    let showBasket=document.getElementById('basket');
    let add=document.getElementById('basket1');
    showBasket.onclick=function() {
        add.hidden=false;
    }
    let close=document.getElementById('close1');
    close.onclick=function() {
        add.hidden=true;
    }

    let input=document.getElementById('search').firstElementChild;
    input.addEventListener('input', search.bind(input, arrBicycles));
})
.catch(function(response){
    throw new Error('Ошибка: '+response);
});

    
function filtr(arrBicycles, arrParams, event) {
    if(event.target.parentElement.classList[0]=='check') {
        let currentObj=[];
        let changeBicycles=[];
        let dataObj={};
        dataObj['brand']=[];
        dataObj['modelYear']=[];
        dataObj['gender']=[];
        dataObj['age']=[];
        dataObj['material']=[];
        dataObj['amortization']=[];
        dataObj['wheel']=[];
        let data=document.querySelectorAll('[data-active=true]');

        for(let i=0; i<data.length; i++) {
            if(data[i].parentElement.classList[1]=='brand') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
            if(data[i].parentElement.classList[1]=='modelYear') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
            if(data[i].parentElement.classList[1]=='gender') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
            if(data[i].parentElement.classList[1]=='age') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
            if(data[i].parentElement.classList[1]=='material') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
            if(data[i].parentElement.classList[1]=='amortization') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
            if(data[i].parentElement.classList[1]=='wheel') {
                dataObj[data[i].parentElement.classList[1]].push(1);
                currentObj.push(data[i].textContent);
            };
        };
        let k=0;
        for(let key in dataObj) {
            if(dataObj[key].length>1) k+=dataObj[key].length-1;
        }

        for (let i=0; i<arrParams.length; i++) {
            if(findMatch(arrParams[i], currentObj, k)) {
                changeBicycles.push(arrBicycles[i]);
            } 
        }
        
        let q=0;
        for(let key in dataObj) {
            if(dataObj[key].length==0) ++q;
        };

        
        if(q==Object.keys(dataObj).length) arr=arrBicycles
        else arr=changeBicycles;
        compare();
    }
}

function createParams(obj, arrParams) {
    for(var key in obj) {
		if(typeof(obj[key])!='object') {
			arrParams.push(obj[key]);
    	}
		else {
			createParams(obj[key],arrParams);
        }
    }
};

function findMatch(arr1, arr2, k) {
    let q=0;
    for(let i=0; i<arr1.length; i++) {
        for(let j=0; j<arr2.length; j++) {
            if(arr1[i]==arr2[j]) {
                ++q;
				break;
            }
        }
    }
    if(k!=0) q+=k;
    if(q==arr2.length && arr2.length>0) return true
	else return false;
}

function createHtmlElem(obj) {
    let div=document.createElement('div');
    let img=document.createElement('img');
    let spanName=document.createElement('span');
    let spanFullName=document.createElement('span');
    let spanPrice=document.createElement('span');
    let basket=document.createElement('img');
    let price=document.createElement('div');

    div.classList.add('bicycle');

    img.src=obj.imageSrc;
    img.classList.add('photo');

    spanName.textContent=obj.name;
    spanName.classList.add('name');

    spanFullName.innerHTML=obj.fullName+'<br>';

    spanPrice.textContent='Цена: '+obj.price+' руб';

    basket.src='https://img.icons8.com/dotty/420/add-basket.png';
    basket.classList.add('addToBasket');

    price.classList.add('cost');

    div.appendChild(spanName);
    div.appendChild(img);
    div.appendChild(spanFullName);
    price.appendChild(spanPrice);
    price.appendChild(basket);
    div.appendChild(price);

    return div;
}

function clickParams(event) {
    if(event.target.classList[0]=='item' && event.target.classList[1]!='price') {
        let up=event.target.getElementsByClassName('up')[0];
        if(event.target.style.height=='' || event.target.style.height=='17px') {
            event.target.style.height=event.target.scrollHeight-20+'px';
            up.style.transform='rotate(180deg)';
        }
        else {
            event.target.style.height='17px';
            up.style.transform='rotate(0deg)';
        }
    }
    if(event.target.className=='params') {
        let up=event.target.parentElement.getElementsByClassName('up')[0];
        if(event.target.parentElement.style.height=='' || event.target.parentElement.style.height=='17px') {
            event.target.parentElement.style.height=event.target.parentElement.scrollHeight-20+'px';
            up.style.transform='rotate(180deg)';
        }
        else {
            event.target.parentElement.style.height='17px';
            up.style.transform='rotate(0deg)';
        }
    }
    if(event.target.parentElement.className=='params') {
        let up=event.target.parentElement.parentElement.getElementsByClassName('up')[0];
        if(event.target.parentElement.parentElement.style.height=='' || event.target.parentElement.parentElement.style.height=='17px') {
            event.target.parentElement.parentElement.style.height=event.target.parentElement.parentElement.scrollHeight-20+'px';
            up.style.transform='rotate(180deg)';
        }
        else {
            event.target.parentElement.parentElement.style.height='17px';
            up.style.transform='rotate(0deg)';
        }
    }
}

function checkDiv(event) {
    if(event.target.parentElement.className=='check') {
        if(event.target.parentElement.parentElement.classList[1]=='sort') {
            let dataCheck=event.target.parentElement.parentElement.getElementsByClassName('check');
            for(let i=0; i<dataCheck.length; i++) {
                dataCheck[i].firstElementChild.style.backgroundColor='';
            }
        }

        if(event.target.parentElement.firstElementChild.style.backgroundColor=='') event.target.parentElement.firstElementChild.style.backgroundColor='black'
        else event.target.parentElement.firstElementChild.style.backgroundColor='';
       
        if(event.target.parentElement.getAttribute('data-active')=='') event.target.parentElement.setAttribute('data-active','true')
        else event.target.parentElement.setAttribute('data-active','');
    }
}

function sort(event) {
    if(event.target.parentElement.parentElement.classList[1]=='sort') {
        if(event.target.parentElement.textContent=='По алфавиту'){
            mainArr.sort(function(a,b){
                if(a.name>b.name) return 1
                else return -1;
            });
        }
        if(event.target.parentElement.textContent=='По цене - по возрастанию'){
            mainArr.sort(function(a,b){
                if(a.price>b.price) return 1
                else return -1;
            });
        }
        if(event.target.parentElement.textContent=='По цене - по убыванию'){
            mainArr.sort(function(a,b){
                if(a.price<b.price) return 1
                else return -1;
            });
        }
    }
}

function sortPrice(a,b) {
    return arrPrice.filter(function(i) {
        if(i.price>a && i.price<b) return true;
    });
}

function inputs(arrBicycles, event) {
    if(event.target.tagName='input') {
        let minPrice=document.getElementById('minPrice');
        let maxPrice=document.getElementById('maxPrice');
        arrPrice=[];
        for(let i=0; i<arrBicycles.length; i++) {
            arrPrice.push(arrBicycles[i]);
        }
        arrPrice=sortPrice(minPrice.value, maxPrice.value);
        compare();
    }
}

function compare() {
    mainArr=[];
    let max;
    let min;
    if(arr.length>arrPrice.length) {
        max=arr;
        min=arrPrice;
    }
    else {
        max=arrPrice;
        min=arr;
    }
    for(let i=0; i<max.length; i++) {
        if(min.length>0){
            for(let j=0; j<min.length; j++) {
                if(max[i]==min[j]) {
                    mainArr.push(max[i]);
                }
            }
        }
        else mainArr.push(max[i]);
    }
}

function amount(event) {
    setTimeout(function() {
        let show=document.getElementById('showBicycles');
        let aside=document.getElementsByTagName('aside')[0];
        if(event.target.tagName=='INPUT' && event.target.parentElement.id!=search || event.target.parentElement.classList=='check' || event.target.id=='point1' || event.target.id=='point2') {
            show.textContent='Показать: '+mainArr.length;
            show.style.left=aside.clientWidth+'px';
            if(show.style.top=='') show.style.top=event.pageY-show.offsetHeight/2+'px'
            else {
                if(Math.abs(parseInt(show.style.top)-(event.pageY-show.offsetHeight/2))>10) {
                    show.style.top=event.pageY-show.offsetHeight/2+'px';
                }
            }
    show.hidden=false;
    }
    },0);
}

function movePoints(arrBicycles,e) {
    let line=document.getElementById('line');
    let point1=document.getElementById('point1');
    let point2=document.getElementById('point2');

    if(e.target.id=='point1'){
        let left=event.pageX-point1.getBoundingClientRect().left;
        document.onmousemove=function(event){
            if(event.pageX<line.getBoundingClientRect().left) {}
            else if(event.pageX>line.getBoundingClientRect().right-left) {
                point1.style.left=Math.ceil(line.getBoundingClientRect().right-line.getBoundingClientRect().left-left)+'px';
            }
            else {
                point1.style.left=Math.ceil(event.pageX-line.getBoundingClientRect().left-left)+'px';
            }
            if(Math.ceil(point2.getBoundingClientRect().x)-Math.ceil(point1.getBoundingClientRect().x)<point1.offsetHeight) {
                if(event.pageX>line.getBoundingClientRect().right-left-point1.offsetHeight) {}
                else {
                    point2.style.left=Math.ceil(event.pageX-line.getBoundingClientRect().left)+point1.offsetHeight+'px';
                }
            }
            if(point2.style.left=='') point2.style.left=207+'px';
            changePrice(arrBicycles);
        }
    }
    if(e.target.id=='point2'){
        let left=event.pageX-point2.getBoundingClientRect().left;
        document.onmousemove=function(event){
            if(event.pageX<line.getBoundingClientRect().left) {}
            else if(event.pageX>line.getBoundingClientRect().right-left) {
                point2.style.left=Math.ceil(line.getBoundingClientRect().right-line.getBoundingClientRect().left-left)+'px';
            }
            else {
                point2.style.left=Math.ceil(event.pageX-line.getBoundingClientRect().left-left)+'px';
            }
            if(Math.ceil(point2.getBoundingClientRect().x)-Math.ceil(point1.getBoundingClientRect().x)<point1.offsetHeight) {
                if(event.pageX<line.getBoundingClientRect().left-left+point1.offsetHeight) {}
                else {
                    point1.style.left=Math.ceil(event.pageX-line.getBoundingClientRect().left)-point1.offsetHeight+'px';
                }
            }
            if(point1.style.left=='') point1.style.left=-7+'px';
            changePrice(arrBicycles);
        }
    }
    document.addEventListener('mouseup', amount);
    document.onmouseup=function(){ 
        document.onmousemove=null;
        point1.onmouseup=null;
        point2.onmouseup=null;
    }
}

function changePrice(arrBicycles){
    let point1=document.getElementById('point1');
    let point2=document.getElementById('point2');
    let minPrice=document.getElementById('minPrice');
    let maxPrice=document.getElementById('maxPrice');
    let line=document.getElementById('line');
    let min=6000;
    let max=130000;
    minPrice.value=Math.ceil((max-min)*parseInt(point1.style.left)/(line.getBoundingClientRect().right-line.getBoundingClientRect().left)+min);
    maxPrice.value=Math.ceil((max-min)*parseInt(point2.style.left)/(line.getBoundingClientRect().right-line.getBoundingClientRect().left)+min);
    if(minPrice.value<6000) minPrice.value=6000;
    if(maxPrice.value>130000) maxPrice.value=130000;
    arrPrice=[];
    for(let i=0; i<arrBicycles.length; i++) {
        arrPrice.push(arrBicycles[i]);
    }
    arrPrice=sortPrice(minPrice.value, maxPrice.value);
    compare();
}

function createPopup(event) {
    if(event.target.className=='bicycle' || 
    (event.target.parentElement.className=='bicycle' && event.target.className!='cost') || event.target.id=='previous' ||
    event.target.id=='next' || (event.target.parentElement.parentElement!=null&&event.target.parentElement.parentElement.id=='previous') || 
    (event.target.parentElement.parentElement!=null&&event.target.parentElement.parentElement.id=='next') ||
    event.target.className=='elem' || (event.target.parentElement.className=='elem' && event.target.tagName=='IMG') || event.target.className=='nameList'||
    event.target.className=='divSearch'||event.target.parentElement.className=='divSearch') {
        let popup=document.getElementById('popup');
        let forPopup=document.getElementById('forPopup');
        var zoom=document.getElementById('zoom');
        var zoomImg=zoom.firstElementChild;

        if(document.getElementById('bigImg')===null) {
            var img=document.createElement('img');
            var spanName=document.createElement('div');
            var spanPrice=document.createElement('span');
            var basket=document.createElement('img');
            var price=document.createElement('div');
            var table=document.getElementById('spec');
            var background=document.getElementById('background');
            var num;
        }
        else {
            var img=popup.querySelector('#bigImg');
            var spanName=popup.querySelector('#name');
            var spanPrice=popup.querySelector('#price');
            var basket=popup.querySelector('[src="https://img.icons8.com/dotty/420/add-basket.png"]');
            var price=popup.querySelector('#popupPrice');
            var table=document.querySelector('#spec');
            var background=document.querySelector('#background');
            var num;
        }
        if(event.target.id=='previous' || event.target.parentElement.parentElement.id=='previous') {
            for(let i=0; i<mainArr.length; i++) {
                if(spanName.textContent==mainArr[i].fullName) {
                    if(i==0) return;
                    num=i-1;
                    break;
                }
            }
        }
        else if(event.target.id=='next' || event.target.parentElement.parentElement.id=='next') {
            for(let i=0; i<mainArr.length; i++) {
                if(spanName.textContent==mainArr[i].fullName) {
                    if(i==mainArr.length-1) return;
                    num=i+1;
                    break;
                }
            }
        }
        else if(event.target.className=='elem' || (event.target.parentElement.className=='elem' && event.target.tagName=='IMG') || event.target.className=='nameList') {
            for(let i=0; i<mainArr.length; i++) {
                if(event.target.className=='elem' && event.target.getElementsByClassName('nameList')[0].textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
                if(event.target.className=='nameList' && event.target.textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
                if(event.target.parentElement.className=='elem' && event.target.tagName=='IMG' && event.target.parentElement.getElementsByClassName('nameList')[0].textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
            }
        }
        else if(event.target.className=='divSearch'||event.target.parentElement.className=='divSearch') {
            for(let i=0; i<mainArr.length; i++) {
                if(event.target.className=='divSearch' && event.target.lastElementChild.textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
                if(event.target.parentElement.className=='divSearch' && event.target.parentElement.lastElementChild.textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
            }
        }
        else {
            for(let i=0; i<mainArr.length; i++) {
                if(event.target.parentElement.className=='bicycle' && event.target.parentElement.querySelector('.name').textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
                if(event.target.className=='bicycle' && event.target.querySelector('.name').textContent==mainArr[i].name) {
                    num=i;
                    break;
                }
            }
        }

        img.src=mainArr[num].imageSrc;
        img.id='bigImg';
        spanName.textContent=mainArr[num].fullName;
        spanName.id='name';
        spanPrice.textContent='Цена: '+mainArr[num].price+' руб';
        spanPrice.id='price';
        basket.src='https://img.icons8.com/dotty/420/add-basket.png';
        price.id='popupPrice';
        price.appendChild(spanPrice);
        price.appendChild(basket);
        zoomImg.src=mainArr[num].imageSrc;

        if(table.firstElementChild.getElementsByTagName('tr').length>0) {
            for(let i=1; i<table.firstElementChild.getElementsByTagName('tr').length; i++) {
                table.firstElementChild.removeChild(table.firstElementChild.getElementsByTagName('tr')[i]);
                --i;
            }
        }
        
        for(let key in mainArr[num].description) {
            let tr=document.createElement('tr');
            let td1=document.createElement('td');
            let td2=document.createElement('td');
            td1.textContent=key;
            td2.textContent=mainArr[num].description[key];
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.firstElementChild.appendChild(tr);
        }
        
        if(document.getElementById('bigImg')===null) {
            popup.insertBefore(spanName, table);
            popup.insertBefore(img, table);
            table.insertAdjacentElement('afterEnd', price);
            popup.appendChild(zoom);
        }

        forPopup.hidden=false;
        background.hidden=false;

        let close=document.getElementById('close');
        close.onclick=function() {
            forPopup.hidden=true;
            background.hidden=true;
        }

        document.onmousemove=function(e) {
            if(e.target.id=='bigImg' || e.target.parentElement!=null&&e.target.parentElement.id=='zoom') {
                zoom.hidden=false;
                zoom.firstElementChild.style.left=-(e.clientX-img.getBoundingClientRect().left)*2+zoom.offsetHeight/2+'px';
                zoom.firstElementChild.style.top=-(e.clientY-img.getBoundingClientRect().top)*2+zoom.offsetHeight/2+'px';

                zoom.style.left=e.clientX-popup.getBoundingClientRect().left-zoom.offsetHeight/2+'px';
                if(popup.scrollTop==0) {
                    zoom.style.top=e.clientY-popup.getBoundingClientRect().top-zoom.offsetHeight/2+'px';
                }
                else {
                    zoom.style.top=e.clientY-popup.getBoundingClientRect().top-zoom.offsetHeight/2+popup.scrollTop+'px';
                }
            }
            else zoom.hidden=true;
        }
    }
}

function addToBasket(e) {
    if((e.target.parentElement.className=='bicycle' && e.target.className=='cost') || 
    (e.target.parentElement.parentElement!=null && e.target.parentElement.parentElement.className=='bicycle' && e.target.parentElement.className=='cost') ||
    e.target.id=='popupPrice' || e.target.parentElement.id=='popupPrice') {
        let listElem=document.createElement('div');
        let img=document.createElement('img');
        let spanName=document.createElement('span');
        let divAmount=document.createElement('div');
        let min=document.createElement('span');
        let plus=document.createElement('span');
        let amount=document.createElement('span');
        let price=document.createElement('span');
        let goodsList=document.getElementById('goodsList');
        let quantity=document.getElementById('quantity');

        let elem;
        for(let i=0; i<mainArr.length; i++) {
            if(e.target.parentElement.className=='bicycle' && e.target.parentElement.firstElementChild.textContent==mainArr[i].name){
                elem=mainArr[i];
            }
            if(e.target.parentElement.parentElement.className=='bicycle' && e.target.parentElement.parentElement.firstElementChild.textContent==mainArr[i].name){
                elem=mainArr[i];
            }
            if(e.target.id=='popupPrice' && e.target.parentElement.getElementsByTagName('div')[0].textContent==mainArr[i].fullName){
                elem=mainArr[i];
            }
            if(e.target.parentElement.id=='popupPrice' && e.target.parentElement.parentElement.getElementsByTagName('div')[0].textContent==mainArr[i].fullName){
                elem=mainArr[i];
            }
        }

        img.src=elem.imageSrc;
        spanName.textContent=elem.name;
        min.textContent='-';
        plus.textContent='+';
        amount.textContent=1;
        amount.classList.add('amountList');
        price.textContent=elem.price;
        listElem.classList.add('elem');
        divAmount.classList.add('amount');
        spanName.classList.add('nameList');
        price.classList.add('priceList');

        divAmount.appendChild(min);
        divAmount.appendChild(amount);
        divAmount.appendChild(plus);
        listElem.appendChild(img);
        listElem.appendChild(spanName);
        listElem.appendChild(divAmount);
        listElem.appendChild(price);
        goodsList.appendChild(listElem);

        ++quantity.textContent;

        listElem.onclick=function(e) {
            if(e.target.textContent=='-') {
                if(amount.textContent<1) return;
                --amount.textContent;
            }
            if(e.target.textContent=='+') {
                ++amount.textContent;
            }
            sum();
        }
        sum();

        let clear=document.getElementById('clear');
        clear.onclick=function() {
            let elems=document.getElementsByClassName('elem');
            for(let i=0; i<elems.length; i++) {
                goodsList.removeChild(elems[i]);
                --i;
            }
            sum();
            let quantity=document.getElementById('quantity');
            quantity.textContent=0;
        }

        listElem.addEventListener('click', createPopup);
    }
}

function sum() {
    let price=document.getElementById('fullPrice').getElementsByTagName('span')[0];
    let elems=document.getElementsByClassName('elem');
    let sum=0;
    for(let i=0; i<elems.length; i++) {
        let amount=elems[i].getElementsByClassName('amountList')[0].textContent;
        let priceElem=elems[i].getElementsByClassName('priceList')[0].textContent;
        sum+=amount*priceElem;
    }
    price.textContent=sum;
}

function search(arrBicycles) {
    let searchList=document.getElementById('searchList');
    if(this.value.length==0) searchList.style.height=0+'px';
    let arr=[];
    let arrSearch=document.getElementsByClassName('divSearch');
    if(arrSearch.length>0) {
        for(let i=0; i<arrSearch.length; i++) {
            searchList.removeChild(arrSearch[i]);
            --i;
        }
    }
    for(let i=0; i<arrBicycles.length; i++) {
        let name=arrBicycles[i].name.toLowerCase();
        let str=name.slice(0, this.value.length);
        if(str.length==0) return;
        if(this.value.toLowerCase()==str) {
            arr.push(arrBicycles[i]);
        }
    }
    let q;
    if(arr.length>5) {
        for(let i=0; i<5; i++) {
            searchList.appendChild(createSearchElem(arr[i]));
        }
        q=5;
    }
    else if(arr.length<=5 && arr.length>0) {
        for(let i=0; i<arr.length; i++) {
            searchList.appendChild(createSearchElem(arr[i]));
        }
        q=arr.length;
    }
    if(arr.length==0) searchList.style.height=0+'px'
    else searchList.style.height=q*arrSearch[0].clientHeight+10*q+10+'px';

    document.onclick=function(e) {
        if(e.target.className=='divSearch'||e.target.parentElement.className=='divSearch') return
        else {
            for(let i=0; i<arrSearch.length; i++) {
                searchList.removeChild(arrSearch[i]);
                --i;
            }
        }
        searchList.style.height=0+'px';
    }
}

function createSearchElem(obj) {
    let div=document.createElement('div');
    let img=document.createElement('img');
    let spanName=document.createElement('span');
    img.classList.add('searchImg');
    spanName.classList.add('searchName');
    img.src=obj.imageSrc;
    spanName.textContent=obj.name;
    div.classList.add('divSearch');
    div.appendChild(img);
    div.appendChild(spanName);
    return div;
}