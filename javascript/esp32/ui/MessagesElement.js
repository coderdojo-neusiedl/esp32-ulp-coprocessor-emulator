assertNamespace('esp32.ui');

esp32.ui.MessagesElement = function MessagesElement(cssSelector) {

   var parserMessage = undefined;
   var memoryMessage = undefined;

   var updateMessagesElement = function updateMessagesElement() {
      var messages = [];

      if (parserMessage !== undefined) {
         messages.push('[Parser] ' + parserMessage);
      }
      if (memoryMessage !== undefined) {
         messages.push('[Memory] ' + memoryMessage);
      }

      $(cssSelector).val(messages.join('\n'));
   };

   var onParserStateChanged = function onParserStateChanged(state) {
      parserMessage = state.errorMessage;
      updateMessagesElement();
   };

   var setMemoryMessage = function setMemoryMessage(message) {
      memoryMessage = message;
      updateMessagesElement();
   };

   var onMemoryStateChanged = function onMemoryStateChanged(state) {
      setMemoryMessage(state.errorMessage);
   };

   var resetMemoryMessage = function resetMemoryMessage() {
      setMemoryMessage(undefined);
   };

   esp32.bus.subscribeToPublication(esp32.topics.parser.state, onParserStateChanged);
   esp32.bus.subscribeToPublication(esp32.topics.memory.state, onMemoryStateChanged);
   esp32.bus.subscribeToCommand(esp32.topics.coprocessor.reset, resetMemoryMessage);
   esp32.bus.subscribeToCommand(esp32.topics.editor.documentChanged, resetMemoryMessage);
};