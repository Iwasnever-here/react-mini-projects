import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [productIngredients, setProductIngredients] = useState("")
  const [showScanner, setShowScanner] = useState(false);
  const [showProduct, setShowProduct] = useState(false)

  const fetchFoodData = async (barcode) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const json = await res.json();

      if (json.status === 1) {
        const productName = json.product.product_name || "unknown product";
        const productIngredients = json.product.ingredients_text || "unknown ingredients"
        setProductName(productName);
        setProductIngredients(productIngredients)
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
      setShowProduct(true)
    }
  }, [productName]);

return (
    <>
      <div>
        {!showScanner && !showProduct  &&
        <div className="text-center h-screen content-center">
        <h2 className="text-5xl ">ALLERGY SCANNER</h2>
        <button onClick={() => setShowScanner(true)}
          className="bg-green-500 rounded-xl p-2 my-5">
            SCAN
            </button>
        </div>
        }
        {showScanner &&  (
          <div className="flex flex-col text-center items-center justify-center content-center h-screen">
            <div className="w-150 bg-red-500 border border-solid border-red-500 border-4 rounded-xl p-1">
          <BarcodeScannerComponent 
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
          </div>
          <button onClick={() => setShowScanner(false)}
          className="bg-red-500 rounded-xl p-2 my-5">
            EXIT
            </button>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && productName && showProduct && 
        <div className="text-center h-screen content-center">
        <p>scanned item :</p>
        <p>{productName}</p>
        <p>{productIngredients}</p>
        <button onClick={() => setShowProduct(false)}
          className="bg-green-500 rounded-xl p-2 my-5">
            CLOSE
            </button>
        </div>}
        
      </div>
    </>
  );
};

export default BarcodeScanner;