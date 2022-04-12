import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { StyleSheet, ScrollView, Pressable, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from "../../axios";
import { withHistory } from "slate-history";
import Timer from "./Timer";
import Toolbar from "./Toolbar";
import useEditorConfig from "../utils/useEditorConfig";
import useSelection from "../utils/useSelection";
import { TouchableOpacity } from "react-native-web";
let ScreenHeight = Dimensions.get("window").height;

export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
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
    <View style={styles.container}>
      <Slate editor={editor} value={document} onChange={onChangeHandler}>
        
        <Toolbar selection={selection} />

        <ScrollView style={styles.editor}>        
          <Editable id='source-html' autoFocus renderElement={renderElement} renderLeaf={renderLeaf} />
        </ScrollView> 
      </Slate>
    </View>
  );
}

function download() {
  return(
    <TouchableOpacity style={styles.circle} onPress={()=> exportHTML()}>
        <FontAwesome name="download" size={24} color="blue" />
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  editor: {
    height: ScreenHeight,
    backgroundColor: '#FFF',
    padding: '5%',
    borderColor: 'lightblue',
    borderWidth: '0.5px',
    borderRadius: '3px',
    zIndex: 0
  },
  search: {
    color: 'black', 
    borderColor: 'black', 
    borderWidth: '0.5px',
    borderRadius: '8px',
    marginRight: '1px'
  }, 
  circle: {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
