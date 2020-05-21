import React, {Component} from 'react';
import classes from "./SignInBox.module.css"

//manage form in here/handle submit
class SignInBox extends Component {
    state = {
        signIn: true
    }

    submitHandler = event => {
        event.preventDefault();
    }

    switchSignUpHandler = () => {
        this.setState(prevState => {
            return {signIn: !prevState.signIn}
        })
    }

    render() {
        let form = (
            <>
                <form onSubmit={this.submitHandler}>
                    <h2>Create an account</h2>
                    <input type="email" placeholder="Email Address"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button className={classes.SubmitButton}>Sign Up</button>
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
                        <h2>Sign in</h2>
                        <input type="email" placeholder="Email Address"/>
                        <input type="password" placeholder="Password"/>
                        <button className={classes.SubmitButton}>Sign In</button>
                    </form>
                    <span>
                    <p>Need an account? </p>
                    <button className={classes.SwitchButton}
                            onClick={this.switchSignUpHandler}>Create Account</button>
                </span>
                </>)
        }

        return (
            <div className={classes.SignInBox}>
                {form}
            </div>
        );
    }
}

export default SignInBox;