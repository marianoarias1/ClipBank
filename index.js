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

    AccOperations(transaction, amount){

        switch(transaction){
            case "depositar":
                this.userAccBalance += amount
                this.userMovements.push(`${transaction}: $${amount}`)
                break
            case "retiro":
                this.userAccBalance += amount
                this.userMovements.push(`${transaction}: $${amount}`)
                break
            case "transferir":
                this.userAccBalance += amount
                this.userMovements.push(`${transaction}: $${amount}`)
                break
            default:
                break
        }
    }
}

// const username= users[0]?.username;
// const userSurname=  users[0]?.userSurname;
// const userEmail=  users[0]?.userEmail;
// const userPassword=  users[0]?.userPassword;
// const userCreated= new UserAcc({username, userSurname, userEmail, userPassword});
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
        const userBalanceText= document.createTextNode(users[0].userAccBalance)
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
    console.log(users)
    console.log(users[0])
    for(let i = 0; i < btnUserTransaction.length; i++){
        btnUserTransaction[i].addEventListener("click",()=>{
            let transaction= btnUserTransaction[i].value
            toString(transaction)
            switch(transaction){
                case "depositar":
                    users[0].AccOperations(transaction, parseFloat(inputDeposit.value));

                    userAccBalanceCreation()
                    createSpan()
                    inputDeposit.value = ""
                    break
                
                case "transferir":
                    users[0].AccOperations(transaction, parseFloat(inputTransfer.value));
                    userAccBalanceCreation()
                    createSpan()
                    inputTransfer.value = ""
                    break
                
                case "retiro":
                    users[0].AccOperations(transaction, parseFloat(inputRetirement.value));
                    userAccBalanceCreation()
                    createSpan()
                    inputRetirement.value = ""
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
    userCreated.userMovements.map((element)=> {
        console.log(element)
        const userRecordSpan=document.createElement('span')
        const userRecordSpanText= document.createTextNode(element)
        userRecordSpan.appendChild(userRecordSpanText)
        userRecord.appendChild(userRecordSpan)
    })

}

