import React, { useState } from 'react';
import { Text } from 'react-native';
import { DefaultElement } from "slate-react";

export default function useEditorConfig(editor) {
  return { renderElement, renderLeaf };
}

function renderElement(props) {
  const { element, children, attributes } = props;
  switch (element.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    case "h1":
      return <h1 {...attributes}>{children}</h1>;
    case "h2":
      return <h2 {...attributes}>{children}</h2>;
    case "h3":
      return <h3 {...attributes}>{children}</h3>;
    case "h4":
      return <h4 {...attributes}>{children}</h4>;
    case "r":
      return <Text {...attributes} style={{color: "green"}}>{children}</Text>
    case 'quote-left':
      return <blockquote style={{color: '#aaa', borderLeftWidth: '2px', borderLeftColor: '#ddd'}} {...attributes}>{children}</blockquote>
    case 'list-ul':
      return <li {...attributes}>{children}</li>
    case 'align-left':
      return <p style={{textAlign: 'left'}} {...attributes}>{children}</p>;
    case 'align-center':
      return <p style={{textAlign: 'center'}} {...attributes}>{children}</p>;
    case 'align-right':
      return <p style={{textAlign: 'right'}} {...attributes}>{children}</p>;
    default:
      // For the default case, we delegate to Slate's default rendering. 
      return <DefaultElement {...props} />;
  }
}

function renderLeaf({ attributes, children, leaf }) {
    let el = <>{children}</>;
  
    if (leaf.bold) {el = <strong>{el}</strong>;} 
    if (leaf.code) {el = <code>{el}</code>;}
    if (leaf.italic) {el = <em>{el}</em>;}
    if (leaf.underline) {el = <u>{el}</u>;}
    if (leaf.link) {el = <a href={el}>{el}</a>;}
    
    if (leaf.green){el = <Text style={{color: "green"}}>{el}</Text>;}
    if (leaf.red){el = <Text style={{color: "red"}}>{el}</Text>;}
    if (leaf.yellow){el = <Text style={{color: "yellow"}}>{el}</Text>;}
    if (leaf.blue){el = <Text style={{color: "blue"}}>{el}</Text>;}
    if (leaf.pink){el = <Text style={{color: "pink"}}>{el}</Text>;}
    if (leaf.purple){el = <Text style={{color: "purple"}}>{el}</Text>;}
    if (leaf.orange){el = <Text style={{color: "orange"}}>{el}</Text>;}
    if (leaf.white){el = <Text style={{color: "white"}}>{el}</Text>;}
    if (leaf.grey){el = <Text style={{color: "grey"}}>{el}</Text>;}

    if (leaf.ten){el = <Text style={{fontSize: "10px"}}>{el}</Text>;}
    if (leaf.twelve){el = <Text style={{fontSize: "12px"}}>{el}</Text>;}

    if (leaf.normal){el = <Text style={{fontFamily: "sans-serif"}}>{el}</Text>;}
    if (leaf.serif){el = <Text style={{fontFamily: "sans-serif"}}>{el}</Text>;}
    if (leaf.Roboto){el = <Text style={{fontFamily: "Roboto"}}>{el}</Text>;}
  
    return <span {...attributes}>{el}</span>;
}
