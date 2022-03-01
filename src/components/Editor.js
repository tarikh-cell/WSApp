import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { StyleSheet, Button, Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from "../../axios";

import Toolbar from "./Toolbar";
import useEditorConfig from "../utils/useEditorConfig";
import useSelection from "../utils/useSelection";
import { TextInput } from "react-native-web";

export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);
  const [text, onChangeText] = useState("");
  const [userId, setUserId] = useState(null);

  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true'){
      axiosInstance.get('http://127.0.0.1:8000/api/user/use/').then((res) => setUserId(res.data.ID));
    }
  }, [])

  function download(){
    axiosInstance
      .post(`create/`, {
          title: text,
          description: JSON.stringify(document),
          author: userId,
      })
      .then((res) => {
          console.log(res);
      });
  }

  return (
    <Slate editor={editor} value={document} onChange={onChangeHandler}>
      <View style={styles.container}>
        <Toolbar selection={selection} />
        <TextInput style={{color: 'white'}} onChangeText={onChangeText} value={text} />
        <Pressable onPress={(event) => {event.preventDefault(); download();}}>
          <FontAwesome name="download" size={15} color="white" />
        </Pressable>
        <View style={styles.editor}>
          <Editable autoFocus renderElement={renderElement} renderLeaf={renderLeaf} />
        </View> 
      </View>
    </Slate>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '50%',
    backgroundColor: '#000',
    height: '95%',
    margin: '1%',
    justifyContent: 'space-between',
  },
  editor: {
    backgroundColor: '#fff',
    padding: '5%',
    width: '90%',
  }
});
