int water; // random variable 

void setup() {
  pinMode(2, OUTPUT); // output pin for relay board, this will send signal to the relay
  pinMode(4, INPUT); // input pin coming from soil sensor
}

void loop() { 
  water = digitalRead(4);  // reading the coming signal from the soil sensor
  if(water == HIGH) // if water level is full then cut the relay 
  {
    digitalWrite(2, LOW); // low is to cut the relay
  }
  else
  {
    digitalWrite(2, HIGH); // high to continue providing signal and water supply
  }
  delay(400); 
}
