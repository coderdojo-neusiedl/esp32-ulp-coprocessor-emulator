assertNamespace('esp32.coprocessor');

esp32.coprocessor.Coprocessor = function Coprocessor() {
   var memory                    = new esp32.coprocessor.Memory();
   var registers                 = [];
   var stageCountRegister        = new esp32.coprocessor.StageCountRegister();
   var zeroFlagSet;
   var overflowFlagSet;
   var nextCommandIndexToExecute = 0;

   for (var i = 0; i < 4; i++) {
      registers.push(new esp32.coprocessor.Register(i));
   }

   var publishNextCommandIndex = function publishNextCommandIndex() {
      esp32.bus.publish(esp32.topics.coprocessor.nextCommandIndex, {value: nextCommandIndexToExecute});
   };

   var executeNextCommand = function executeNextCommand() {
      memory.execute(nextCommandIndexToExecute++, this);
      publishNextCommandIndex();
   };

   this.setZeroFlag = function setZeroFlag(value) {
      zeroFlagSet = value;
      esp32.bus.publish(esp32.topics.coprocessor.flag.zero, {value: zeroFlagSet});
   };

   this.setOverflowFlag = function setOverflowFlag(value) {
      overflowFlagSet = value;
      esp32.bus.publish(esp32.topics.coprocessor.flag.overflow, {value: overflowFlagSet});

   };

   var reset = function reset() {
      registers.forEach(register => register.reset());
      stageCountRegister.reset();
      this.setZeroFlag(false);
      this.setOverflowFlag(false);
      nextCommandIndexToExecute = 0;
      publishNextCommandIndex();
   };

   this.setRegister = function setRegister(id, value) {
      registers[id].setValue(value);
   };

   this.getRegister = function getRegister(id) {
      return registers[id].getValue();
   };

   this.setZeroFlag(false);
   this.setOverflowFlag(false);
   publishNextCommandIndex();

   esp32.bus.subscribeToCommand(esp32.topics.coprocessor.executeNextCommand, executeNextCommand.bind(this));
   esp32.bus.subscribeToCommand(esp32.topics.coprocessor.reset, reset.bind(this));
};

