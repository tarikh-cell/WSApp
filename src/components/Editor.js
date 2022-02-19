import { useCallback, useRef, useState, useMemo } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { StyleSheet, Button, Pressable, Text, View } from 'react-native';

import Toolbar from "./Toolbar";
import useEditorConfig from "../utils/useEditorConfig";
import useSelection from "../utils/useSelection";

export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );
  
  return (
    <Slate editor={editor} value={document} onChange={onChangeHandler}>
      <View style={styles.container}>
        <Toolbar selection={selection} />
        <Editable autoFocus renderElement={renderElement} renderLeaf={renderLeaf} />
      </View>
    </Slate>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '50%',
    backgroundColor: '#fff',
  },
});
