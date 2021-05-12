import React, { Component } from 'react';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:"create",
      selected_content_id: 2,
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
    })
  }

  changeMode(mode) {
    this.setState({
      mode: mode,
    });
  }

  submitChange(title, desc){
    if(title !== "" && desc !== ""){
      this.max_content_id = this.max_content_id+1;
      // this.state.contents.push({
      // });
      var content = {id: this.max_content_id, title: title, desc: desc};
      this.setState({
        contents:this.state.contents.concat(content),
      });
    }
  }

  render() {
    var _title, _desc, _article = null;

    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === "read"){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id == this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i+=1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={this.submitChange.bind(this)}></CreateContent>;
    }

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} onChangePage={this.changeWelcome.bind(this)}>
        </Subject>
        <TOC onChangePage={this.changeNavContent.bind(this)} data={this.state.contents}></TOC>
        <Control onChangeMode={this.changeMode.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
