import React, { useState } from 'react'
export interface NestedMenuItem{
    title:string,
    isChecked:boolean,
    id:number,
}
interface MenuProps{
    title:string,
    nestedChildData:NestedMenuItem[],
    selectedItem?:(item:NestedMenuItem)=>void
}

function PromptMenu({title,nestedChildData,selectedItem}:MenuProps) {
    const [items,setItems] =useState(nestedChildData);
      const handleCheckBox = (listItem:NestedMenuItem)=>{
        const updatedItems = items.map(item=>{
          if(item.id === listItem.id){
            return {...item,isChecked:!item.isChecked}
          }
          item.isChecked=false
          return item
        })
        setItems(updatedItems)
        if(selectedItem){
          selectedItem(listItem)
        }
      }
  return (
    <li>
    <details>
      <summary>{title}</summary>
      <ul>
      { items.map(listItem=>{
        return  <li key={listItem.id}>
        <div className="flex justify-between" onClick={()=>handleCheckBox
        (listItem)}>
          <span className="label-text capitalize">{listItem.title}</span>
          <input type="checkbox" checked={listItem.isChecked} className="checkbox" />
        </div>
      </li>
       }) }
        </ul>
        </details>
        </li>
  )
}

export default PromptMenu
