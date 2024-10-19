export const handleDelete = (
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setCurrentExpression: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setDisplay((prev) => prev.slice(0, -1));
    setCurrentExpression((prev) => prev.slice(0, -1));
  };
  