document.addEventListener("DOMContentLoaded", function () {
            var webSocket = new WebSocket('ws://192.168.0.222:81/');

            webSocket.onmessage = function (event) {
                var data = JSON.parse(event.data);
                document.getElementById("celsius").innerText = "Celsius: " + data.celsius;
                document.getElementById("fahrenheit").innerText = "Fahrenheit: " + data.fahrenheit;
                document.getElementById("kelvin").innerText = "Kelvin: " + data.kelvin;
            };

            webSocket.onerror = function (error) {
                console.log('WebSocket Error: ', error);
            };

            webSocket.onopen = function () {
                console.log('WebSocket Connection Opened');
            };

            webSocket.onclose = function () {
                console.log('WebSocket Connection Closed');
            };


            function sendCommand(command) {
                webSocket.send(command);

            }

            document.querySelector('.button').addEventListener('click', function () {
                sendCommand('ON');
            });

            document.querySelector('.button.off').addEventListener('click', function () {
                sendCommand('OFF');
            });
        });

