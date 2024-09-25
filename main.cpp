#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <math.h>
#include "headHTML.h"

const int pinTermis = A0;
const char *ssid = "68 in hexadecimal";
const char *password = "01000100"; // value decimal 68
WiFiServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);
const int relayPin = 5;
int CC = 0, QQ = 0;

IPAddress iplocal(192, 168, 0, 222);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress dns(8, 8, 8, 8);
IPAddress dns2(1, 1, 1, 1);
struct
{
  float celsius;
  float fahrenheit;
  float kelvin;
} suhuDB;

unsigned long previousMillis = 0, prev = 0;
const long interval = 500;

int analogValue;
void mainHeater()
{
  if (millis() - prev >= 3000)
  {
    float resistance = (1023.0 / analogValue) - 1.0;
    resistance = 10000.0 / resistance;
    suhuDB.celsius = 1 / (log(resistance / 10000.0) / 3950 + 1.0 / 298.15) - 273.15;
    suhuDB.fahrenheit = (suhuDB.celsius * 9 / 5) + 32;
    suhuDB.kelvin = suhuDB.celsius + 273.15;
    prev = millis();
  }
  delay(250);
  analogValue += 5;
  if (analogValue >= 1000)
  {
    analogValue = 0;
  }
  // analogValue = analogRead(pinTermis);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
  if (type == WStype_TEXT)
  {
    String text = String((char *)payload);

    if (text == "ON")
    {
      digitalWrite(relayPin, HIGH);
      CC++;
      Serial.println("RELAY ON " + String(CC));
    }
    else if (text == "OFF")
    {
      digitalWrite(relayPin, LOW);
      QQ++;
      Serial.println("RELAY OFF " + String(QQ));
    }
  }
}

void setup()
{
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);

  WiFi.begin(ssid, password);
  if (!WiFi.config(iplocal, gateway, subnet, dns, dns2))
  {
    Serial.print("IP STATIC ERORR");
  }
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");

  server.begin();
  Serial.println("Server started");

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop()
{
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;
    mainHeater();

    String json = "{";
    json += "\"celsius\":" + String(suhuDB.celsius, 2) + ",";
    json += "\"fahrenheit\":" + String(suhuDB.fahrenheit, 2) + ",";
    json += "\"kelvin\":" + String(suhuDB.kelvin, 2);
    json += "}";

    webSocket.broadcastTXT(json);
  }

  webSocket.loop();

  WiFiClient client = server.available();
  if (client)
  {
    String request = client.readStringUntil('\r');
    Serial.println(request);
    client.flush();

    if (request.indexOf(dbButton.ON) != -1)
    {
      digitalWrite(relayPin, HIGH);
      CC++;
      Serial.println("RELAY ON " + String(CC));
    }
    if (request.indexOf(dbButton.OFF) != -1)
    {
      digitalWrite(relayPin, LOW);
      QQ++;
      Serial.println("RELAY OFF " + String(QQ));
    }

    html(client, CC, QQ, suhuDB.celsius, suhuDB.fahrenheit, suhuDB.kelvin);
  }
}