import { StyleSheet, Button, Pressable, Text, View } from 'react-native';
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Picker } from 'react-native-web';

import { Range, Transforms } from 'slate';

const BLOCK = ['align-left', 'align-center', 'align-right', 'list'];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code", "link"];
const COLORS = ["green", "red", "yellow", "blue", "black", "pink", "purple", "orange", "white", "grey"];
const CHARACTER_SIZE = ["ten", "twelve", "fourteen", "sixteen", "eighteen", "twenty", "twentytwo", "twentyfour", "thirtytwo", "sixtyfour", "onehundredtwentyeight"];
const SIZE = ["10", "12", "14", "16", "18", "20", "22", "24", "32", "63", "128"];
const FONTS = ["normal","serif", "Roboto", "Montserrat", "OpenSans", "Arial", "TimesNewRoman", "Calibri"];

export default function Toolbar({ selection }) {
  const editor = useSlateStatic();

  return (
    <View style={styles.top}>
      {dropdown(FONTS, FONTS)}
      <View style={styles.line} />
      {dropdown(CHARACTER_SIZE, SIZE)}
      <View style={styles.line} />
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
      <View style={styles.line} />
        {CHARACTER_STYLES.map((style) => (
          <IconSlot
            key={style}
            isActive={getActiveStyles(editor).has(style)}
            title={style}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleStyle(editor, style);
            }}
          />
        ))}
      <View style={styles.line} />
        {COLORS.map((style) => (
          <Nob
            key={style}
            isActive={false}
            title={style}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleColor(editor, style, COLORS);
            }}
          />
        ))}
    </View>
  );
}

function getActiveSize(style, type) {
  if (style != null){
    var x = Object.keys(style)
    let s_arr = x.map((val) => String(val))
    const intersection = s_arr.filter(element => type.includes(element));
    return intersection[0];
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
              value={style.toString()}
              />))}
      </Picker>
  );
}

function SizeDropdown(props) {
  const editor = useSlateStatic();
  const [open, setOpen] = useState(true);
  const { ARRAY, ARR, title } = props;
  const style = Editor.marks(editor);

    return(
      <>
        <Pressable style={{justifyContent: 'space-between', flexDirection: 'row'}} onPress={(event) => {event.preventDefault();setOpen(false);}}>
          <Text style={styles.inner}>{getActiveSize(style, ARRAY)}</Text>
          <Text style={styles.inner}></Text>
          <AntDesign name="caretdown" size={15} color="black" />
        </Pressable>

        { open ? null : <View style={{zIndex: 2, position: 'absolute', left: 21}}>
          <Pressable style={{marginVertical: '1em', justifyContent: 'center'}} onPress={(event) => {event.preventDefault();setOpen(true);}}>
            <Text style={styles.inner}>{title}</Text>
            <AntDesign name="caretdown" size={15} color="black" />
          </Pressable>
          {ARRAY.map((style, index) => (
            <Font
              key={style}
              isActive={false}
              title={ARR[index]}
              onPress={(event) => {
                event.preventDefault();
                toggleColor(editor, style, ARRAY);
              }}
            />
          ))}
        </View> }
      </>
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


function Font(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable style={{alignItems: 'center', marginVertical: '2px'}} {...otherProps}>
      <Text style={{fontSize: '10px'}}>{title}</Text>
    </Pressable>
  );
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

function TextSlot(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable {...otherProps}>
      <Text style={styles.inner}>{title}</Text>
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
    justifyContent: 'space-evenly',
    zIndex: 1,
  },
  container: {
    width: '1em',
    height: '1em',
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
    borderTopWidth: '1px',
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
    backgroundColor: 'rgba(178, 212, 255, 0.4)',
    opactiy: 0.1,
    borderRadius: '8%'
  }
});