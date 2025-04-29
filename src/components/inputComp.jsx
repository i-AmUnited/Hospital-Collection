import { useState } from "react";
import showPasswordIcon from "../assets/icons-svg/showPassword.svg";
import hidePasswordIcon from "../assets/icons-svg/hidePassword.svg";
import searchIcon from "../assets/icons-svg/search.svg";

const InputComp = ({
  label,
  type,
  placeholder,
  value,
  id,
  name,
  readOnly,
  disabled,
  customStyles,
  onChange,
  onBlur,
  onError,
  isPassword,
  isSearch,
  variant,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  return (
    <div>
      <div className="grid gap-[2px]">
        <span className="text-sm">{label}</span>
        {variant === "textArea" ? (
          <textarea
            rows={4}
            onChange={onChange}
            value={value}
            name={name}
            onBlur={onBlur}
            placeholder="Start typing..."
            className="w-full px-4 py-5 md:py-4 border-[1.5px] border-[#c4c4c432] focus:outline focus:outline-primary rounded "
          />
        ) : (
          <div className="relative w-full">
            {isPassword === "true" ? (
              <div
                className="absolute top-0 h-full right-0 p-1 cursor-pointer"
                onClick={togglePassword}
              >
                <span className="aspect-square bg-white h-full flex items-center justify-center">
                  <img
                    src={
                      inputType === "password"
                        ? showPasswordIcon
                        : hidePasswordIcon
                    }
                    alt="Toggle Password Visibility"
                    className="h-4"
                  />
                </span>
              </div>
            ) : null}
            {isSearch === "true" ? (
              <div className="absolute top-0 h-full right-0 p-1 cursor-pointer">
                <span className="aspect-square bg-white h-full flex items-center justify-center">
                  <img src={searchIcon} alt="Search" className="h-4" />
                </span>
              </div>
            ) : null}
            <div>
              <input
                type={inputType}
                id={id}
                readOnly={readOnly}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                name={name}
                onBlur={onBlur}
                className={`w-full px-4 py-5 md:py-4 border-[1.5px] border-[#c4c4c432] text-sm placeholder:text-[12px] focus:outline-0 focus:border-primary rounded-md ${customStyles}`}
              />
            </div>
          </div>
        )}
      </div>
      <span className="text-red-500 text-xs">{onError}</span>
    </div>
  );
};

export default InputComp;
