import React, { useRef, useState } from 'react'
import QRCode from 'react-qr-code';
import './QrGenerator.css'



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
    <div className='h-screen content-center  text-center p-10'>
        <div className="max-w-300 bg-blue-500 mx-auto grid grid-cols-1 md:grid-cols-5 h-150 rounded-xl shadow-md shadow-neutral-600 rounded-xl">
        <div className="bg-neutral-300 border-2 border-neutral-600 md:col-span-3 md:rounded-l-xl grey-section content-center">
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
            <button onClick={handleGenerate}
            className='p-3 bg-green-300 rounded-full mb-5'>generate</button>
        </div>
        <div className="bg-white border-2 border-neutral-600 md:col-span-2 content-center md:rounded-r-xl ">
            <div ref = {qrRef} className='mx-20 md:mx-10 aspect-square bg-neutral-300 my-10 '>
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
            <button onClick={handleDownload}
            className='p-3 bg-green-300 rounded-full mb-5'>download</button>
        </div>
    </div>

    </div>
  )
}

export default QrGenerator
