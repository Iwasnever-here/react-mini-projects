import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const fetchFoodData = async (barcode) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const json = await res.json();

      if (json.status === 1) {
        const productName = json.product.product_name || "unknown product";
        setProductName(productName);
      } else {
        setProductName(null);
      }
    } catch (error) {
      setError("error fetching data");
      setProductName(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (barcode && barcode !== "Not Found") {
      fetchFoodData(barcode);
    } else {
      setProductName("");
      setError("");
    }
  }, [barcode]);

  useEffect(() => {
    if (productName) {
      setShowScanner(false);
    }
  }, [productName]);

return (
    <>
      <div>
        {!showScanner &&
        <div>
        <h2>Scan a Barcode!!</h2>
        <button onClick={() => setShowScanner(true)}>Open Scanner</button>
        </div>
        }
        {showScanner && (
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(error, result) => {
              if (result) {
                if (barcode !== result.text) {
                  setBarcode(result.text);
                }
              } else {
                if (!barcode) {
                  setBarcode("Not Found");
                }
              }
            }}
          />
        )}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && productName && !showScanner && 
        <div>
        <p>Last scanned item :</p>
        <p>{productName}</p>
        </div>}
      </div>
    </>
  );
};

export default BarcodeScanner;
