const BaseDocument = [
      {
        type: "h1",
        children: [{ text: "Heading 1" }],
      },
      {
        type: "h2",
        children: [{ text: "Heading 2" }],
      },
      {
        type: "Text",
        children: [{ text: "Hello World! This is my paragraph inside a sample document." },
        { text: "Bold text.", bold: true, code: true },
        { text: "Italic text.", italic: true },
        { text: "Bold and underlined text.", bold: true, underline: true },
        { text: "variableFoo", code: true },],
      },
];
  
export default BaseDocument;
  