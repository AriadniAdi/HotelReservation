const assert = require("assert");
const UserInputHandler = require("../userInputHandler");
const Errors = require("../errors")

describe("UserInputHandler", () => {
  beforeEach(() => {
    this.userInput = new UserInputHandler();
  });

  describe("#extractValues", () => {
    context("when client type is invalid", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.userInput.extractValues("invalid");
        }, Errors.invalidClientType());
      });
    });
  });
});

// Recebe string e
// retorna objeto com tipo de cliente e array de data

// testar se está retornando objeto com tipo de cliente e array de data
// se está aceitando string
// se exibe erro ao enviar input inválido
// tipo de cliente inválido
// uma data inválida , retorna erro.
// todas datas inválidas
