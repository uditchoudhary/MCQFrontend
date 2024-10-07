import React, { useState } from 'react';

// Define the interface for props
interface OptionComponentProps {
  answer: string;
  option: string;
  index: string;
}

const OptionComponent: React.FC<OptionComponentProps> = ({ answer, option, index }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Function that checks if there are multiple answers (comma-separated)
  const checkCondition = (): boolean => {
    return answer.split(",").length > 1;
  };

  return (
    <div>
      {checkCondition() ? (
        <label>
          <input 
            type="checkbox" 
            checked={isChecked} 
            onClick={() => setIsChecked(!isChecked)} 
          />
            <strong>{index}</strong> - {option}
        </label>
      ) : (
        <label>
          <input 
            type="radio" 
            checked={isChecked} 
            onClick={() => setIsChecked(!isChecked)} 
          />
          <strong>{index}</strong> - {option}
           
        </label>
      )}
    </div>
  );
};

export default OptionComponent;
