import React, {Component} from 'react';
import classes from "./SignInBox.module.css"
import {connect} from "react-redux";
import * as mainActions from "../../store/actions/mainActions";
import Spinner from "../Spinner/Spinner";


class SignInBox extends Component {
    state = {
        signIn: true,
        fields: {
            email: {
                value: "",
                valid: false,
                touched: false,
                validation: {
                    isEmail: true,
                    minLength: 8
                }
            },
            password: {
                value: "",
                valid: false,
                touched: false,
                validation: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                touched: false,
                validation: {
                    matchPassword: true
                }
            }
        }
    }

    inputChangeHandler = (event, inputName) => {
        const newFields = {
            ...this.state.fields,
            [inputName]: {
                ...this.state.fields[inputName],
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.fields[inputName].validation),
                value: event.target.value
            },
        }

        this.setState({fields: newFields});
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.isEmail) {
            isValid = value.includes("@") && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.matchPassword) {
            isValid = value === this.state.fields.password.value && isValid;
        }

        return isValid;
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.fields.email.value, this.state.fields.password.value, this.state.signIn);
    }

    switchSignUpHandler = () => {
        this.setState(prevState => {
            return {signIn: !prevState.signIn}
        })
    }

    render() {
        let headingCreate = <h2 className={classes.SignInBoxHeader}>Create an account</h2>;
        let headingSignIn = <h2 className={classes.SignInBoxHeader}>Sign in</h2>;
        if (this.props.error) {
            switch (this.props.error.message) {
                case "EMAIL_NOT_FOUND":
                    headingSignIn = <h2 className={classes.SignInBoxHeaderInvalid}>Invalid email or password</h2>;
                    break;
                case "INVALID_PASSWORD":
                    headingSignIn = <h2 className={classes.SignInBoxHeaderInvalid}>Invalid email or password</h2>;
                    break;
                case "EMAIL_EXISTS":
                    headingCreate = <h2 className={classes.SignInBoxHeaderInvalid}>Email already registered</h2>;
                    break;
                default:
                    headingCreate = <h2 className={classes.SignInBoxHeaderInvalid}>{this.props.error.message}</h2>;
                    headingSignIn = <h2 className={classes.SignInBoxHeaderInvalid}>{this.props.error.message}</h2>;
            }
        }


        let allValid = (this.state.fields.email.valid &&
            this.state.fields.password.valid && this.state.fields.confirmPassword.valid);
        let form = (
            <>
                <form onSubmit={this.submitHandler}>
                    {headingCreate}
                    <input type="email"
                           placeholder="Email Address"
                           onChange={(event) => this.inputChangeHandler(event, "email")}
                           className={(this.state.fields.email.touched && !this.state.fields.email.valid) ?
                               classes.SignInBoxInputInvalid : classes.SignInBoxInput}/>
                    <input type="password"
                           placeholder="Password"
                           onChange={(event) => this.inputChangeHandler(event, "password")}
                           className={(this.state.fields.password.touched && !this.state.fields.password.valid) ?
                               classes.SignInBoxInputInvalid : classes.SignInBoxInput}/>
                    <input type="password"
                           placeholder="Confirm Password"
                           onChange={(event) => this.inputChangeHandler(event, "confirmPassword")}
                           className={(this.state.fields.confirmPassword.touched && !this.state.fields.confirmPassword.valid) ?
                               classes.SignInBoxInputInvalid : classes.SignInBoxInput}/>
                    <button className={classes.SubmitButton}
                            disabled={!allValid}>Sign Up
                    </button>
                </form>
                <span>
                    <p>Already have an account? </p>
                    <button className={classes.SwitchButton}
                            onClick={this.switchSignUpHandler}>Sign In</button>
                </span>
            </>)

        if (this.state.signIn) {
            form = (
                <>
                    <form onSubmit={this.submitHandler}>
                        {headingSignIn}
                        <input type="email"
                               placeholder="Email Address"
                               className={classes.SignInBoxInput}
                               onChange={(event) => this.inputChangeHandler(event, "email")}/>
                        <input type="password"
                               placeholder="Password"
                               className={classes.SignInBoxInput}
                               onChange={(event) => this.inputChangeHandler(event, "password")}/>
                        <button className={classes.SubmitButton}>Sign In</button>
                    </form>
                    <span>
                    <p>Need an account? </p>
                    <button className={classes.SwitchButton}
                            onClick={this.switchSignUpHandler}>Create Account</button>
                </span>
                </>)
        }

        if (this.props.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.SignInBox}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.main.authLoading,
        error: state.main.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signIn) => dispatch(mainActions.authenticate(email, password, signIn))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignInBox);