//Variables sprint 1
var asc = document.querySelector(".btn_asc");
var desc = document.querySelector(".btn_desc");
var sel = document.querySelector(".set-col");
var send = document.getElementById("files");

var resp = document.querySelector(".answer");

var dataBase;
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

//Variables sprint 6
var dataBasePeople;
var btnPeople = document.querySelector(".btn_people");
var btnPizzas = document.querySelector(".btn_pizzas");

var mainDataBase;
var otherDataBase;

const list = document.querySelector(".productsList");

//Cargar bases de datos previamente
Papa.parse("datas/EmpresasImg.csv", {
    download: true,
    complete: function(results) {
        dataBase = results.data;
    },

});
Papa.parse("datas/inversionistas.csv", {
    download: true,
    complete: function(results) {
        dataBasePeople = results.data;
    },
});

function resetMainDb(db) {
    mainDataBase = db;
    if (mainDataBase == dataBasePeople) {
        otherDataBase = dataBase;
    } else {
        otherDataBase = dataBasePeople;
    }
}


function showPizzas() {
    createTable(dataBase);
    resetMainDb(dataBase);
    btnProto.style.visibility = 'visible';
}

function showPeople() {
    createTable(dataBasePeople);
    resetMainDb(dataBasePeople);
    btnProto.style.visibility = 'visible';
}


var btnProto = document.querySelector(".btn_proto");
var btnRecomend = document.querySelector(".btn_recomend");
btnProto.addEventListener('click', createGroup);
btnPeople.addEventListener('click', showPeople);
btnPizzas.addEventListener('click', showPizzas);
//btnRecomend.addEventListener('click',similCosAll);

//btnPizzas.addEventListener('click', loadDataBase);

//Funciones sprint 1
//send.addEventListener("change", loadDataBase, false);
/*
function loadDataBase() {
    const fileList = this.files;
    //var file = fileList[0];
    var file = fileList[0];
    Papa.parse(file, {
        complete: function (results) {
            dataBase = results.data;
            createTable(dataBase);
        },
    });
}
/*
Papa.parse('./datas/dataPersonas.csv', {
	complete: function(results) {
            dataBase = results.data;
            createTable(dataBase);
	}
});*/

function createTable(results) {
    table = "<table class='table'>";
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
            if (j == 0 && i >= 1) {
                table += "<input type='checkbox' id='cbox" + i + "' value=" + i + ">"
            }
            table += "</" + etiq + ">";
        }
        table += "</tr>";
    }
    table += "</table>";
    $("#parsed-list").html(table);
    // createOpc();
    createKValues(results);
}
//Funcion en botones sprint 1
function sortA() {
    if (dataBase) {
        dataBase.sort(function(a, b) {

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
        dataBase.sort(function(a, b) {
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

function createKValues(db) {
    for (let i = 1; i < db.length - 1; i++) {
        var val = document.createElement("option");
        val.innerHTML = i;
        val.value = Object.values(i);
        kValue.appendChild(val);
    }
}
//Calculo similitud coseno de todos los valores
function similCosAll(protoUser) {
    //Sacar información de los datos pedidos
    //var index1 = selName1.options.selectedIndex;
    var user1 = protoUser;
    var user2 = [];
    var contador = 1;
    var similCos = [];
    /*
    var dimensions = otherDataBase[0];
    var individualDimendions = dimensions.join(",").split(",");

    if (dimensionsValues.length > 0) {
        dimensionsValues = [];
    }

    for (let i = 1; i < individualDimendions.length; i++) {
        var nameSelect = individualDimendions[i].replace(/ /g, "");
        var value = document.querySelector(".select" + nameSelect).options.selectedIndex + 1;
        dimensionsValues.push(value);
    }

    for (let i = 0; i < db[index1 + 1].length - 1; i++) {
        //Todos los valores del usuario elegido
        user1[i] = db[index1 + 1][i + 1];
    }*/

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
        similCos.push([otherDataBase[contador][0], (prodPunt / (magA * magB)).toFixed(4),otherDataBase[contador][22]]);
        console.log(otherDataBase[contador][22]);
        user2 = [];
        // }
        contador += 1;
    }

    // resp.innerHTML = "La similitud coseno de " + otherDataBase[index1 + 1][0] + " y las demás personas es de: ";
    createTableSimil(similCos);
    //drawCircles(similCos, protoUser);

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
    console.log(array)
    array.sort(function(a, b) {
        return b[1] - a[1];
    });
    var kval = kValue.options.selectedIndex + 1;
    table = "<table class='table result'>";
    table += "<tr>";
    var img = [];


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
        console.log(img[i]);
    }

    table += "</table>";

   
   
    list.innerHTML = '';

    for(i =0; i< img.length; i++){

    const newProduct = document.createElement('div');
    
    newProduct.innerHTML= `<img src="${img[i]}"alt="" width="300px">`;

    list.appendChild(newProduct);

    }
    $("#simil-list").html(table);
  //  $("#graphic").html(img);

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
    img = loadImage('../src/chosen.png');
    imgOther = loadImage('../src/other.png');
}

function drawCircles(array, user) {
    var canva = document.getElementById("defaultCanvas0");
    var kval = kValue.options.selectedIndex + 1;
    var radius = 50;
    var centerX = canva.width / 2;
    var centerY = canva.height / 2;
    var f = Math.PI / kval * 2;
    console.log(canva);
    var tam = 20;
    canva.style.display = 'block';
    background(255);
    noStroke();
    var lista = [];
    for (let i = 1; i <= kval; i++) {
        lista.push(i);
        lista.sort(function() { return Math.random() - 0.5 });
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
    //var username = user.split(" ")[0] + '\n' + user.split(" ")[1]
    text("proto", centerX - 20, centerY + 30);
    image(img, centerX, centerY, tam, tam);
    //ellipse(centerX, centerY, 30, 30);

}
var divProto = document.getElementById("protoPerson");


function createGroup() {
    var arrayUsers = [];
    let checked = document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checked.length; i++) {
        const index = checked[i].value;
        for (let fil = 1; fil < mainDataBase.length; fil++) {
            arrayUsers[i] = mainDataBase[index];
        }
    }
    if (arrayUsers.length > 0) {
        createTableGroup(arrayUsers);
        doAggregation(arrayUsers);

    }
}

function createTableGroup(array) {
    table = "<table class='table'>";
    table += "<tr>";
    for (let k = 0; k < array[1].length; k++) {
        table += "<th>";
        table += mainDataBase[0][k];
        table += "</th>";

    }
    for (i = 0; i < array.length; i++) {

        table += "<tr>";
        table += "<th>";
        table += array[i][0];
        table += "</th>";

        for (let j = 1; j < array[1].length; j++) {

            table += "<td>";
            table += array[i][j];

            table += "</td>";
        }
        table += "</tr>";

    }
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
                    if (data < 5) {
                        data = "null";
                    }
                    valA += data;
                    break;
                    //Caso MaximunPleasure
                case 3:
                    if (data <= 8) {
                        data = 1;
                    }
                    valA += data;
                    break;
                    //Caso Media Satisfaccion
                case 4:
                    //aqui se crean los promedios mas abajo se hace la desv estandar
                    valA += data;
                    break;
                    //Own Method
                case 5:
                    if (data < 4) {
                        data = 1;
                    } else if (data >= 10) {
                        data = 1;
                    }
                    valA += data;
                    break;
            }

        }
        prom = (valA / (group.length));
        protoUser[col - 1] = prom.toFixed(0);
        valA = 0;
    }
    console.log(protoUser);
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
    if (aggregation.options.selectedIndex + 1 == 5) {

        protoUser = ownMethod(protoUser);
    }
    createProtoPerson(protoUser);
    similCosAll(protoUser);
}

function ownMethod(averages) {
    let newAverages = [];
    for (let i = 0; i < averages.length; i++) {
        let num = parseFloat(averages[i]);
        if (num <= 2.5) {
            num = "1";
        } else {
            num = (num).toFixed(1);
        }
        newAverages.push(num);
    }
    return newAverages;
}

function standDev(arrayUser, group) {
    let newArray = [];
    let sum = 0;
    let result = 0;
    console.log(arrayUser);
    for (let col = 1; col < group[0].length; col++) {
        for (let fil = 0; fil < group.length; fil++) {
            const data = parseFloat(group[fil][col]);
            var average = parseFloat(arrayUser[col - 1]);
            sum += Math.pow((data - average), 2);
        }
        //Poblacional sobre group.length, para muestra group.length-1 CAMBIAR AQUI
        result = Math.sqrt((sum / (group.length - 1)));
        newArray.push(result.toFixed(1));
        sum = 0;
    }
    console.log(newArray);
    //Si la DesvEstan es mayor a 3 entonces pone el número en el min que es 1
    for (let j = 0; j < newArray.length; j++) {
        var average = parseFloat(arrayUser[j]);
        var stanD = parseFloat(newArray[j]);
        if (stanD <= 2.5 && average >= 7.7) {
            newArray[j] = 10;
        } else {
            newArray[j] = 1;
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
        table += mainDataBase[0][i];
        table += "</th>";

    }
    table += "</tr>";
    table += "<th>";
    table += "Proto-N";
    table += "</th>";
    for (i = 0; i < array.length; i++) {

        table += "<td>";
        table += array[i];
        table += "</td>";

    }
    table += "</table>";
    $(divProto).html(table);
}

//calculate.addEventListener('click', similCos);
//calculate.addEventListener('click', similCosAll();

//btnGroup.addEventListener('click', createGroup(mainDataBase));
//asc.addEventListener('click', sortA);
//desc.addEventListener('click', sortD);