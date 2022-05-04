import { StyleSheet, TouchableOpacity, Pressable, Text, View } from 'react-native';
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";
import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import { useState } from 'react';
import { Picker } from 'react-native-web';
import { Range, Transforms } from 'slate';

const BLOCK = ['align-left', 'align-center', 'align-right', 'list'];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code", "link"];
const COLORS = ["green", "red", "yellow", "blue", "black", "pink", "purple", "orange", "white", "grey"];
const CHARACTER_SIZE = ["ten", "twelve", "fourteen", "sixteen", "eighteen", "twenty", "twentytwo", "twentyfour", "thirtytwo", "sixtyfour", "onehundredtwentyeight"];
const SIZE = ["10", "12", "14", "16", "18", "20", "22", "24", "32", "63", "128"];
const FONTS = ["normal","serif", "Roboto", "Montserrat", "OpenSans", "Arial", "TimesNewRoman", "Calibri"];

export default function Toolbar({ downloadButton, selection }) {
  const editor = useSlateStatic();
  const [edit, setEdit] = useState("does it");

  return (
    <View style={styles.top}>
      {dropdown(FONTS, FONTS)}
      {dropdown(CHARACTER_SIZE, SIZE)}
      {BLOCK.map((style) => (
          <IconSlot
            key={style}
            title={style}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleBlockType(editor, style);
            }}
          />
        ))}
        {CHARACTER_STYLES.map((style) => (
          <IconSlot
            key={style}
            isActive={getActiveStyles(editor).has(style)}
            title={style}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleStyle(editor, style);
              setEdit("work?");
            }}
          />
        ))}
      {drop(COLORS)}
      <TouchableOpacity style={styles.circle} onPress={()=> exportHTML()}>
        <Foundation name="page-export-doc" size={24} color="black" />
      </TouchableOpacity>
      {downloadButton}
    </View>
  );
}

function exportHTML(){
  var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
       "xmlns:w='urn:schemas-microsoft-com:office:word' "+
       "xmlns='http://www.w3.org/TR/REC-html40'>"+
       "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;
  
  var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = 'document.doc';
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

function getActiveSize(style, type) {
  if (style != null){
    var x = Object.keys(style)
    let s_arr = x.map((val) => String(val))
    const intersection = s_arr.filter(element => type.includes(element));
    return intersection[0];
  }
}

function drop(type) {
    const [open, setOpen] = useState(false);
    const editor = useSlateStatic();
    const col = getActiveSize(Editor.marks(editor), type);
    if (!open) {
      return(
      <Pressable style={[styles.container, {backgroundColor: col, opacity: 0.5}]} onMouseDown={() => setOpen(true)}></Pressable>
      );
    } else {
      return(
        <View>
        <View style={{overflow: 'visible', maxWidth: '8em', flexDirection: 'row', flexWrap:'wrap', marginTop: '2em'}}>
        {type.map((style) => (
          <Nob
            key={style}
            isActive={false}
            title={style}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleColor(editor, style, COLORS);
              setOpen(false);
            }}
          />
          ))}
        </View>
        </View>
      );
    }
    
}

function dropdown(INITIAL_ARRAY, DISPLAY_ARRAY) {
  const editor = useSlateStatic();

  return(
    <Picker style={styles.dropdown} selectedValue={getActiveSize(Editor.marks(editor), INITIAL_ARRAY)} onValueChange={(itemValue) => toggleColor(editor, itemValue, INITIAL_ARRAY) } >
      {INITIAL_ARRAY.map((style, index) => (
            <Picker.Item
              label={DISPLAY_ARRAY[index]}
              key={index}
              value={String(style)}
              />))}
      </Picker>
  );
}

export function toggleBlockType(editor, blockType) {
  const currentBlockType = getTextBlockStyle(editor);
  const changeTo = currentBlockType === blockType ? "paragraph" : blockType;
  Transforms.setNodes(
    editor,
    { type: changeTo },
     // Node filtering options supported here too. We use the same
     // we used with Editor.nodes above.
    { at: editor.selection, match: (n) => Editor.isBlock(editor, n) }
  );
}

export function getTextBlockStyle(editor) {
  const selection = editor.selection;
  if (selection == null) {
    return null;
  }
  // gives the forward-direction points in case the selection was
  // was backwards.
  const [start, end] = Range.edges(selection);

  //path[0] gives us the index of the top-level block.
  let startTopLevelBlockIndex = start.path[0];
  const endTopLevelBlockIndex = end.path[0];

  let blockType = null;
  while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
    const [node, _] = Editor.node(editor, [startTopLevelBlockIndex]);
    if (blockType == null) {
      blockType = node.type;
    } else if (blockType !== node.type) {
      return "multiple";
    }
    startTopLevelBlockIndex++;
  }

  return blockType;
}

function IconSlot(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable style={{alignItems: 'center', borderRadius: '4px', padding: '2px', backgroundColor: isActive ? "rgba(178, 212, 255, 0.4)" : "#fff"}} {...otherProps}>
      <Feather name={title} size={20} color="black" />
    </Pressable>
  );
}

function Nob(props) {
  const { icon,  title, ...otherProps } = props;
  return(
    <Pressable style={[styles.container, {backgroundColor: title, opacity: 0.5}]} {...otherProps}>
    </Pressable>
  );
}

function getActiveStyles(editor) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

function toggleStyle(editor, style) {
  const activeStyles = getActiveStyles(editor);
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}

function toggleColor(editor, style, type) {
  const activeStyles = getActiveStyles(editor);
  activeStyles.forEach( (col) => {
    if (type.includes(col)){
      console.log(col);
      Editor.removeMark(editor, col);
    }
  });
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    backgroundColor: '#fff', 
    padding: '3px', 
    borderColor: 'lightgrey',
    borderWidth: '1px',
    justifyContent: 'space-between',
    alignContent: 'center',
    maxHeight: '2em',
    zIndex: 1,
  },
  container: {
    width: '1.25em',
    height: '1.25em',
    borderRadius: '50%',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'lightgrey',
    margin: '3px',
  },
  inner: {
    alignSelf: 'center',
    fontSize: '10px'
  },
  line: {
    borderRightWidth: '1px',
    borderColor: 'lightgrey',
    margin: '1px',
  }, 
  section: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  dropdown: {
    borderWidth: 0,
    // backgroundColor: 'rgba(178, 212, 255, 0.4)',
    opactiy: 0.1,
    borderRadius: '4px'
  }
});