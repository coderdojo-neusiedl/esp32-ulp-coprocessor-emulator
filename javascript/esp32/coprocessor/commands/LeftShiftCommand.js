assertNamespace('esp32.coprocessor.commands');

esp32.coprocessor.commands.LeftShiftCommand = function LeftShiftCommand(line) {

    esp32.coprocessor.commands.AbstractAddSubCommand.call(this, line, 'lsh');

    this.calculate = function calculate(value1, value2) {
        return value1 << value2;
    };
};
