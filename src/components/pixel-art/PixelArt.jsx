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
      { id: 14, hex: "#FFFFFF" },
      { id: 15, hex: "#C5D0E6" },
      { id: 16, hex: "#CB4154" },
      { id: 17, hex: "#FEFE22" },
      { id: 18, hex: "#B2EC5D" },
      { id: 19, hex: "#1FCECB" },
      { id: 20, hex: "#1164B4" },
      { id: 21, hex: "#FF48D0" },
      { id: 22, hex: "#F8D568" },
      { id: 23, hex: "#71BC78" },
      { id: 24, hex: "#ACE5EE" },
      { id: 25, hex: "#CDA4DE" },
      { id: 26, hex: "#FFA089" },
      { id: 27, hex: "#FF7F49" },
      { id: 28, hex: "#B4674D" },
    ].sort(() => Math.random() - 0.5)
  );
    // const for color selected
    const [colorUsing, setColorUsing] = useState('#ffffff')
    // const for eraser
    const [usingEraser, setUsingEraser] =useState(false)
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
    
    
    function handleClick (i) {
       const newGrid = grid.slice()
      if (!usingEraser) {
        newGrid[i] = colorUsing
        console.log(grid[i])
       
      }
      else {
        newGrid[i] = '#FFFFFF'
        console.log(grid[i])
      }
      setGrid(newGrid)
    }


  return (
    <div className='h-screen content-center'>
    
    <div className='max-w-200 m-auto p-2 bg-yonder'>
    <div className='bg-violetblue mb-8 text-white'>Untitled Paint</div>
    <div className='pixel-grid ml-25 mr-6'
    style={{
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
    }}
    >
    {grid.map((tile, i) => (
      <div key={i}  style={{ backgroundColor: tile }}
      onClick={()=> handleClick(i)}/>

    ))}
    
    </div>
    <div className='colors'>
      {colors.map((tile, i) => (
      <div key={i}  style={{ backgroundColor: tile.hex }}
      onClick={() => setColorUsing(tile.hex)}/>

    ))}
    </div>
    </div>
    </div>
 
  )
}

export default PixelArt
