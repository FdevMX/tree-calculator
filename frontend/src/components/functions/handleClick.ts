export const handleClick = (
    value: string,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setCurrentExpression: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setDisplay((prev) => prev + value);
    setCurrentExpression((prev) => prev + value);
  };
  