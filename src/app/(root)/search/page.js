"use client"
import ListProduct from "../../components/ListProduct/index"
import { useState } from "react"
import SelectDropdown from "../../components/SelectDropdown/index"

export default function PageSearch(){
    const list = [
        {
            id: 1,
            name: 'drop1',
        },
        {
            id: 2,
            name: 'drop2',
        },
        {
            id: 3,
            name: 'drop3',
        },
        {
            id: 4,
            name: 'drop4',
        },
    ];
    return(
        <div>
            <SelectDropdown items={list}></SelectDropdown>
            <ListProduct></ListProduct>
        </div>
    )
}