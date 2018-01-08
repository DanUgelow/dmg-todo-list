const InputContainer = (props) => {
  return (
    <form onSubmit={ props.handleSubmit }>
      <input type="text" onChange={ props.handleChange } value={props.inputText}/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

const ListContainer = props => {
  const todoElements = props.todos.map((item, i, arr) => {
    return (
      <li key={i}>
        { item.text }
        <button>Edit</button>
        <button>Complete</button>
        <button>Delete</button>
      </li>
    )
  })

  return (
    <ul>
      { todoElements }
    </ul>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
      todosArray: [],
    }

    this.updateInputText = this.updateInputText.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  updateInputText(e) {
    e.preventDefault()

    this.setState({
      inputText: e.target.value,
    })
  }

  addTodo(e) {
    e.preventDefault()

    const copyArray = [].concat(this.state.todosArray, [{ text: this.state.inputText }])

    this.setState({
      inputText: '',
      todosArray: copyArray,
    })
  }

  render() {
    return (
      <div>
        <InputContainer handleChange={ this.updateInputText } handleSubmit={ this.addTodo } inputText={this.state.inputText}/>
        <ListContainer todos={ this.state.todosArray } />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
