assertNamespace('esp32.ui');

esp32.ui.FlagUiElement = function FlagUiElement(cssSelector, id) {

   var setUiValue = function setUiValue(text) {
      $(cssSelector).text(text);
   };

   var onValueChanged = function onValueChanged(data) {
      setUiValue(data.value ? "true" : "false");
   };

   setUiValue('');
   esp32.bus.subscribeToPublication(esp32.topics.coprocessor.flag[id], onValueChanged);
};