#include <FirebaseArduino.h>
#include  <ESP8266WiFi.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

TinyGPSPlus gps;

SoftwareSerial GPS(4, 5); // 10-TX  11-RX

#define FIREBASE_HOST "accident-detect-57906-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "OQOvoagyKjWMDPax1xDVOHSktaL23HWhNEGvAt5H"
#define WIFI_SSID "M022-LTE-0756" // Change the name of your WIFI
#define WIFI_PASSWORD "30974428" // Change the password of your WIFI
void setup()
{
  Serial.begin(9600);
  GPS.begin(9600);
  Serial.print("Connecting..."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100); Serial.print("."); delay(100);
  Serial.println(" ");


  WiFi.begin (WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println ("");
  Serial.println ("WiFi Connected!");
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}

void loop()
{
  while (GPS.available() > 0)
    if (gps.encode(GPS.read()))
      displayInfo();

  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
}

void displayInfo()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    double Tiny_latitude = (gps.location.lat());
    Serial.print("Tiny lat:");
    Serial.println(Tiny_latitude, 6);
    String Lat = String(Tiny_latitude, 6);
    Firebase.setString("location/Latitude", Lat);

    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);

    double Tiny_longitude = (gps.location.lng());
    Serial.print("Tiny lng:");
    Serial.println(Tiny_longitude, 6);
    String Lng = String(Tiny_longitude, 6);
    Firebase.setString("location/Longitude", Lng);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
    Firebase.setString("location/date", String(gps.date.year())+"/"+String(gps.date.month())+"/"+String(gps.date.day()));
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());

    Firebase.setString("location/time", String(gps.time.hour())+":"+String(gps.time.minute())+":"+String(gps.time.second()));
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();

}
