export const csvToHTML = (csv: string) => {
   let html = "";
   const rows: string[] = csv.split("\n");
   const header = `
   <thead>
      <tr>
   ${[
      `<th></th>`,
      ...rows[0].split(",").map((head: string) => `<th>${head}</th>`),
   ].join("")}</tr>
   </thead>`;
   const body = `
   <tbody>
   ${[
      ...Object.entries(rows.slice(1).slice(0, 251)).map(([index, row]) => {
         return `<tr>${[
            `<td>${index}</td>`,
            ...row.split(",").map((data) => {
               return `<td>${
                  !isNaN(parseFloat(data))
                     ? Math.round(Number(data) * 10000) / 10000
                     : data
               }</td>`;
            }),
         ].join("")}<tr/>`;
      }),
   ].join("")}
   </tbody>`;

   html = `<table class="dataset">${header}${body}</table>
   ${
      rows.length > 255
         ? `<div class="mt-2 flex justify-center">Over ${
              Math.floor(rows.length / 1000) * 1000
           } data points present in the original dataset.</div>`
         : ""
   }
   `;

   return html;
};
