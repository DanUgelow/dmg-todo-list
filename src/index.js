const createUniqueId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}



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
        console.log(item);
        return <li key={item.id}>
                {item.text}
                <button type="button">edit</button>
                <button type="button" onClick={ props.handleDelete(item.id) }>delete</button>
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

    let newToDoItem = {
      text: this.state.inputText,
      id: createUniqueId(),
      completed: false,
    }

    let newList = [].concat(this.state.listItems, [newToDoItem]);

    this.setState({
      listItems: newList,
      inputText: '',
    })

    // const newTodo = createTodoObj()
    // const newList = createNewTodoList(newTodo)
    // updateList(newList)
  }

  removeFromList(id) {
    return e => {
      let updatedList = this.state.listItems.filter(function(itemObj, index, arr) {
        return itemObj.id !== id
      });
      // console.log(updatedList);
      // console.log(e);

      this.setState({
        listItems: updatedList,
      })
    }
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
