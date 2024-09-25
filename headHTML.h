#ifndef HEADHTML_H
#define HEADHTML_H

#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

struct {
    const char *ON = "/on";
    const char *OFF = "/off";
    char request;
} dbButton;

void html(WiFiClient web, int CC, int QQ, float celsius, float fahrenheit, float kelvin) {
    web.println("HTTP/1.1 200 OK");
    web.println("Content-Type: text/html");
    web.println("Connection: close");
    web.println();

    web.println("<!DOCTYPE html>");
    web.println("<html lang='id'>");
    web.println("<head>");
    web.println("<meta charset='UTF-8'>");
    web.println("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    web.println("<title>CCNG SETUP</title>");
    web.println("<style>");
    web.println("body { font-family: Arial, sans-serif; text-align: center; background: #f7f7f7; padding: 50px; }");
    web.println("h1 { color: #333; }");
    web.println("button { padding: 10px 20px; margin: 10px; font-size: 25px; cursor: pointer; }");
    web.println(".on { background-color: #4CAF50; color: white; }");
    web.println(".off { background-color: #f44336; color: white; }");
    web.println(".temperature { margin-top: 20px; }");
    web.println("</style>");
    web.println("<script>");
    web.println("document.addEventListener('DOMContentLoaded', function() {");
    web.println("    var webSocket = new WebSocket('ws://' + window.location.hostname + ':81/');");
    web.println("    webSocket.onmessage = function(event) {");
    web.println("        var data = JSON.parse(event.data);");
    web.println("        document.getElementById('celsius').innerText = 'Celsius: ' + data.celsius;");
    web.println("        document.getElementById('fahrenheit').innerText = 'Fahrenheit: ' + data.fahrenheit;");
    web.println("        document.getElementById('kelvin').innerText = 'Kelvin: ' + data.kelvin;");
    web.println("    };");
    web.println("    webSocket.onerror = function(error) {");
    web.println("        console.log('WebSocket Error LENG CELENG: ', error);");
    web.println("    };");
    web.println("    webSocket.onopen = function() {");
    web.println("        console.log('Koneksi di Buka');");
    web.println("    };");
    web.println("    webSocket.onclose = function() {");
    web.println("        console.log('Tutup Koneksi');");
    web.println("    };");
    web.println("});");
    web.println("</script>");
    web.println("</head>");
    web.println("<body>");
    web.println("<h1>Manual Relay</h1>");
    web.printf("<button class='on' onclick=\"location.href='%s'\">ON</button>", dbButton.ON);
    web.printf("<button class='off' onclick=\"location.href='%s'\">OFF</button>", dbButton.OFF);
    web.println("On CC");
    web.println("<div class='temperature'>");
    web.println("<h2>Temperature</h2>");
    web.println("<span id='celsius'>Celsius: Loading...</span><br>");
    web.println("<span id='fahrenheit'>Fahrenheit: Loading...</span><br>");
    web.println("<span id='kelvin'>Kelvin: Loading...</span>");
    web.println("</div>");
    web.println("</body>");
    web.println("</html>");
}

#endif
