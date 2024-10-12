import React, { useState } from 'react';

// Define the interface for props
interface OptionComponentProps {
  answer: string;
  option: string;
  index: string;
  onSelect: (option: string) => void; // Add the onSelect prop
  
}

const OptionComponent: React.FC<OptionComponentProps> = ({ answer, option, index, onSelect }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Function that checks if there are multiple answers (comma-separated)
  const checkCondition = (): boolean => {
    return answer.split(",").length > 1;
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
    onSelect(option); // Call the onSelect function when the option is clicked
  };

  return (
    <div>
      {checkCondition() ? (
        <label>
          <input 
            type="checkbox" 
            checked={isChecked} 
            onClick={handleClick} 
          />
          <strong>{index}</strong> - {option}
        </label>
      ) : (
        <label>
          <input 
            type="radio" 
            checked={isChecked} 
            onClick={handleClick} 
          />
          <strong>{index}</strong> - {option}
        </label>
      )}
    </div>
  );
};

export default OptionComponent;
