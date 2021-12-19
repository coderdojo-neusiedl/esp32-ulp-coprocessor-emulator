assertNamespace('esp32.ui');

esp32.ui.RegisterUiElement = function RegisterUiElement(cssSelector, id) {

   var setUiValue = function setUiValue(text) {
      $(cssSelector).text(text);
   };

   var onValueChanged = function onValueChanged(data) {
      setUiValue(data.value);
   };

   setUiValue('');
   esp32.bus.subscribeToPublication(esp32.topics.coprocessor.register[id], onValueChanged);
};