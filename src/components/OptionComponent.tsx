import React, { useState } from 'react';

interface OptionComponentProps {
  answer: string;
  option: string;
  index: string;
  onSelect: (option: string) => void;
}

const OptionComponent: React.FC<OptionComponentProps> = ({ answer, option, index, onSelect }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const checkCondition = (): boolean => {
    return answer.split(",").length > 1;
  };

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onSelect(index); // Pass the option index to the parent component
  };

  return (
    <div>
      {checkCondition() ? (
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleClick}
          />
          <strong>{index}</strong> - {option}
        </label>
      ) : (
        <label>
          <input
            type="radio"
            checked={isChecked}
            onChange={handleClick}
          />
          <strong>{index}</strong> - {option}
        </label>
      )}
    </div>
  );
};

export default OptionComponent;
