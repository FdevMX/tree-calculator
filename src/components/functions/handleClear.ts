export const handleClear = (
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setTokens: React.Dispatch<React.SetStateAction<{ lexeme: string, token: string }[]>>,
    setCurrentExpression: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setDisplay('');
    setTokens([]);
    setCurrentExpression('');
  };
  