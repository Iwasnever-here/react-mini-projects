import {useState} from 'react'
import './PixelArt.css'
const PixelArt = () => {


  
    // array for grid
    // do it by grid size squared prob - have to set one to start, then fill it with white #ffffff
    const gridSize = 16
    const [grid, setGrid] = useState(Array(gridSize*gridSize).fill('#ffffff'))

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
    

  return (
    <div >
      
    <div className='m-auto p-10 bg-red-200'>
    <div className='pixel-grid '
    style={{
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
    }}
    >
    {grid.map((tile, i) => (
      <div key={i}  style={{ backgroundColor: tile }}/>

    ))}
    
    </div>
    </div>
    </div>
  )
}

export default PixelArt
