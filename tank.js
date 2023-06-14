let drag;
var tx;

function connect(){
 NRF.connect("28:CD:C1:01:8D:5F").then(function(g) {
  return g.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
}).then(function(service) {
  return service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e");
}).then(function(characteristic) {
   g.setColor(0,1,0);
  g.fillCircle(10,145,10); 
   tx = characteristic;
  return;
});
}

function init() {
Bangle.on("drag", e => {
		if (!drag) {
			drag = {x: e.x, y: e.y};
		} else if (!e.b) {
			const dx = e.x-drag.x, dy = e.y-drag.y;
			drag = null;
			if (Math.abs(dx)>Math.abs(dy)+10) {

				if (dx < dy) {
					tx.writeValue(0x72);

				} else {
					tx.writeValue(0x6c);

				}
			} else if (Math.abs(dy)>Math.abs(dx)+10) {
				if (dx < dy) {
					tx.writeValue(0x66);

				} else {
					tx.writeValue(0x62);
	
				}
			} else {
          if (e.x > 140 && e.y > 140) {tx.writeValue(0x73);}
			    else if (e.x < 45 && e.y < 45)   {}
			    else if (e.x > 140 && e.y < 45)  {}
			    else if (e.x < 45 && e.y > 140)  {connect();}
      }			
		}
});
}
g.clear();
g.setColor(0,0,0);
g.setFont("6x8:2");
g.drawString("lower right",1,1);
g.drawString("connect",1,20);
g.drawString("start swipe",1,40);
g.setColor(1,0,0);
g.fillCircle(145,145,10);
init();
