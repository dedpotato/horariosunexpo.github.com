function listaHorario(obj) {
    const dias = Array.from(obj.querySelectorAll('.dia')).map(el => (el.textContent));
    const horas = Array.from(obj.querySelectorAll('.hora')).map(el => (el.textContent));
    const pares = [];
    for (let i = 1; i < dias.length; i++){
        pares.push([dias[i],horas[i]])
    }
    //console.log(pares.length);
    return pares;
  }
function calcularChoques(unNumero,unaLista,laTabla){
    let choques=0;
    for(i=0;i<unaLista.length;i++){
        elementos = unaLista[i];
        choque=laTabla[unNumero][elementos];
        if(choque==-1){choque=1;}
        choques=choques+choque;
    }
    return choques;
}
function myFunction() {
    const tabla = document.getElementById('materias');
    const filas = tabla.rows;
    materiasParaEvaluar=[];
    for (let i = 1; i < filas.length; i++) {
        fila = filas[i];
        const checkbox = fila.querySelector('input[type="checkbox"]');
        if(checkbox.checked){
            materiasParaEvaluar.push(fila);
        }
    }
    tabla.style.display = 'none';
    
    tablaChoques=[];
    for (let i = 0; i < materiasParaEvaluar.length; i++){
        let intermediario=[];
        let comparadorI=materiasParaEvaluar[i];
        for (let j = 0; j < materiasParaEvaluar.length; j++){
            let comparadorJ=materiasParaEvaluar[j];
            if(i==j){
                intermediario.push(0);
                continue;
            }
            if(i>j){
                intermediario.push(tablaChoques[j][i]);
                continue;
            }
            codigoI = comparadorI.querySelector('.codigo').textContent;
            codigoJ = comparadorJ.querySelector('.codigo').textContent;
            if(codigoI == codigoJ){
                intermediario.push(-1);
                continue;
            }
            let horarioI=listaHorario(comparadorI);
            let horarioJ=listaHorario(comparadorJ);
            let cuentahorario=0;
            //console.log(horarioI[1].toString(),horarioJ[5].toString());
            for (let i1 = 0; i1 < horarioI.length; i1++){
                for (let j1 = 0; j1 < horarioJ.length; j1++){
                    if(horarioI[i1][0]=='' ||horarioI[i1][1]==''||  horarioJ[j1][0]=='' ||horarioJ[j1][1]==''){
                        continue;
                    }
                    if(horarioI[i1][0]==horarioJ[j1][0] && horarioI[i1][1]==horarioJ[j1][1]){
                        cuentahorario++;
                    }
                }
            }
            intermediario.push(cuentahorario);
        }
        tablaChoques.push(intermediario);
    }

    for (let i = 0; i < tablaChoques.length; i++){console.log(tablaChoques[i]);}

    let listaFinal=[];
    let listaMedia=[];
    let listaNueva=[];
    let maxChoque=tablaChoques.length;   
    for (let i = 0; i < maxChoque; i++){
        listaMedia.push([i]);
    }
    contador=0;
    while(listaMedia.length>0&&contador<8){
        for(iter1930=0;iter1930<listaMedia.length;iter1930++){
            condicional=true;
            elementolista=listaMedia[iter1930];
            for(candidato=0;candidato<elementolista[0];candidato++){
                choques=calcularChoques(candidato,elementolista,tablaChoques);
                if(choques==0){
                    condicional=false;
                    intermediario1742=[...elementolista];
                    intermediario1742.unshift(candidato);
                    listaNueva.push(intermediario1742);
                }
            }
            
            if(condicional && elementolista.length>5){listaFinal.unshift(elementolista);}
        }
        listaMedia=listaNueva;
        listaNueva=[];
        contador++;
    }
    
    //console.log("elementolista",elementolista,"\ncandidato",candidato,"\nchoques",choques);   
    console.log("listaFinal",listaFinal,"\nlistaMedia",listaMedia,"\nlistaNueva",listaNueva);
    

    
    tablero=document.getElementById('resultario');
    titular=document.getElementById("titularlista")
    for (let i = 0; i < listaFinal.length; i++) {
        let horario13=listaFinal[i];
        let tabla=document.createElement('table');
        tabla.appendChild(titular.cloneNode(true));
        for (let j = 0; j < horario13.length; j++){
            pipi=horario13[j];
            
            tabla.appendChild(materiasParaEvaluar[pipi].cloneNode(true));
        }
        tablero.appendChild(tabla);
    }  
}
