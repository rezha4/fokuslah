import { InlineMath } from "react-katex";

export default function MathRenderer({ text }: { text: string }) {
  // Convert raw text to LaTeX
  const convertToLatex = (rawText: string) => {
    let latex = rawText;

    // Specific conversions for this question
    latex = latex.replace(
      /the number 0\.00000000031/g,
      "0.00000000031"
    );
    latex = latex.replace(
      /'plus-minus a times 10 to the power of n'/g,
      "ax10^n"
    );
    latex = latex.replace(
      /a times 10 to the power of n/g,
      "a \\times 10^{n}"
    );
    latex = latex.replace(
      /1 is less than or equal to a which is less than 10/g,
      "1 ≤ a < 10"
    );
    latex = latex.replace(/n is an integer/g, "n is an integer");

    return latex;
  };

  const formattedText = convertToLatex(text);

  console.log("latex", formattedText)

  return (
    <div className="text-lg leading-relaxed">
      {formattedText
        .split(/(a x 10\^n|a \\times 10\^\{n\}|1 ≤ a < 10)/g)
        .map((part, idx) => {
          if (part === "±a x 10^n" || part === "a \\times 10^{n}") {
            return <InlineMath key={idx} math="a \times 10^{n}" />;
          } else if (part === "1 ≤ a < 10") {
            return <InlineMath key={idx} math="1 \leq a < 10" />;
          }
          return <span key={idx}>{part}</span>;
        })}
    </div>
  );
}
