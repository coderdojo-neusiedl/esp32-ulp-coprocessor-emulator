assertNamespace('esp32.coprocessor');

esp32.coprocessor.StageCountRegister = function StageCountRegister(id) {
   var id    = id;
   var value = 0;

   var publishValue = function publishValue() {
      esp32.bus.publish(esp32.topics.coprocessor.register.stage_cnt, {value: value});
   }

   this.reset = function reset() {
      value = 0;
      publishValue();
   }

   publishValue();
};