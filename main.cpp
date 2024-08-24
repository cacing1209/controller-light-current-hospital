#include <ESP8266WiFi.h>
#include <headHTML.h>
const int pinTermis = A0;
const char *ssid = "68 in hexadecimal";
const char *password = "01000100";
WiFiServer server(80);
const int relayPin = 5;
struct
{
  float celsius;
  float farenhet;
  float kalvin;
} suhuDB;

void mainHeater()
{
  suhuDB.celsius = 1 / (log(1 / (1023. / pinTermis - 1)) / 3950 + 1.0 / 298.15) - 273.15;
  suhuDB.farenhet = (suhuDB.celsius * 9 / 5) + 32; //(9/5 x °C) + 32.
  suhuDB.kalvin = suhuDB.celsius + 273.15;
}
void setup()
{
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");

  server.begin();
  Serial.println("Server started");

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}
int CC, QQ;
void loop()
{
  WiFiClient client = server.available();
  html(client, CC, QQ);
  if (client)
  {
    String request = client.readStringUntil('\r');
    Serial.println(request);
    delay(500);
    client.flush();

    if (request.indexOf(dbButton.ON) != -1)
    {
      digitalWrite(relayPin, HIGH);
      CC += 1;
      Serial.println("RELAY ON" + CC);
    }
    if (request.indexOf(dbButton.OFF) != -1)
    {
      digitalWrite(relayPin, LOW);
      QQ += 1;
      Serial.println("RELAY OFF" + QQ);
    }
  }
}
