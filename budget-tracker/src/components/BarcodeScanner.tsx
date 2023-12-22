import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from 'html5-qrcode';

function BarcodeScanner() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [manualSerialNumber, setManualSerialNumber] = useState<string>('');

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        let isScanning = true;

        const success = (result: string) => {
            if (isScanning) {
                scanner.clear();
                setScanResult(result);
                isScanning = false;
            }
        };

        const error = (err: Error) => {
            console.warn(err);
        };
        scanner.render(success, error);

        return () => {
            isScanning = false;
        };
    }, []);

    function handleManualSerialNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        setManualSerialNumber(event.target.value);
    }

    return (
        <div className="App bg-primary h-screen">
            <h1>QR Scanning Code</h1>
            {scanResult ? (
                <div>
                    <p>Success: <a href={scanResult}>{scanResult}</a></p>
                    <p>Serial Number: {scanResult.slice(-16)}</p>
                </div>
            ) : (
                <div>
                    <div id="reader"></div>
                    <p className="center-text">Or enter the serial number manually:</p>
                    <div className="center-input">
                        <input
                            type="text"
                            value={manualSerialNumber}
                            onChange={handleManualSerialNumberChange}
                        />
                        {manualSerialNumber && (
                            <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BarcodeScanner;
