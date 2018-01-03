const InputContainer = (props) => {
  return (
    <form onSubmit={ props.handleSubmit }>
      <input type="text" onChange={ props.handleChange }/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
    }

    this.updateInputText = this.updateInputText.bind(this)
    this.alertInputText = this.alertInputText.bind(this)
  }

  updateInputText(e) {
    e.preventDefault()

    this.setState({
      inputText: e.target.value,
    })
  }

  alertInputText(e) {
    e.preventDefault()

    alert(this.state.inputText)
  }

  render() {
    return (
      <div>
        <InputContainer handleChange={ this.updateInputText } handleSubmit={ this.alertInputText }/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
