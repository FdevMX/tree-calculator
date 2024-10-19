export const handleCalculate = async (
    display: string,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setTokens: React.Dispatch<React.SetStateAction<{ lexeme: string, token: string }[]>>
  ) => {
    const codeContent = display.trim();
    if (codeContent === '') {
      console.error('Error: Ingrese un valor.');
      return;
    }
    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeContent }),
      });
      const result = eval(display); // Aquí puedes ajustar la lógica del cálculo si es necesario
      setDisplay(result.toString());
      const data = await response.json();
      setTokens(data.tokens);
    } catch (error) {
      setDisplay('Error');
      console.error('Error:', error);
    }
  };
  