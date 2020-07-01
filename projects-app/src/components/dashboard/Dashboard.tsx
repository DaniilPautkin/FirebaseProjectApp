import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './Dashboard.css'
import { AppStateType } from '../../redux/redux-store'
import { ProjectType, NotificationType } from '../../types/types'

type PropsType = MapStatePropsType

type MapStatePropsType = {
    projects: Array<ProjectType>
    notifications: Array<NotificationType>
}

const Dashboard: React.FC<PropsType> = ({ projects, notifications }) => {
    // console.log(this.props);

    return (
        <div className="mainContainer">
            <div>
                <ProjectList projects={projects} />
            </div>
            <div>
                <Notifications notifications={notifications} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        projects: state.firestore.ordered.projects,
        notifications: state.firestore.ordered.notifications,
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {}),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
    ])
)(Dashboard)
