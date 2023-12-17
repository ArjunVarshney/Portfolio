export const latexToHTML = (latex: string): string => {
   const isLatex = /\$([\s\S]*)\$/g.test(latex);
   if (!isLatex) return latex;
   const rules: [RegExp, string][] = [
      // convert the first $ to a latex div first
      [/\$([\s\S]*)\$/g, '<div class="latex">$1</div>'],
      // text-center rule
      [/\$([\s\S]*)\$/g, '<div class="text-center w-full">$1</div>'],
      // For vector
      [
         /\\vec{([\s\S]*?)}/g,
         `<span style="position: relative;">$1<span style="position: absolute; top: -12px; left: -5px;">&rarr;</span></span>`,
      ],
      // Mathematical symbols
      [/\\alpha/g, "α"],
      [/\\partial\s?/g, "∂"],
      // For fractions
      [
         /{\s?([∂?\s?\(?\)?,?\w?\-?]*)\s?\\over\s([∂?\s?\(?\)?,?\w?\-?]*)\s?}/g,
         `<span class="over">$1<span></span>$2</span>`,
      ],
      // Summation symbol
      [
         /\\sum \\limits _{([\s\S]*?)} \^{([\s\S]*?)}/g,
         `<span class="flex-col" style="font-size:3ch">
            <span style="font-size:0.7ch">$2</span>
            <span style="height: 1.7ch">∑</span>
            <span style="font-size:0.7ch">$1</span>
         </span>`,
      ],
      // Power symbol
      [/\^{?(\w+)}?/g, "<sup>$1</sup>"],
      [/_{([\s\S]*?)}/g, "<sub>$1</sub>"],
      // For text sizes
      [/\\Large ?{([\s\S]*?)}/g, `<span class="text-large">$1</span>`],
   ];

   for (let i = 0; i < rules.length; i++) {
      latex = latex.replaceAll(rules[i][0], rules[i][1]);
   }
   return latex;
};
