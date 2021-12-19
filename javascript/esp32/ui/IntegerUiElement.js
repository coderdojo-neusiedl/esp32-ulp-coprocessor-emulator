assertNamespace('esp32.ui');

esp32.ui.IntegerUiElement = function IntegerUiElement(cssSelector, topic) {

   var setUiValue = function setUiValue(text) {
      $(cssSelector).text(text);
   };

   var onValueChanged = function onValueChanged(data) {
      setUiValue(data.value);
   };

   setUiValue('');
   esp32.bus.subscribeToPublication(topic, onValueChanged);
};