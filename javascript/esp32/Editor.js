assertNamespace('esp32');

esp32.Editor = function Editor(id) {
   var DOCUMENT_CHANGED_COMMAND_INTERVAL_IN_MS = 1000;

   var documentChangedTimer = undefined;
   var documentChangedAgain = false;
   var editorInstance       = ace.edit(id);

   editorInstance.setTheme("ace/theme/monokai");
   editorInstance.getSession().setMode('ace/mode/plain_text');
   editorInstance.setShowPrintMargin(false);
   editorInstance.setFontSize(14);
   editorInstance.setOption("firstLineNumber", 0);
   
   var sendDocumentChangedCommand = function sendDocumentChangedCommand() {
      var data = { lines: editorInstance.getSession().getDocument().getAllLines() };
      esp32.bus.sendCommand(esp32.topics.editor.documentChanged, data);
   };

   var documentChangedTimerExpired = function documentChangedTimerExpired() {
      documentChangedTimer = undefined;
      if (documentChangedAgain) {
         sendDocumentChangedCommand();
      }
   };

   var onDocumentChanged = function onDocumentChanged() {
      if (documentChangedTimer === undefined) {
         sendDocumentChangedCommand();
         documentChangedAgain = false;
      } else {
         clearTimeout(documentChangedTimer);
         documentChangedAgain = true;
      }
      documentChangedTimer = setTimeout(documentChangedTimerExpired.bind(this), DOCUMENT_CHANGED_COMMAND_INTERVAL_IN_MS);
   };

   this.getAllLines = function getAllLines() {
      return editorInstance.getSession().getDocument().getAllLines();
   };

   editorInstance.getSession().getDocument().on("change", onDocumentChanged.bind(this));
   editorInstance.getSession().getDocument().insertFullLines(0, ['move r0, 1','add r0, r0, 1']);
};