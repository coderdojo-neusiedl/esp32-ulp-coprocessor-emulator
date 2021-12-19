assertNamespace('esp32.coprocessor.commands');

esp32.coprocessor.commands.MoveCommand = function MoveCommand(line) {
   this.type         = 'command';
   this.description  = 'move';
   
   var regex = /^move r([0-3]), (((-?[0-9]+)|(-?0x[0-9a-f]+))|r([0-3]))$/;
   
   var matchResult = line.match(regex);
   
   if (matchResult === null) {
      throw '"' + line + '" is not a move command';
   }

   this.destinationRegister   = parseInt(matchResult[1]);
   this.sourceRegister        = matchResult[6] !== undefined ? parseInt(matchResult[6]) : undefined;
   var immediateValueDecimal  = matchResult[4];
   var immediateValueHex      = matchResult[5];
   this.immediateValue        = undefined;
   
   if (immediateValueDecimal !== undefined) {
      this.immediateValue = parseInt(immediateValueDecimal, 10);
   }
   if (immediateValueHex !== undefined) {
      this.immediateValue = parseInt(immediateValueHex, 16);
   }

   if (this.immediateValue > 65535) {
      throw '"' + line + '" immediate value in move command is out of range (allowed: 0 - 65535)';
   };

   this.execute = function execute(coprocessor) {
      var value = (this.immediateValue !== undefined) ? this.immediateValue : coprocessor.getRegister(this.sourceRegister);
      coprocessor.setRegister(this.destinationRegister, value);
      coprocessor.setZeroFlag(value === 0);
   };
};