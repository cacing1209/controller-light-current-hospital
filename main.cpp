#include <ESP8266WiFi.h>
#include <indexhtml.h>
const char *ssid = "68 in hexadecimal";
const char *password = "01000100";
WiFiServer server(80);
const int relayPin = 5;

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
  if (client)
  {
    String request = client.readStringUntil('\r');
    Serial.println(request);
    client.flush();

    if (request.indexOf("/4892FGF843DG@$5643") != -1)
    {
      digitalWrite(relayPin, HIGH);
      CC += 1;
      Serial.println("RELAY ON" + CC);
    }
    if (request.indexOf("/GF9*KFNDGF*SDFS") != -1)
    {
      digitalWrite(relayPin, LOW);
      QQ += 1;
      Serial.println("RELAY OFF" + QQ);
    }
    html(client, CC, QQ);
  }
}
