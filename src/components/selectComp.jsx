import React from 'react';

const SelectComp = ({ label, name, value, onChange, onBlur, options, onError, placeholder }) => {
  
  return (
      <div className="grid gap-1">
        <div className=''>
          <span className="text-sm">{label}</span>
          <div className="relative w-full">
            <div className='px-4 border rounded bg-white hover:outline hover:outline-1 hover:outline-brandGreen/50'>
              <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full py-5 md:py-4 text-sm focus:outline-none"
              >
                <option value="" disabled>
                {placeholder}
              </option>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <span className="text-red-500 text-xs">{onError}</span>
      </div>
  );
};

export default SelectComp;
