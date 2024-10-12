import React from 'react';

interface OptionComponentProps {
  answer: string;
  option: string;
  index: string;
  onSelect: (option: string) => void;
  isChecked: boolean;
  type: string; // 'checkbox' or 'radio'
}

const OptionComponent: React.FC<OptionComponentProps> = ({ answer, option, index, onSelect, isChecked, type }) => {

  const handleClick = () => {
    onSelect(index);
  };

  return (
    <div>
      <label>
        <input
          type={type}
          checked={isChecked}
          onChange={handleClick}
        />
        <strong>{index}</strong> - {option}
      </label>
    </div>
  );
};

export default OptionComponent;
