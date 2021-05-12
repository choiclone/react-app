import React, { Component } from 'react';

class TOC extends Component {
    render(){
        const navlist = this.props.data.map((content) => (
            <li key={content.id}><a href={"/content/"+content.id} 
                data-id={content.id} 
                onClick={function(id, title, e){
                    e.preventDefault();
                    console.log(id, title)
                    this.props.onChangePage(e.target.dataset.id);
                // this.props.onChangePage(content.id);
            }.bind(this, content.id, content.title)}>{content.title}</a></li>
            )
        );
        // var data = this.props.data;
        // var navlist = [];
        // var i = 0;
        // while(i < data.length){
        //     navlist.push(<li key={data[i].id}><a href={"/content/"+data[i].id} data-id={data[i].id} onClick={function(e){
        //          e.preventDefault();
        //          this.props.onChangePage(e.target.dataset.id);
        //     }.bind(this)}>{data[i].title}</a></li>)
        //     i += 1;
        // }
        return(
            <nav>
                <ul>
                    {navlist}
                </ul>
            </nav>
        );
    }
}

export default TOC;