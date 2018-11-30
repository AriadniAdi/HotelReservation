const InputHandler = require("./src/userInputHandler");
const BookingCalculator = require("./src/bookingCalculator");

class App {

    constructor() {
        this.inputHandler = new InputHandler();
        this.calculator = new BookingCalculator();
    }

    run() {
        const stdin = process.openStdin();
        const standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        console.log("#### Bem vindo a calculadora de hotéis ####\n");
        this.showMenu();
        standard_input.on('data', function (data) {
            if (data.toLowerCase() == "s\n") {
                process.exit();
            }
            console.log("output:" + this.getCheaperHotel(data));
            this.showMenu();
        }.bind(this));

    }

    getCheaperHotel(data) {
        try {
            let input = this.inputHandler.extractValues(data);
            return this.calculator.cheaperPrice(input.clientType, input.dates)
        } catch(error) {
            console.log(error.message)
        }
    }

    showMenu() {
        console.log("--------------------------------");
        console.log("Digite os dados da reserva e pressione enter (ou s para sair):");
    }
}

const app = new App()
app.run();