assertNamespace('esp32.coprocessor');

esp32.coprocessor.Memory = function Memory() {

   var memoryWords               = [];
   var lastPublishedErrorMessage = undefined;

   var publishErrorMessage = function publishErrorMessage(message) {
      if (message !== undefined || (lastPublishedErrorMessage !== undefined && message === undefined)) {
         esp32.bus.publish(esp32.topics.memory.state, {errorMessage: message});
         lastPublishedErrorMessage = message;
      }
   };

   var isIndexACommand = function isIndexACommand(memoryWordIndex) {
      var memoryWord = memoryWords[memoryWordIndex];
      return (memoryWord !== undefined) && (memoryWord.type === 'command');
   };

   this.execute = function execute(memoryWordIndex, coprocessor) {
      var memoryWord = memoryWords[memoryWordIndex];
      
      if (memoryWord === undefined) {
         publishErrorMessage('memory word (index=' + memoryWordIndex + ') does not exist!');
         return;
      }

      if (memoryWord.type !== 'command') {
         publishErrorMessage('memory word (index=' + memoryWordIndex + ') is not a command!');
         return;
      }

      memoryWord.execute(coprocessor);
      publishErrorMessage(undefined);
   };

   publishErrorMessage(undefined);

   esp32.bus.subscribeToCommand(esp32.topics.memory.clear,  () => {
      memoryWords = [];
   });

   esp32.bus.subscribeToCommand(esp32.topics.memory.append, memoryWord => {
      memoryWords.push(memoryWord);
   });
};