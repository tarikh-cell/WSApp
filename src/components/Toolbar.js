import { StyleSheet, Button, Pressable, Text, View } from 'react-native';
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";
import { FontAwesome } from '@expo/vector-icons';

const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];
const COLORS = ["green", "red", "yellow", "blue", "black", "pink", "purple", "orange", "white"];
const CHARACTER_SIZE = ["ten", "twelve"];
const FONTS = ["sansserif", "Roboto"];

export default function Toolbar({ selection }) {
  const editor = useSlateStatic();
  
  return (
    <View style={{margin: '5%', backgroundColor: '#fff', borderRightWidth: '1px', padding: '5%'}}>
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
      <View style={styles.line} />
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
      <View style={styles.line} />
      {CHARACTER_SIZE.map((style) => (
        <Nod
          key={style}
          isActive={false}
          title={style}
          onPress={(event) => {
            event.preventDefault();
            toggleColor(editor, style, CHARACTER_SIZE);
          }}
        />
      ))}
      <View style={styles.line} />
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
    <Pressable active={isActive} style={styles.container} {...otherProps}>
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
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'lightgrey',
  },
  inner: {
    alignSelf: 'center',
  },
  line: {
    borderTopWidth: '1px',
    borderColor: '#000',
    margin: '5px',
    width: '100%'
  }
});