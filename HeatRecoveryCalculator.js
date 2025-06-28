import { useState } from "react";
import { Input } from "./components/Input";
import { Card, CardContent } from "./components/Card";
import { Label } from "./components/Label";
import { Button } from "./components/Button";
import SteamTrendGraph from "./SteamTrendGraph";

export default function HeatRecoveryCalculator() {
  const [gasFlow, setGasFlow] = useState(0);
  const [gasTempIn, setGasTempIn] = useState(0);
  const [gasTempOut, setGasTempOut] = useState(0);
  const [gasCost, setGasCost] = useState(0);
  const [steamOutput, setSteamOutput] = useState(null);
  const [gasSavings, setGasSavings] = useState(null);
  const [history, setHistory] = useState([]);

  const cpGas = 1.05;
  const boilerEff = 0.8;
  const latentHeatSteam = 2100;

  const calculateSteam = () => {
    const deltaT = gasTempIn - gasTempOut;
    const energyRecovered = gasFlow * cpGas * deltaT * boilerEff;
    const steamProduced = energyRecovered / latentHeatSteam;
    const gasSaved = energyRecovered / (cpGas * 100 * boilerEff);
    const costSaved = gasSaved * gasCost;

    setSteamOutput(steamProduced.toFixed(2));
    setGasSavings(costSaved.toFixed(2));

    const now = new Date().toLocaleTimeString();
    setHistory((prev) => [...prev.slice(-9), {
      time: now,
      steam: Number(steamProduced.toFixed(2)),
      savings: Number(costSaved.toFixed(2))
    }]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h1 className="text-xl font-semibold">מחשבון השבת חום לדוד קיטור</h1>

          <div>
            <Label>ספיקת גז (Nm³/h)</Label>
            <Input type="number" value={gasFlow} onChange={(e) => setGasFlow(Number(e.target.value))} />
          </div>

          <div>
            <Label>טמפרטורת כניסה של גזי פליטה (°C)</Label>
            <Input type="number" value={gasTempIn} onChange={(e) => setGasTempIn(Number(e.target.value))} />
          </div>

          <div>
            <Label>טמפרטורת יציאה של גזי פליטה (°C)</Label>
            <Input type="number" value={gasTempOut} onChange={(e) => setGasTempOut(Number(e.target.value))} />
          </div>

          <div>
            <Label>עלות גז (₪/Nm³)</Label>
            <Input type="number" value={gasCost} onChange={(e) => setGasCost(Number(e.target.value))} />
          </div>

          <Button onClick={calculateSteam}>חשב קיטור וחיסכון</Button>

          {steamOutput && <div className="text-lg font-medium">קיטור משוער: {steamOutput} ק"ג/שעה</div>}
          {gasSavings && <div className="text-lg font-medium text-green-600">חיסכון משוער בעלות גז: ₪{gasSavings} לשעה</div>}
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">מגמות חישוב אחרונות</h2>
            <SteamTrendGraph data={history} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
