import { useState } from 'react';
import { colors } from 'crayola';
import './crayolaColors.css';

const CrayolaColors = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const [palette, setPalette] = useState({
    main: '',
    second: '',
    third: '',
  })
  const handleSelectedColor = (color) => {
    setSelectedColor(color);
    console.log("Selected:", color.name);
  };

  const handleColorPaint = (slot) => {
    if (selectedColor) {
      setPalette(prev => ({
        ...prev,
        [slot]: selectedColor.hex
      })) 
      setSelectedColor(null);
    }
  }


  return (
    <div>
      <h1 className='text-center mt-10 text-3xl text-green-600'>Crayola</h1>
      <h1 className=' text-center mt-5 text-3xl text-red-500'>COLORS</h1>

      <div className='bg-green-400 p-4 mx-20 xl:mx-80 rounded-xl shadow mt-15'>
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

      <div className='relative pt-10'>
        <h1 className='text-2xl absolute mr-70 xl:mr-130' style={{ right: '10rem', top: '4rem' }}>
          Color Palette:
        </h1>
        <div>
          <ul className='palletgrid'>
            <li
            style={{ backgroundColor: palette.main }}
              onClick={() => handleColorPaint('main')}
              >main</li>
            <li
            style={{ backgroundColor: palette.second }}
              onClick={() => handleColorPaint('second')}
              >Second</li>
            <li
            style={{ backgroundColor: palette.third }}
              onClick={() => handleColorPaint('third')}
              >Third</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrayolaColors;
