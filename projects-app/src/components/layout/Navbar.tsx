import Text from 'antd/lib/typography/Text'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../redux/authReducer'
import './Navbar.module.css'
import { Button, Spin } from 'antd'
import { AppStateType } from '../../redux/redux-store'

type PropsType = MapStatePropsType & MapDispatchPropsType

const Navbar: React.FC<PropsType> = ({
    isAuth,
    profile,
    isFetching,
    signOut,
}) => {
    return (
        <div className="navContainer">
            <div className="">
                {!!isAuth ? (
                    <div>
                        {!!isFetching ? (
                            <Spin />
                        ) : (
                            <div className="">
                                <NavLink activeClassName="act" to="/signup">
                                    <Button shape="round" type="primary">
                                        Sing Up
                                    </Button>
                                </NavLink>
                                <NavLink activeClassName="act" to="/signin">
                                    <Button shape="round" type="dashed">
                                        Log In
                                    </Button>
                                </NavLink>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {!!isFetching ? (
                            <Spin />
                        ) : (
                            <div className="">
                                <NavLink to="/">
                                    <Button shape="round" type="primary">
                                        Main
                                    </Button>
                                </NavLink>
                                <NavLink activeClassName="act" to="/create">
                                    <Button shape="round" type="default">
                                        New Project
                                    </Button>
                                </NavLink>
                                <Button onClick={signOut} shape="round" danger>
                                    Log Out
                                </Button>
                                {!!profile.initials ? (
                                    <NavLink
                                        className="userInitials"
                                        activeClassName="act"
                                        to="/"
                                    >
                                        <Button shape="circle" type="primary">
                                            {' '}
                                            {profile.initials}
                                        </Button>
                                    </NavLink>
                                ) : (
                                    ''
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.firebase.auth.isEmpty,
        isFetching: state.auth.isFetching,
        profile: state.firebase.profile,
    }
}

type MapStatePropsType = {
    isAuth: string
    isFetching: boolean
    profile: any
}

type MapDispatchPropsType = {
    signOut: () => void
}

export default connect(mapStateToProps, { signOut })(Navbar)
