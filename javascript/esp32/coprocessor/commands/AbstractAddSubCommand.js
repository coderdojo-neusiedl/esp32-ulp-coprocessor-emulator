assertNamespace('esp32.coprocessor.commands');

esp32.coprocessor.commands.AbstractAddSubCommand = function AbstractAddSubCommand(line, keyword) {
   this.type         = 'command';
   this.description  = keyword;
   
   var regex = new RegExp('^' + keyword + ' r([0-3]), r([0-3]), (((-?[0-9]+)|(-?0x[0-9a-f]+))|r([0-3]))$');

   var matchResult = line.match(regex);
   
   if (matchResult === null) {
      throw '"' + line + '" is not a ' + keyword + ' command';
   }

   this.destinationRegister   = parseInt(matchResult[1]);
   this.sourceRegister1       = parseInt(matchResult[2]);
   this.sourceRegister2       = matchResult[7] !== undefined ? parseInt(matchResult[7]) : undefined;
   var immediateValueDecimal  = matchResult[5];
   var immediateValueHex      = matchResult[6];
   this.immediateValue        = undefined;
   
   if (immediateValueDecimal !== undefined) {
      this.immediateValue = parseInt(immediateValueDecimal, 10);
   }
   if (immediateValueHex !== undefined) {
      this.immediateValue = parseInt(immediateValueHex, 16);
   }

   this.calculate = function calculate(value1, value2) {
       console.log('ERROR: abstract calculate called');
   };

   this.execute = function execute(coprocessor) {
      var value1 = coprocessor.getRegister(this.sourceRegister1);
      var value2 = (this.immediateValue === undefined) ? coprocessor.getRegister(this.sourceRegister2) : this.immediateValue;
      var result = this.calculate(value1, value2);
      coprocessor.setRegister(this.destinationRegister, result % 65536);
      coprocessor.setZeroFlag(result === 0);
      coprocessor.setOverflowFlag(result > 65535 || result < 0);
   };
};