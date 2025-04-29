const ButtonComp = ({buttonText, loading,}) => {
    return ( 
        <button type="submit" disabled={loading} className="cursor-pointer py-4 px-8 rounded bg-primary text-xs text-white font-semibold"> 
              {loading ? 
              <div className="flex items-end">
                loading...
                {/* add a spinner here */}
              </div>
              : 
              <div className="w-full truncate">
                {buttonText}
              </div>
              }
            </button>
     );
}
 
export default ButtonComp;