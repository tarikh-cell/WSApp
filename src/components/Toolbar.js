import { StyleSheet, Button, Pressable, Text, View } from 'react-native';
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];
const COLORS = ["green", "red", "yellow", "blue", "black", "pink", "purple", "orange", "white", "grey"];
const CHARACTER_SIZE = ["ten", "twelve"];
const FONTS = ["normal","serif", "Roboto"];

export default function Toolbar({ selection }) {
  const editor = useSlateStatic();
  const [open, setOpen] = useState(false);
  
  return (
    <View style={{marginRight: '5%', backgroundColor: '#fff', padding: '3%', width: '12em'}}>
      <View style={styles.section}>
        {CHARACTER_STYLES.map((style) => (
          <Nos
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
        <View style={styles.section}>
        {FONTS.map((style) => (
          <Nod
            key={style}
            isActive={false}
            title={style}
            onPress={(event) => {
              event.preventDefault();
              toggleColor(editor, style, FONTS);
            }}
          />
        ))}
      </View>
      <View style={styles.line} />
        <SizeDropdown editor={editor} props={open} />
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
    </View>
  );
}

function SizeDropdown(props) {
  const editor = useSlateStatic();
  const [open, setOpen] = useState(props);
  if (open){
    return(
      <Pressable style={{marginVertical: '1em'}} onPress={(event) => {event.preventDefault();setOpen(false);}}>
        <Text style={[styles.inner, {fontSize: '20px'}]}>Aa</Text>
        <Text style={styles.inner}>Font Size</Text>
      </Pressable>
    );
  } else {
    return(
      <View>
      {CHARACTER_SIZE.map((style) => (
        <Font
          key={style}
          isActive={false}
          title={style}
          onPress={(event) => {
            event.preventDefault();
            toggleColor(editor, style, CHARACTER_SIZE);
            setOpen(true);
          }}
        />
      ))}
      <Pressable style={{alignSelf: 'center'}} onPress={(event) => {event.preventDefault();setOpen(true);}}>
        <FontAwesome name="close" size={24} color="black" />
      </Pressable>
      </View>
    );
  }
}

function Font(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable active={isActive} style={{alignItems: 'center', marginVertical: '2px'}} {...otherProps}>
      <Text style={{fontSize: '15px'}}>{title}</Text>
    </Pressable>
  );
}

function Nos(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable active={isActive} style={[styles.container, {backgroundColor: title, opacity: 0.5, alignItems: 'center'}]} {...otherProps}>
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

function Nod(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <View>
      <Pressable active={isActive} style={styles.container} {...otherProps}>
        <Text style={[styles.inner, {fontFamily: title}]}>Ff</Text>
      </Pressable>
      <Text style={styles.inner}>{title}</Text>
    </View>
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