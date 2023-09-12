// Start Register

const formRegister= document.querySelector("#formRegister")
const inputUser= document.querySelector("#name")
const inputSurname= document.querySelector("#surname")
const inputEmail= document.querySelector("#email")
const inputPassword= document.querySelector("#password")
const btnUser= document.querySelector('#btnUser')

const cardUser= document.querySelector('#cardUser')
const registerDiv= document.querySelector('#register')

//Verificamos si hay o no un usuario en el LocalStorage
const users= JSON.parse(localStorage.getItem('users')) || []
changeStyles()

class UserAcc{
    constructor({username,userSurname,userEmail,userPassword}, userMovements=[], userAccBalance=0){
        this.username = username
        this.userSurname = userSurname
        this.userEmail = userEmail
        this.userPassword= userPassword
        this.userMovements= userMovements
        this.userAccBalance= userAccBalance
    }
}

//creamos la funcion para poder agregar o quitar dinero de la cuenta y se actualiza el storage para que persista
function AccOperations(transaction, amount){
    switch(transaction){
        case "depositar":
            users[0].userAccBalance += amount
            users[0].userMovements.push(`${transaction}: $${amount}`)
            createSpan()
            localStorage.setItem('users', JSON.stringify(users));
            break
        case "retiro":
            if(amount > users[0].userAccBalance){
                alert('Lo sentimos pero no dispones de esa cantidad en tu cuenta')
            }
            else{
                
                users[0].userAccBalance -= amount
                users[0].userMovements.push(`${transaction}: $${amount}`)
                createSpan()
                localStorage.setItem('users', JSON.stringify(users));
            }
            break
        case "transferir":
            if(amount > users[0].userAccBalance){
                alert('Lo sentimos pero no dispones de esa cantidad en tu cuenta')
            }
            else{
                users[0].userAccBalance -= amount
                users[0].userMovements.push(`${transaction}: $${amount}`)
                createSpan()
                localStorage.setItem('users', JSON.stringify(users));
            }
            break
        default:
            break
    }
}

//se guardan los datos del usuario al llenar el formulario de registro
formRegister.onsubmit = e =>{
    e.preventDefault();
    const username= inputUser.value;
    const userSurname= inputSurname.value;
    const userEmail= inputEmail.value;
    const userPassword= inputPassword.value;
    const userCreated= new UserAcc({username, userSurname, userEmail, userPassword});
    saveUser(userCreated);
}




//Recargamos pagina para que se ejecute la funcion changeStyles con el usuario ya creado
 btnUser.addEventListener('click', ()=>{
     location.reload();
})

function saveUser(user){
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    changeStyles()
}

function changeStyles(){
    users == 0 ? cardUser.style.display = 'none' : registerDiv.style.display= 'none'
}

// Ends Register

// Start cardUser

const titleContainer= document.querySelector('#titleContainer');
const userBalanceContainer= document.querySelector('#userBalanceContainer')

// Renderizamos el titulo con el nombre del usuario 
const userNameh2= document.createElement('h2')
const textNameh2= document.createTextNode(`Bienvenido a tu cuenta, `)
userNameh2.appendChild(textNameh2)

const userNameSpan= document.createElement('span')
const textNameSpan= document.createTextNode(users[0]?.username)
userNameSpan.appendChild(textNameSpan)


function userAccBalanceCreation(){
    while(userBalanceContainer.firstChild){
        userBalanceContainer.removeChild(userBalanceContainer.firstChild)
    }
    if(users){
        const userBalanceh3= document.createElement('h3')
        const userBalanceText= document.createTextNode(`$ ${users[0].userAccBalance}`)
        userBalanceh3.appendChild(userBalanceText)

        titleContainer.appendChild(userNameh2)
        userNameh2.appendChild(userNameSpan)
        userBalanceContainer.appendChild(userBalanceh3)
    }
}



const btnUserTransaction= document.getElementsByClassName("button-acc")
const inputDeposit= document.querySelector('#depositar')
const inputTransfer= document.querySelector('#transferir')
const inputRetirement= document.querySelector('#retirar')

function catchUserAction(){
    for(let i = 0; i < btnUserTransaction.length; i++){
        btnUserTransaction[i].addEventListener("click",()=>{
            let transaction= btnUserTransaction[i].value
            switch(transaction){
                case "depositar":
                    if(!inputDeposit.value){
                        alert('Por favor, intorduzca un monto')
                    }
                    else{
                        AccOperations(transaction, parseFloat(inputDeposit.value));
                        userAccBalanceCreation()
                        inputDeposit.value = ""
                    }
                    break
                
                case "transferir":
                    if(!inputTransfer.value){
                        alert('Por favor, intorduzca un monto')
                    }
                    else{
                        AccOperations(transaction, parseFloat(inputTransfer.value));
                        userAccBalanceCreation()
                        inputTransfer.value = ""
                    }
                    break
                
                case "retiro":
                    if(!inputRetirement.value){
                        alert('Por favor, intorduzca un monto')
                    }
                    else{
                        AccOperations(transaction, parseFloat(inputRetirement.value));
                        userAccBalanceCreation()
                        inputRetirement.value = ""
                    }
                    break
                default:
                    return;
            }
        })

    }
}
catchUserAction()
users.length > 0 ? userAccBalanceCreation() : null

const userRecord= document.querySelector('#userRecord')

function createSpan(){
    while(userRecord.firstChild){
        userRecord.removeChild(userRecord.firstChild)
    }
    users[0].userMovements.map((element)=> {
        const userRecordSpan=document.createElement('span')
        const userRecordSpanText= document.createTextNode(element)
        userRecordSpan.appendChild(userRecordSpanText)
        userRecord.appendChild(userRecordSpan)
    })
}
users.length > 0 ? createSpan() : null

