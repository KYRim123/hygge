"use client"
import { useState , useRef} from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css"

export default function SelectDropdown({ items, className, styleDrop, handleSelect }){
    const [selectedItem, setSelectedItem] = useState(items?.[0]?.name || null);
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const selectRef = useRef(null);

    const handleItemClick = (id, name) => {
		setSelectedItem(name);
		handleSelect(id, name);
		setIsOpenDropdown(false);
	};
	const handleCloseBox = () => {
		setIsOpenDropdown(false);
	};

	const OpenDropDown = () => {
		setIsOpenDropdown(!isOpenDropdown);
	};

    return(
            <div
			className={`${style.dropdown} ${style.className}`}
			style={styleDrop}
		>
			<div
				className={style.dropdown_selected_item}
				ref={selectRef}
				onClick={OpenDropDown}
			>
				{selectedItem}
				{isOpenDropdown ? (
				'+'
				) : (
				'-'
				)}
			</div>
			{isOpenDropdown && (
				<ClickOutSide
					className={style.dropdown_menu}
					selectRef={selectRef}
					closeBox={handleCloseBox}
				>
					{items?.map((item, index) => (
						<li
							key={index}
							value={item?.id}
							className={`${style.dropdown_menu_item}  ${item?.name == selectedItem ? 'isSelect' : ''}`}
							onClick={() => handleItemClick(item.id, item.name)}
						>
							{item?.name}
						</li>
					))}
				</ClickOutSide>
			)}
		</div>
    
    )
}