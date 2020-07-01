import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'

let mapStateToPropsForRedirect = (state: AppStateType) =>
    ({
        isAuth: state.firebase.auth.isEmpty,
    } as MapStatePropsType)

export function withAuthRedirect<WCP>(
    WrappedComponent: React.ComponentType<WCP>
) {
    const RedirectComponent = (props: MapStatePropsType) => {
        let { isAuth, ...restProps } = props

        if (!!isAuth) return <Redirect to="/signin" />

        return <WrappedComponent {...(restProps as WCP)} />
    }

    let ConnectedAuthRedirectComponent = connect<
        MapStatePropsType,
        DispatchPropsType,
        WCP,
        AppStateType
    >(
        mapStateToPropsForRedirect,
        {}
    )(RedirectComponent)

    return ConnectedAuthRedirectComponent
}

type MapStatePropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}
