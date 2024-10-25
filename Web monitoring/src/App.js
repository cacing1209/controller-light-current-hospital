import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [units, setUnits] = useState([
    { id: 1, nama: 'Unit 1', suhu: 25, volt: 220, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv1.mp4' },
    { id: 2, nama: 'Unit 2', suhu: 26, volt: 218, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv2.mp4' },
    { id: 3, nama: 'Unit 3', suhu: 24, volt: 221, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv3.mp4' },
    { id: 4, nama: 'Unit 4', suhu: 27, volt: 219, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv4.mp4' },
    { id: 5, nama: 'Unit 5', suhu: 23, volt: 220, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv5.mp4' },
    { id: 6, nama: 'Unit 6', suhu: 25, volt: 222, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv6.mp4' },
    { id: 7, nama: 'Unit 7', suhu: 26, volt: 221, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv7.mp4' },
    { id: 8, nama: 'Unit 8', suhu: 24, volt: 220, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv8.mp4' },
    { id: 9, nama: 'Unit 9', suhu: 25, volt: 219, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv9.mp4' },
    { id: 10, nama: 'Unit 10', suhu: 27, volt: 218, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv10.mp4' },
    { id: 11, nama: 'Unit 11', suhu: 23, volt: 220, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv11.mp4' },
    { id: 12, nama: 'Unit 12', suhu: 26, volt: 221, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://example.com/cctv12.mp4' },
  ]);

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prevUnits => prevUnits.map(unit => ({
        ...unit,
        suhu: Math.floor(Math.random() * 10) + 20,
        volt: Math.floor(Math.random() * 10) + 215,
        statusPintu: Math.random() > 0.5 ? 'Terkunci' : 'Terbuka',
        statusKebakaran: Math.random() > 0.9 ? 'Bahaya' : 'Aman'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold font-poppins">Sistem Monitoring hotel</h1>
        <button className="mode-toggle bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300" onClick={toggleDarkMode}>
          {darkMode ? 'Mode Terang' : 'Mode Gelap'}
        </button>
      </header>
      
      <main className="p-6">
        <div className="unit-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {units.map((unit) => (
            <div 
              key={unit.id} 
              className="unit-item bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedUnit(unit)}
            >
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
                <h3 className="unit-name text-xl font-semibold text-white">{unit.nama}</h3>
              </div>
              <div className="unit-details p-4">
                <div className="detail-item flex justify-between items-center mb-2">
                  <span className="detail-label font-medium">Suhu:</span>
                  <span className="detail-value text-lg">{unit.suhu}°C</span>
                </div>
                <div className="detail-item flex justify-between items-center mb-2">
                  <span className="detail-label font-medium">Volt:</span>
                  <span className="detail-value text-lg">{unit.volt}V</span>
                </div>
                <div className="detail-item flex justify-between items-center mb-2">
                  <span className="detail-label font-medium">Pintu:</span>
                  <span className={`detail-value text-lg ${unit.statusPintu === 'Terkunci' ? 'text-green-500' : 'text-yellow-500'}`}>{unit.statusPintu}</span>
                </div>
                <div className="detail-item flex justify-between items-center">
                  <span className="detail-label font-medium">Kebakaran:</span>
                  <span className={`detail-value text-lg ${unit.statusKebakaran === 'Bahaya' ? 'text-red-600 font-bold' : 'text-green-500'}`}>{unit.statusKebakaran}</span>
                </div>
              </div>
              <div className="cctv-preview bg-gray-100 p-4">
                <h4 className="text-lg font-semibold mb-2">CCTV Feed</h4>
                <video src={unit.cctvUrl} width="100%" height="120" controls className="rounded">
                  Browser Anda tidak mendukung tag video.
                </video>
              </div>
            </div>
          ))}
        </div>

        {selectedUnit && (
          <div className="selected-unit mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedUnit.nama} - Detail</h2>
            <div className="selected-unit-details flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <p className="mb-2"><span className="font-semibold">Suhu:</span> <span className="text-lg">{selectedUnit.suhu}°C</span></p>
                <p className="mb-2"><span className="font-semibold">Volt:</span> <span className="text-lg">{selectedUnit.volt}V</span></p>
                <p className="mb-2"><span className="font-semibold">Status Pintu:</span> <span className={`text-lg ${selectedUnit.statusPintu === 'Terkunci' ? 'text-green-500' : 'text-yellow-500'}`}>{selectedUnit.statusPintu}</span></p>
                <p><span className="font-semibold">Status Kebakaran:</span> <span className={`text-lg ${selectedUnit.statusKebakaran === 'Bahaya' ? 'text-red-600 font-bold' : 'text-green-500'}`}>{selectedUnit.statusKebakaran}</span></p>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">CCTV Feed</h3>
                <div className="cctv-video">
                  <video src={selectedUnit.cctvUrl} controls className="w-full rounded">
                    Browser Anda tidak mendukung tag video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <p className="text-center">&copy; 2023 Sistem Monitoring Unit. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}

export default App;
