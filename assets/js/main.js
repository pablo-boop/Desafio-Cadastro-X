class User {
    constructor(name, email, birthdate, address, phone, cpf, age, sign, possibleClient) {
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.address = address;
        this.phone = phone;
        this.cpf = cpf;
        this.age = age;
        this.sign = sign;
        this.possibleClient = possibleClient;
    }
}

class ListUser {
    constructor() {
        this.users = [];
    }

    add(user) {
        if(isAnyInputEmpty()) {
            sendErrorMsg(`Preencha todos campos`)
        } else if(!valida_cpf(user.cpf)) {
            sendErrorMsg(`Cpf inválido`)
        } else if(isUserAlreadyRegistered(user.cpf)) {
            sendErrorMsg(`Cpf já cadastrado!`)
        }else{
            this.users.push(user)
            sendSuccessMsg(`Parabens, você entrou no X!`)
            cleanInputs()
        }
    }

    countUsers(count) {
        contador = document.getElementById("contador");
        count = this.users.length;
        document.getElementById("contador").textContentL = `Contador: ${count}`;
    }

    getZodiacSign(date) {
        let birthdate = date.split("-");
        let day = birthdate[2];
        let month = birthdate[1];
        console.log("Passou pelo getSigno() da class User");
    
        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }

    calculateAge(date) {
        let birthdate = date.split("-")
        let yy = Number(birthdate[0])
        let year = 2023;
        let age = (year - yy)
        return age
    }

    isPossibleClient(date) {
        let age = this.calculateAge(date);

        if(age >= 18 && age <= 31) {
            return `Sim 😎`
        } else {
            return `Não 😑`
        }
    }

    getAllUsers() {
        if(this.users.length == 0) {
            sendErrorMsg(`Não há usuários cadastrados.`)
        } else {
            document.getElementById("sub-div").classList.remove("hidden");
            document.getElementById("title-page").classList.add("hidden");
            document.getElementById("main-div").classList.add("hidden");
        
            let content = "";
            
            listUser.users.forEach((user) => {
                content += `
                <div id="user-list">
                    <div class="cardUsers">
                        <p><b>Nome:</b> ${user.name}</p>
                        <p><b>Email:</b> ${user.email}</p>
                        <p><b>Data de aniversario:</b> ${user.birthdate}</p>
                        <p><b>Endereço:</b> ${user.address}</p>
                        <p><b>Telefone:</b> ${user.phone}</p>
                        <p><b>Cpf:</b> ${formatedCPF(user.cpf)}</p>
                        <p><b>Idade:</b> ${user.age} anos</p>
                        <p><b>Signo:</b> ${user.sign}</p>
                        <p><b>Possivel Cliente:</b> ${user.possibleClient}</p>
                    </div>
                </div>
                `
            })
            document.getElementById("user-list").innerHTML = content;
        }
        document.getElementById("contador").textContent = `Contador: ${this.users.length}`
    }

}

const listUser = new ListUser();

function cleanInputs() {
    name = document.getElementById("name").value = ""
    email = document.getElementById("email").value = ""
    birthdate = document.getElementById("birthdate").value = ""
    address = document.getElementById("address").value = ""
    phone = document.getElementById("phone").value = ""
    cpf = document.getElementById("cpf").value = ""
}

function isAnyInputEmpty() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const cpf = document.getElementById("cpf").value;
    
    if(name == "" && email == "" && birthdate == "" && address == "" && phone == "" && cpf== "" ) {
        return true
    } else if(name == "" || email == "" || birthdate == "" || address == "" || phone == "" || cpf== "") {
        return true
    }
}

function sendErrorMsg(msg) {
    console.log("Passou pela funcao sendErrorMsg()");
    
    document.getElementById("error-msg").innerHTML = msg;
    document.getElementById("error-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("error-msg").classList.add("hidden");
    }, 4000);
}

function sendSuccessMsg(msg) {
    console.log("Passou pela funcao sendSuccessMsg()");

    document.getElementById("success-msg").innerHTML = msg;
    document.getElementById("success-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("success-msg").classList.add("hidden");
    }, 4000);
}

function createUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const cpf = document.getElementById("cpf").value;
    const user = new User(name, email, dateInPTBR(birthdate), address, formatedCellphone(phone), cpf, listUser.calculateAge(birthdate), listUser.getZodiacSign(birthdate), listUser.isPossibleClient(birthdate))
    
    listUser.add(user)
}

function showRegister() {
    document.getElementById("sub-div").classList.add("hidden");
    document.getElementById("title-page").classList.remove("hidden");
    document.getElementById("main-div").classList.remove("hidden");
    console.log("Passou pela funcao showRegister()");

}

function formatedCPF(cpf) {
    console.log("Passou pela funcao formatedCPF()");
    valida_cpf(cpf)

    let cpfArray = cpf.split("");
    let cpfFormated = cpfArray[0] + cpfArray[1] + cpfArray[2]
        + "." + cpfArray[3] + cpfArray[4] + cpfArray[5] + "."
        + cpfArray[6] + cpfArray[7] + cpfArray[8] + "-" + cpfArray[9] + cpfArray[10];
    return cpfFormated;
}

function formatedCellphone(cellphone) {
    console.log("Passou pela funcao formatedCellphone()");

    let cellphoneArray = cellphone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}

function valida_cpf(cpf) {
    console.log("Passou pela funcao valida_cpf()");

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;

}

function dateInPTBR(date) {
    let birthdate = date.split("-")
    let dateFormated = birthdate.reverse()
    let datePTBR = dateFormated.toString()
    return datePTBR
}

function showRegister() {
    document.getElementById("sub-div").classList.add("hidden");
    document.getElementById("title-page").classList.remove("hidden");
    document.getElementById("main-div").classList.remove("hidden");
    console.log("Passou pela funcao showRegister()");

}

function showUsers() {
    listUser.getAllUsers()
}

function isUserAlreadyRegistered(cpf) {
    console.log("passou aqui")
    let isUserAlreadyRegistered = false;
    listUser.users.forEach((user) => {
        if(cpf == user.cpf){
            isUserAlreadyRegistered = true;
        }
    })

    return isUserAlreadyRegistered;
}