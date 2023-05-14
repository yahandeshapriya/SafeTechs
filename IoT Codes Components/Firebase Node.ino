#include <FirebaseArduino.h>
#include <DHT.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include  <ESP8266WiFi.h>
//D6 = Rx & D5 = Tx

SoftwareSerial nodemcu(D5, D6);

#define FIREBASE_HOST "accident-detect-57906-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "OQOvoagyKjWMDPax1xDVOHSktaL23HWhNEGvAt5H"
#define WIFI_SSID "M022-LTE-0756" // Change the name of your WIFI
#define WIFI_PASSWORD "30974428" // Change the password of your WIFI

#define DHTPIN 14    // Data Pin of DHT 11 , for NodeMCU D5 GPIO no. is 14

#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);
int c = 0, d = 0;



void setup() {
  pinMode(D1, OUTPUT);
  digitalWrite(D1, LOW); 
  Serial.begin(9600);
  nodemcu.begin(9600);
  while (!Serial) continue;


  pinMode(D7, INPUT);// set pin as input
  WiFi.begin (WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  dht.begin();
  Serial.println ("");
  Serial.println ("WiFi Connected!");
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}

void loop() {


  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.parseObject(nodemcu);

  if (data == JsonObject::invalid()) {
    //Serial.println("Invalid Json Object");
    jsonBuffer.clear();
    return;
  }

  Serial.println("JSON Object Recieved");

  Serial.print("accident_detect :  ");
  float accident_detect = data["accident_detect"];

  Serial.println(accident_detect);
  if (accident_detect == 1) {
 digitalWrite(D1, HIGH);  
  }else{
    digitalWrite(D1, LOW); 
    }

  Serial.print("fire :  ");
  float fire = data["fire"];

  Serial.println(fire);

  Serial.print("gas :  ");
  float gas = data["gas"];

  Serial.println(gas);



  Serial.print("alcohol :  ");
  float alcohol = data["alcohol"];

  Serial.println(alcohol);
  Serial.println("-----------------------------------------");


  Firebase.setFloat("COUNT", c);
  Serial.println (c);
  Firebase.setFloat("tance", d);

  Firebase.setFloat("Sensor/fire", fire);
  Firebase.setFloat("Sensor/gas", gas);
  Firebase.setFloat("Sensor/alcohol", alcohol);

  Firebase.setFloat("accident_detect", accident_detect);


  d = d + 5;
  c++;
  delay(100);
}
