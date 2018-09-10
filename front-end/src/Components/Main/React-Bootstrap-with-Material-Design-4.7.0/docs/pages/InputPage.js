import React from 'react';
import { Input, InputNumeric, FormInline, Button, Container, Row, Col } from 'mdbreact';

class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "John Doe",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Input value: ' + this.state.value);
    event.preventDefault();
  }

  saveToState = (value) => {
    this.setState({...this.state, value: value});
  }

  handleChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <Container style={{textAlign: 'initial'}}>
        <div>

          <h2 className="mt-5"><strong>Material Design Inputs</strong></h2>
          <Input label="Example label"/>

          <Input label="Example label" size="sm" />
          <Input label="Example label" size="sm" icon="envelope"/>

          <Input label="Example label" icon="envelope"/>
          <Input label="Example label" icon="user"/>

          <Input hint="placeholder" label="Example label" />

          <Input value={ this.state.value } getValue={ this.saveToState } label="Example label" />
          <Button onClick={this.handleSubmit}>Submit</Button>

          <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
          <Input label="Type your password" icon="lock" group type="password" validate/>

          <Input label="Example label" disabled/>

          <FormInline>
            <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
            <Input label="Type your password" icon="lock" group type="password" validate/>
            <Button>Login</Button>
          </FormInline>

          <Input getValue={ this.handleChange } type="textarea" label="Icon Prefix" rows="2" icon="pencil"/>
          <Input type="textarea" label="Basic textarea" rows="2" />

          <h4 className="mt-5">Numeric inputs</h4>

          <Row>
            <Col sm="4">
              <InputNumeric getValue={ this.handleChange } min={5} max={15} value={10} className="mb-2"/>
              <InputNumeric precision={2} value={50.3} step={0.1} className="mb-2"/>
              <InputNumeric precision={2} value={50.3} step={0.5} snap className="mb-2"/>
            </Col>
          </Row>

          <hr className="mt-5" />

          <h2 className="mt-5"><strong>Default Bootstrap Inputs</strong></h2>

          <label htmlFor="exampleForm2">Basic example</label>
          <input type="text" id="exampleForm2" className="form-control" />

          <h4 className="mt-4"><strong>Input fields</strong></h4>
          <input className="form-control form-control-lg" type="text" placeholder="Large input" />
          <input className="form-control" type="text" placeholder="Medium input" />
          <input className="form-control form-control-sm" type="text" placeholder="Small input" />

          <br/>

          <label htmlFor="inputDisabledEx2" className="disabled">Disabled input</label>
          <input type="text" id="inputDisabledEx2" className="form-control" disabled />
          <h4 className="mt-4"><strong>Form groups</strong></h4>

          <form>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Example label</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Another label</label>
              <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
            </div>
          </form>

          <h4 className="mt-4"><strong>Form grid</strong></h4>
          <form>
            <Row>
              <Col>
                <input type="text" className="form-control" placeholder="First name" />
              </Col>
              <Col>
                <input type="text" className="form-control" placeholder="Last name" />
              </Col>
            </Row>
          </form>
          <h4 className="mt-4"><strong>Form row</strong></h4>
          <form>
            <div className="form-row">
              <Col>
                <input type="text" className="form-control" placeholder="First name" />
              </Col>
              <Col>
                <input type="text" className="form-control" placeholder="Last name" />
              </Col>
            </div>
          </form>
          <h4 className="mt-4"><strong>Form layout</strong></h4>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" placeholder="New York City" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip" placeholder="11206-1117" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-md">Sign in</button>
          </form>
          <h4 className="mt-4"><strong>Horizontal form</strong></h4>
          <form>
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary btn-md">Sign in</button>
              </div>
            </div>
          </form>
          <h4 className="mt-4"><strong>Column sizing</strong></h4>
          <form>
            <div className="form-row">
              <div className="col-7">
                <input type="text" className="form-control" placeholder="City" />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="State" />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Zip" />
              </div>
            </div>
          </form>
          <h4 className="mt-4"><strong>Auto-sizing</strong></h4>
          <form>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Jane Doe" />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                    </div>
                    <input type="text" className="form-control py-0" id="inlineFormInputGroup" placeholder="Username" />
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary btn-md mt-0">Submit</button>
              </div>
            </div>
          </form>
          <h4 className="mt-4"><strong>Inline forms</strong></h4>
          <form className="form-inline">
            <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe"/>
            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="text" className="form-control py-0" id="inlineFormInputGroupUsername2" placeholder="Username"/>
            </div>
            <div className="form-check mb-2 mr-sm-2">
              <input className="form-check-input" type="checkbox" id="inlineFormCheck"/>
              <label className="form-check-label" htmlFor="inlineFormCheck">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-md mt-0">Submit</button>
          </form>
          <h4 className="mt-4"><strong>Textarea</strong></h4>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
          </div>
          <h4 className="mt-4"><strong>Help text</strong></h4>
          <label htmlFor="inputPassword5">Password</label>
          <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
          <small id="passwordHelpBlock" className="form-text text-muted">
              Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </small>
          <br />
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="inputPassword6">Password</label>
              <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline" />
              <small id="passwordHelpInline" className="text-muted">
                  Must be 8-20 characters long.
              </small>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

export default InputPage;
