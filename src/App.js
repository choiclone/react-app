import React, { Component } from 'react';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:"welcome",
      selected_content_id: 1,
      subject: {title: "WEB", sub: "World Wide Web!"},
      welcome: {title: "Welcome", desc:"Hello, React!!"},
      contents: [
        {id: 1, title:"HTML", desc: "HTML is for Information ..."},
        {id: 2, title:"CSS", desc: "CSS is for Design ..."},
        {id: 3, title:"JS", desc: "JS is for Information ..."},
      ]
    }
    let leng = this.state.contents.length;
    this.max_content_id = this.state.contents[leng-1].id;
  }

  changeWelcome(e){
    this.setState({
      mode: "welcome"
    });
  }
  
  changeNavContent(id){
    this.setState({
      mode: "read",
      selected_content_id: parseInt(id),
    });
  }

  changeMode(mode) {
    if(mode === "delete"){
      if(window.confirm("삭제?")){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < this.state.contents.length){
          if(_contents[i].id === this.state.selected_content_id){
            _contents.splice(i, 1);
            break;
          }
          i+=1;
        }
        this.setState({
          mode: "welcome",
          contents: _contents,
        });
      }else{
        console.log("111")
      }
    }else{
      this.setState({
        mode: mode,
      });
    }
  }

  submitChange(title, desc){
    if(title !== "" && desc !== ""){
      this.max_content_id = this.max_content_id+1;
      // this.state.contents.push({
      //   {id: this.max_content_id, title: title, desc: desc}
      // });
      var content = {id: this.max_content_id, title: title, desc: desc};
      this.setState({
        mode: "read",
        selected_content_id: this.max_content_id,
        contents:this.state.contents.concat(content),
      });
      // immutable을 할 시[유사 배열, 유사 객체를 만들 시]
      // Array.from을 사용할 시[배열을 바꾸고 싶을 시]
      // var newContents = Array.from(this.state.contents);
      // newContents.push({
      //   id: this.max_content_id, title: title, desc: desc
      // });
      // this.setState({
      //   contents:newContents,
      // });

      //Object.assign을 사용할 시[객체를 바꾸고 싶을 시]
    }
  }

  submitChangeUpdate(id, title, desc) {
    var updatContents = Array.from(this.state.contents);
    var i = 1;
    while(i < updatContents.length){
      if(updatContents[i].id === id){
        updatContents[i] = {id: id, title: title, desc: desc}
        break;
      }
      i+=1;
    }
    this.setState({
      mode: "read",
      contents: updatContents,
    });
  }

  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id == this.state.selected_content_id){
        return data;
      }
      i+=1;
    }
  }
  
  getContent(){
    var _title, _desc, _article = null;

    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === "read"){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    }else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={this.submitChange.bind(this)}></CreateContent>;
    }else if(this.state.mode === "update"){
      var _contentsd = this.getReadContent();
      console.log(_contentsd)
      if(_contentsd !== undefined)
        _article = <UpdateContent data={_contentsd} onSubmit={this.submitChangeUpdate.bind(this)}></UpdateContent>
      else{
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
      }

    }

    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} onChangePage={this.changeWelcome.bind(this)}>s
        </Subject>
        <TOC onChangePage={this.changeNavContent.bind(this)} data={this.state.contents}></TOC>
        <Control onChangeMode={this.changeMode.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;