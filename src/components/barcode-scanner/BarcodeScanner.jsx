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
  const [showManagement, setShowManagement] = useState(false)

  const [userAllergies, setUserAllergies] = useState([])
  const [newAllergen, setNewAllergen] = useState('')
  const [foundAllergies, setFoundAllergies] = useState([])



  useEffect(() => {
    const savedAllergens = JSON.parse(localStorage.getItem('userAllergies'))
    setUserAllergies(savedAllergens)
  }, [])

  useEffect(() => {
    localStorage.setItem('userAllergies', JSON.stringify(userAllergies))
  }, [userAllergies])

  
  const addAllergies = () => {
    if (newAllergen.trimEnd() && !userAllergies.includes(newAllergen.toLowerCase())){
      setUserAllergies([...userAllergies, newAllergen.toLowerCase()])
      setNewAllergen('')
    }
  }

  const removeAllergies = (allergen) => {
    setUserAllergies(userAllergies.filter((a) => a !== allergen))
  }

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
        setProductIngredients(null)
      }
    } catch (error) {
      setError("error fetching data");
      setProductName(null);
      setProductIngredients(null)
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
        {!showScanner && !showProduct && !showManagement &&
        <div className="text-center h-screen content-center">
        <h2 className="text-5xl ">ALLERGY SCANNER</h2>
        <button onClick={() => setShowScanner(true)}
          className="bg-green-500 rounded-xl p-2 mt-5">
            SCAN
            </button>
            <br/>
            <button onClick={() => setShowManagement(true)}
          className="bg-blue-500 rounded-xl p-2 my-5">
            MANAGE ALLERGIES
            </button>
        </div>
        }

        { showManagement && (
          <div className="text-center h-screen content-center"> 
            <h1 className="text-4xl">SET ALLERGIES</h1>
            <input 
            className="mt-5 border border-solid p-1"
            type = 'text'
            value = {newAllergen}
            onChange = {(e) => setNewAllergen(e.target.value)}
            placeholder="please enter allergen e.g. nuts"
            />
            <button onClick = {addAllergies}>[ + ]</button>
            <br />

            <ul className="grid grid-cols-3 gap-3 mx-20 my-6 ">
              {userAllergies.length > 0 ? (
                userAllergies.map((a) => (
                  <li
                  className="flex justify-center"
                  key = {a}
                  ><div className="bg-red-500 rounded-xl w-50 ">{a}
                  <button className = 'ml-4' onClick={() => removeAllergies(a)}>X</button>
                  </div>
                  </li>
                ))
              ): <p>NO ALLERGIES ENTERED</p>}
            </ul>

             <button onClick={() => setShowManagement(false)}
          className="bg-red-500 rounded-xl p-2 my-5">
            EXIT
            </button>
          </div>
         
        )}


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