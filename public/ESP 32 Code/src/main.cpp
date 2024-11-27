#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>

#define FIREBASE_HOST "https://tree-life-react-firebase-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "AIzaSyCoSixqqjPoYhPO0Z4cW6CG_ah1YZ9R04g"
#define WIFI_SSID "yasir"
#define WIFI_PASSWORD "12345678"
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
#define MOISTURE_SENSOR_PIN 35
#define DRY_VALUE 4095
#define WET_VALUE 0

FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

void setup()
{
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected to Wi-Fi with IP Address: ");
  Serial.println(WiFi.localIP());
  config.database_url = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop()
{
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int moistureRaw = analogRead(MOISTURE_SENSOR_PIN);
  int moisturePercentage = map(moistureRaw, DRY_VALUE, WET_VALUE, 0, 100);
  moisturePercentage = constrain(moisturePercentage, 0, 100);
  if (isnan(h) || isnan(t))
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print("°C  Humidity: ");
  Serial.print(h);
  Serial.print("%  Moisture: ");
  Serial.print(moisturePercentage);
  Serial.println("%");
  Firebase.RTDB.setFloat(&firebaseData, "/DHT11/Temperature", t);
  Firebase.RTDB.setFloat(&firebaseData, "/DHT11/Humidity", h);
  Firebase.RTDB.setFloat(&firebaseData, "/SoilMoisture", moisturePercentage);
  delay(5000);
}