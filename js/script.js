/*
    Author: Miguel Castro

    Ajax - viaCEP

    Simple demonstration of an Ajax request consuming API via CEP. (https://viacep.com.br/)
*/

//Retrieving HTML elements.
let btn = document.querySelector('button[id=btn]');
let input = document.querySelector('input[name=cep]');
let div = document.querySelector('div[id=api]');

//Function performed on button click.
btn.onclick = function () {

    //Instantiating Ajax.
    let ajax = new XMLHttpRequest();
    //Opening the connection.
    ajax.open('GET', 'https://viacep.com.br/ws/' + input.value + '/json/');
    //Submitting the requisition.
    ajax.send(null);

    //Function performed on request.
    ajax.onreadystatechange = function () {
        //Checking if Ajax status is OK.
        if (ajax.readyState === 4) {
            //Checking if the HTTP status is OK.
            if (ajax.status === 200) {
                //Converting JSON to an Array.
                let cep = JSON.parse(ajax.responseText);
                //Creating <p> element in HTML document.
                let paragrafElement = document.createElement('p');
                //Creating object with data converted to Array.
                let adress = {
                    cep: cep['cep'],
                    logradouro: cep['logradouro'],
                    bairro: cep['bairro'],
                    localidade: cep['localidade'],
                    uf: cep['uf']
                };
                //Inserting object values ​​into the HTML document.
                adress = document.createTextNode(Object.values(adress));
                //Displaying <p> element as 'child' of <div> element.
                div.appendChild(paragrafElement);
                //Displaying object values ​​as 'child' of <p> element.
                paragrafElement.appendChild(adress);
                //Clearing the input.
                input.value = '';
            }
        }
    }
}