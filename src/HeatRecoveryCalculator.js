import React, { useState } from 'react';
import SteamTrendGraph from './SteamTrendGraph';

function HeatRecoveryCalculator() {
  const [gasFlow, setGasFlow] = useState(0);
  const [gasTempIn, setGasTempIn] = useState(0);
  const [gasTempOut, setGasTempOut] = useState(0);
  const [gasCost, setGasCost] = useState(0);
  const [steamOutput, setSteamOutput] = useState(null);
  const [gasSavings, setGasSavings] = useState(null);
  const [history, setHistory] = useState([]);

  const cpGas = 1.05; // kJ/Nm3·°C
  const boilerEff = 0.8;
  const latentHeatSteam = 2100; // kJ/kg

  const calculateSteam = () => {
    const deltaT = gasTempIn - gasTempOut;
    const energyRecovered = gasFlow * cpGas * deltaT * boilerEff; // kJ/h
    const steamProduced = energyRecovered / latentHeatSteam; // kg/h
    const gasSaved = energyRecovered / (cpGas * 100 * boilerEff); // Nm³/h
    const costSaved = gasSaved * gasCost; // ₪/h

    setSteamOutput(steamProduced.toFixed(2));
    setGasSavings(costSaved.toFixed(2));

    const now = new Date().toLocaleTimeString();
    setHistory(prev => [
      ...prev.slice(-9),
      { time: now, steam: Number(steamProduced.toFixed(2)), savings: Number(costSaved.toFixed(2)) }
    ]);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>מחשבון השבת חום לדוד קיטור</h1>
      <div>
        <label>ספיקת גז (Nm³/h): </label>
        <input type="number" value={gasFlow} onChange={e => setGasFlow(Number(e.target.value))} />
      </div>
      <div>
        <label>טמפרטורת כניסה (°C): </label>
        <input type="number" value={gasTempIn} onChange={e => setGasTempIn(Number(e.target.value))} />
      </div>
      <div>
        <label>טמפרטורת יציאה (°C): </label>
        <input type="number" value={gasTempOut} onChange={e => setGasTempOut(Number(e.target.value))} />
      </div>
      <div>
        <label>עלות גז (₪/Nm³): </label>
        <input type="number" value={gasCost} onChange={e => setGasCost(Number(e.target.value))} />
      </div>
      <button onClick={calculateSteam}>חשב</button>
      {steamOutput && <div>קיטור משוער: {steamOutput} ק"ג/שעה</div>}
      {gasSavings && <div>חיסכון משוער: ₪{gasSavings}/שעה</div>}

      {history.length > 0 && (
        <div>
          <h2>מגמות חישוב אחרונות</h2>
          <SteamTrendGraph data={history} />
        </div>
      )}
    </div>
  );
}

export default HeatRecoveryCalculator;
