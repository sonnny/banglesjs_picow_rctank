#include "pico/stdlib.h"
#include "hardware/gpio.h"
#include "pico/stdlib.h"
#include "pico/multicore.h"
#include "blink.h"

#define LO(pin)(gpio_put(pin,0))
#define HI(pin)(gpio_put(pin,1))

struct bt_type data;

void stop(){HI(12);HI(13);HI(14);HI(15);}
void forward(){HI(12);LO(13);HI(14);LO(15);}
void reverse(){LO(12);HI(13);LO(14);HI(15);}
void left(){HI(12);LO(13);HI(14);HI(15);}
void right(){HI(12);HI(13);HI(14);LO(15);}

void main(void){
  stdio_init_all();
 
  for(int i=12; i<16; i++){
    gpio_init(i);
    gpio_set_dir(i,GPIO_OUT);
  }
  stop();
  sleep_ms(1000);

  multicore_launch_core1(bt_main);
  sleep_ms(1000);
  for(;;){
    sleep_ms(40);
    bt_get_latest(&data);
    switch(data.data){
      case 0x73: stop(); break;         // s - stop
      case 0x66: forward(); break; // f - forward
      case 0x62: reverse(); break; // b - reverse
      case 0x6c: left(); break;
      case 0x72: right(); break; 
}}}
