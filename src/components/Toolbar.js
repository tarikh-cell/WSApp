import { StyleSheet, Button, Pressable, Text } from 'react-native';
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";

const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];
const COLORS = ["green", "red"];
const CHARACTER_SIZE = ["ten", "twelve"];

export default function Toolbar({ selection }) {
  const editor = useSlateStatic();
  
  return (
    <div className="toolbar">
      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          isActive={false}
          title={style}
          onPress={(event) => {
            event.preventDefault();
            toggleStyle(editor, style);
          }}
        />
      ))}
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
      {CHARACTER_SIZE.map((style) => (
        <ToolBarButton
          key={style}
          isActive={false}
          title={style}
          onPress={(event) => {
            event.preventDefault();
            toggleColor(editor, style, CHARACTER_SIZE);
          }}
        />
      ))}
    </div>
  );
}

function ToolBarButton(props) {
  const { icon, isActive, ...otherProps } = props;
  return (
    <Button
      active={isActive}
      {...otherProps}
    >
      {icon}
    </Button>
  );
}

function Nob(props) {
  const { icon, isActive, title, ...otherProps } = props;
  return(
    <Pressable active={isActive} style={[styles.container, {backgroundColor: title, opacity: 0.5}]} {...otherProps}>
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
  }
});