import styles from "./input.module.css";
import { NAME_TK, NAME_TND, NAME_EMAIL, NAME_MK, NAME_DC, NAME_SDT } from "@/app/lib/constants";

const Input = (props) => {
  const { label, value, name, errorMessage, onChange, ...inputProps } = props;

  function validateInput(name, value) {
    switch (name) {
      case NAME_TK: {
        const re = /[A-Za-z0-9]{3,16}$/;
        return re.test(value).toString();
      }
      case NAME_TND: {
        const re1 = /\S/;
        return re1.test(value).toString();
      }
      case NAME_EMAIL: {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value).toString();
      }
      case NAME_MK: {
        const re1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return re1.test(value).toString();
      }
      case NAME_DC: {
        const re = /\S/;
        return re.test(value).toString();
      }
      case NAME_SDT: {
        const re1 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re1.test(value).toString();
      }
    }
  }

  return (
    <div className={`${styles.formInput} flex flex-col w-[350px] flex-grow`}>
      <label htmlFor="email">{label}</label>
      <input
        name={name}
        value={value}
        {...inputProps}
        className="outline-main-100 border-2 border-gray-200 py-3 px-4  rounded-full text-xl"
        onChange={onChange}
        show={validateInput(name, value)}
      />
      <span className="text-red-500">{errorMessage}</span>
    </div>
  );
};

export default Input;
