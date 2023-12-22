// html5-qrcode-scanner.d.ts

declare module 'html5-qrcode' {
    export class Html5QrcodeScanner {
        constructor(
            elementId: string,
            config: {
                qrbox?: {
                    width?: number;
                    height?: number;
                };
                fps?: number;
                verbose?: boolean; // Add this line
            }
        );

        render(onScanSuccess: (decodedText: string) => void, onScanFailure: (err: Error) => void): void;

        clear(): void;


    }
}
