const InputContainer = props => {
  return (
    <form onSubmit={ props.handleClick }>
      <input type="text" onChange={ props.handleChange } value={ props.inputVal }/>
      <input type="submit" value="submit"/>
    </form>
  )
}

const List = props => {
    return (
    <ul>
      {props.items.map((item, index, array) => {
        return <li key={index}>
                {item}
                <button type="button">edit</button>
                <button type="button" onClick={ props.handleDelete(index) }>delete</button>
              </li>
      })}
    </ul>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
      listItems: [],
    }

    this.updateInputText = this.updateInputText.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  updateInputText(e) {
    this.setState({
      inputText: e.target.value,
    })
  }

  addToList(e) {
    e.preventDefault();
    let newList = [].concat(this.state.listItems, [this.state.inputText]);

    this.setState({
      listItems: newList,
      inputText: ''
    })
  }

  removeFromList(index) {
    // return function(e) {
      let updatedList = this.state.listItems;
      console.log(updatedList);
      console.log(e);

      this.setState({
        listItems: updatedList,
      })
    // }
  }

  render() {
    return (
      <div>
        <InputContainer inputVal={ this.state.inputText } handleChange={ this.updateInputText } handleClick={ this.addToList } />
        <List items={ this.state.listItems } handleDelete={ this.removeFromList } />
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('root'))