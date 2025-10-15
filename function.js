function lafuncion() {
const listaGrande= document.getElementById("tablamaterias");
const collectionList=listaGrande.getElementsByClassName("row");
//formato de elementos en array:
//codigo,[[diahora],[diahora],[diahora]]
let horarioLista=[]
let longitud=collectionList.length;
for (let i = 0; i < longitud; i++){
	iterador=collectionList[i];
	UseCheckbox=iterador.getElementsByTagName("input");
	if(UseCheckbox[0].checked){
		codigo=iterador.getElementsByClassName('codigo')[0].innerText;
		horario=[];
		diaRaw=Array.from(iterador.getElementsByClassName('dia'));
		horaRaw=Array.from(iterador.getElementsByClassName('hora'));
		for(let j=0;j<diaRaw.length;j++){
			iteradorDos=diaRaw[j].innerText;
			iteradorTres=horaRaw[j].innerText;
			if(iteradorDos!=""){horario.push([iteradorDos,iteradorTres]);}
		}
		horarioLista.push([codigo,horario,iterador]);
		//console.log(codigo,horario);//listaHora
	}
	else{
		iterador.style.display = 'none';
	}
	//console.log(horarioLista[i]);
}
let otraLongitud=horarioLista.length+1;
//console.log(horarioLista);
let matrizHorario=[];
for (let i = 0; i < otraLongitud; i++){
	let filaMatriz=[];
	for (let j = 0; j < otraLongitud; j++){
		//titulo
		if(i==0&&j==0){filaMatriz.push(['','th']);continue;}
		let a=i+j-1;
		let b=horarioLista[a];
		if(i==0||j==0){filaMatriz.push([b[0],'th']);continue;}
		//numero
		if(i==j){filaMatriz.push([0,'td']);continue;}
		let materia1=horarioLista[i-1];
		let materia2=horarioLista[j-1];
		let codigo1=materia1[0];
		let codigo2=materia2[0];
		if(codigo1==codigo2){filaMatriz.push([-1,'td']);continue;}
		let horario1=materia1[1];
		let horario2=materia2[1];
		let numeroChoques=0;
for (let i1 = 0; i1 < horario1.length; i1++){
	for (let j1 = 0; j1 < horario2.length; j1++){
		//console.log(horario1[i1],horario2[j1]);
		if(horario1[i1][0]==horario2[j1][0]&&horario1[i1][1]==horario2[j1][1]){//console.log(horario1[i1])
			numeroChoques=numeroChoques+1;}
	}
}
		filaMatriz.push([numeroChoques,'td']);
	}
	matrizHorario.push(filaMatriz);
}
//crear html de la matriz horario
let matrizConclusiones= document.getElementById('matrixhorarios');
matrizConclusiones.innerText='';
for (let i = 0; i < matrizHorario.length; i++){
	let fila=document.createElement('tr');
	for (let j = 0; j < matrizHorario.length; j++){
		let aaa=matrizHorario[i][j];
		let texto=document.createTextNode(aaa[0]);
		let elemento= document.createElement(aaa[1]);
		elemento.appendChild(texto);
		fila.appendChild(elemento);
	}
	matrizConclusiones.appendChild(fila);
}
letdivdeducciones=document.getElementById('deducciones');
letdivdeducciones.appendChild(matrizConclusiones);
//hacer la matriz para usar
matrizHorarioReducida=[];
for (let i = 1; i < matrizHorario.length; i++){filareducida=[];
	for (let j = 1; j < matrizHorario.length; j++){filareducida.push(matrizHorario[i][j][0]);
	}matrizHorarioReducida.push(filareducida);}
//console.log(matrizHorarioReducida);
//hacer cada lista
let lista1=[];
let lista2=[];
let lista3=[];
//console.log('lista2 antes de todo',lista2)
//nuevo>>lista1>lista2>lista3>>viejo
for (let i = 0; i < matrizHorarioReducida.length; i++){
	lista2.push([i]);
}
//console.log('lista2',JSON.stringify(lista2))
console.log('inicio: lista1 ',JSON.stringify(lista1), 'lista2 ',JSON.stringify(lista2), 'lista3 ',JSON.stringify(lista3));
while(lista2.length>0){console.log('i')
	for (let iteraHorariosLista2 = 0; iteraHorariosLista2 < lista2.length; iteraHorariosLista2++){ 
		let horarioEnLista2=lista2[iteraHorariosLista2];
		let ultimoElementoEnLaLista=horarioEnLista2[horarioEnLista2.length - 1]
		let opcionesMateriasParaAgregarAHorario=[]
		for(let i=ultimoElementoEnLaLista+1;i<matrizHorarioReducida.length;i++){opcionesMateriasParaAgregarAHorario.push(i)}
		
		console.log('inicio de ciclo')
		console.log('horarioEnLista2',JSON.stringify(horarioEnLista2), 'ultimoElementoEnLaLista',ultimoElementoEnLaLista, 'opcionesMateriasParaAgregarAHorario',JSON.stringify(opcionesMateriasParaAgregarAHorario))
		for(let iteradorPretendienteHorario=0;iteradorPretendienteHorario<opcionesMateriasParaAgregarAHorario.length;iteradorPretendienteHorario++){
			pretendienteHorario=opcionesMateriasParaAgregarAHorario[iteradorPretendienteHorario]
			listaDeChoques=[]
			for(let iteradorElementosEnLaLista=0;iteradorElementosEnLaLista<horarioEnLista2.length;iteradorElementosEnLaLista++){
				let ElementosEnLaLista=horarioEnLista2[iteradorElementosEnLaLista];
				listaDeChoques.push(matrizHorarioReducida[pretendienteHorario][ElementosEnLaLista])
			}
			let condicionDeChoque=true
			for(i=0;i<listaDeChoques.length;i++){
				if(listaDeChoques[i]!=0){condicionDeChoque=false}
			}
			if(condicionDeChoque){
				horarioPretendienteCompleto=[... horarioEnLista2,pretendienteHorario]
				lista1.push(horarioPretendienteCompleto)
			}
			console.log('horarioEnLista2',JSON.stringify(horarioEnLista2),'pretendienteHorario',pretendienteHorario,'listaDeChoques',JSON.stringify(listaDeChoques),'lista1',JSON.stringify(lista1))
		}
	}
	console.log('mediado de ciclo: lista1 ',JSON.stringify(lista1), 'lista2 ',JSON.stringify(lista2), 'lista3 ',JSON.stringify(lista3));
	for (let i = 0; i < lista2.length; i++){lista3.push(lista2[i]);}
	lista2=[];
	for (let i = 0; i < lista1.length; i++){lista2.push(lista1[i]);}
	lista1=[];
}
console.log('fin de ciclo: lista1 ',JSON.stringify(lista1), 'lista2 ',JSON.stringify(lista2), 'lista3 ',JSON.stringify(lista3));
//crear la table de cada lista
seccionRespuesta=document.getElementById("respuesta")
seccionRespuesta.innerText=""
titular=document.getElementById("titularlista")
for(let iteradorHorarioValido=0;iteradorHorarioValido<lista3.length;iteradorHorarioValido++){
	ppp=lista3.length-1-iteradorHorarioValido
	horarioValido=lista3[ppp]
	tabla=document.createElement('table')
	tabla.appendChild(titular.cloneNode(true))
	for(i=0;i<horarioValido.length;i++){tabla.appendChild(horarioLista[horarioValido[i]][2].cloneNode(true))}
	seccionRespuesta.appendChild(tabla)
}
//console.log(matrizHorario);
//console.log(horarioLista);
//let rows=collectionList;
//console.log((rows));

}
