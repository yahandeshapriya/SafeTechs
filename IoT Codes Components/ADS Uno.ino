#define AngleXPin A1 // X pin is connected to A0 pin

#define AngleYPin A2   // Y pin is connected to A1 pin
#define FLAME 9
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

int push_button, push_button2, fire, mq35_sensor, mq135_sensor, gas_status, fire_status, alcohol_status, accident_detectstatus;
double Tiny_latitude;
//Initialise Arduino to NodeMCU (5=Rx & 6=Tx)
SoftwareSerial nodemcu(6, 5);

void setup() {
  pinMode(8, INPUT_PULLUP);//push button
  pinMode(13, INPUT_PULLUP);//push button
  pinMode(FLAME, INPUT);
  pinMode(A3, INPUT);
  pinMode(A4, INPUT);
  pinMode(12, OUTPUT);
  pinMode(7, OUTPUT);
  Serial.begin(9600);
  nodemcu.begin(9600);


}

void loop() {

  digitalWrite(12, LOW);

  ADXl_sensor_and_Piezo_sensor(); //get angle and vibration of the car
  MQ_3_MQ_135_sensor();


}



//get angle and vibration of the car
void ADXl_sensor_and_Piezo_sensor() {
  int AngleXVal = analogRead(AngleXPin); // analog read form x pin
  delay(100);
  int AngleYVal = analogRead(AngleYPin);  // analog read from y pin

  int val = analogRead(A0);
  Serial.print("piezo sensor = ");
  Serial.println(val);




  Serial.print("X = ");
  Serial.print(AngleXVal);
  Serial.print("  ");
  Serial.print("Y = ");
  Serial.print(AngleYVal);
  Serial.println("  ");

  if (AngleXVal <= 230) {
    Serial.println("turened to left");
    Alarm_On();
  }
  if (AngleXVal >=  280) {
    Serial.println("turened to Right");
    Alarm_On();
  }

  if (val >=  70) {
    Serial.println("vibration detected");
    Alarm_On();
  }

  delay(100);

}

void fire_sensor() {
  fire = digitalRead(FLAME);
  //Serial.println(fire);

  if ( fire == HIGH)
  {
    Serial.println("NO Fire");
    fire_status = 0;
  } else {

    Serial.println("Fire! Fire!");
    fire_status = 1;
  }

  delay(1000);


}
void MQ_3_MQ_135_sensor() {
  mq35_sensor = analogRead(A3);
  Serial.print("mq 35 sensor = ");
  Serial.println(mq35_sensor);
  if (mq35_sensor > 140) {
    Serial.println("................... alcohol..........");
    alcohol_status = 1;
  } else {
    alcohol_status = 0;
  }


  mq135_sensor = analogRead(A4);
  Serial.print("mq 135 sensor = ");
  Serial.println(mq135_sensor);
  if (mq135_sensor > 110) {
    Serial.println(".........gas........");
    gas_status = 1;
  } else {
    gas_status = 0;
  }

}

void Alarm_On() {
  unsigned long startCollecting = millis();
  while (millis() - startCollecting < 8000)
  {
    digitalWrite(12, HIGH);
    Serial.println("alarm on");
    push_button = digitalRead(8);
    Serial.println(push_button);
    if (push_button == 0) {
      break;
      digitalWrite(12, LOW);
      ADXl_sensor_and_Piezo_sensor();
    }
  }
  Serial.println("call....");
  digitalWrite(12, LOW);
  if (push_button != 0) {
    fire_sensor();
    MQ_3_MQ_135_sensor();
    accident_detect_warning();
  }

}

void accident_detect_warning() {
  push_button2 = digitalRead(13);
  digitalWrite(7, HIGH);
  while (push_button2 != 0) {

    push_button2 = digitalRead(13);

    if (push_button2 == 0) {
      accident_detectstatus = 0;
      digitalWrite(7, LOW);
    } else {
      accident_detectstatus = 1;
    }
    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject& data = jsonBuffer.createObject();
    //Assign collected data to JSON Object
    data["accident_detect"] = accident_detectstatus;
    data["fire"] = fire_status;
    data["gas"] = gas_status;
    data["alcohol"] = alcohol_status;

    //Send data to NodeMCU
    data.printTo(nodemcu);
    jsonBuffer.clear();


    Serial.println("waning....");
    Serial.println(Tiny_latitude, 6);
    Serial.print("fire....");
    Serial.println(fire_status);
    Serial.print("gas status....");
    Serial.println(gas_status);
    Serial.print("alcohol status....");
    Serial.println(alcohol_status);
    push_button2 = digitalRead(13);


    delay(2000);

  }

}
