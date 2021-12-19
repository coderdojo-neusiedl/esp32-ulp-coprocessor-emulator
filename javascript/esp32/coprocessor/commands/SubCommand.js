assertNamespace('esp32.coprocessor.commands');

esp32.coprocessor.commands.SubCommand = function SubCommand(line) {

    esp32.coprocessor.commands.AbstractAddSubCommand.call(this, line, 'sub');

    this.calculate = function calculate(value1, value2) {
        return value1 - value2;
    };
};