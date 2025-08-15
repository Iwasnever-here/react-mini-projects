import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import './BarcodeScanner.css'

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [productIngredients, setProductIngredients] = useState("")
  const [productImage, setProductImage] = useState("")
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
        const productImage = json.product.image_url || ""; 
        setProductName(productName);
        setProductIngredients(productIngredients)
        setProductImage(productImage)

        const lowerIngredients = productIngredients.toLowerCase()
        const matched = userAllergies.filter((allergy) => {
        const pattern = new RegExp(`\\b${allergy}\\b`, "i"); // \b = word boundary, i = ignore case
        return pattern.test(lowerIngredients);
      });

      setFoundAllergies(matched)

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
    
      <div className=" ">
        {!showScanner && !showProduct && !showManagement &&
        <div className="piece ">
        <img src = './barcodelogo.png' className="w-30" />
        <h1 className="!text-black">ALLERGY </h1> <h1 className="!text-6xl">SCANNER</h1>
        <div className="grid grid-cols-2 gap-4 mt-10"> 
        <button onClick={() => setShowScanner(true)}
          className="bg-black   p-3 my-5">
            SCAN
            </button>
            <button onClick={() => setShowManagement(true)}
          className="bg-black  p-4 my-5">
            MANAGE ALLERGIES
            </button>
            </div>
        </div>
        }

        { showManagement && (
          <div className="piece"> 
          <div>
            <h1 className="text-4xl mb-5">SET ALLERGIES</h1>
            
            <input 
            className="mt-5 border border-solid p-1 mr-3 text-black"
            type = 'text'
            value = {newAllergen}
            onChange = {(e) => setNewAllergen(e.target.value)}
            // add enter to enter logic
            placeholder="please enter allergen"
            />
            <button className="bg-forest px-3  py-1 text-xl " onClick = {addAllergies}>+</button>
            <br />
            </div>
          <div className="max-w-300">
            <ul className="grid grid-cols-3 gap-3 mx-20 my-6 ">
              {userAllergies.length > 0 ? (
                userAllergies.map((a) => (
                  <li
                  className="flex justify-center "
                  key = {a}
                  ><div className="bg-inchworm rounded-xl w-50 p-2 border border-solid shadow shadow-forest ">{a}
                  <button className = 'ml-8 !text-mahogany'  onClick={() => removeAllergies(a)}>X</button>
                  </div>
                  </li>
                ))
              ): <p className="text-inchworm col-2 text-xl">NO ALLERGIES ENTERED</p>}
            </ul>
            </div>

             <button onClick={() => setShowManagement(false)}
          className="bg-black  p-3 my-5">
            EXIT
            </button>
          </div>
         
        )}


        {showScanner &&  (
          <div className="piece">
            <h1 className="text-5xl text-forest">SCAN A BARCODE</h1>
            <div className="w-150 mt-6 bg-inchworm border border-solid border-inchworm border-4 rounded-xl p-1">
          <BarcodeScannerComponent 
            onUpdate={(error, result) => {
              if (result) {
                  setBarcode(result.text);
                }
             
        
            }}
          />
          </div>
          <button onClick={() => setShowScanner(false)}
          className="bg-black text-white rounded-xl p-2 my-5">
            EXIT
            </button>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && productName && showProduct && 
        <div className="piece">
          <h1 className="mb-6 mt-6">SCANNED ITEM </h1>
          <div className="w-80 h-80">
        <img className="object-contain w-full h-full " src = {productImage} />
        </div>
        <div className="bg-inchworm rounded-t-xl h-full text-left p-6 m-6 max-w-[900px] shadow shadow-forest shadow-lg border border-solid">
        <h2 className="text-3xl text-black">{productName}</h2>
        <ul className="grid grid-cols-3 gap-3 mx-20 my-3 ">
              {foundAllergies.length > 0 ? (
                foundAllergies.map((a) => (
                  <li
                  className="flex justify-center text-center mt-3"
                  key = {a}
                  ><div className="bg-mahogany border border-solid border-black rounded-xl w-50 shadow shadow-forest ">{a}
                  </div>
                  </li>
                ))
              ): <p className="text-forest col-span-3 my-2">NONE OF YOUR ALLERGIES DETECTED - CHECK YOURSELF IF YOU ARE UNSURE - THIS IS NOT 100% CORRECT</p>}
            </ul>
        <p>FULL INGREDIENT LIST: </p>
        <p className="text-forest">{productIngredients}</p>
        <div className="text-center" >
        <button onClick={() => setShowProduct(false)}
          className="bg-black p-3 mt-10 ">
            CLOSE
            </button>
        </div>
        </div>
        </div>}
        
      </div>
    </>
  );
};

export default BarcodeScanner;