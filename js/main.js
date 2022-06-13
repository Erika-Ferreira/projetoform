var list = [
    {"desc":"Fotografia Torre", "amount":"1", "value": "100,00"},
    {"desc":"Fotografia Cidade" , "amount":"1", "value": "300,00"},
    {"desc":"Fotografia Natureza", "amount":"1", "value": "400,00"},
];

//vou somar o total

function getTotal(list){
    var total = 0;
    for (var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValor").innerHTML = formatvalor(total);
}

//vou criar a tabela

function setList(list){
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Action</td></tr></tread><tbody>';
    for (var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button> <button class="btn btn-default" onclick="deleteData('+key+');">Delete</button></td></tr>';
    }
    table += '</tbody>';

    document.getElementById('listTable').innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

//vou formatar o nome do produto

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

//agora a quantidade

function formatAmount(amount){
    return parseInt(amount);
}

// o preço

function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".",",");
	str = "R$ " + str;
	return str;
}

//adicionar novo produto

function addData(){
	if(!validation()){
		return;
	}
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc , "amount":amount , "value":value});
    setList(list);
}

//os botoes de editar

function setUpdate(id){
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';

}

//limpando os campos de editar

function resetForm(){
    document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("inputIDUpdate").innerHTML = "";
	document.getElementById("errors").style.display = "none";
}

//atualizando daddos

function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc":desc, "amount":amount, "value":value};
	resetForm();
	setList(list);
}

//deletando os dados

function deleteData(id){
    if(confirm("Deletar este Item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

//vou validar e printar os erros aqui

function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var  value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";

    if(desc === ""){
		errors += '<p>Fill out description</p>';
	}
	if(amount === ""){
		errors += '<p>Fill out a quantity</p>';
	}else if(amount != parseInt(amount)){
		errors += '<p>Fill out a valid amount</p>';
	}
	if(value === ""){
		errors += '<p>Fill out a value</p>';
	}else if(value != parseFloat(value)){
		errors += '<p>Fill out a valid value</p>';
	}

	if(errors != ""){
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista

function deleteList(){
    if (confirm("Deletar esta Lista?")){
        list = [];
        setList(list);
    }
}

//salvando o storage

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

//aqui vai verificar se ja tem algo salvo

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();














































































