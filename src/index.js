const InputContainer = (props) => {
  return (
    <form onSubmit={ props.handleSubmit }>
      <input type="text" onChange={ props.handleChange }/>
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

  console.log(todoElements)

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
      todosArray: copyArray,
    }, () => {
      this.setState({
        inputText: '',
      })
    })
  }

  render() {
    return (
      <div>
        <InputContainer handleChange={ this.updateInputText } handleSubmit={ this.addTodo }/>
        <ListContainer todos={ this.state.todosArray } />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
