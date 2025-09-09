import React, { useRef, useState } from 'react'
import QRCode from 'react-qr-code';
import './QrGenerator.css'
import { MdDownload, MdLoop  } from "react-icons/md";



const QrGenerator = () => {

  const [value, setValue] = useState('');
  const [back, setBack] = useState('#FFFFFF');
  const [front, setFront] = useState('#000000');

 
  const [tempValue, setTempValue] = useState('');
  const [tempBack, setTempBack] = useState('#FFFFFF');
  const [tempFront, setTempFront] = useState('#000000');

  const qrRef = useRef();

  const handleGenerate = () => {
    setValue(tempValue)
    setBack(tempBack)
    setFront(tempFront)
  }

  const handleDownload = () => {
    //get QR code 
    const svg = qrRef.current.querySelector('svg')
    //make svg into string serialize
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svg)

    //make canvas
    const canvas = document.createElement('canvas')
    const img = new Image();

    //wait for image to load
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = back;
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0,0)

       // download link
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
      img.src = "data:image/svg+xml;base64," + btoa(source);

  }


  return (
    <div className='h-screen content-center bg-bananamania text-center p-10'>
        <div className="max-w-300 bg-white mx-auto grid grid-cols-1 md:grid-cols-5 md:h-150 h-300 rounded-xl shadow-lg rounded-xl">
        <div className="md:col-span-3 md:rounded-l-xl grey-section content-center">
            <h1 className='mb-5 text-xl text-green-600 mt-5'>SETTINGS</h1>
            <p>link</p>
            <input type = 'text'
                   onChange={(e) => setTempValue(e.target.value)}
                   placeholder='enter link'
            />
            <p>background color</p>
              <input type = 'text'
                   onChange={(e) => setTempBack(e.target.value)}
                   placeholder='enter hex e.g #FFFFFF'
            />
            
            <p>color</p>
              <input type = 'text'
                   onChange={(e) => setTempFront(e.target.value)}
                   placeholder='enter hex e.g #FFFFFF'
            />
          <br />
            <div className="flex justify-center mb-5">
                <button 
                  onClick={handleGenerate}
                  className="flex items-center gap-2 px-5 py-3 my-5 bg-forest rounded-full shadow-lg text-white">
                  <span>Generate</span>
                  <MdLoop size={20} />
                </button>
              </div>

        </div>
        <div className="bg-forest shadow shadow-lg md:col-span-2 content-center rounded-lg m-5   ">
            <div ref = {qrRef} className='mx-20 md:mx-10 aspect-square bg-white my-10 '>
                 {value && (
                    <QRCode
                        title={value}
                        value={value}
                        bgColor={back}
                        fgColor={front}
                        size={undefined}
                        style={{ width: "100%", height: "100%" }}
                    />
                )}
            </div>
              <div className="flex justify-center mb-5">
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-3 bg-bananamania rounded-full shadow-lg">
                  <span>Download</span>
                  <MdDownload size={20} />
                </button>
              </div>
        </div>
    </div>

    </div>
  )
}

export default QrGenerator
