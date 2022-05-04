const BaseDocument = [
      {
        type: "Text",
        children: [{ text: "paragraph" }],
      },
      {
        type: "Text",
        children: [{ text: "This is my paragraph inside a sample document." },
        { text: "Bold text.", bold: true, code: true },
        { text: "Italic text.", italic: true },
        { text: "Bold and underlined text.", bold: true, underline: true },
        { text: "variableFoo", code: true },],
      },
];
  
export default BaseDocument;
  