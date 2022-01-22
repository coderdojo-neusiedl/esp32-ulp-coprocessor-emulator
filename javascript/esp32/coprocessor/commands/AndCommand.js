assertNamespace('esp32.coprocessor.commands');

esp32.coprocessor.commands.AndCommand = function AndCommand(line) {

    esp32.coprocessor.commands.AbstractAddSubCommand.call(this, line, 'and');

    this.calculate = function calculate(value1, value2) {
        return value1 & value2;
    };
};