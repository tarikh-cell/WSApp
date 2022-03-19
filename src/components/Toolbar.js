import { StyleSheet, Button, Pressable, Text, View } from 'react-native';
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

import { Range, Transforms } from 'slate';

const BLOCK = ['quote-left', 'list-ul', 'align-left', 'align-center', 'align-right'];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code", "link"];
const COLORS = ["green", "red", "yellow", "blue", "black", "pink", "purple", "orange", "white", "grey"];
const CHARACTER_SIZE = ["ten", "twelve", "fourteen", "sixteen", "eighteen", "twenty", "twentytwo", "twentyfour", "thirtytwo", "sixtyfour", "onehundredtwentyeight"];
const FONTS = ["normal","serif", "Roboto", "Montserrat", "OpenSans", "Arial", "TimesNewRoman", "Calibri"];

export default function Toolbar({ selection }) {
  const editor = useSlateStatic();
  
  return (
    <>
      <View style={styles.line} />
      <View style={styles.section}>
        {BLOCK.map((style) => (
          <IconSlot
            key={style}
            isActive={getActiveStyles(style)}
            title={style}
            onPress={(event) => {
              event.preventDefault();
              toggleBlockType(editor, style);
            }}
          />
        ))}
      </View>
      <View style={styles.line} />
      <View style={styles.section}>
        {CHARACTER_STYLES.map((style) => (
          <IconSlot
            key={style}
            isActive={false}
            title={style}
            onPress={(event) => {
              event.preventDefault();
              toggleStyle(editor, style);
            }}
          />
        ))}
      </View>
      <View style={styles.line} />
        <SizeDropdown ARRAY={FONTS} title={"Font"} />
      <View style={styles.line} />
        <SizeDropdown ARRAY={CHARACTER_SIZE} title={"Font Size"} />
      <View style={styles.line} />
      <View style={styles.section}>
        {COLORS.map((style) => (
          <Nob
            key={style}
            isActive={false}
            title={style}
            onPress={(event) => {
              event.preventDefault();
              toggleColor(editor, style, COLORS);
            }}
          />
        ))}
      </View>
    </>
  );
}

function SizeDropdown(props) {
  const editor = useSlateStatic();
  const [open, setOpen] = useState(true);
  const { ARRAY, title } = props;
  if (open){
    return(
      <Pressable style={{marginVertical: '1em', flexDirection: 'row', justifyContent: 'space-between'}} onPress={(event) => {event.preventDefault();setOpen(false);}}>
        <Text style={styles.inner}>{title}</Text>
        <FontAwesome name="sort-down" size={20} color="lightgrey" />
      </Pressable>
    );
  } else {
    return(
      <View>
        <Pressable style={{marginVertical: '1em', flexDirection: 'row', justifyContent: 'space-between'}} onPress={(event) => {event.preventDefault();setOpen(true);}}>
          <Text style={styles.inner}>{title}</Text>
          <FontAwesome name="sort-up" size={20} color="lightgrey" />
        </Pressable>
        {ARRAY.map((style) => (
          <Font
            key={style}
            isActive={false}
            title={style}
            onPress={(event) => {
              event.preventDefault();
              toggleColor(editor, style, ARRAY);
            }}
          />
        ))}
      </View>
    );
  }
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
    <Pressable active={isActive} style={{alignItems: 'center', marginVertical: '2px'}} {...otherProps}>
      <Text style={{fontSize: '15px'}}>{title}</Text>
    </Pressable>
  );
}

function IconSlot(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable active={isActive} style={{alignItems: 'center'}} {...otherProps}>
      <FontAwesome name={title} size={15} color="black" />
    </Pressable>
  );
}

function Nob(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable active={isActive} style={[styles.container, {backgroundColor: title, opacity: 0.5}]} {...otherProps}>
    </Pressable>
  );
}

function TextSlot(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable active={isActive} {...otherProps}>
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
  container: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'lightgrey',
    margin: '3px',
  },
  inner: {
    alignSelf: 'center',
  },
  line: {
    borderTopWidth: '1px',
    borderColor: 'lightgrey',
    margin: '5px',
    width: '100%'
  }, 
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: '1em',
  }
});