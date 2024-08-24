/**
 * @authors CCNG
 * pleas read file README.MD
 */
#include <ESP8266WiFi.h>

struct
{
    const char* ON = "/on";
    const char* OFF = "/off";
    char request;
} dbButton;

void html(WiFiClient web, int CC, int QQ)
{
    web.println("HTTP/1.1 200 OK");
    web.println("Content-Type: text/html");
    web.println(""); // End of headers
    web.println("<!DOCTYPE html>");
    web.println("<html lang='id'><head><meta charset='UTF-8'>");
    web.println("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    web.println("<title>CCNG SETUP</title>");
    web.println("<style>body { font-family: Arial, sans-serif; text-align: center; background: #f7f7f7; padding: 50px;} h1 { color: #333; } button { padding: 10px 20px; margin: 10px; font-size: 20px; cursor: pointer; } .on { background-color: #4CAF50; color: white; } .off { background-color: #f44336; color: white; }</style>");
    web.println("</head><body>");
    web.println("<h1>Set Suhu</h1>");
    web.printf("<button class='on' onclick=\"location.href='%s'\">ON</button>", dbButton.ON);
    web.printf("<button class='off' onclick=\"location.href='%s'\">OFF</button>", dbButton.OFF);
    web.println("<h1>Count CC</h1>");
    web.print(String(CC));
    web.println("<h1>Count QQ</h1>");
    web.print(String(QQ));
    web.println("</body></html>");
    web.println();
    web.stop();
}
