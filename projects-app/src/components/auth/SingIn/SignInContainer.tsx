import { Spin } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../../redux/authReducer'
import '../auth.css'
import SignIn from './SignIn'
import { AppStateType } from '../../../redux/redux-store'

type PropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    err: string | null
    isFetching: boolean
    isAuth: boolean
}

type MapDispatchPropsType = {
    signIn: (email: string, password: string) => void
}

const SignInContainer: React.FC<PropsType> = ({
    err,
    isFetching,
    isAuth,
    signIn,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const onSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        signIn(email, password)
    }
    return (
        <div className="formCont">
            {!!isAuth ? (
                <div>
                    {!!isFetching ? (
                        <Spin />
                    ) : (
                        <SignIn
                            email={email}
                            password={password}
                            changeEmail={onEmailChange}
                            passwordChange={onPasswordChange}
                            submit={onSubmit}
                            err={err}
                        />
                    )}
                </div>
            ) : (
                <div>
                    <Redirect to="/" />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        err: state.auth.err,
        isFetching: state.auth.isFetching,
        isAuth: state.firebase.auth.isEmpty,
    }
}

export default connect<
    MapStatePropsType,
    MapDispatchPropsType,
    {},
    AppStateType
>(mapStateToProps, { signIn })(SignInContainer)
