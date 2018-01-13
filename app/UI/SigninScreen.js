const blessed = require("blessed");
const Input = require("./Input");
const createConfigFile = require("../CreateConfigFile");
const fs = require("fs");

module.exports = class {

    constructor() {
        this.screen = blessed.screen({
            smartCSR: true,
        });

        this.signinForm = blessed.form({
            parent: this.screen,
            mouse: true,
            keys: true,
            content: "Sign in",
            width: "100%",
            height: "100%"
        });

        this.prepareInputs();
        this.prepareButton();

        this.signinForm.focus();
    }

    formSubmit(data) {
        let username = data.username;
        let password = data.password;

        createConfigFile(username, password);
    }

    prepareInputs() {
        this.usernameInput = new Input({
            parent: this.signinForm,
            top: 2,
            name: "username"
        });

        this.passwordInput = new Input({
            parent: this.signinForm,
            top: 4,
            name: "password"
        });
    }

    prepareButton() {
        this.submitButton = blessed.button({
            parent: this.signinForm,
            mouse: true,
            keys: true,
            shrink: true,
            name: "submit",
            content: "Submit",
            left: "80%",
            top: 6,
            style: {
                bg: "blue",
                focus: {
                    bg: "red"
                },
                hover: {
                    bg: "red"
                }
            }
        });

        this.submitButton.on("press", () => {
            this.signinForm.submit();
        });
    }

    askForData(onConfigGenerate) {
        this.signinForm.on("submit", (data) => {
            this.formSubmit(data);
            this.screen.destroy();
            onConfigGenerate();
        });
        this.screen.render();
    }

};