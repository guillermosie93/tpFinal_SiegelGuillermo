
/*let inicio = 1 

//crea un contador por si lo necesito 

function aumentar(){
    let valor = document.getElementById('cantidad').value = inicio++
    $('.btnContador').attr('id', `btn-${valor}`)  
}*/
let start
//intervalo creador de las estrellas
    let creadorEstrellas = setInterval(() =>{
    let x = Math.floor(Math.random() * 400)
    let y = Math.floor(Math.random() * 800)
    $('.body--contain').append(`<div class="estrella" style="height: 5px; width: 5px; top:${y}px; left:${x}px; background-color: #bbdefb; visibility: hidden; position: absolute; border-radius: 2.5px" id="div${x}"></div>`)
       $('.estrella').css({'animation-name': 'scale', 'animation-duration': '2s','animation-timing-function': 'ease','animation-delay': '0s','animation-iteration-count': 'Infinity', 'transition': '2s'})
       if (x > 200){
       $('.estrella').animate({left: `${x} `*1000}, 1000, ()=>{})
       }else{$('.estrella').animate({left: `-${x}`*1000}, 3000, ()=>{})}
    }, 100);



$('#btnContador').on('click', desvanecer)

function desvanecer(){//funcion que desaparece el boton
    $('#btnContador').animate({height: 0, width: 0}, 1000, ()=>{$('#btnContador').text('').css({'border': 'none', 'display': 'none'})
    galaxia()
    })
}
function galaxia(){//funcion para la galaxia -aparecer y evento aplicado
    $('.body--contain').append('<div id="galaxia"></div>')
    $('#galaxia').animate({height: 500, width: 500})
    $('.body--contain').append('<div id="marciano"></div>')
    $('#marciano').on('click',()=>{$('#marciano').addClass('change').attr('data-content', 'bar')})//cambia contendido del texto del marciano con el evento click
    $('#galaxia').on('click', zoomGalaxia)}

function zoomGalaxia(e){//funcion para remover la galaxi y que aparezca el planeta
    p = e.handleObj.type
    $('.body--contain').append('<div id="planeta"></div>')
    $('#planeta').animate({height: 500, width: 500, opacity: 100}, 1600, ()=>{})
        $('#galaxia').animate({height: 800, width: 3000, opacity: 0}, 1500,()=>{
            $('#galaxia').remove()

        })
    if (p == 'click'){//cambia el texto del marciano
        $('#marciano').addClass('planeta').attr('data-content', 'planeta')
    }
    $('#planeta').on('click', zoomPlaneta)
}

function zoomPlaneta(){//da formato a la superficie del planeta y remueve el marciano
    $('#marciano').animate({opacity: 0},800, ()=>{('#marciano').remove()})
    $('#planeta').animate({height: 2000, width: 3000, top: 0}, 2000, ()=>{
        loadHtml()
        clearInterval(creadorEstrellas, 0)
    })
}

function loadHtml(){//llama el html intoworld
$.ajax({
    url: 'intoworld.html',
    method: 'GET',
    dataType: 'html',
    success: (data)=>{
        console.log(data)
        $('#planeta').append(data)
        $('#historia').css({'height': '100px', 'width': '100px'})
    },
}) 
}
//body-historias
$('#body-historias').on('click', redirect)// darle funcionalidad a los div del html

function redirect(e){
    redirectTarget = `${e.target.id}.html`
    console.log(redirectTarget)
    $(location).attr('href', `${redirectTarget}`)
}

//body-heroes
$.getJSON({//llama el JSON con los objetos de los heroes y sus caract.
    url: '/JSON/historiaHeroes.json',
    success: (data)=>{
        localStorage.setItem('historia', JSON.stringify(data))
    }
})    
const heroesJSON = localStorage.getItem('historia')//aqui se manda al localStorage y en la siguiente se paresea para tenerlo disponible
    const heroeArray = JSON.parse(heroesJSON)

for(div of heroeArray){//intererar el array obtenido del JSON y para usar el ID para aplicarle un evento
    const divID = div.id
    $(`#${divID}`).on('click', maquina)
}

function maquina(e){
    const dir = e.target.id //heroe
    const findArray = heroeArray.find( x => x.id == dir)//se busca en el array el objeto que coincida con el ID del button del evento
        const menHeroe = findArray.menciones
        const vicHeroe = findArray.victorias
        let divText = document.querySelector(`p[data-heroe="${dir}"]`)
        const textHeroe = `${menHeroe} ${vicHeroe}`
        const writeDiv = divText.innerHTML = ""
        let i = 0;
        const textlong = textHeroe.length
            const timer = setInterval(() => {//intervalo que crea el efecto de maquina de escribir
                divText.innerHTML = divText.innerHTML.substr(0, textlong -1) + textHeroe.charAt(i)
                if (i >= textlong){
                    clearInterval(timer)
                }else{
                    i++
                }
            }, 25);
 }

//formulario correo

$('.input-checkbox').on('change', habilitar) //habilita el formulario o desahabilita la opcion.

function habilitar(e){
    const inputValue = e.target.value
    const input = e.target.id
    console.log(inputValue)
    if(inputValue === 'si'){
        $('#consulta-coment').fadeOut(800)
        $('#form-coment').fadeIn(2500)
    }
    if(inputValue === 'no'){
        $('#consulta-coment').fadeOut(800)
        $('#form-datos').html('<h1 id="form-h1">Gracias!!!</h1>').fadeIn(2000)
    }
}

$('.input-style').focusout(validarInput)

function validarInput(e){
    const inputName = e.target.id
    const userInfo = $(`#${inputName}`).val()//selecciona el value de cada input

    if(userInfo == ""){//valida que cada campo este completo
        $('.requerido').remove()
        $(`#${inputName}`).after('<span class="requerido" />campo requerido') //genera un cartel de aviso "campo requerido"
            x = false //valor booleano 
        } else{
            $('.requerido').remove()
        x = true //valor booleano
        }
    }

$('#send-comment').on('click', validar)

function validar(e){
    e.preventDefault()
    
    //seleccionar valor de los input
    const userName = $('#name').val() 
    const userCountry = $('#country').val()
    const userMail = $('#email').val()
    const userComment = $('#comment').val()

    almacenarDatos(userName, userCountry, userMail, userComment)
}

function almacenarDatos( x, y, z, v){//almacenar los datos recogidos en un array
    const userComment = []
    
    function infoComment(name, country, mail, comment){//construir el objeto del array
        this.name = name,
        this.country = country,
        this.mail = mail,
        this.comment = comment
    }
    userComment.push(new infoComment(`${x}`, `${y}`, `${z}`, `${v}`))

    //parsear el array y mandarlo al localStorage
    const commentJSON = JSON.stringify(userComment)
    localStorage.setItem('comment', commentJSON)
}






