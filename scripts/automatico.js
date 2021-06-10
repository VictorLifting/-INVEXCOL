//Variables sprint 1
var asc = document.querySelector(".btn_asc");
var desc = document.querySelector(".btn_desc");
var sel = document.querySelector(".set-col");
var send = document.getElementById("files");

var resp = document.querySelector(".answer");

var dataBase;
var dataBaseGaseosa;
var groupData = [];
//variables sprint 2
var calculate = document.querySelector(".btn_calc");
var selName1 = document.querySelector(".list1");
var selName2 = document.querySelector(".list2");

//Variables sprint 3
var kValue = document.querySelector(".k");

//Variables sprint 4
var dimensionsValues = [];

//Variables sprint 5 
var aggregation = document.querySelector(".aggregation");
var btnGroup = document.querySelector(".btn_group");


//variables nuevas xd
listaNombres=[];
const list = document.querySelector(".productsList");

var personaSelect;
var listaPersonaSelect=[];


//Funciones sprint 1
/*send.addEventListener("change", loadDataBase, false);
function loadDataBase() {
    const fileList = this.files;
    var file = fileList[0];
    Papa.parse(file, {
        complete: function (results) {
            dataBase = results.data;
            createTable(dataBase);
        },
    });
}
*/
//Funciones sprint 1
//loadDataBase()

function loadDataBase() {
    const fileList = gaseosaDB;
    var file = fileList[0];
    Papa.parse(file, {
        complete: function (results) {
            dataBase = results.data;
            createTable(dataBase);
        },
    });
}
//cargar base de datos automaticamente

Papa.parse("datas/crossover.csv", {
    download: true,
    complete: function(results) {
        dataBase = results.data;
        createTable(dataBase);
    },

});

Papa.parse("datas/inversionistas.csv", {
    download: true,
    complete: function(results) {
        dataBaseGaseosa = results.data;
        //createTable(dataBase);
    },

});

Papa.parse("datas/Empresasimglink.csv", {
    download: true,
    complete: function(results) {
        otherDataBase = results.data;

    },

});




function createTable(results) {
    table = "<table class='table pizza'>";
    var selects = false;
    for (i = 0; i < results.length; i++) {
        table += "<tr>";
        var row = results[i];
        cells = row.join(",").split(",");
        for (j = 0; j < cells.length; j++) {
            if (i == 0) {
                var etiq = "th"

            } else {
                var etiq = "td"
            }

            if (!selects && j != 0) {
                table += "<div class='valueMainContainer'>";
                for (let k = 1; k < cells.length; k++) {
                    table += "<div class='valueContainer'>";
                    table += "<p> " + cells[k] + "</p>";
                    var nameSelect = cells[k].replace(/ /g, "");
                    table += "<select class='select" + nameSelect + "' style='width: 40px;'>";
                    for (let l = 1; l < 11; l++) {
                        table += "<option value='" + l + "'>" + l + "</option>"
                        
                    }
                    table += "</select>";
                    table += "</div>";
                }
                table += "</div>";
                selects = true;
            }

            table += "<" + etiq + ">";
            table += cells[j];
          /*  if (j == 0 && i >= 1) {
                table += "<input type='checkbox' id='cbox" + i + "' value=" + i + ">"
            }*/
            table += "</" + etiq + ">";
            
        }
        
        table += "</tr>";
    }
    table += "</table>";
    $("#parsed-list").html(table);
    createOpc();
    createKValues();
}
//Funcion en botones sprint 1
function sortA() {
    if (dataBase) {
        dataBase.sort(function (a, b) {

            switch (sel.value) {
                case "A":
                    return a[1] - b[1];
                    break;

                case "B":
                    return a[2] - b[2];
                    break;
            }

        });

        clearTable();
        $('body').append(createTable(dataBase));
    }
}
function sortD() {
    if (dataBase) {
        dataBase.sort(function (a, b) {
            switch (sel.value) {
                case "A":
                    return b[1] - a[1];
                    break;
                case "B":
                    return b[2] - a[2];
                    break;
            }
        });
        clearTable();
        $('body').append(createTable(dataBase));
    }
}
function clearTable() {
    document.querySelectorAll("table").forEach((n) => n.remove());
}
function createOpc() {
    for (let j = 1; j < dataBase[0].length; j++) {
        const c = dataBase[0][j];
        //Crear opciones por columnas
        opcCol = document.createElement("option");
        opcCol.innerHTML = "Col " + c;
        opcCol.value = Object.values(c);
        sel.appendChild(opcCol);
    }
    for (let i = 1; i < dataBase.length; i++) {
        const e = dataBase[i][0];
        //Crear opciones por nombre
        opc1 = document.createElement("option");
        opc2 = document.createElement("option");
        opc1.innerHTML = e;
        opc1.value = Object.values(e);
        opc2.innerHTML = e;
        opc2.value = Object.values(e);
        selName1.appendChild(opc1);
        // selName2.appendChild(opc2);

    }
}
function createKValues() {
    for (let i = 1; i < dataBase.length - 1; i++) {
        var val = document.createElement("option");
        val.innerHTML = i;
        val.value = Object.values(i);
        kValue.appendChild(val);
    }
}
//Calculo similitud coseno de todos los valores
function similCosAll() {
    //Sacar información de los datos pedidos
    var index1 = selName1.options.selectedIndex;
    var user1 = [];
    var user2 = [];
    var contador = 1;
    var similCos = [];

    var dimensions = dataBase[0];
    var individualDimendions = dimensions.join(",").split(",");

    if (dimensionsValues.length > 0) {
        dimensionsValues = [];
    }

    for (let i = 1; i < individualDimendions.length; i++) {
        var nameSelect = individualDimendions[i].replace(/ /g, "");
        var value = document.querySelector(".select" + nameSelect).options.selectedIndex + 1;
        dimensionsValues.push(value);
    }

    for (let i = 0; i < dataBase[index1 + 1].length - 1; i++) {
        //Todos los valores del usuario elegido
        user1[i] = dataBase[index1 + 1][i + 1];
    }
    for (let fil = 1; fil < dataBase.length; fil++) {
        for (let i = 0; i < dataBase[contador].length - 1; i++) {
            user2[i] = dataBase[contador][i + 1];

        }
        //Producto punto
        var valA = 0;
        var valB = 0;

        //Magnitud
        let magA = 0;
        let magB = 0;

        var prodPunt = 0;


        for (let i = 0; i < user1.length; i++) {
            var valueAplicated = parseFloat(user1[i]) * dimensionsValues[i];
            valA = parseFloat(valueAplicated);
            valB = parseFloat(user2[i]);

            prodPunt += (valA * valB);
            magA += Math.pow(valA, 2);
            magB += Math.pow(valB, 2);
        }
        magA = Math.sqrt(magA);
        magB = Math.sqrt(magB);



        if (dataBase[contador][0] != dataBase[index1 + 1][0]) {
            similCos.push([dataBase[contador][0], (prodPunt / (magA * magB)).toFixed(4)]);
            user2 = [];
        }
        //console.log(similCos.length);
        contador += 1;
    }

   // resp.innerHTML = "La similitud coseno de " + dataBase[index1 + 1][0] + " y las demás personas es de: ";
    resp.innerHTML = "Las personas más afines con " + dataBase[index1 + 1][0] + " son: ";
    createTableSimil(similCos);
    //agregar persona seleccionada
    personaSelect=dataBase[index1 + 1][0]
    console.log(dataBase[index1 + 1][0])
    //drawCircles(similCos, dataBase[index1 + 1][0]);

    //graphicPart(similCos,dataBase[index1 + 1][0]);
}
//Calculo de similitud coseno
function similCos() {
    //Sacar información de los datos pedidos
    var index1 = selName1.options.selectedIndex;
    var index2 = selName2.options.selectedIndex;
    var user1 = [];
    var user2 = [];
    var prodPunt = 0;

    for (let i = 0; i < dataBase[index1 + 1].length - 1; i++) {
        user1[i] = dataBase[index1 + 1][i + 1];
    }
    for (let i = 0; i < dataBase[index2 + 1].length - 1; i++) {
        user2[i] = dataBase[index2 + 1][i + 1];
    }

    //Producto punto
    var valA = 0;
    var valB = 0;

    //Magnitud
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < user1.length; i++) {
        valA = parseFloat(user1[i]);
        valB = parseFloat(user2[i]);
        prodPunt += (valA * valB);

        magA += Math.pow(valA, 2);
        magB += Math.pow(valB, 2);
    }

    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    //Similitud del coseno

    let similCos = prodPunt / (magA * magB);
    resp.innerHTML = "Entre " + dataBase[index1 + 1][0] + " y " + dataBase[index2 + 1][0] + " es de: " + similCos;

}
function createTableSimil(array) {
    listaNombres=[];
    array.sort(function (a, b) {
        return b[1] - a[1];
    });
    var kval = kValue.options.selectedIndex + 1;
    table = "<table class='table'>";
    table += "<tr>";
    for (i = 0; i < kval; i++) {
        table += "<tr>";
        table += "<th>";
        table += array[i][0];
        table += "</th>";
        table += "<td>";
        table += array[i][1];
        table += "</td>";
        table += "</tr>";

    }
    table += "</table>";
    $("#simil-list").html(table);
    console.log(kval)

    for (let i = 0; i < kval; i++) {
        const element = array[i];
    
        listaNombres.push(element[0])
  
    }


  //  console.log(listaNombres)
  //  console.log(dataBase)
}
function graphicPart(array, user) {
    var kval = kValue.options.selectedIndex + 1;
    cod = "<div class='graphic-part'>";
    //usuario del centro
    cod += "<div class='center'>";
    cod += user;
    cod += "</div>"
    for (i = 1; i <= kval; i++) {
        //otros usuarios
        cod += "<div class='people'>";
        cod += array[i][0];
        cod += "</div>"
    }
    cod += "</div>";

    $("#graphic").html(cod);
}
var img;
var imgOther;
function setup() {
    var canvas = createCanvas(500, 400);
    canvas.parent('graphic');
    img = loadImage('./src/chosen.png');
    imgOther = loadImage('../src/other.png');
}

function drawCircles(array, user) {
    var canva = document.getElementById("defaultCanvas0");
    var kval = kValue.options.selectedIndex + 1;
    var radius = 50;
    var centerX = canva.width / 2;
    var centerY = canva.height / 2;
    var f = Math.PI / kval * 2;
    var tam = 20;
    canva.style.display = 'block';
    background(255);
    noStroke();
    var lista = [];
    for (let i = 1; i <= kval; i++) {
        lista.push(i);
        lista.sort(function () { return Math.random() - 0.5 });
    }
    imageMode(CENTER);
    for (let i = 0; i < kval; i++) {

        var name = array[i][0].split(" ")[0] + '\n' + array[i][0].split(" ")[1];
        /*Aleatorio
        let x = (radius + (array[i][1] * i)*10) * Math.cos(lista[i-1] * f) + centerX;
        let y = (radius + (array[i][1] * i)*10) * Math.sin(lista[i-1]  * f) + centerY;*/
        //Ordenado
        let x = (radius + (array[i][1] * i) * 10) * Math.cos(i * f) + centerX;
        let y = (radius + (array[i][1] * i) * 10) * Math.sin(i * f) + centerY;
        stroke(218);
        line(x, y, centerX, centerY);
        noStroke();
        fill(60, 60, 60);
        text(name, x - 20, y + 30);
        //ellipse(x, y, tam, tam);
        image(imgOther, x, y, tam, tam);
    }
    fill(255, 87, 51);
    var username = user.split(" ")[0] + '\n' + user.split(" ")[1]
    text(username, centerX - 20, centerY + 30);
    image(img, centerX, centerY, tam, tam);
    //ellipse(centerX, centerY, 30, 30);

}
var divProto = document.getElementById("protoPerson");


function createGroup() {
    
    var arrayUsers = [];

    for (let i = 0; i < dataBaseGaseosa.length; i++) {

        const elemet = dataBaseGaseosa[i]
        const nombre32 =elemet[0]

        for (let j = 0; j < listaNombres.length; j++) {
            const nombre = listaNombres[j];
            
            if (nombre==nombre32) {
                arrayUsers.push(elemet);

                
            }
            
        }
        
    }

    for (let i = 0; i < dataBaseGaseosa.length; i++) {
        const element = dataBaseGaseosa[i];
        const name = element[0];
        if (name==personaSelect) {
            listaPersonaSelect=element;
   
        }
        
    }
    /*
    let checked = document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checked.length; i++) {
        const index = checked[i].value;
        for (let fil = 1; fil < dataBase.length; fil++) {
            arrayUsers[i] = dataBase[index];
        }
    }
    */
   //console.log(arrayUsers)
    createTableGroup(listaPersonaSelect);
    //createTableGroup(arrayUsers);
    //console.log(listaPersonaSelect);
    doAggregation(arrayUsers);
    calculatePercent();

    //automatic
   
}
function createTableGroup(array) {
    table = "<table class='table'>";
    table += "<tr>";
    for (let k = 0; k < dataBaseGaseosa[0].length; k++) {
        table += "<th>";
        table += dataBaseGaseosa[0][k];
        table += "</th>";

    }
  //  for (i = 0; i < array[0].length; i++) {

        table += "<tr>";
        table += "<th>";
        table += array[0];
        table += "</th>";

       for (let j = 1; j < array.length; j++) {

            table += "<td>";
            table += array[j];

            table += "</td>";
        }

        table += "</tr>";

   // }
    table += "</table>";
    $("#groupP").html(table);
}
function doAggregation(group) {
    var protoUser = [];
    let valA = 0;
    let prom = 0;

    for (let col = 1; col < group[1].length; col++) {
        for (let fil = 0; fil < group.length; fil++) {
            var data = parseFloat(group[fil][col]);
            switch (aggregation.options.selectedIndex + 1) {
                //Caso naiveAverage
                case 1:
                    valA += data;
                    break;
                //Caso LeastMisery
                case 2:
                    if (data <= 5) {
                        data = "null";
                    }
                    valA += data;
                    break;
                //Caso MaximunPleasure
                case 3:
                    if (data <= 8) {
                        data = "1";
                    }
                    valA += data;
                    break;
                //Caso Media Satisfaccion
                case 4:
                    //aqui se crean los promedios mas abajo se hace la desv estandar
                    valA += data;
                    break;
            }

        }
        prom = (valA / (group.length));
        protoUser[col - 1] = prom.toFixed(1);
        valA = 0;
    }
    for (let j = 0; j < protoUser.length; j++) {
        if (protoUser[j] == "NaN") {
            protoUser[j] = "1";
        }
    }

    if (aggregation.options.selectedIndex + 1 == 3) {
        for (let j = 0; j < protoUser.length; j++) {
            d = parseFloat(protoUser[j]);
            if (d >= 2.9) {
                protoUser[j] = "10";
            }
        }
    }
    //Desviacion estandar
    if (aggregation.options.selectedIndex + 1 == 4) {
        protoUser = standDev(protoUser, group);
    }
    createProtoPerson(protoUser);

    similCosAllAutomatic(protoUser);


   // console.log(protoUser)
   //sconsole.log(listaPersonaSelect)
}
function calculatePercent(){

    //console.log(arrayUsers);
}
function standDev(arrayUser, group) {
    let newArray = [];
    let sum = 0;
    let result = 0;
    for (let col = 1; col < group[0].length; col++) {
        for (let fil = 0; fil < group.length; fil++) {
            const data = parseFloat(group[fil][col]);
            var average = parseFloat(arrayUser[col - 1]);
            sum += Math.pow((data - average), 2);
        }
        //Poblacional sobre group.length, para muestra group.length-1 CAMBIAR AQUI
        result = Math.sqrt((sum / (group.length-1)));
        console.log(result);
        newArray.push(result.toFixed(1));
        sum = 0;
    }
    //Si la DesvEstan es menor a 3 entonces pone el número en el min que es 1
    for (let j = 0; j < newArray.length; j++) {
        if (newArray[j]< 3) {
            newArray[j] = "Eliminado";
        }
        
    }
    return newArray;
}

//Sprint aggregation

function createProtoPerson(array) {

    table = "<table class='table'>";
    table += "<tr>";
    for (i = 0; i < array.length + 1; i++) {
        table += "<th>";
        table += dataBaseGaseosa[0][i];
        table += "</th>";

    }
    table += "<tr>";
    table += "<th>";
    table += "Recomendación";
    table += "</th>";
    for (i = 0; i < array.length; i++) {

        table += "<td>";
        table += array[i];
        table += "</td>";

    }
    table += "</table>";
    $(divProto).html(table);
}




///calcular similitud con el proto-persona

function similCosAllAutomatic(protoUser) {
    var user1 = protoUser;
    var user2 = [];
    var contador = 1;
    var similCos = [];


    for (let fil = 1; fil < otherDataBase.length; fil++) {
        for (let i = 0; i < otherDataBase[contador].length - 1; i++) {
            user2[i] = otherDataBase[contador][i + 1];

        }
        //Producto punto
        var valA = 0;
        var valB = 0;

        //Magnitud
        let magA = 0;
        let magB = 0;

        var prodPunt = 0;


        for (let i = 0; i < user1.length; i++) {
            // var valueAplicated = parseFloat(user1[i]) * dimensionsValues[i];
            valA = parseFloat(user1[i]);
            valB = parseFloat(user2[i]);

            prodPunt += (valA * valB);
            magA += Math.pow(valA, 2);
            magB += Math.pow(valB, 2);
        }
        magA = Math.sqrt(magA);
        magB = Math.sqrt(magB);



        //if (otherDataBase[contador][0] != otherDataBase[index1 + 1][0]) {
        similCos.push([otherDataBase[contador][0], (prodPunt / (magA * magB)).toFixed(4),otherDataBase[contador][22],otherDataBase[contador][23]]);
        console.log(otherDataBase[contador][23]);
        user2 = [];
        // }
        contador += 1;
    }

    createTableSimilautomatic(similCos);


}

function createTableSimilautomatic(array) {
    console.log(array)
    array.sort(function(a, b) {
        return b[1] - a[1];
    });
    var kval = kValue.options.selectedIndex + 1;
    table = "<table class='table result'>";
    table += "<tr>";
    var img = [];
    var infoRecomendacion =[];


    for (i = 0; i < kval; i++) {

        table += "<tr>";
        table += "<th>";
        table += array[i][0];
        table += "</th>";
        table += "<td>";
        table += array[i][1];       
        table += "</td>";
        table += "</tr>";   
        img[i] = `${array[i][2]}`; 
        infoRecomendacion.push([array[i][1],array[i][3]])
        console.log(infoRecomendacion);
    }

    table += "</table>";

   ///Agregación de imagenes recomendacion
   
    list.innerHTML = '';

    for(i =0; i< img.length; i++){

    const newProduct = document.createElement('div');
    
    
    newProduct.innerHTML= 
    `
    <div class="cardResult">
    <img src="${img[i]}"alt="" width="300px" class="recomendationCard">
    <p class="percent"> ${((infoRecomendacion[i][0])*100).toFixed(2)}%</p>
    <a href="${infoRecomendacion[i][1]}" target="_blank" class="link" >Más información<a>
    <div>
    `;

    list.appendChild(newProduct);

    }
   // $("#simil-list").html(table);
  //  $("#graphic").html(img);

}


//calculate.addEventListener('click', similCos);
calculate.addEventListener('click', similCosAll);
btnGroup.addEventListener('click', createGroup);
//asc.addEventListener('click', sortA);
//desc.addEventListener('click', sortD);

