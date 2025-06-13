function lafuncion(lista) {
const checkedBoxes = document.querySelectorAll('#tablamaterias input[type="checkbox"]:checked');

// Extraer los valores en un array
const materias = Array.from(checkedBoxes).map(checkbox => checkbox.value);
//console.log(materias);
const horarios=Array.from(checkedBoxes).map(checkbox => {
  const index = parseInt(checkbox.value); // Convert checkbox value to number
return lista[index]});
//crear la matriz de colisiones
const matriz=new Array(materias.length);
for(let i = 0; i < materias.length; i++){
	ii=materias[i];
	matriz[i]=[];
	for(let j = 0; j < materias.length; j++){
		if(i==j){matriz[i][j]=0;continue;}
		jj=materias[j];
		horarioi=lista[ii];
		horarioj=lista[jj];
		codigoi=document.getElementById("materia"+ii).dataset.codigo;
		codigoj=document.getElementById("materia"+jj).dataset.codigo;
		matriz[i][j]=comparahorarios(horarioi,horarioj,codigoi,codigoj);
	}
}
//crear toda la informacion final

//agregar el titulo de las tablas
codigomaterias=Array.from(checkedBoxes).map(checkbox => checkbox.dataset.codigo);
//console.log(codigomaterias);
horariosvarios=combinaciones(matriz);
matriz.unshift(codigomaterias)
filterCheckedRows("tablamaterias")
const tablaDeCombinaciones= arrayATabla(matriz,"deducciones");
const rows = tablaDeCombinaciones.querySelectorAll('tr');
for (let i = 0; i < rows.length; i++) {
	const row = rows[i];
	const valuey=document.createElement('th')
	valuey.textContent=(i === 0 ? '' : codigomaterias[i-1]);
	row.insertBefore(valuey, row.firstChild);
}//respuesta
let options = {
  originalTableId: 'tablamaterias',  // Copy styles from this table
  includeHeader: true,             // Include the header row
  newTableId: ''     // Set new table ID
};
let tablass=horariosvarios.map(value=>createTableFromRowIds(value,materias,options));
//console.log(tablass);
deducciones=document.getElementById('deducciones');
deducciones.innerHTML="";
titulo=document.createElement('h1');
titulo.innerHTML='tabla de choque (-1: misma materia distinta seccion,0:las puedes ver juntas, sino chocan una o mas veces y no la deberias ver)'
deducciones.appendChild(titulo);
deducciones.appendChild(tablaDeCombinaciones);
for (i of tablass){//console.log(i);
deducciones.appendChild(i);}
//console.log('horariosvarios',horariosvarios);
//console.log("Valores seleccionados:", horarios);
//console.log(matriz)
}
function comparahorarios(horario1, horario2,codigo1,codigo2){
	//console.log(horario1,horario2)
	if(codigo1==codigo2){return -1;};
	let contador =0;
	for (let i of horario1){
		for(let j of horario2){
			//console.log(i,j)
			if(i[0]==j[0]&&i[1]==j[1]){contador++;}
		}
	}
	return contador;
}

function interseccion(segmento1,segmento2){
	if(segmento1[0]>segmento2[1]||segmento1[1]<segmento2[0]){
		return true;
	}
	else{
		return false;
	}
}

function arrayATabla(tabla,idtag){
	//document.getElementById(idtag)
	tablanueva= document.createElement('table');
	tabla.forEach((rowData, rowIndex) => {
    const row = document.createElement('tr')
	rowData.forEach((cellData) => {
      const cell = document.createElement(rowIndex === 0 ? 'th' : 'td');
      cell.textContent = cellData;
      row.appendChild(cell);
    });
	tablanueva.appendChild(row);
  });
  //container=document.getElementById(idtag);
  //container.innerHTML="";
  //container.appendChild(tablanueva);
  return tablanueva;
}

function filterCheckedRows(tableId) {
  // Get the table element
  const table = document.getElementById(tableId);
  
  // Get all rows in the table (skipping the header if present)
  const rows = table.querySelectorAll('tr');
  
  // Loop through all rows (start from 1 to skip header if needed)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Find the checkbox in the row
    const checkbox = row.querySelector('input[type="checkbox"]');
    
    // If checkbox exists and is not checked, hide the row
    if (checkbox && !checkbox.checked) {
      row.style.display = 'none';
    } else {
      row.style.display = ''; // Show the row if checked or no checkbox
    }
  }
}

function combinaciones(matriz){
	let listafinal=[];
	let listainicial=[];
	let listasig=[];
	listainicial=matriz.map((value,index)=>[index]);
	listabase=listainicial;
	let matriceschange=true;
	while(matriceschange){
		for(i of listainicial){
			for (j in listabase){
			//console.log(i,j);
				if(j>i[i.length-1]){
					let choques=i.map((value)=>matriz[j][value]);
					let sumachoque=0;
					choques.forEach((value)=>sumachoque+=value);
					if(!sumachoque){
						
						listasig.push([...i,...[parseInt(j)]]);
					}
					/*console.log("i",i);
					console.log('j',j);
					console.log('choques',choques);
					console.log('sumachoque',sumachoque);
					*/
				}
			}
			
		}
		
		listafinal=[...listafinal,...listainicial];
		listainicial=listasig;
		listasig=[];
		//console.log('listafinal',listafinal,'listainicial',listainicial,
		//			'listasig',listasig);
	if(listainicial.length==0){matriceschange=false;}
	}
	listafinal=[...listafinal,...listainicial];
	return listafinal;
}

function tablegenerator(ids,materias){
	etiquetas=ids.map(value=>materias[value]);
	tabla1=document.createElement('table');
	titular=document.getElementById("titularlista");
	console.log(titular);
	tabla1.appendChild(titular);
	etiquetas.forEach(etiqueta=>tabla1.appendChild(etiqueta));
	return tabla1;
}

function createTableFromRowIds(etiquetas,materias, options = {}) {
	const rowIds=etiquetas.map(value=>'row'+materias[value]);
	//console.log(rowIds);
  // Default options
  const {
    originalTableId = null,
    copyClasses = true,
    includeHeader = true,
    newTableId = 'filtered-table'
  } = options;

  // Create a new table element
  const newTable = document.createElement('table');
  newTable.id = newTableId;

  // If an original table is specified, copy its classes and attributes
  if (originalTableId) {
    const originalTable = document.getElementById(originalTableId);
    if (originalTable) {
      if (copyClasses) {
        newTable.className = originalTable.className;
      }
      // Copy other attributes (except ID)
      Array.from(originalTable.attributes).forEach(attr => {
        if (attr.name !== 'id') {
          newTable.setAttribute(attr.name, attr.value);
        }
      });

      // Copy the header if requested and exists
      if (includeHeader) {
        newTable.appendChild(document.getElementById("titularlista").cloneNode(true));
      }
    }
  }

  // Create table body
  const tbody = document.createElement('tbody');
  newTable.appendChild(tbody);

  // Find and copy each requested row
  
  rowIds.forEach(id => {
    const row = document.getElementById(id);
	console.log(id, row);
	//row && row.tagName == 'tr'
    if (true) {
      tbody.appendChild(row.cloneNode(true));
    }
  });

  return newTable;
}