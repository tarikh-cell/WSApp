
import { Button } from 'react-native';
import { getActiveStyles, toggleStyle, toggleBlockType } from "../utils/EditorUtils";
import { useSlateStatic } from "slate-react";

const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple", "r"];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];

export default function Toolbar({ selection }) {

  const editor = useSlateStatic();
  
  return (
    <div className="toolbar">
      {/* Buttons for character styles */}
      {PARAGRAPH_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          isActive={false}
          title={style}
          isActive={getActiveStyles(editor).has(style)}
          onPress={(event) => {
            event.preventDefault();
            toggleBlockType(editor, style);
          }}
        />
      ))}
      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          isActive={false}
          title={style}
          isActive={getActiveStyles(editor).has(style)}
          onPress={(event) => {
            event.preventDefault();
            toggleStyle(editor, style);
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
      variant="outline-primary"
      className="toolbar-btn"
      active={isActive}
      {...otherProps}
    >
      {icon}
    </Button>
  );
}