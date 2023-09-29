"use client"
import { useState , useRef} from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css"
import { BsChevronDown , BsChevronUp} from "react-icons/bs";

export default function SelectDropdown({ items, className, styleDrop, handleSelect ,title_select}){
    const [selectedItem, setSelectedItem] = useState(null);
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
			className={`${style.dropdown} ${style.className} ${isOpenDropdown == true ? style.drop_open : ''}`}
			style={styleDrop}
		>
			<div
				className={style.dropdown_selected_item}
				ref={selectRef}
				onClick={OpenDropDown}
			>
				{selectedItem == null ? title_select : selectedItem}
				{isOpenDropdown ? (
					
				 <BsChevronDown className={style.icon_drop}/> 
			
				) : (
			
					<BsChevronUp className={style.icon_drop}/>
				
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