import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { StyleSheet, ScrollView, Pressable, Text, View, Dimensions, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from "../../axios";

import Timer from "./Timer";
import Toolbar from "./Toolbar";
import useEditorConfig from "../utils/useEditorConfig";
import useSelection from "../utils/useSelection";
let ScreenHeight = Dimensions.get("window").height;

export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);
  const [text, onChangeText] = useState("");
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true'){
      axiosInstance.get('https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/user/use/').then((res) => setUserId(res.data.ID));
    }
  }, [])

  function download(){
    let id = localStorage.getItem("postID");
    if (id !== null){
      axiosInstance
        .put(`edit/`+ localStorage.getItem("postID") +`/`, {
            title: localStorage.getItem("postTitle"),
            description: JSON.stringify(document),
            author: userId,
        })
        .then((res) => {
            console.log(res);
        });
    } else {
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
  }

  return (
    <Slate editor={editor} value={document} onChange={onChangeHandler}>

      <Timer />
      
      <View style={styles.container}>
        <Toolbar selection={selection} />
      </View>

      <ScrollView style={styles.editor}>
        <Editable autoFocus renderElement={renderElement} renderLeaf={renderLeaf} />
      </ScrollView> 


    </Slate>
  );
}

function downloadView() {
  return(
    <View>
    <Text>Save To DataBase</Text>
        
          { modalVisible ? 
          <View style={{flexDirection: 'row'}}>
            <TextInput style={styles.search} onChangeText={onChangeText} value={text} /> 
            <Pressable onPress={(event) => {event.preventDefault(); download(); setModalVisible(false);}}>
              <FontAwesome name="download" size={15} color="black" />
            </Pressable> 
          </View> : 
          <Pressable style={{alignSelf: 'center', padding: '4px'}} onPress={(event) => {event.preventDefault(); setModalVisible(true);}}><FontAwesome name="download" size={20} color="black" /></Pressable>
          }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '95%',
    backgroundColor: '#fff', 
    padding: '1px', 
    borderColor: 'lightgrey',
    borderWidth: '1px',
    alignSelf: 'flex-end',
    marginVertical: '20px',
    marginLeft: '10em',
  },
  editor: {
    height: ScreenHeight,
    maxWidth: '50%',
    backgroundColor: '#FFF',
    padding: '5%',
    borderLeftWidth: '0px',
    borderColor: 'lightblue',
    borderWidth: '0.5px',
    borderRadius: '3px',
    marginVertical: '20px',
    marginRight: '20px',
  },
  search: {
    color: 'black', 
    borderColor: 'black', 
    borderWidth: '0.5px',
    borderRadius: '8px',
    marginRight: '1px'
  }
});
