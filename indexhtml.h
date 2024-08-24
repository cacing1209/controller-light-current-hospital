#include "WiFiClient.h"
#include "WiFiServer.h"
#include "WiFiServerSecure.h"
#include "WiFiClientSecure.h"
#include "BearSSLHelpers.h"
#include "CertStoreBearSSL.h"
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
    web.println("<h1> mode gaming </h1>");
    web.println("<button class='on' onclick=\"location.href='/4892FGF843DG@$5643'\">ON</button>");
    web.println("<button class='off' onclick=\"location.href='/GF9*KFNDGF*SDFS'\">OFF</button>");
    web.println("<h1>Count CC </h1>");
    web.print(String(CC));
    web.println("<h1>Count QQ </h1>");
    web.print(String(QQ));
    web.println("</body></html>");
    web.println();
    web.stop();
}