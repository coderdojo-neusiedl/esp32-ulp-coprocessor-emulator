assertNamespace('esp32.coprocessor');

esp32.coprocessor.Register = function Register(id) {
   var id    = id;
   var value = 0;

   var publishValue = function publishValue() {
      esp32.bus.publish(esp32.topics.coprocessor.register['r' + id], {value: value});
   };

   this.reset = function reset() {
      value = 0;
      publishValue();
   };

   this.setValue = function setValue(newValue) {
      if (newValue < 0) {
         value = 65536 - Math.abs(newValue);
      } else {
         value = newValue;
      }
      publishValue();
   };

   this.getValue = function getValue() {
      return value;
   };
   
   publishValue();
};