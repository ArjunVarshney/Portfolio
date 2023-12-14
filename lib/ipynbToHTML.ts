import markdown from "@wcj/markdown-to-html";

export const ipynbToHTML = (nb: any) => {
   if (!nb || !nb.cells)
      return "The Note book is not available instead try going to Github";
   const cells = nb.cells;
   let html = "";
   for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.cell_type === "markdown") {
         html += `<div class="markdown">${markdown(
            cell.source.join("\n")
         )}</div>`;
      } else if (cell.cell_type === "code") {
         html += `<div class="code">${cell.source.join("<br>")}</div>`;

         for (let j = 0; j < cell.outputs.length; j++) {
            const output = cell.outputs[j];
            if (!output) continue;
            if (output.output_type === "stream") {
               html += `<pre class="output">${
                  output.text?.join("<br>") || ""
               }</pre>`;
            } else if (output.output_type === "execute_result") {
               console.log(
                  `<div class="output">${
                     output.data?.["text/html"]?.join("") ||
                     `<pre>${output.data?.["text/plain"]?.join("")}</pre>`
                  }</div>`
               );
               html += `<div class="output">${
                  output.data?.["text/html"]?.join("") ||
                  `<pre>${output.data?.["text/plain"]?.join("")}</pre>`
               }</div>`;
            } else if (output.output_type === "display_data") {
               html += `<img class="output" src="${
                  "data:image/png;base64," + output.data?.["image/png"]
               }">`;
            }
         }
      }
   }
   return html;
};
