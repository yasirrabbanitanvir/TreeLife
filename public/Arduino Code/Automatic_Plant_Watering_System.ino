int water; 

void setup() {
  pinMode(2, OUTPUT); // output pin for relay
  pinMode(4, INPUT); // input pin coming from soil sensor
}

void loop() { 
  water = digitalRead(4);  
  if(water == HIGH) 
  {
    digitalWrite(2, LOW); 
  }
  else
  {
    digitalWrite(2, HIGH); 
  }
  delay(400); 
}