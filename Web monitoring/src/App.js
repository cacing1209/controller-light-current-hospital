import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [units, setUnits] = useState([
    { id: 1, nama: 'Unit 1', suhu: 25, volt: 220, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 2, nama: 'Unit 2', suhu: 26, volt: 218, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 3, nama: 'Unit 3', suhu: 24, volt: 221, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 4, nama: 'Unit 4', suhu: 27, volt: 219, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 5, nama: 'Unit 5', suhu: 23, volt: 220, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 6, nama: 'Unit 6', suhu: 25, volt: 222, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 7, nama: 'Unit 7', suhu: 26, volt: 221, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 8, nama: 'Unit 8', suhu: 24, volt: 220, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 9, nama: 'Unit 9', suhu: 25, volt: 219, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 10, nama: 'Unit 10', suhu: 27, volt: 218, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 11, nama: 'Unit 11', suhu: 23, volt: 220, statusPintu: 'Terbuka', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
    { id: 12, nama: 'Unit 12', suhu: 26, volt: 221, statusPintu: 'Terkunci', statusKebakaran: 'Aman', cctvUrl: 'https://youtu.be/XhzpxjuwZy0?si=MHVwOKhEfbYGkwZu', ac: false, waterHeater: false, lampu: false },
  ]);

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prevUnits => prevUnits.map(unit => {
        const newUnit = {
          ...unit,
          suhu: Math.floor(Math.random() * 10) + 20,
          volt: Math.floor(Math.random() * 10) + 215,
          statusPintu: Math.random() > 0.5 ? 'Terkunci' : 'Terbuka',
          statusKebakaran: Math.random() > 0.9 ? 'Bahaya' : 'Aman',
          ac: Math.random() > 0.5 ? true : false,
          waterHeater: Math.random() > 0.5 ? true : false,
          lampu: Math.random() > 0.5 ? true : false,
        };
        console.log(`Unit ${unit.id} updated:`, newUnit);
        return newUnit;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      console.log('Mode gelap diaktifkan');
    } else {
      document.body.classList.remove('dark-mode');
      console.log('Mode gelap dinonaktifkan');
    }
  }, [darkMode]);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg static flex justify-between items-center">
        <h1 className="text-3xl font-bold font-poppins">Monitoring kamar ccng</h1>
        <button className={`toggle-mode ${darkMode ? 'bg-gray-500' : 'bg-white'} animate-pulse`} onClick={() => setDarkMode(prevMode => !prevMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      
      <main className="p-6 mt-16">
        <div className="unit-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {units.map((unit) => (
            <div 
              key={unit.id} 
              className="unit-item bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => {
                setSelectedUnit(unit);
                console.log(`Unit ${unit.id} selected:`, unit);
              }}
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
                  <span className="detail-label font-medium">Peringatan Kebakaran:</span>
                  <span className={`detail-value text-lg ${unit.statusKebakaran === 'Bahaya' ? 'text-red-600 font-bold' : 'text-green-500'}`}>{unit.statusKebakaran}</span>
                </div>
                <div className="detail-item flex justify-between items-center">
                  <span className="detail-label font-medium">AC:</span>
                  <span className={`detail-value text-lg ${unit.ac ? 'text-green-500' : 'text-red-600'}`} onClick={(e) => {e.stopPropagation(); setUnits(prevUnits => prevUnits.map(u => u.id === unit.id ? {...u, ac: !u.ac} : u))}}>{unit.ac ? 'ON' : 'OFF'}</span>
                </div>
                <div className="detail-item flex justify-between items-center">
                  <span className="detail-label font-medium">Water Heater:</span>
                  <span className={`detail-value text-lg ${unit.waterHeater ? 'text-green-500' : 'text-red-600'}`} onClick={(e) => {e.stopPropagation(); setUnits(prevUnits => prevUnits.map(u => u.id === unit.id ? {...u, waterHeater: !u.waterHeater} : u))}}>{unit.waterHeater ? 'ON' : 'OFF'}</span>
                </div>
                <div className="detail-item flex justify-between items-center">
                  <span className="detail-label font-medium">Lampu:</span>
                  <span className={`detail-value text-lg ${unit.lampu ? 'text-green-500' : 'text-red-600'}`} onClick={(e) => {e.stopPropagation(); setUnits(prevUnits => prevUnits.map(u => u.id === unit.id ? {...u, lampu: !u.lampu} : u))}}>{unit.lampu ? 'ON' : 'OFF'}</span>
                </div>
              </div>
              <div className="cctv-preview bg-gray-100 p-4">
                <h4 className="text-lg font-semibold mb-2">CCTV Feed</h4>
                <iframe width="100%" height="150" src="https://www.youtube.com/embed/XhzpxjuwZy0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          ))}
        </div>

        {selectedUnit && (
          <div className="selected-unit mt-8 bg-white rounded-lg shadow-lg p-6 transform transition duration-500 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">{selectedUnit.nama} - Detail</h2>
            <div className="selected-unit-details flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <p className="mb-2"><span className="font-semibold">Suhu:</span> <span className="text-lg">{selectedUnit.suhu}°C</span></p>
                <p className="mb-2"><span className="font-semibold">Volt:</span> <span className="text-lg">{selectedUnit.volt}V</span></p>
                <p className="mb-2"><span className="font-semibold">Status Pintu:</span> <span className={`text-lg ${selectedUnit.statusPintu === 'Terkunci' ? 'text-green-500' : 'text-yellow-500'}`}>{selectedUnit.statusPintu}</span></p>
                <p><span className="font-semibold">Peringatan Kebakaran:</span> <span className={`text-lg ${selectedUnit.statusKebakaran === 'Bahaya' ? 'text-red-600 font-bold' : 'text-green-500'}`}>{selectedUnit.statusKebakaran}</span></p>
                <p><span className="font-semibold">AC:</span> <span className={`text-lg ${selectedUnit.ac ? 'text-green-500' : 'text-red-600'}`} onClick={(e) => {e.stopPropagation(); setUnits(prevUnits => prevUnits.map(u => u.id === selectedUnit.id ? {...u, ac: !u.ac} : u))}}>{selectedUnit.ac ? 'ON' : 'OFF'}</span></p>
                <p><span className="font-semibold">Water Heater:</span> <span className={`text-lg ${selectedUnit.waterHeater ? 'text-green-500' : 'text-red-600'}`} onClick={(e) => {e.stopPropagation(); setUnits(prevUnits => prevUnits.map(u => u.id === selectedUnit.id ? {...u, waterHeater: !u.waterHeater} : u))}}>{selectedUnit.waterHeater ? 'ON' : 'OFF'}</span></p>
                <p><span className="font-semibold">Lampu:</span> <span className={`text-lg ${selectedUnit.lampu ? 'text-green-500' : 'text-red-600'}`} onClick={(e) => {e.stopPropagation(); setUnits(prevUnits => prevUnits.map(u => u.id === selectedUnit.id ? {...u, lampu: !u.lampu} : u))}}>{selectedUnit.lampu ? 'ON' : 'OFF'}</span></p>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">CCTV Feed</h3>
                <div className="cctv-video">
                  <iframe width="100%" height="350" src="https://www.youtube.com/embed/XhzpxjuwZy0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
