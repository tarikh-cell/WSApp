import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { StyleSheet, ScrollView, Pressable, Text, View, Dimensions, TextInput, PanResponder, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from "../../axios";
import { withHistory } from "slate-history";
import Timer from "./Timer";
import Toolbar from "./Toolbar";
import useEditorConfig from "../utils/useEditorConfig";
import useSelection from "../utils/useSelection";

import { Link, useNavigate } from 'react-router-dom';
let ScreenHeight = Dimensions.get("window").height;

export default function Editor({ doc, onChange }) {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);
  const [text, onChangeText] = useState(localStorage.getItem("postTitle"));
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let timer = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      resetTimer()
      return true
    },
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  });

  const onChangeHandler = useCallback(
    (doc) => {
      onChange(doc);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitHandler);
    if (localStorage.getItem('loggedIn') === 'true'){
      axiosInstance.get('https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/user/use/').then((res) => setUserId(res.data.ID));
    }

    window.addEventListener('keypress', e => {
      resetTimer();
    })

    return () => clearTimeout(timer.current);
  }, [])

  function exitHandler() {
      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        setOpen(!open);
      }
    }

  function resetTimer(){
    clearTimeout(timer.current);
    setInactive(false);
    timer.current = setTimeout(()=>setInactive(true),50000);
  }

  function DownloadButton() {
    return(
      <Pressable style={{alignSelf: 'center', padding: '4px'}} onPress={(event) => {event.preventDefault(); setModalVisible(!modalVisible);}}>
        <FontAwesome name="save" size={20} color="black" />
      </Pressable>
    );
  } 
  
  function DownloadView() {
    return(
      <View style={{zIndex: 2, height: '100%',width:'100%', position: 'absolute', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(236, 236, 236, 0.5)', padding: '5px'}}>
        <View style={{backgroundColor: '#FFF', width: '15em', height: '10em', alignSelf:'center', justifyContent: 'space-around', borderRadius: '8px', padding: '5px'}}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>Save to Database</Text>
          { userId ? 
          <>
          <Text style={{alignSelf: 'center'}}>Name your file:</Text>
          <TextInput style={styles.search} onChangeText={onChangeText} value={text} /> 
          <Pressable style={{alignSelf: 'flex-end'}} onPress={(event) => {event.preventDefault(); download(); setModalVisible(false);}}>
            <FontAwesome name="save" size={15} color="black" />
          </Pressable></> : 
          <>
            <Text style={{textAlign: 'center'}}>Not Authenticated. {"\n"}<Link to="/LogIn">LogIn</Link> to save your files.</Text><Pressable style={{alignSelf: 'flex-end'}} onPress={(event) => {event.preventDefault(); setModalVisible(!modalVisible);}}>
              <FontAwesome name="close" size={15} color="black" />
            </Pressable>
          </>}
        </View>
      </View>
    );
  }

  function download(){
    let id = localStorage.getItem("postID");
    if (id !== null){
      axiosInstance
        .put(`edit/`+ localStorage.getItem("postID") +`/`, {
            title: localStorage.getItem("postTitle"),
            description: JSON.stringify(doc),
            author: userId,
        })
        .then((res) => {
            console.log(res);
        });
    } else {
      axiosInstance
        .post(`create/`, {
            title: text,
            description: JSON.stringify(doc),
            author: userId,
        })
        .then((res) => {
            console.log(res);
        });
      }
  }

  function UserPrompt() {
    return(
      <View style={{zIndex: 2, height: '100%',width:'100%', position: 'absolute', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(236, 236, 236, 0.5)', padding: '5px'}}>
        <View style={{backgroundColor: '#FFF', width: '15em', height: '10em', alignSelf:'center', justifyContent: 'space-around', borderRadius: '8px', padding: '5px'}}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>Alert!</Text><Text style={{alignSelf: 'center'}}>User Inactivity Detected. Are you still there?</Text>
          <Button onPress={() => {resetTimer()}} title="Yes" />
          </View>
      </View>
    );
  }

  return (
    <View style={{width: '100%', flexDirection: 'row'}} {...panResponder.panHandlers}>
      {inactive ? <UserPrompt /> : null}
      {modalVisible ? <View style={{zIndex: 2, height: '100%',width:'100%', position: 'absolute', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(236, 236, 236, 0.5)', padding: '5px'}}>
        <View style={{backgroundColor: '#FFF', width: '15em', height: '10em', alignSelf:'center', justifyContent: 'space-around', borderRadius: '8px', padding: '5px'}}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>Save to Database</Text>
          { userId ? 
          <>
          <Text style={{alignSelf: 'center'}}>Name your file:</Text>
          <TextInput style={styles.search} onChangeText={onChangeText} value={text} /> 
          <Pressable style={{alignSelf: 'flex-end'}} onPress={(event) => {event.preventDefault(); download(); setModalVisible(false);}}>
            <FontAwesome name="save" size={15} color="black" />
          </Pressable></> : 
          <>
            <Text style={{textAlign: 'center'}}>Not Authenticated. {"\n"}<Link to="/LogIn">LogIn</Link> to save your files.</Text><Pressable style={{alignSelf: 'flex-end'}} onPress={(event) => {event.preventDefault(); setModalVisible(!modalVisible);}}>
              <FontAwesome name="close" size={15} color="black" />
            </Pressable>
          </>}
        </View>
      </View> : null}
      <Timer />
      <View style={styles.container}>
        <Slate editor={editor} value={doc} onKeyDown={() => resetTimer()} onChange={onChangeHandler}>
          <Toolbar selection={selection} downloadButton={<DownloadButton />} />
          <ScrollView style={styles.editor}>        
            <Editable id='source-html' autoFocus renderElement={renderElement} renderLeaf={renderLeaf} />
          </ScrollView> 
        </Slate>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
  },
  editor: {
    height: ScreenHeight,
    backgroundColor: '#FFF',
    padding: '5%',
    borderColor: 'lightblue',
    borderWidth: '0.5px',
    zIndex: 0
  },
  search: {
    color: 'black', 
    borderColor: 'black', 
    borderWidth: '0.5px',
    borderRadius: '8px',
    marginRight: '1px',
    padding: '8px',
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
