function makeObj(){
    var bikeCollection=document.getElementsByClassName('list_item_wrapp');
    var obj={};
    for (let i=0; i<bikeCollection.length; i++) {
        let name=bikeCollection[i].getElementsByClassName('item-title')[0].lastElementChild.textContent;
        obj[name]={};
        let elem=bikeCollection[i];
        let image=elem.getElementsByClassName('image_wrapper_block')[0].lastElementChild.lastElementChild.getAttribute('src');
        obj[name]['imageSrc']='https://forward.bike/'+image;
        obj[name]['name']=name;
        obj[name]['fullName']=elem.getElementsByClassName('preview_text')[0].textContent;
        obj[name]['price']=elem.getElementsByClassName('price_value')[0].textContent;
        obj[name]['description']={};
        
        let arrDescription=elem.getElementsByClassName('props_list prod')[0].getElementsByTagName('tr');
        for(let j=0; j<arrDescription.length; j++) {
            obj[name]['description'][arrDescription[j].firstElementChild.firstElementChild.textContent]=
            (function deleteSpace(){
                let str=arrDescription[j].lastElementChild.firstElementChild.textContent.split('');
                for(let i=0; i<str.length; i++) {
                    if(+str[i]!=0) {
                        str=str.slice(i,);
                        break;
                    }
                }
                for(let i=str.length-1; i>0; i--) {
                    if(+str[i]!=0) {
                        str=str.slice(0,i+1);
                        break;
                    }
                }
                return str.join('');
            })(j);
        }
    }
    return JSON.stringify(obj);
}