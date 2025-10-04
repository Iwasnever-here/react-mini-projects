import {useEffect, useState} from 'react'
import { FaRegWindowMaximize, FaWindowMinimize  } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RxEraser, RxPencil1  } from "react-icons/rx";
import { ImEyedropper } from "react-icons/im";

import './PixelArt.css'
const PixelArt = () => {


  
    // array for grid
    // do it by grid size squared prob - have to set one to start, then fill it with white #ffffff
    const gridSize = 32
    const [grid, setGrid] = useState(Array(gridSize*gridSize).fill('#ffffff'))
    const [colors] = useState(
    [
      { id: 1, hex: "#000000" },
      { id: 2, hex: "#95918C" },
      { id: 3, hex: "#8E4585" },
      { id: 4, hex: "#BAB86C" },
      { id: 5, hex: "#45CEA2" },
      { id: 6, hex: "#158078" },
      { id: 7, hex: "#1A4876" },
      { id: 8, hex: "#6E5160" },
      { id: 9, hex: "#87A96B" },
      { id: 10, hex: "#80DAEB" },
      { id: 11, hex: "#324AB2" },
      { id: 12, hex: "#1164B4" },
      { id: 13, hex: "#18A7B5" },
      { id: 14, hex: "#B4674D" },
      { id: 15, hex: "#FFFFFF" },
      { id: 16, hex: "#C5D0E6" },
      { id: 17, hex: "#CB4154" },
      { id: 18, hex: "#FEFE22" },
      { id: 19, hex: "#B2EC5D" },
      { id: 20, hex: "#1FCECB" },
      { id: 21, hex: "#1164B4" },
      { id: 22, hex: "#FF48D0" },
      { id: 23, hex: "#F8D568" },
      { id: 24, hex: "#71BC78" },
      { id: 25, hex: "#ACE5EE" },
      { id: 26, hex: "#CDA4DE" },
      { id: 27, hex: "#FFA089" },
      { id: 28, hex: "#FF7F49" },
    ]
  );

  const [tools] = useState(
    [
      { name: 'eraser', hex: "#fffff", icon: <RxEraser /> },
      {name: 'eyedropper', hex: '#ffffff', icon: <ImEyedropper />},
      {name: 'pen' , icon: <RxPencil1 />}
    ]
  );
    // const for color selected
    const [lastUsing, setLastUsing] = useState('#000000')
    // need to keep track of last used color aswell
    const [colorUsing, setColorUsing] = useState('#000000')
    // const for eraser
    
    // const for selected tile
    const [selectedPixel, setSelectedPixel] = useState('')
    const [selectedTool, setSelectedTool] = useState('pen'); // default tool

    // maybe array for color tiles at bottom - use mechanics from the crayola 
    

    // download option 
    // option to get new canvas 
    // eye dropper tool - like color grid - just pulls hex from the grid
    // option to change grid size?
     

    // when a tile is clicked it should fill the square with the selected color  unless eraser is active- updating the grid
    // when eraser is selected onlt white will be placed, until it is clicked again - and original colour is back
    // when eye dropper tool is selected it should take the hex from the clicked square - then unselect itself after color is grabbed and set that color as being used 
    
    function toolCLick (hex, name) {
      if (selectedTool === name) {
        setSelectedTool('pen')}
        else {
          setSelectedTool(name)
        }
      
    }

    function handleClick (i, color) {
       const newGrid = grid.slice()
      if (selectedTool === 'eraser') {
        newGrid[i] = '#ffffff'
      } 
      else if ( selectedTool === 'eyedropper'){
        setColorUsing(color)
        setSelectedTool('pen')
      }
      else {
        newGrid[i] = colorUsing
      }
      setGrid(newGrid)
    }

  
// when tool clicked border and bg-change until unselected 
  return (
    <div className='h-screen content-center'>
    
    <div className='max-w-200 m-auto p-2 bg-yonder'>
    <div className='icons-top flex bg-violetblue mb-8 text-white p-1'>
      Untitled Paint
    
    <div className='ml-auto'><FaWindowMinimize /></div>
    <div className='ml-1 mr-1'><FaRegWindowMaximize /></div>
    <div className=''><IoMdClose /></div>

    </div>
    <div className='flex gap-3 '>
    <div className='grid grid-cols-2 gap-1 h-20 text-xl'>

    {tools.map((tool, i) => (
      <div key={i} className={`p-2 cursor-pointer ${selectedTool === tool.name ? 'bg-white border border-black' : ''}`} onClick={() => toolCLick(tool.hex, tool.name)}>
        {tool.icon}
        
      </div>
    ))}
    </div>

    
    <div className='flex-1 pixel-grid  mr-6'
    style={{
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
    }}
    >
    {grid.map((tile, i) => (
      <div key={i}  style={{ backgroundColor: tile }}
      onClick={()=> handleClick(i, tile)}/>

    ))}
    
    </div>
    </div>
    <div className='flex'>
      <div className="bg-white w-15 h-13 flex mt-5 mr-1 items-center justify-center">
  <div className="w-6 h-5 z-5 -mr-2 -mt-2 border border-white" style = {{backgroundColor: colorUsing}}></div>
  <div className="w-6 h-5 z-2 -mb-2 border border-white" style = {{backgroundColor: lastUsing}}
  onClick = {() => {setLastUsing(colorUsing) ; setColorUsing(lastUsing)}}></div>
</div>

    <div className='colors flex-shrink-0'>
      
      {colors.map((tile, i) => (
      <div key={i} gitle={tile.id} style={{ backgroundColor: tile.hex }}
      onClick={() => {setLastUsing(colorUsing); setColorUsing(tile.hex) }}/>

    ))}
    </div>
    </div>
    </div>
    </div>
 
  )
}

export default PixelArt
