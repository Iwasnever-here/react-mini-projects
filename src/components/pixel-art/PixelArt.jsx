import {useEffect, useState} from 'react'
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
      { name: 'eraser', hex: "#fffff" },
      {name: 'eyedropper', hex: '#ffffff'}
    ]
  );
    // const for color selected
    const [colorUsing, setColorUsing] = useState('#ffffff')
    // const for eraser
    const [usingEraser, setUsingEraser] =useState(false)
    const [usingEyeDropper, setUsingEyeDropper] = useState(false)
    // const for selected tile
    const [selectedPixel, setSelectedPixel] = useState('')
    
    // maybe array for color tiles at bottom - use mechanics from the crayola 
    

    // download option 
    // option to get new canvas 
    // eye dropper tool - like color grid - just pulls hex from the grid
    // option to change grid size?
     

    // when a tile is clicked it should fill the square with the selected color  unless eraser is active- updating the grid
    // when eraser is selected onlt white will be placed, until it is clicked again - and original colour is back
    // when eye dropper tool is selected it should take the hex from the clicked square - then unselect itself after color is grabbed and set that color as being used 
    
    function toolCLick (hex, name) {
      if (name == 'eraser'){
        if (!usingEraser)
          setUsingEraser(true)
        else
          setUsingEraser(false)
      }
      else if (name == 'eyedropper'){
        setUsingEyeDropper(true)
      }
    }

    function handleClick (i, color) {
       const newGrid = grid.slice()
      if (!usingEraser && !usingEyeDropper) {
        newGrid[i] = colorUsing
        console.log(grid[i])
       
      }
      else if (usingEraser) {
        newGrid[i] = '#FFFFFF'
        console.log(grid[i])
      }
      else if (usingEyeDropper) {
        setColorUsing(color)
        setUsingEyeDropper(false)
      }
      setGrid(newGrid)
    }


  return (
    <div className='h-screen content-center'>
    
    <div className='max-w-200 m-auto p-2 bg-yonder'>
    <div className='bg-violetblue mb-8 text-white'>Untitled Paint</div>
    <div className='flex gap-6 '>
    <div className='flex flex-col gap-4'>

    {tools.map((tool, i) => (
      <div key={i} onClick={() => toolCLick(tool.hex, tool.name)}>
        {tool.name}
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
    <div className='colors'>
      {colors.map((tile, i) => (
      <div key={i} gitle={tile.id} style={{ backgroundColor: tile.hex }}
      onClick={() => setColorUsing(tile.hex)}/>

    ))}
    </div>
    </div>
    </div>
 
  )
}

export default PixelArt
