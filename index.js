/* Pidiendo datos al usuario para la posterior creación de la cuenta */
const userName= prompt("Ingrese su nombre")
const accBalance= parseFloat(prompt("Ingrese el monto a depositar en la cuenta"))

class UserAcc{
    constructor(name, balance, movements=[]){
        this.name = name
        this.balance = balance
        this.movements= movements
    }

    AccOperations(param, amount){
        if(param === "depositar"){
            this.balance += amount
            this.movements.push(`Ingreso: $${amount} \n`)
        }
        else if(param === "retirar" | "transferir"){
            this.balance -= amount
            this.movements.push(`Egreso: $${amount} \n`)
        }
    }

    showAccMovements(){
        alert(`${this.name} estos son los movimientos de tu cuenta \n${this.movements}`)

    }

    showAccBalance(){
        alert(`${this.name} el balance acltual de tu cuenta es $${this.balance}`)
    }
}

/* Creando la Clase con los datos proporcionados */
const createUser=new UserAcc(userName, accBalance)


const userTransaction=(param)=>{
    const transaction= prompt("Ingrese el tipo de accion que desea realizar. (depositar/retirar/transferir)")
    const amount= parseFloat(prompt("Ingrese el monto de la acción a realizar"))
    return param.AccOperations(transaction, amount)
}

let doTransaction = true
while(doTransaction){
    userTransaction(createUser)

    const accMovements= prompt("Desea ver el historial de transacciones? si/no")
    if(accMovements==="si"){
        createUser.showAccMovements()
    }
    const response= prompt("Desea realizar otra acción? si/no")
    if(response==="no"){
        createUser.showAccBalance()
        doTransaction = false
    }
}
