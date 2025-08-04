import { useState } from 'react';
import { colors } from 'crayola';
import './crayolaColors.css';

const CrayolaColors = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [copiedSlot, setCopiedSlot] = useState(null);


  const [palette, setPalette] = useState({
    main: { name: '', hex: '' },
    second: { name: '', hex: '' },
    third: { name: '', hex: '' },
  })
  const handleSelectedColor = (color) => {
    setSelectedColor(color);
    console.log("Selected:", color.name);
  };

const handleColorPaint = (slot) => {
  const slotData = palette[slot];

  if (selectedColor) {
    
    setPalette(prev => ({
      ...prev,
      [slot]: {
        name: selectedColor.name,
        hex: selectedColor.hex
      }
    }));
    setSelectedColor(null);
  } else if (slotData.hex) {
    
    navigator.clipboard.writeText(slotData.hex).then(() => {
      setCopiedSlot(slot);
      setTimeout(() => setCopiedSlot(null), 1500); 
    });
  }
};



  return (
    <div className='pb-60 bg-yellow-400 font-display3'>
  
      <div className="heading-wrapper relative flex flex-col items-center mt-10 flex">
      <div className="semicircle-bg absolute">
      </div>
        <img src = './crayola.png' className='z-20 w-150'/>
      <h1 className='mt-0 text-center text-8xl text-red-500 relative z-10 mt-2'>COLORS</h1>

    </div>

      <div className='bg-green-400 p-4  mx-20 xl:mx-80 rounded-xl shadow shadow-black mt-5'>
        <ul className='colorgrid'>
          {colors.map((color) => (
            <li
              key={color.name}
              className='colortile'
              style={{ backgroundColor: color.hex }}
              title={color.name}
              onClick={() => handleSelectedColor(color)}
            />
          ))}
        </ul>
      </div>

      <div className='relative pt-10 pb-20'>
        <h1 className=' text-4xl absolute mr-70 xl:mr-130 text-red-500' style={{ right: '10rem', top: '4rem' }}>
          Color Palette:
        </h1>
        <div>
          <ul className='palletgrid'>
            <li
              style={{ backgroundColor: palette.main.hex }}
              onClick={() => handleColorPaint('main')}
            >
              {copiedSlot === 'main'
                ? 'Copied!'
                : palette.main.name }
            </li>
            <li
              style={{ backgroundColor: palette.second.hex }}
              onClick={() => handleColorPaint('second')}
            >
              {copiedSlot === 'second'
                ? 'Copied!'
                : palette.second.name}
            </li>
            <li
              style={{ backgroundColor: palette.third.hex }}
              onClick={() => handleColorPaint('third')}
            >
              {copiedSlot === 'third'
                ? 'Copied!'
                : palette.third.name}
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default CrayolaColors;
