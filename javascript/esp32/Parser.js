assertNamespace('esp32');

esp32.Parser = function Parser() {

   var MEMORY_WORD_CONSTRUCTORS  = [ esp32.coprocessor.commands.MoveCommand,
                                     esp32.coprocessor.commands.AddCommand,
                                     esp32.coprocessor.commands.SubCommand,
                                     esp32.coprocessor.commands.AndCommand,
                                     esp32.coprocessor.commands.OrCommand,
                                     esp32.coprocessor.commands.LeftShiftCommand];
  
   var publishErrorMessage = function publishErrorMessage(message) {
      esp32.bus.publish(esp32.topics.parser.state, {errorMessage: message});
   };

   var extractLabelDefinitions = function extractLabelDefinitions(lines) {
      var definitions = [];
      
      lines.forEach((line, lineNumber) => {
         var regex = RegExp('([^\\s]+):', 'g');
         var result = regex.exec(line);
         while (result !== null) {
            definitions.push({name: result[1], lineNumber: lineNumber});
            result = regex.exec(line);
         }
      });

      return definitions;
   };

   var removeLabelDefinitions = function removeLabelDefinitions(labelDefinitions, line, lineNumber) {
      var lineWithoutLabelDefinitions = line;
      labelDefinitions.filter(definition => definition.lineNumber === lineNumber)
                      .map(definition => definition.name)
                      .forEach(labelToRemove => lineWithoutLabelDefinitions = lineWithoutLabelDefinitions.replaceAll(labelToRemove + ':', ''));
      return lineWithoutLabelDefinitions;
   };
   
   var getMemoryWordFor = function getMemoryWordFor(line) {
      var memoryWord = undefined;

      for (var i = 0; i < MEMORY_WORD_CONSTRUCTORS.length; i++) {
         try {
            memoryWord = new MEMORY_WORD_CONSTRUCTORS[i](line);
            break;
         } catch(error) {}
      }

      return memoryWord;
   };

   var parseAssemblerCode = function parseAssemblerCode(lines) {
      var labelDefinitions = extractLabelDefinitions(lines);
      var errorMessage     = undefined;

      for(var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
         var rawLine        = lines[lineNumber];
         var normalizedLine = rawLine.replaceAll(/,\s+/g, ', ').toLowerCase().trim();

         if (normalizedLine.length > 0) {
            var memoryWord = getMemoryWordFor(normalizedLine);
            if (memoryWord !== undefined) {
               esp32.bus.sendCommand(esp32.topics.memory.append, memoryWord);
            } else {
               errorMessage = 'invalid input in line ' + lineNumber + ': "' + rawLine + '"';
               break;
            }
         }
      }

      publishErrorMessage(errorMessage);
   };

   var onEditorDocumentChanged = function onEditorDocumentChanged(data) {
      esp32.bus.sendCommand(esp32.topics.memory.clear, {});
      parseAssemblerCode(data.lines);
   };

   publishErrorMessage(undefined);
   esp32.bus.subscribeToCommand(esp32.topics.editor.documentChanged, onEditorDocumentChanged.bind(this));
};