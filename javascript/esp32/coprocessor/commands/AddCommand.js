assertNamespace('esp32.coprocessor.commands');

esp32.coprocessor.commands.AddCommand = function AddCommand(line) {

    esp32.coprocessor.commands.AbstractAddSubCommand.call(this, line, 'add');

    this.calculate = function calculate(value1, value2) {
        return value1 + value2;
    };
};