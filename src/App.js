import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import Content from "./components/Content"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:"read",
      selected_content_id: 2,
      subject: {title: "WEB", sub: "World Wide Web!"},
      welcome: {title: "Welcome", desc:"Hello, React!!"},
      contents: [
        {id: 1, title:"HTML", desc: "HTML is for Information ..."},
        {id: 2, title:"CSS", desc: "CSS is for Design ..."},
        {id: 3, title:"JS", desc: "JS is for Information ..."},
      ]
    }
  }

  changeWelcome(e){
    this.setState({
      mode: "welcome"
    });
  }

  changeNavContent(id){
    this.setState({
      mode: "read",
      selected_content_id: parseInt(id)
    })
  }

  render() {
    console.log("app render");
    var _title, _desc = "";
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
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
      // _title = this.state.contents[0].title;
      // _desc = this.state.contents[0].desc;
    }
    console.log("reander", this)
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} onChangePage={this.changeWelcome.bind(this)}>
        </Subject>
        {/* <header>
            <h1><a href="/" onClick={function(e){
                console.log(e);
                e.preventDefault();
                this.setState({
                  mode: "welcome"
                })
            }.bind(this)}>{this.state.subject.title}</a></h1>
            {this.state.subject.sub}
        </header> */}
        <TOC onChangePage={this.changeNavContent.bind(this)} data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
