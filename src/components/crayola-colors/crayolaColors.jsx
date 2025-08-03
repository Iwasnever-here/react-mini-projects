import React from 'react'
import {colors} from 'crayola';
import './crayolaColors.css';
import {DndContext, closestCenter, PointerSensor, useSensor, useSensors, closestCorners} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';

const CrayolaColors = () => {

  return (
    <div>
      <h1>crayola colors</h1>
      <div >
      <ul className='colorgrid'>
        <DndContext collisionDetection={closestCorners}>
          <SortableContext strategy={verticalListSortingStrategy} items = {colors}>
        {colors.map((color) => (
          <li key={color.name} className='colortile'
           style={{ backgroundColor: color.hex }}>
            
          </li>
        ))}
        </SortableContext>
        </DndContext>
      </ul>
      </div>
      <div>
        color pallet
      </div>
    </div>
  )
}

export default CrayolaColors
