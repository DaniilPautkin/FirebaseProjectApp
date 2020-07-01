import { Spin } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../../redux/authReducer'
import SignUp from './SignUp'
import { AppStateType } from '../../../redux/redux-store'

const SignUpContainer: React.FC<PropsType> = ({
    err,
    isFetching,
    isAuth,
    signUp,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authorName, setAuthorName] = useState('')

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const onAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(e.target.value)
    }
    const onSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        signUp(email, password, authorName)
    }
    return (
        <div className="container">
            {!!isAuth ? (
                <div className="">
                    {!!isFetching ? (
                        <Spin />
                    ) : (
                        <SignUp
                            err={err}
                            email={email}
                            password={password}
                            authorName={authorName}
                            emailChange={onEmailChange}
                            passwordChange={onPasswordChange}
                            authorNameChange={onAuthorNameChange}
                            submit={onSubmit}
                        />
                    )}
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        err: state.auth.singupErr,
        isFetching: state.auth.isFetching,
        isAuth: state.firebase.auth.isEmpty,
    }
}

type MapStatePropsType = {
    err: string | null
    isFetching: boolean
    isAuth: boolean
}

type MapDispatchPropsType = {
    signUp: (email: string, password: string, authorName: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export default connect<
    MapStatePropsType,
    MapDispatchPropsType,
    {},
    AppStateType
>(mapStateToProps, { signUp })(SignUpContainer)
